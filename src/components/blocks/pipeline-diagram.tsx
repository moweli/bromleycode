"use client";

import { useEffect, useRef, useState } from "react";
import { pipelineStages, type PipelineStage } from "@/content/methodology";

/**
 * The pipeline, drawn as code.
 *
 * The reference has no analogue for this: it sells outcomes and never shows
 * mechanism, because its client logo wall does the arguing (design-audit.md
 * §8.2 D8). With no logos to show, the mechanism has to carry that weight, and
 * a stock diagram would describe something slightly different from what the
 * words claim.
 *
 * The shape is the argument. One shared spine does the work both practices
 * depend on, the path forks into an analytics branch and a retrieval branch,
 * and the two rejoin at assurance. Drawing it as a single row would claim the
 * two practices are one sequence, which is the thing the page is arguing
 * against.
 *
 * Motion, in three layers, each earning its place by saying something the
 * static drawing cannot:
 *
 *  1. Stages build left to right on first view, 70ms apart. The diagram is
 *     read left to right, and drawing it in that order is the cheapest way to
 *     say so.
 *  2. A lit segment runs the perimeter of each stage in turn, handing off to
 *     the next. That is work moving through the pipeline, and it reads on the
 *     boxes themselves rather than on a line behind them. It keys off the slot
 *     rather than the array position, so the two branches light together: they
 *     run in parallel, and a relay that ran one and then the other would say
 *     the opposite.
 *  3. The three feedback loops march their dashes in their own direction. They
 *     are loops, and loops do not stop.
 *
 * Everything holds still under prefers-reduced-motion: the build completes
 * immediately, the relay and the dashes do not run.
 *
 * The SVG remains decorative-with-a-caption: the same information is in the
 * ordered list beneath it, so nothing is lost to a screen reader, a printed
 * page, or a reader who never sees the animation.
 */

const NODE_W = 96;
const GAP = 16;
const X0 = 48;
const NODE_H = 56;
const ROW_GAP = 84;
const MID_Y = 150;
const STAGGER = 70;
/** Room outside the rows for the arcs that bow past a branch, and their labels. */
const TOP_ROOM = 56;
const BOTTOM_ROOM = 124;

/**
 * Border relay. A lit segment runs the perimeter of each box in turn, handing
 * off to the next.
 *
 * The dash pattern must sum to exactly the perimeter, or the lit segment
 * repeats partway round instead of travelling once cleanly. Every box is the
 * same size, so one constant covers all of them.
 */
const PERIMETER = 2 * (NODE_W + NODE_H);
const LIT = 50;
/** Hand-off interval. Slots, not nodes: parallel branches share a slot. */
const RELAY_STEP = 420;

type Row = -1 | 0 | 1;
type Placed = { stage: PipelineStage; slot: number; row: Row };
type Edge = { from: Placed; to: Placed };

/**
 * Slot is horizontal position and relay order; row is which branch line the
 * node sits on. The two branches start at the same slot and advance together,
 * so the relay lights one node on each branch at the same moment rather than
 * running one branch and then the other. Slots are therefore the spine plus
 * the longer branch plus the join, not the node count.
 */
function layout(stages: PipelineStage[]) {
  const on = (branch: PipelineStage["branch"]) => stages.filter((s) => s.branch === branch);
  const placed: Placed[] = [];
  const place = (group: PipelineStage[], from: number, row: Row) =>
    group.map((stage, i) => {
      const entry: Placed = { stage, slot: from + i, row };
      placed.push(entry);
      return entry;
    });

  const spine = place(on("spine"), 0, 0);
  const forkAt = spine.length;
  const analytics = place(on("analytics"), forkAt, -1);
  const retrieval = place(on("retrieval"), forkAt, 1);
  const joinAt = forkAt + Math.max(analytics.length, retrieval.length);
  const join = place(on("join"), joinAt, 0);

  const last = (group: Placed[]) => group[group.length - 1];
  const chain = (group: Placed[]): Edge[] => group.slice(1).map((to, i) => ({ from: group[i], to }));

  const edges: Edge[] = [
    ...chain(spine),
    ...chain(analytics),
    ...chain(retrieval),
    ...chain(join),
    // The fork, and the rejoin. Analytics is the shorter branch, so its join
    // edge runs on ahead of its last node: it finishes early and waits.
    { from: last(spine), to: analytics[0] },
    { from: last(spine), to: retrieval[0] },
    { from: last(analytics), to: join[0] },
    { from: last(retrieval), to: join[0] },
  ];

  return { placed, edges, slots: joinAt + join.length };
}

const slotX = (slot: number) => X0 + slot * (NODE_W + GAP);
const rowY = (row: Row) => MID_Y + row * ROW_GAP - NODE_H / 2;
const centreX = (p: Placed) => slotX(p.slot) + NODE_W / 2;
const midY = (p: Placed) => rowY(p.row) + NODE_H / 2;

/**
 * Forward edge. Along the row where both ends share one, and as a right angle
 * through the gap where they do not, because a diagonal across a 16px gap
 * reads as a glitch rather than as a fork.
 */
function edgePath(from: Placed, to: Placed) {
  const start = slotX(from.slot) + NODE_W;
  const end = slotX(to.slot) - 3;
  if (from.row === to.row) return `M ${start} ${midY(from)} H ${end}`;
  const turn = slotX(to.slot) - GAP / 2;
  return `M ${start} ${midY(from)} H ${turn} V ${midY(to)} H ${end}`;
}

/**
 * Arc from one node's centre to another's, bowing above or below both. The
 * ends can sit on different rows, so the bow clears whichever edge is further
 * out rather than assuming one row.
 */
function loopPath(from: Placed, to: Placed, direction: "above" | "below", lift: number) {
  const above = direction === "above";
  const y1 = above ? rowY(from.row) : rowY(from.row) + NODE_H;
  const y2 = above ? rowY(to.row) : rowY(to.row) + NODE_H;
  const edge = above ? Math.min(y1, y2) : Math.max(y1, y2);
  const control = above ? edge - lift : edge + lift;
  return `M ${centreX(from)} ${y1} C ${centreX(from)} ${control}, ${centreX(to)} ${control}, ${centreX(to)} ${y2}`;
}

/** Loop ends are named stages, not positions: each loop means something. */
function endpoint(placed: Placed[], id: string): Placed {
  const found = placed.find((p) => p.stage.id === id);
  if (!found) throw new Error(`pipeline diagram: no stage with id "${id}"`);
  return found;
}

const branchNames = (branch: PipelineStage["branch"]) =>
  pipelineStages
    .filter((stage) => stage.branch === branch)
    .map((stage) => stage.name)
    .join(", ");

export function PipelineDiagram() {
  const { placed, edges, slots } = layout(pipelineStages);
  const total = placed.length;
  const cycleMs = slots * RELAY_STEP;
  const ref = useRef<SVGSVGElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Loops and their labels arrive after the forward path has finished drawing.
  const loopDelay = total * STAGGER + 220;
  const width = slotX(slots - 1) + NODE_W + X0;
  const height = rowY(1) + NODE_H + TOP_ROOM + BOTTOM_ROOM;

  const model = endpoint(placed, "model");
  const chunk = endpoint(placed, "chunk");
  const index = endpoint(placed, "index");
  const retrieve = endpoint(placed, "retrieve");
  const evaluate = endpoint(placed, "evaluate");
  const review = endpoint(placed, "review");

  return (
    <figure className="not-prose">
      {/* Wide content scrolls inside its own container rather than forcing the
          page to scroll horizontally. */}
      <div className="overflow-x-auto pb-2">
        <svg
          ref={ref}
          data-shown={shown}
          /* The relay cycle in globals.css must equal this, or the hand-off
             drifts and the last node overlaps the first. */
          data-cycle-ms={cycleMs}
          viewBox={`0 ${-TOP_ROOM} ${width} ${height}`}
          className="pipeline h-auto w-full min-w-[900px]"
          role="img"
          aria-labelledby="pipeline-title pipeline-desc"
        >
          <title id="pipeline-title">
            The Bromley Code pipeline: one shared spine, forking into two branches that rejoin
          </title>
          <desc id="pipeline-desc">
            {branchNames("spine")} run once and are shared. The path then forks: {branchNames("analytics")} on
            the analytics branch, {branchNames("retrieval")} on the retrieval branch, both running in parallel.
            The two rejoin at {branchNames("join")}. Access control resolves from the index into retrieval on
            every query. Evaluation feeds back into chunking and into the model the analytics are built on, and
            human review feeds back into evaluation.
          </desc>

          <defs>
            <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" fill="var(--color-accent)" />
            </marker>
            <marker id="arrow-muted" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" fill="var(--color-mist)" />
            </marker>
          </defs>

          {/* The forward path. Drawn before the boxes so the boxes sit over it. */}
          {edges.map((edge) => (
            <g
              key={`${edge.from.stage.id}-${edge.to.stage.id}`}
              className="pipeline-stage"
              style={{ transitionDelay: `${placed.indexOf(edge.from) * STAGGER}ms` }}
            >
              <path
                d={edgePath(edge.from, edge.to)}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="1.25"
                markerEnd="url(#arrow)"
                opacity="0.55"
              />
            </g>
          ))}

          {placed.map((p, i) => (
            <g key={p.stage.id} className="pipeline-stage" style={{ transitionDelay: `${i * STAGGER}ms` }}>
              <rect
                x={slotX(p.slot)}
                y={rowY(p.row)}
                width={NODE_W}
                height={NODE_H}
                fill="var(--color-ink-800)"
                stroke="var(--color-ink-600)"
              />
              {/* The travelling border. A second outline over the first, lit
                  only while its turn comes round. Keyed to the slot, so the
                  two branches light together. */}
              <rect
                className="pipeline-border"
                style={{ animationDelay: `${loopDelay + p.slot * RELAY_STEP}ms` }}
                x={slotX(p.slot)}
                y={rowY(p.row)}
                width={NODE_W}
                height={NODE_H}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="1.75"
                strokeDasharray={`${LIT} ${PERIMETER - LIT}`}
              />
              <text
                x={centreX(p)}
                y={rowY(p.row) + 22}
                textAnchor="middle"
                fill="var(--color-accent)"
                fontFamily="var(--font-mono)"
                fontSize="12"
                letterSpacing="0.1em"
              >
                {String(i + 1).padStart(2, "0")}
              </text>
              <text
                x={centreX(p)}
                y={rowY(p.row) + 42}
                textAnchor="middle"
                fill="var(--color-paper)"
                fontFamily="var(--font-sans)"
                fontSize="13"
                fontWeight="500"
              >
                {p.stage.name}
              </text>
            </g>
          ))}

          {/* Assurance tunes the model the analytics branch is built on. Without
              this the join is decorative on the left branch. */}
          <g className="pipeline-loop" style={{ transitionDelay: `${loopDelay}ms` }}>
            <path
              d={loopPath(evaluate, model, "above", 170)}
              className="pipeline-dash"
              fill="none"
              stroke="var(--color-mist)"
              strokeWidth="1"
              strokeDasharray="4 4"
              markerEnd="url(#arrow-muted)"
            />
            <text
              x={(centreX(evaluate) + centreX(model)) / 2}
              y={rowY(-1) - 52}
              textAnchor="middle"
              fill="var(--color-mist)"
              fontFamily="var(--font-mono)"
              fontSize="12"
              letterSpacing="0.06em"
            >
              the same labelled set tunes the model
            </text>
          </g>

          {/* Access control resolves from the index into retrieval, per query. */}
          <g className="pipeline-loop" style={{ transitionDelay: `${loopDelay + 160}ms` }}>
            <path
              d={loopPath(index, retrieve, "above", 62)}
              className="pipeline-dash"
              fill="none"
              stroke="var(--color-mist)"
              strokeWidth="1"
              strokeDasharray="4 4"
              markerEnd="url(#arrow-muted)"
            />
            <text
              x={(centreX(index) + centreX(retrieve)) / 2}
              y={rowY(1) - 50}
              textAnchor="middle"
              fill="var(--color-mist)"
              fontFamily="var(--font-mono)"
              fontSize="12"
              letterSpacing="0.06em"
            >
              ACLs resolved per query, before ranking
            </text>
          </g>

          {/* Evaluation tunes chunking and retrieval. */}
          <g className="pipeline-loop" style={{ transitionDelay: `${loopDelay + 320}ms` }}>
            <path
              d={loopPath(evaluate, chunk, "below", 125)}
              className="pipeline-dash"
              fill="none"
              stroke="var(--color-mist)"
              strokeWidth="1"
              strokeDasharray="4 4"
              markerEnd="url(#arrow-muted)"
            />
            <text
              x={(centreX(evaluate) + centreX(chunk)) / 2}
              y={rowY(1) + NODE_H + 110}
              textAnchor="middle"
              fill="var(--color-mist)"
              fontFamily="var(--font-mono)"
              fontSize="12"
              letterSpacing="0.06em"
            >
              labelled set tunes chunking and retrieval
            </text>
          </g>

          {/* Human corrections grow the labelled set. */}
          <g className="pipeline-loop" style={{ transitionDelay: `${loopDelay + 480}ms` }}>
            <path
              d={loopPath(review, evaluate, "below", 34)}
              className="pipeline-dash"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1"
              strokeDasharray="4 4"
              markerEnd="url(#arrow)"
              opacity="0.8"
            />
          </g>

        </svg>
      </div>

      <figcaption className="mt-4 text-xs font-bold uppercase tracking-[0.04em] text-mist">
        Solid: the forward path, shared then forked. Dashed: the three loops that decide whether it improves.
      </figcaption>
    </figure>
  );
}

/** The stage detail, as content rather than as a tooltip. */
export function PipelineStages({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <ol className="grid gap-px border border-line-dark bg-line-dark md:grid-cols-2">
      {pipelineStages.map((stage, index) => (
        <li
          key={stage.id}
          id={`stage-${stage.id}`}
          className={`flex flex-col p-7 ${dark ? "bg-ink-900" : "bg-paper"}`}
        >
          <p className="eyebrow text-accent">
            {String(index + 1).padStart(2, "0")} · {stage.name}
          </p>
          <h3 className={`mt-3 text-[length:var(--text-h4)] ${dark ? "text-paper" : "text-ink"}`}>
            {stage.short}
          </h3>
          <p className={`mt-3 text-body-sm ${dark ? "text-mist-bright" : "text-ink-muted"}`}>{stage.detail}</p>
          <p
            className={`mt-4 border-l-2 border-accent pl-4 text-body-sm ${
              dark ? "text-mist" : "text-ink-muted"
            }`}
          >
            <span className="eyebrow mr-2 text-accent">Hard part</span>
            {stage.hardPart}
          </p>
        </li>
      ))}
    </ol>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { pipelineStages } from "@/content/methodology";

/**
 * The pipeline, drawn as code.
 *
 * The reference has no analogue for this: it sells outcomes and never shows
 * mechanism, because its client logo wall does the arguing (design-audit.md
 * §8.2 D8). With no logos to show, the mechanism has to carry that weight, and
 * a stock diagram would describe something slightly different from what the
 * words claim.
 *
 * Motion, in three layers, each earning its place by saying something the
 * static drawing cannot:
 *
 *  1. Stages build left to right on first view, 70ms apart. The diagram is a
 *     sequence, and drawing it in sequence is the cheapest way to say so.
 *  2. A lit segment runs the perimeter of each stage in turn, left to right,
 *     handing off to the next. That is work moving through the pipeline, and
 *     it reads on the boxes themselves rather than on a line behind them.
 *  3. The two feedback loops march their dashes in their own direction. They
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
const NODE_Y = 132;
const NODE_H = 56;
const SPINE_Y = NODE_Y + NODE_H / 2;
const STAGGER = 70;

/**
 * Border relay. A lit segment runs the perimeter of each box in turn, left to
 * right, handing off to the next.
 *
 * The dash pattern must sum to exactly the perimeter, or the lit segment
 * repeats partway round instead of travelling once cleanly. Every box is the
 * same size, so one constant covers all ten.
 */
const PERIMETER = 2 * (NODE_W + NODE_H);
const LIT = 50;
/** Hand-off interval. Ten boxes at this spacing gives the full cycle below. */
const RELAY_STEP = 420;

const nodeX = (index: number) => X0 + index * (NODE_W + GAP);
const nodeCentre = (index: number) => nodeX(index) + NODE_W / 2;

/** Arc from one node's centre to another's, bowing above or below the row. */
function loopPath(from: number, to: number, direction: "above" | "below", lift: number) {
  const x1 = nodeCentre(from);
  const x2 = nodeCentre(to);
  const y = direction === "above" ? NODE_Y : NODE_Y + NODE_H;
  const control = direction === "above" ? y - lift : y + lift;
  return `M ${x1} ${y} C ${x1} ${control}, ${x2} ${control}, ${x2} ${y}`;
}

export function PipelineDiagram() {
  const total = pipelineStages.length;
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

  const spineEnd = nodeX(total - 1) + NODE_W;
  // Loops and their labels arrive after the forward path has finished drawing.
  const loopDelay = total * STAGGER + 220;

  return (
    <figure className="not-prose">
      {/* Wide content scrolls inside its own container rather than forcing the
          page to scroll horizontally. */}
      <div className="overflow-x-auto pb-2">
        <svg
          ref={ref}
          data-shown={shown}
          viewBox={`0 0 ${spineEnd + X0} 300`}
          className="pipeline h-auto w-full min-w-[900px]"
          role="img"
          aria-labelledby="pipeline-title pipeline-desc"
        >
          <title id="pipeline-title">The Bromley Code pipeline, in ten stages</title>
          <desc id="pipeline-desc">
            {pipelineStages.map((stage) => stage.name).join(", ")}, in sequence. Access control
            resolves from the index into retrieval on every query. Evaluation feeds back into
            chunking and retrieval, and human review feeds back into evaluation.
          </desc>

          <defs>
            <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" fill="var(--color-accent)" />
            </marker>
            <marker id="arrow-muted" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" fill="var(--color-mist)" />
            </marker>
          </defs>

          {/* Spine */}
          <line x1={X0} y1={SPINE_Y} x2={spineEnd} y2={SPINE_Y} stroke="var(--color-ink-600)" strokeWidth="1" />

          {pipelineStages.map((stage, index) => (
            <g key={stage.id} className="pipeline-stage" style={{ transitionDelay: `${index * STAGGER}ms` }}>
              {index < total - 1 ? (
                <line
                  x1={nodeX(index) + NODE_W}
                  y1={SPINE_Y}
                  x2={nodeX(index + 1) - 3}
                  y2={SPINE_Y}
                  stroke="var(--color-accent)"
                  strokeWidth="1.25"
                  markerEnd="url(#arrow)"
                  opacity="0.55"
                />
              ) : null}
              <rect
                x={nodeX(index)}
                y={NODE_Y}
                width={NODE_W}
                height={NODE_H}
                fill="var(--color-ink-800)"
                stroke="var(--color-ink-600)"
              />
              {/* The travelling border. A second outline over the first, lit
                  only while its turn comes round. */}
              <rect
                className="pipeline-border"
                style={{ animationDelay: `${loopDelay + index * RELAY_STEP}ms` }}
                x={nodeX(index)}
                y={NODE_Y}
                width={NODE_W}
                height={NODE_H}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="1.75"
                strokeDasharray={`${LIT} ${PERIMETER - LIT}`}
              />
              <text
                x={nodeCentre(index)}
                y={NODE_Y + 22}
                textAnchor="middle"
                fill="var(--color-accent)"
                fontFamily="var(--font-mono)"
                fontSize="12"
                letterSpacing="0.1em"
              >
                {String(index + 1).padStart(2, "0")}
              </text>
              <text
                x={nodeCentre(index)}
                y={NODE_Y + 42}
                textAnchor="middle"
                fill="var(--color-paper)"
                fontFamily="var(--font-sans)"
                fontSize="13"
                fontWeight="500"
              >
                {stage.name}
              </text>
            </g>
          ))}

          {/* Access control resolves from the index into retrieval, per query. */}
          <g className="pipeline-loop" style={{ transitionDelay: `${loopDelay}ms` }}>
            <path
              d={loopPath(5, 6, "above", 62)}
              className="pipeline-dash"
              fill="none"
              stroke="var(--color-mist)"
              strokeWidth="1"
              strokeDasharray="4 4"
              markerEnd="url(#arrow-muted)"
            />
            <text
              x={(nodeCentre(5) + nodeCentre(6)) / 2}
              y={NODE_Y - 50}
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
          <g className="pipeline-loop" style={{ transitionDelay: `${loopDelay + 160}ms` }}>
            <path
              d={loopPath(8, 3, "below", 74)}
              className="pipeline-dash"
              fill="none"
              stroke="var(--color-mist)"
              strokeWidth="1"
              strokeDasharray="4 4"
              markerEnd="url(#arrow-muted)"
            />
            <text
              x={(nodeCentre(8) + nodeCentre(3)) / 2}
              y={NODE_Y + NODE_H + 90}
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
          <g className="pipeline-loop" style={{ transitionDelay: `${loopDelay + 320}ms` }}>
            <path
              d={loopPath(9, 8, "below", 34)}
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
        Solid: the forward path. Dashed: the two loops that decide whether it improves.
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

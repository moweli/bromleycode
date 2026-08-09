import { pipelineStages } from "@/content/methodology";

/**
 * The pipeline, drawn as code.
 *
 * The reference has no analogue for this — it sells outcomes and never shows
 * mechanism, because its client logo wall does the arguing (design-audit.md
 * §8.2 D8). With no logos to show, the mechanism has to carry that weight, and
 * a stock diagram would describe something slightly different from what the
 * words claim.
 *
 * The SVG is decorative-with-a-caption: the same information is in the ordered
 * list beneath it, so nothing is lost to a screen reader or a printed page.
 */

const NODE_W = 96;
const GAP = 16;
const X0 = 48;
const NODE_Y = 132;
const NODE_H = 56;

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

  return (
    <figure className="not-prose">
      {/* Wide content scrolls inside its own container rather than forcing the
          page to scroll horizontally. */}
      <div className="overflow-x-auto pb-2">
        <svg
          viewBox={`0 0 ${nodeX(total - 1) + NODE_W + X0} 300`}
          className="h-auto w-full min-w-[900px]"
          role="img"
          aria-labelledby="pipeline-title pipeline-desc"
        >
          <title id="pipeline-title">The Bromely Code pipeline, in ten stages</title>
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
          <line
            x1={X0}
            y1={NODE_Y + NODE_H / 2}
            x2={nodeX(total - 1) + NODE_W}
            y2={NODE_Y + NODE_H / 2}
            stroke="var(--color-ink-600)"
            strokeWidth="1"
          />

          {pipelineStages.map((stage, index) => (
            <g key={stage.id}>
              {index < total - 1 ? (
                <line
                  x1={nodeX(index) + NODE_W}
                  y1={NODE_Y + NODE_H / 2}
                  x2={nodeX(index + 1) - 3}
                  y2={NODE_Y + NODE_H / 2}
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
          <path
            d={loopPath(5, 6, "above", 62)}
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

          {/* Evaluation tunes chunking and retrieval. */}
          <path
            d={loopPath(8, 3, "below", 74)}
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

          {/* Human corrections grow the labelled set. */}
          <path
            d={loopPath(9, 8, "below", 34)}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1"
            strokeDasharray="4 4"
            markerEnd="url(#arrow)"
            opacity="0.8"
          />
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

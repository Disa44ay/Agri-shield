"use client";

export default function SolutionFlowSVG() {
  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <svg
        viewBox="0 0 400 140"
        className="w-full h-auto"
      >
        {/* Lines */}
        <line
          x1="60"
          y1="70"
          x2="140"
          y2="70"
          stroke="#16a34a"
          strokeWidth="2.5"
          className="svg-flow-line"
        />
        <line
          x1="160"
          y1="70"
          x2="240"
          y2="70"
          stroke="#16a34a"
          strokeWidth="2.5"
          className="svg-flow-line"
        />
        <line
          x1="260"
          y1="70"
          x2="340"
          y2="70"
          stroke="#16a34a"
          strokeWidth="2.5"
          className="svg-flow-line"
        />

        {/* Nodes */}
        {[
          { cx: 40,  label: "Data" },
          { cx: 160, label: "Warning" },
          { cx: 260, label: "Action" },
          { cx: 360, label: "Saved Food" },
        ].map((node, idx) => (
          <g key={node.cx}>
            <circle
              cx={node.cx}
              cy={70}
              r={20}
              fill="#22c55e"
              className={`pulse-node glow-soft`}
            />
            <circle
              cx={node.cx}
              cy={70}
              r={14}
              fill="#ecfdf3"
            />
            <text
              x={node.cx}
              y={72}
              textAnchor="middle"
              fontSize="10"
              fill="#166534"
              fontWeight="bold"
            >
              {node.label.split(" ")[0]}
            </text>
            {node.label.split(" ")[1] && (
              <text
                x={node.cx}
                y={84}
                textAnchor="middle"
                fontSize="8"
                fill="#166534"
              >
                {node.label.split(" ")[1]}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

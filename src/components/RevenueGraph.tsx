import React from 'react';

interface RevenueGraphProps {
  data: {
    quarter: string;
    revenue: number;
  }[];
}

export function RevenueGraph({ data }: RevenueGraphProps) {
  const padding = 25;
  const width = 300;
  const height = 150;
  const graphWidth = width - (padding * 2);
  const graphHeight = height - (padding * 2);

  const maxRevenue = Math.max(...data.map(d => d.revenue));
  const minRevenue = Math.min(...data.map(d => d.revenue));
  
  // Add 10% padding to the max value for better visualization
  const yMax = maxRevenue + (maxRevenue - minRevenue) * 0.1;
  const yMin = Math.max(0, minRevenue - (maxRevenue - minRevenue) * 0.1);

  const getX = (index: number) => {
    return padding + (index * (graphWidth / (data.length - 1)));
  };

  const getY = (value: number) => {
    return height - padding - ((value - yMin) / (yMax - yMin) * graphHeight);
  };

  // Generate path for the line
  const linePath = data.map((point, index) => {
    const x = getX(index);
    const y = getY(point.revenue);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Generate path for the gradient area
  const areaPath = `
    ${linePath}
    L ${getX(data.length - 1)} ${height - padding}
    L ${padding} ${height - padding}
    Z
  `;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        {/* Define gradient */}
        <defs>
          <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgb(37, 99, 235)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="rgb(37, 99, 235)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Y-axis grid lines and labels */}
        {Array.from({ length: 3 }).map((_, i) => {
          const y = padding + (i * (graphHeight / 2));
          const value = yMax - (i * ((yMax - yMin) / 2));
          return (
            <g key={i}>
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#e5e7eb"
                strokeDasharray="4 4"
              />
              <text
                x={padding - 5}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                className="text-[10px] fill-gray-500"
              >
                ${value.toFixed(0)}M
              </text>
            </g>
          );
        })}

        {/* X-axis labels */}
        {data.map((point, i) => (
          <text
            key={i}
            x={getX(i)}
            y={height - 5}
            textAnchor="middle"
            className="text-[10px] fill-gray-500"
          >
            {point.quarter.replace('20', '')}
          </text>
        ))}

        {/* Area under the line */}
        <path
          d={areaPath}
          fill="url(#areaGradient)"
        />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="rgb(37, 99, 235)"
          strokeWidth="1.5"
        />

        {/* Data points */}
        {data.map((point, i) => (
          <g key={i}>
            <circle
              cx={getX(i)}
              cy={getY(point.revenue)}
              r="3"
              className="fill-blue-600"
            />
            <circle
              cx={getX(i)}
              cy={getY(point.revenue)}
              r="6"
              className="fill-blue-600 opacity-10"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
import React from 'react';

interface SmallRevenueGraphProps {
  data: {
    quarter: string;
    revenue: number;
  }[];
  title: string;
  period: string;
}

export function SmallRevenueGraph({ data, title, period }: SmallRevenueGraphProps) {
  const padding = 15;
  const width = 120;
  const height = 60;
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
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="mb-2">
        <h3 className="text-sm font-semibold">{title}</h3>
        <div className="text-xs text-gray-500">{period}</div>
      </div>
      <div className="flex items-center justify-center">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible"
        >
          {/* Define gradient */}
          <defs>
            <linearGradient id="smallAreaGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgb(37, 99, 235)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(37, 99, 235)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area under the line */}
          <path
            d={areaPath}
            fill="url(#smallAreaGradient)"
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
                r="2"
                className="fill-blue-600"
              />
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-2 text-right">
        <div className="text-sm font-medium">${data[data.length - 1].revenue}M</div>
        <div className="text-xs text-gray-500">Latest</div>
      </div>
    </div>
  );
}
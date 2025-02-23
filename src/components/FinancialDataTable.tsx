import React, { useState } from 'react';
import { Business } from '../types';

interface FinancialDataTableProps {
  data: Business['financialData'];
}

export function FinancialDataTable({ data }: FinancialDataTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Business['financialData'][0];
    direction: 'asc' | 'desc';
  }>({ key: 'year', direction: 'desc' });

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key: keyof Business['financialData'][0]) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const formatValue = (value: number, isPercentage = false) => {
    if (isPercentage) {
      return `${value.toFixed(2)}%`;
    }
    return new Intl.NumberFormat('et-EE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const metrics = [
    { key: 'currentAssets', label: 'Current Assets' },
    { key: 'fixedAssets', label: 'Fixed Assets' },
    { key: 'totalAssets', label: 'Total Assets' },
    { key: 'shortTermLiabilities', label: 'Short-term Liabilities' },
    { key: 'longTermLiabilities', label: 'Long-term Liabilities' },
    { key: 'totalLiabilities', label: 'Total Liabilities' },
    { key: 'shareCapital', label: 'Share Capital' },
    { key: 'retainedEarnings', label: 'Retained Earnings' },
    { key: 'netProfit', label: 'Net Profit' },
    { key: 'equityCapital', label: 'Equity Capital' },
    { key: 'turnover', label: 'Turnover' },
    { key: 'profitMargin', label: 'Profit Margin' }
  ] as const;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Financial Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('year')}
              >
                Year
                {sortConfig.key === 'year' && (
                  <span className="ml-1">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              {metrics.map(({ key, label }) => (
                <th
                  key={key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort(key)}
                >
                  {label}
                  {sortConfig.key === key && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((row) => (
              <tr key={row.year} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.year}
                </td>
                {metrics.map(({ key }) => (
                  <td
                    key={key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {formatValue(row[key], key === 'profitMargin')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
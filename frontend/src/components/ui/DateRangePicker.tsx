// Purpose: Date range picker component for filtering videos by creation date
import React, { useState } from 'react';

interface DateRange {
  from?: string;
  to?: string;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  onClear: () => void;
  className?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  onClear,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Quick preset options
  const presets = [
    { label: 'Last 7 days', days: 7 },
    { label: 'Last 30 days', days: 30 },
    { label: 'Last 3 months', days: 90 },
    { label: 'Last year', days: 365 },
  ];

  const handlePresetClick = (days: number) => {
    const to = new Date().toISOString().split('T')[0];
    const from = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    onChange({ from, to });
    setIsOpen(false);
  };

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, from: e.target.value });
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, to: e.target.value });
  };

  const hasValue = value.from || value.to;
  const displayText = hasValue 
    ? `${value.from ? new Date(value.from).toLocaleDateString() : 'Any'} - ${value.to ? new Date(value.to).toLocaleDateString() : 'Any'}`
    : 'Filter by date...';

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full px-4 py-2 text-left bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          ${hasValue ? 'border-primary-300 bg-primary-50' : 'border-gray-300'}
          ${isOpen ? 'ring-2 ring-primary-500 border-primary-500' : ''}
        `}
      >
        <div className="flex items-center justify-between">
          <span className={hasValue ? 'text-primary-700 font-medium' : 'text-gray-500'}>
            {displayText}
          </span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          {/* Quick Presets */}
          <div className="p-3 border-b border-gray-200">
            <div className="text-sm font-medium text-gray-700 mb-2">Quick select:</div>
            <div className="grid grid-cols-2 gap-2">
              {presets.map(({ label, days }) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => handlePresetClick(days)}
                  className="px-3 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors duration-200"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Date Range */}
          <div className="p-4">
            <div className="text-sm font-medium text-gray-700 mb-3">Custom range:</div>
            
            <div className="space-y-3">
              <div>
                <label htmlFor="date-from" className="block text-xs font-medium text-gray-600 mb-1">
                  From:
                </label>
                <input
                  type="date"
                  id="date-from"
                  value={value.from || ''}
                  onChange={handleFromChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="date-to" className="block text-xs font-medium text-gray-600 mb-1">
                  To:
                </label>
                <input
                  type="date"
                  id="date-to"
                  value={value.to || ''}
                  onChange={handleToChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  onClear();
                  setIsOpen(false);
                }}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Clear dates
              </button>
              
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-primary-500 text-white text-sm rounded-md hover:bg-primary-600 transition-colors duration-200"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;

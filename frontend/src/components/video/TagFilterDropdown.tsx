// Purpose: Multi-select tag filtering dropdown component
import React, { useState, useRef, useEffect } from 'react';
import TagChip from './TagChip';

interface TagCount {
  tag: string;
  count: number;
}

interface TagFilterDropdownProps {
  availableTags: TagCount[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearAll: () => void;
  placeholder?: string;
  className?: string;
}

const TagFilterDropdown: React.FC<TagFilterDropdownProps> = ({
  availableTags,
  selectedTags,
  onTagToggle,
  onClearAll,
  placeholder = "Filter by tags...",
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter tags based on search term
  const filteredTags = availableTags.filter(({ tag }) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort tags: selected first, then by count (descending)
  const sortedTags = filteredTags.sort((a, b) => {
    const aSelected = selectedTags.includes(a.tag);
    const bSelected = selectedTags.includes(b.tag);
    
    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;
    return b.count - a.count;
  });

  const handleTagClick = (tag: string) => {
    onTagToggle(tag);
  };

  const selectedCount = selectedTags.length;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full px-4 py-2 text-left bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          ${selectedCount > 0 ? 'border-primary-300 bg-primary-50' : 'border-gray-300'}
          ${isOpen ? 'ring-2 ring-primary-500 border-primary-500' : ''}
        `}
      >
        <div className="flex items-center justify-between">
          <span className={selectedCount > 0 ? 'text-primary-700 font-medium' : 'text-gray-500'}>
            {selectedCount > 0 
              ? `${selectedCount} tag${selectedCount === 1 ? '' : 's'} selected`
              : placeholder
            }
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

      {/* Selected Tags Display */}
      {selectedCount > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {selectedTags.map(tag => (
            <TagChip
              key={tag}
              tag={tag}
              selected
              removable
              onRemove={onTagToggle}
            />
          ))}
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs text-gray-500 hover:text-gray-700 underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-200">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tags..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              autoFocus
            />
          </div>

          {/* Tags List */}
          <div className="max-h-60 overflow-y-auto">
            {sortedTags.length > 0 ? (
              <div className="p-2">
                {sortedTags.map(({ tag, count }) => (
                  <div
                    key={tag}
                    className={`
                      flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-50
                      ${selectedTags.includes(tag) ? 'bg-primary-50' : ''}
                    `}
                    onClick={() => handleTagClick(tag)}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => {}} // Controlled by parent click
                        className="mr-3 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {tag}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500 text-sm">
                {searchTerm ? `No tags found for "${searchTerm}"` : 'No tags available'}
              </div>
            )}
          </div>

          {/* Footer */}
          {selectedCount > 0 && (
            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <button
                type="button"
                onClick={onClearAll}
                className="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Clear all selected tags
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TagFilterDropdown;

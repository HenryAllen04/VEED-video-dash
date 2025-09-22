// Purpose: Individual tag chip component with remove functionality
import React from 'react';

interface TagChipProps {
  tag: string;
  count?: number;
  removable?: boolean;
  selected?: boolean;
  onClick?: (tag: string) => void;
  onRemove?: (tag: string) => void;
  className?: string;
}

const TagChip: React.FC<TagChipProps> = ({
  tag,
  count,
  removable = false,
  selected = false,
  onClick,
  onRemove,
  className = ''
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(tag);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(tag);
    }
  };

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
        ${selected 
          ? 'bg-primary-100 text-primary-800 border border-primary-300' 
          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
        }
        ${onClick ? 'hover:shadow-sm' : ''}
        ${className}
      `}
      onClick={handleClick}
    >
      <span className="truncate max-w-32">
        {tag}
      </span>
      
      {count !== undefined && (
        <span className="ml-1 text-xs opacity-75">
          ({count})
        </span>
      )}

      {removable && (
        <button
          type="button"
          onClick={handleRemove}
          className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label={`Remove ${tag} filter`}
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </span>
  );
};

export default TagChip;

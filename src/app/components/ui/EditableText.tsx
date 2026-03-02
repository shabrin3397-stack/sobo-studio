import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Edit2, Check, X } from 'lucide-react';
import { useEditMode } from '../../contexts/EditModeContext';
import { useContent } from '../../contexts/ContentContext';
import { toast } from 'sonner';

interface EditableTextProps {
  contentKey: string;
  defaultValue?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  children?: React.ReactNode;
  multiline?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({
  contentKey,
  defaultValue = '',
  className = '',
  as: Component = 'div',
  children,
  multiline = false
}) => {
  const { isEditMode } = useEditMode();
  const { content, updateContent } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');
  const [hovering, setHovering] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Load current value from content context
  const currentValue = content[contentKey] || defaultValue;

  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleClick = (e: React.MouseEvent) => {
    if (isEditMode && !isEditing) {
      e.preventDefault();
      e.stopPropagation();
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    try {
      await updateContent(contentKey, value);
      setIsEditing(false);
      toast.success('Updated!');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save');
    }
  };

  const handleCancel = () => {
    setValue(currentValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    } else if (e.key === 'Enter' && !multiline && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Enter' && e.ctrlKey && multiline) {
      handleSave();
    }
  };

  if (!isEditMode) {
    return (
      <Component className={className}>
        {children || value}
      </Component>
    );
  }

  return (
    <div 
      className="relative inline-block w-full"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {isEditing ? (
        <div className="relative">
          {multiline ? (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`${className} w-full bg-yellow-50 border-2 border-yellow-400 text-black px-3 py-2 focus:outline-none focus:border-yellow-600 min-h-[100px]`}
              placeholder={defaultValue}
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`${className} w-full bg-yellow-50 border-2 border-yellow-400 text-black px-3 py-2 focus:outline-none focus:border-yellow-600`}
              placeholder={defaultValue}
            />
          )}
          
          {/* Edit Controls */}
          <div className="absolute -right-2 -top-2 flex gap-1 z-50">
            <button
              onClick={handleSave}
              className="p-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600"
              title="Save (Enter)"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
              title="Cancel (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {multiline && (
            <div className="text-xs text-gray-600 mt-1 font-['Space_Mono']">
              Press Ctrl+Enter to save, Esc to cancel
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <Component 
            className={`${className} ${isEditMode ? 'cursor-pointer transition-all' : ''} ${hovering ? 'outline outline-2 outline-dashed outline-yellow-400 outline-offset-4' : ''}`}
            onClick={handleClick}
          >
            {children || value}
          </Component>
          <AnimatePresence>
            {hovering && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute -top-8 left-0 bg-yellow-400 text-black px-2 py-1 text-xs font-bold rounded shadow-lg flex items-center gap-1 whitespace-nowrap z-50"
              >
                <Edit2 className="w-3 h-3" />
                CLICK TO EDIT
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
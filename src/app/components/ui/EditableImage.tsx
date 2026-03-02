import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Edit2, Check, X, Image as ImageIcon } from 'lucide-react';
import { useEditMode } from '../../contexts/EditModeContext';
import { useContent } from '../../contexts/ContentContext';
import { apiClient } from '../../utils/api';
import { toast } from 'sonner';

interface EditableImageProps {
  contentKey: string;
  defaultValue?: string;
  className?: string;
  alt?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  contentKey,
  defaultValue = '',
  className = '',
  alt = ''
}) => {
  const { isEditMode } = useEditMode();
  const { content, updateContent } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [hovering, setHovering] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load current image from content context
  const currentImage = content[contentKey] || defaultValue;

  const handleClick = (e: React.MouseEvent) => {
    if (isEditMode && !isEditing) {
      e.preventDefault();
      e.stopPropagation();
      setImageUrl(currentImage);
      setIsEditing(true);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    try {
      setUploading(true);
      toast.loading('Uploading image...', { id: 'upload' });
      
      // Upload to Supabase Storage via backend
      const response = await apiClient.upload(file);
      
      if (response.url) {
        setImageUrl(response.url);
        toast.success('Image uploaded!', { id: 'upload' });
      } else {
        throw new Error('No URL returned from upload');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed. Please try again.', { id: 'upload' });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      await updateContent(contentKey, imageUrl);
      setIsEditing(false);
      toast.success('Image updated!');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save');
    }
  };

  const handleCancel = () => {
    setImageUrl(currentImage);
    setIsEditing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!isEditMode) {
    return (
      <img 
        src={currentImage} 
        alt={alt}
        className={className}
      />
    );
  }

  return (
    <div 
      className="relative inline-block w-full"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {isEditing ? (
        <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-6" onClick={handleCancel}>
          <div className="bg-white text-black max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="border-b border-gray-200 p-6">
              <h3 className="text-2xl font-black uppercase tracking-tight">CHANGE IMAGE</h3>
              <p className="text-sm text-gray-600 mt-1 font-['Space_Mono']">Upload a new image or paste a URL</p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Preview */}
              {imageUrl && (
                <div className="border border-gray-200 aspect-video overflow-hidden">
                  <img 
                    src={imageUrl} 
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full border-2 border-black bg-black text-white hover:bg-gray-900 transition-colors px-6 py-4 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span className="font-bold">UPLOADING...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span className="font-bold">UPLOAD NEW IMAGE</span>
                  </>
                )}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* URL Input */}
              <div>
                <label className="block text-xs font-['Space_Mono'] uppercase tracking-widest mb-2 text-gray-600">
                  Or paste image URL
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full border-2 border-gray-300 px-4 py-3 focus:outline-none focus:border-black font-['Space_Mono']"
                />
              </div>

              {/* Info */}
              <div className="bg-gray-100 p-4 text-xs font-['Space_Mono'] space-y-2">
                <div className="font-bold">TIPS:</div>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Recommended size: 1920x1080px or larger</li>
                  <li>Max file size: 5MB</li>
                  <li>Supported formats: JPG, PNG, WebP, GIF</li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6 flex gap-3">
              <button
                onClick={handleSave}
                disabled={!imageUrl}
                className="flex-1 bg-green-600 text-white px-6 py-3 font-bold uppercase tracking-widest hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                SAVE CHANGES
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-3 border-2 border-gray-300 font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative" onClick={handleClick}>
          <img 
            src={currentImage} 
            alt={alt}
            className={`${className} ${isEditMode ? 'cursor-pointer transition-all' : ''} ${hovering ? 'outline outline-4 outline-dashed outline-yellow-400 outline-offset-4 opacity-80' : ''}`}
          />
          
          <AnimatePresence>
            {hovering && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-2 text-sm font-bold rounded shadow-lg flex items-center gap-2 z-50"
              >
                <Edit2 className="w-4 h-4" />
                CLICK TO CHANGE IMAGE
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
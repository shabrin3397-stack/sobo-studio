import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { apiClient } from '../../utils/api';
import { toast } from 'sonner';

interface ImageUploadProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  helpText?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ 
  label, 
  value, 
  onChange,
  helpText 
}) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
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
        onChange(response.url);
        toast.success('Image uploaded successfully!', { id: 'upload' });
      } else {
        throw new Error('No URL returned from upload');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image', { id: 'upload' });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUrlChange = (url: string) => {
    onChange(url);
  };

  return (
    <div>
      <label className="block text-xs font-['Space_Mono'] uppercase tracking-widest mb-2 opacity-70">
        {label}
      </label>
      
      {helpText && (
        <p className="text-xs opacity-50 mb-3 font-['Space_Mono']">{helpText}</p>
      )}

      <div className="space-y-4">
        {/* Preview */}
        {value && (
          <div className="relative border border-white/20 bg-white/5 aspect-video overflow-hidden group">
            <img 
              src={value} 
              alt={label}
              className="w-full h-full object-cover"
            />
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Upload Button */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex-1 border border-white/20 bg-white/5 hover:bg-white/10 transition-colors px-4 py-3 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span className="text-sm font-['Space_Mono']">UPLOADING...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span className="text-sm font-['Space_Mono']">
                  {value ? 'REPLACE IMAGE' : 'UPLOAD IMAGE'}
                </span>
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
        </div>

        {/* URL Input */}
        <div className="space-y-2">
          <div className="text-xs font-['Space_Mono'] uppercase tracking-widest opacity-50">
            OR PASTE IMAGE URL
          </div>
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white text-sm font-['Space_Mono']"
          />
        </div>

        {/* Image Info */}
        {value && (
          <div className="text-xs font-['Space_Mono'] opacity-50">
            {value.includes('supabase') ? (
              <div className="flex items-center gap-2">
                <ImageIcon className="w-3 h-3" />
                <span>Uploaded to cloud storage</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ImageIcon className="w-3 h-3" />
                <span>External URL</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
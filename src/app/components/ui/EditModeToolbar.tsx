import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Edit3, Eye, LogOut, Save } from 'lucide-react';
import { useEditMode } from '../../contexts/EditModeContext';
import { supabase } from '../../utils/supabase';
import { clearAuthToken } from '../../utils/api';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export const EditModeToolbar: React.FC = () => {
  const { isEditMode, isAuthenticated, toggleEditMode } = useEditMode();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      clearAuthToken();
      toast.success('Logged out successfully');
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  const handleSave = () => {
    toast.success('All changes are auto-saved!');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Main Toolbar - Always visible when authenticated */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[9998] bg-black text-white px-6 py-3 rounded-full shadow-2xl border-2 border-yellow-400 flex items-center gap-4"
      >
        {/* Status */}
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isEditMode ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-sm font-bold font-['Space_Mono']">
            {isEditMode ? 'EDIT MODE' : 'PREVIEW MODE'}
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-white/20" />

        {/* Toggle Button */}
        <button
          onClick={toggleEditMode}
          className={`px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 transition-all ${
            isEditMode 
              ? 'bg-yellow-400 text-black hover:bg-yellow-500' 
              : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          {isEditMode ? (
            <>
              <Eye className="w-4 h-4" />
              PREVIEW
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4" />
              EDIT
            </>
          )}
        </button>

        {/* Info */}
        {isEditMode && (
          <div className="text-xs font-['Space_Mono'] opacity-70 hidden md:block">
            Click any text or image to edit
          </div>
        )}

        {/* Divider */}
        <div className="w-px h-6 bg-white/20" />

        {/* Admin Panel Link */}
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="text-sm font-['Space_Mono'] hover:text-yellow-400 transition-colors"
        >
          Admin Panel
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </motion.div>

      {/* Edit Mode Hint - Only shows in edit mode */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            key="hint"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.5 }}
            className="fixed bottom-8 right-8 bg-yellow-400 text-black px-6 py-4 rounded-lg shadow-2xl max-w-xs z-[9997]"
          >
            <div className="font-bold text-sm mb-2 flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              EDIT MODE ACTIVE
            </div>
            <div className="text-xs font-['Space_Mono']">
              Hover over any text or image on the page and click to edit. Changes are saved automatically!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
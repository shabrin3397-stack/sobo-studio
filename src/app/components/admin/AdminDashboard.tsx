import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useContent } from '../../contexts/ContentContext';
import { supabase } from '../../utils/supabase';
import { getAuthToken, clearAuthToken } from '../../utils/api';
import { toast } from 'sonner';
import { LogOut, Save, Type, Briefcase, FileText, Image as ImageIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ImageUpload } from './ImageUpload';

interface ContentData {
  [key: string]: any;
}

export const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [localContent, setLocalContent] = useState<ContentData>({});
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { content, updateContent: contextUpdateContent, initializeDefaults } = useContent();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    // Sync with context content
    setLocalContent(content);
    setLoading(false);
  }, [content]);

  const checkAuth = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const { data: { user: currentUser }, error } = await supabase.auth.getUser(token);
      if (error || !currentUser) {
        console.error('Auth error:', error);
        clearAuthToken();
        navigate('/admin/login');
        return;
      }
      
      setUser(currentUser);
    } catch (error) {
      console.error('Auth check error:', error);
      clearAuthToken();
      navigate('/admin/login');
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Save all content items
      for (const [key, value] of Object.entries(localContent)) {
        await contextUpdateContent(key, value);
      }
      
      toast.success('Content saved successfully!');
    } catch (error: any) {
      console.error('Save error:', error);
      toast.error(error.message || 'Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      clearAuthToken();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  const updateLocalContent = (key: string, value: any) => {
    setLocalContent(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleInitializeDefaults = async () => {
    try {
      setSaving(true);
      await initializeDefaults();
      toast.success('Default content initialized!');
    } catch (error: any) {
      console.error('Initialize error:', error);
      // Check if it's a backend unavailable error
      if (error.message?.includes('Backend not available') || error.message?.includes('preview mode')) {
        toast.error('Backend not available in preview. Deploy your site to enable database features.');
      } else {
        toast.error(error.message || 'Failed to initialize content');
      }
    } finally {
      setSaving(false);
    }
  };

  const isEmpty = Object.keys(localContent).length === 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-black animate-pulse mb-4">LOADING...</div>
          <div className="w-48 h-1 bg-white/20 overflow-hidden">
            <div className="h-full w-1/2 bg-white animate-[slide_1s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/20 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black tracking-tighter">SOBO STUDIO</h1>
            <p className="text-xs font-['Space_Mono'] opacity-50">Content Management System</p>
          </div>
          
          <div className="flex items-center gap-4">
            {isEmpty && (
              <button
                onClick={handleInitializeDefaults}
                disabled={saving}
                className="px-6 py-2 bg-green-600 text-white font-bold uppercase tracking-widest hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                {saving ? 'INITIALIZING...' : 'Initialize Default Content'}
              </button>
            )}
            <button
              onClick={() => window.open('/', '_blank')}
              className="px-4 py-2 border border-white/20 text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              Preview Site
            </button>
            {!isEmpty && (
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {saving ? 'SAVING...' : 'SAVE ALL'}
              </button>
            )}
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-white/10 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {isEmpty ? (
        <div className="container mx-auto px-6 py-32 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-6xl font-black mb-6">WELCOME!</h2>
            <p className="text-xl mb-12 opacity-80">
              Your content database is empty. Click the button above to load the default SOBO STUDIO content.
            </p>
            <div className="bg-white/5 border border-white/20 p-8 text-left">
              <h3 className="text-2xl font-bold mb-4">What happens next:</h3>
              <ol className="space-y-3 text-sm font-['Space_Mono']">
                <li>1. Click "Initialize Default Content" button</li>
                <li>2. All sections will be populated with default text and images</li>
                <li>3. You can then edit everything to match your brand</li>
                <li>4. Save your changes and preview the site</li>
              </ol>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-6 py-12">
          <Tabs defaultValue="hero" className="w-full">
            <TabsList className="bg-white/5 border border-white/20 p-1 mb-8">
              <TabsTrigger value="hero" className="data-[state=active]:bg-white data-[state=active]:text-black">
                <Type className="w-4 h-4 mr-2" />
                Hero
              </TabsTrigger>
              <TabsTrigger value="services" className="data-[state=active]:bg-white data-[state=active]:text-black">
                <Briefcase className="w-4 h-4 mr-2" />
                Services
              </TabsTrigger>
              <TabsTrigger value="work" className="data-[state=active]:bg-white data-[state=active]:text-black">
                <FileText className="w-4 h-4 mr-2" />
                Work
              </TabsTrigger>
            </TabsList>

            {/* Hero Section */}
            <TabsContent value="hero" className="space-y-8">
              <Section title="Hero Section">
                <Field label="Main Headline (Line 1)">
                  <input
                    type="text"
                    value={localContent.hero_headline_1 || 'WE DON\'T DO'}
                    onChange={(e) => updateLocalContent('hero_headline_1', e.target.value)}
                    className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white"
                  />
                </Field>
                
                <Field label="Main Headline (Line 2)">
                  <input
                    type="text"
                    value={localContent.hero_headline_2 || 'MEDIOCRE.'}
                    onChange={(e) => updateLocalContent('hero_headline_2', e.target.value)}
                    className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white"
                  />
                </Field>

                <Field label="Services Text">
                  <input
                    type="text"
                    value={localContent.hero_services || 'Branding / Social / Strategy'}
                    onChange={(e) => updateLocalContent('hero_services', e.target.value)}
                    className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white"
                  />
                </Field>

                <Field label="Tagline">
                  <input
                    type="text"
                    value={localContent.hero_tagline || 'For culture-led brands that want to exist tomorrow, not just today.'}
                    onChange={(e) => updateLocalContent('hero_tagline', e.target.value)}
                    className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white"
                  />
                </Field>

                <ImageUpload
                  label="Hero Background Image"
                  value={localContent.hero_image}
                  onChange={(value) => updateLocalContent('hero_image', value)}
                  helpText="Upload your own image or paste an image URL (recommended: 1920x1080px or larger)"
                />
              </Section>
            </TabsContent>

            {/* Services Section */}
            <TabsContent value="services" className="space-y-8">
              {[1, 2, 3].map((num) => (
                <Section key={num} title={`Service ${num}`}>
                  <Field label="Title">
                    <input
                      type="text"
                      value={localContent[`service_${num}_title`] || ''}
                      onChange={(e) => updateLocalContent(`service_${num}_title`, e.target.value)}
                      className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white"
                    />
                  </Field>

                  <Field label="Subtitle">
                    <input
                      type="text"
                      value={localContent[`service_${num}_subtitle`] || ''}
                      onChange={(e) => updateLocalContent(`service_${num}_subtitle`, e.target.value)}
                      className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white"
                    />
                  </Field>

                  <Field label="Description">
                    <textarea
                      value={localContent[`service_${num}_description`] || ''}
                      onChange={(e) => updateLocalContent(`service_${num}_description`, e.target.value)}
                      rows={4}
                      className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white"
                    />
                  </Field>

                  <ImageUpload
                    label={`Service ${num} Image`}
                    value={localContent[`service_${num}_image`]}
                    onChange={(value) => updateLocalContent(`service_${num}_image`, value)}
                    helpText="Upload an image that represents this service"
                  />
                </Section>
              ))}
            </TabsContent>

            {/* Work Section */}
            <TabsContent value="work" className="space-y-8">
              {[1, 2, 3, 4].map((num) => (
                <Section key={num} title={`Project ${num}`}>
                  <Field label="Client Name">
                    <input
                      type="text"
                      value={localContent[`work_${num}_client`] || ''}
                      onChange={(e) => updateLocalContent(`work_${num}_client`, e.target.value)}
                      className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white"
                    />
                  </Field>

                  <Field label="Category">
                    <input
                      type="text"
                      value={localContent[`work_${num}_category`] || ''}
                      onChange={(e) => updateLocalContent(`work_${num}_category`, e.target.value)}
                      className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white"
                    />
                  </Field>

                  <Field label="Description">
                    <textarea
                      value={localContent[`work_${num}_description`] || ''}
                      onChange={(e) => updateLocalContent(`work_${num}_description`, e.target.value)}
                      rows={3}
                      className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white"
                    />
                  </Field>

                  <ImageUpload
                    label={`Project ${num} Image`}
                    value={localContent[`work_${num}_image`]}
                    onChange={(value) => updateLocalContent(`work_${num}_image`, value)}
                    helpText="Upload a project showcase image"
                  />
                </Section>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

// Helper Components
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="border border-white/20 p-6 bg-white/5">
    <h3 className="text-xl font-bold uppercase tracking-widest mb-6 pb-4 border-b border-white/20">
      {title}
    </h3>
    <div className="space-y-6">{children}</div>
  </div>
);

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <label className="block text-xs font-['Space_Mono'] uppercase tracking-widest mb-2 opacity-70">
      {label}
    </label>
    {children}
  </div>
);
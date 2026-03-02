import { supabase } from './supabase';

// Content Management
export const contentService = {
  // Get all content
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*');
      
      if (error) {
        console.error('Supabase query error:', error);
        throw error;
      }
      return data || [];
    } catch (error) {
      console.error('Content service error:', error);
      throw error;
    }
  },

  // Get content by key
  async get(key: string) {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('key', key)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found"
    return data;
  },

  // Set/update content
  async set(key: string, value: any) {
    const { error } = await supabase
      .from('content')
      .upsert({ key, value }, { onConflict: 'key' });
    
    if (error) throw error;
  },

  // Delete content
  async delete(key: string) {
    const { error } = await supabase
      .from('content')
      .delete()
      .eq('key', key);
    
    if (error) throw error;
  },

  // Initialize default content
  async initializeDefaults() {
    const defaultContent = [
      { key: 'hero_headline_1', value: "WE DON'T DO" },
      { key: 'hero_headline_2', value: 'MEDIOCRE.' },
      { key: 'hero_services', value: 'Branding / Social / Strategy' },
      { key: 'hero_tagline', value: 'For culture-led brands that want to exist tomorrow, not just today.' },
      { key: 'hero_image', value: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1200&q=80' },
      
      // Services
      { key: 'service_1_title', value: 'BRAND IDENTITY' },
      { key: 'service_1_subtitle', value: 'Not just a logo' },
      { key: 'service_1_description', value: 'We build visual systems that actually mean something. Strategy-first, designed to last.' },
      { key: 'service_1_image', value: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80' },
      
      { key: 'service_2_title', value: 'SOCIAL PRESENCE' },
      { key: 'service_2_subtitle', value: 'Content with intention' },
      { key: 'service_2_description', value: 'No growth hacks. No viral chasing. Just compelling content that reflects who you actually are.' },
      { key: 'service_2_image', value: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80' },
      
      { key: 'service_3_title', value: 'BRAND STRATEGY' },
      { key: 'service_3_subtitle', value: 'Clarity over chaos' },
      { key: 'service_3_description', value: "We help you figure out what you stand for, who you're for, and how to show up with confidence." },
      { key: 'service_3_image', value: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80' },
      
      // Work
      { key: 'work_1_client', value: 'STUDIO NARI' },
      { key: 'work_1_category', value: 'Full Brand Identity' },
      { key: 'work_1_description', value: 'Complete rebrand for a sustainable fashion studio focused on slow design principles.' },
      { key: 'work_1_image', value: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80' },
      
      { key: 'work_2_client', value: 'VELD COFFEE' },
      { key: 'work_2_category', value: 'Brand & Social Strategy' },
      { key: 'work_2_description', value: 'Positioning and social content strategy for a specialty coffee roaster.' },
      { key: 'work_2_image', value: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80' },
      
      { key: 'work_3_client', value: 'FORM GALLERY' },
      { key: 'work_3_category', value: 'Digital Presence' },
      { key: 'work_3_description', value: 'Website and editorial content for an independent art gallery in Copenhagen.' },
      { key: 'work_3_image', value: 'https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=800&q=80' },
      
      { key: 'work_4_client', value: 'ASTER STUDIO' },
      { key: 'work_4_category', value: 'Brand Identity & Strategy' },
      { key: 'work_4_description', value: 'Full brand system for an architectural practice focused on sustainable design.' },
      { key: 'work_4_image', value: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80' },
    ];

    const { error } = await supabase
      .from('content')
      .upsert(defaultContent, { onConflict: 'key' });
    
    if (error) throw error;
  }
};

// Storage/Upload Management
export const storageService = {
  async uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
};

// Database Setup Helper
export const setupDatabase = async () => {
  try {
    // Check if content table exists by trying to query it
    const { error } = await supabase
      .from('content')
      .select('key')
      .limit(1);
    
    if (error) {
      // Table doesn't exist, provide setup instructions
      return {
        success: false,
        needsSetup: true,
        message: 'Database tables need to be created'
      };
    }
    
    return {
      success: true,
      needsSetup: false,
      message: 'Database is ready'
    };
  } catch (error) {
    return {
      success: false,
      needsSetup: true,
      message: 'Could not connect to database',
      error
    };
  }
};
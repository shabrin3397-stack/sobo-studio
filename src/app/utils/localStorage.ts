// LocalStorage-based content management (no backend required)

const CONTENT_KEY = 'sobo_studio_content';
const ADMIN_KEY = 'sobo_studio_admin';
const AUTH_KEY = 'sobo_studio_auth';

// Default content structure
export const DEFAULT_CONTENT = {
  // Hero Section
  hero_headline: "SLOW DESIGN.\nFAST IMPACT.",
  hero_subheadline: "Brand strategy, identity & social for culture-led brands that refuse to blend in.",
  hero_cta: "LET'S TALK",
  hero_headline_1: "WE DON'T DO",
  hero_headline_2: "MEDIOCRE.",
  hero_services: "Branding / Social / Strategy",
  hero_tagline: "For culture-led brands that want to exist tomorrow, not just today.",
  hero_image: "https://images.unsplash.com/photo-1761882469824-f77e7c07e85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG1pbmltYWxpc3QlMjBibGFjayUyMGFuZCUyMHdoaXRlJTIwZmFzaGlvbiUyMGVkaXRvcmlhbHxlbnwxfHx8fDE3NzAzMTQ5NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  
  // About Section
  about_title: "WE DON'T DO FAST FASHION BRANDING",
  about_text: "We're SOBO STUDIO — a slow design studio for brands that give a damn. We build identities with intention, depth, and staying power. No fluff. No agency speak. Just bold, thoughtful work for founders who'd rather do less, better.",
  
  // Services
  services_title: "WHAT WE DO",
  service_1_title: "IDENTITY",
  service_1_subtitle: "FORMERLY BRANDING",
  service_1_description: "More than a logo. We architect the entire visual universe of your brand. Typography that speaks, colors that feel, and systems that scale. We build identities that don't just look good—they work.",
  service_1_image: "https://images.unsplash.com/photo-1769613704997-13a44ed4c244?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRleHR1cmUlMjBibGFjayUyMGFuZCUyMHdoaXRlJTIwbWluaW1hbGlzdCUyMGJvbGR8ZW58MXx8fHwxNzcwNjM3MzIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  
  service_2_title: "SIGNAL",
  service_2_subtitle: "FORMERLY SOCIAL",
  service_2_description: "Stop posting for the algorithm. Start posting for humans. We craft editorial-grade content strategies that cut through the noise. Less volume, higher impact. We make your brand unignorable.",
  service_2_image: "https://images.unsplash.com/photo-1758647841549-6d85724a5cf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjBub2lzZSUyMGdsaXRjaCUyMGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MXx8fHwxNzcwNjM3MzI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  
  service_3_title: "BLUEPRINT",
  service_3_subtitle: "FORMERLY STRATEGY",
  service_3_description: "The brain before the beauty. We dig deep into culture, market gaps, and human psychology to position your brand where it has no competition. Clear direction, zero guesswork.",
  service_3_image: "https://images.unsplash.com/photo-1705955143829-378c115c6b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwZ3JpZCUyMGJsdWVwcmludCUyMG1pbmltYWxpc3QlMjBibGFjayUyMGFuZCUyMHdoaXRlfGVufDF8fHx8MTc3MDYzNzMyOXww&ixlib=rb-4.1.0&q=80&w=1080",
  
  // Work Projects
  work_1_client: "VELVET SPACE",
  work_1_category: "Identity + Strategy",
  work_1_description: "Redefining luxury real estate for the digital nomad generation.",
  work_1_image: "https://images.unsplash.com/photo-1759882609577-e78a307beed4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBicnV0YWxpc3QlMjBhcmNoaXRlY3R1cmUlMjBjb25jcmV0ZSUyMG1pbmltYWxpc3R8ZW58MXx8fHwxNzcwMzE0OTQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  
  work_2_client: "NOIR / BLANC",
  work_2_category: "Signal / Content",
  work_2_description: "An anti-fashion campaign for a sustainable basics label.",
  work_2_image: "https://images.unsplash.com/photo-1761882469824-f77e7c07e85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG1pbmltYWxpc3QlMjBibGFjayUyMGFuZCUyMHdoaXRlJTIwZmFzaGlvbiUyMGVkaXRvcmlhbHxlbnwxfHx8fDE3NzAzMTQ5NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  
  work_3_client: "ETHER & CO",
  work_3_category: "Full Stack",
  work_3_description: "Building a skincare cult from scratch.",
  work_3_image: "https://images.unsplash.com/photo-1769613704997-13a44ed4c244?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRleHR1cmUlMjBibGFjayUyMGFuZCUyMHdoaXRlJTIwYXJ0aXN0aWN8ZW58MXx8fHwxNzcwMzE0OTQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  
  work_4_client: "STUDIO 99",
  work_4_category: "Blueprint",
  work_4_description: "Rebranding a tech giant to feel human again.",
  work_4_image: "https://images.unsplash.com/photo-1765371514743-45bd8e6c0a28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd29ya3NwYWNlJTIwZGVzaWduZXIlMjBjbGVhbiUyMGRlc2t8ZW58MXx8fHwxNzcwMzE0OTQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  
  // Manifesto
  manifesto_title: "OUR MANIFESTO",
  manifesto_points: [
    "We believe in doing less, better.",
    "We don't chase trends. We build foundations.",
    "We work with brands that have something to say.",
    "We're anti-generic, anti-corporate, anti-boring.",
    "We design for longevity, not just launches."
  ],
  
  // CTA Section
  cta_title: "READY TO BUILD SOMETHING REAL?",
  cta_text: "If you're tired of templated branding and want to work with a studio that actually gets it, let's talk.",
  cta_button: "GET IN TOUCH",
  cta_email: "hello@sobostudio.com",
  
  // Footer
  footer_tagline: "SLOW DESIGN. FAST IMPACT.",
  footer_email: "hello@sobostudio.com",
  footer_instagram: "@sobostudio",
  footer_linkedin: "SOBO STUDIO"
};

// Content Management
export const contentStorage = {
  // Get all content
  getAll(): Record<string, any> {
    try {
      const stored = localStorage.getItem(CONTENT_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      // Return empty object if nothing exists (don't auto-initialize)
      return {};
    } catch (error) {
      console.error('Error reading content:', error);
      return {};
    }
  },

  // Save all content
  saveAll(content: Record<string, any>): void {
    try {
      localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
    } catch (error) {
      console.error('Error saving content:', error);
    }
  },

  // Get single value
  get(key: string): any {
    const content = this.getAll();
    return content[key];
  },

  // Set single value
  set(key: string, value: any): void {
    const content = this.getAll();
    content[key] = value;
    this.saveAll(content);
  },

  // Initialize with defaults
  initializeDefaults(): void {
    this.saveAll(DEFAULT_CONTENT);
  },

  // Reset to defaults
  reset(): void {
    this.saveAll(DEFAULT_CONTENT);
  }
};

// Admin/Auth Management
export const authStorage = {
  // Check if admin exists
  hasAdmin(): boolean {
    return localStorage.getItem(ADMIN_KEY) !== null;
  },

  // Create admin account
  createAdmin(email: string, password: string, name: string): boolean {
    try {
      const admin = {
        email,
        password, // In production, this would be hashed
        name,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
      return true;
    } catch (error) {
      console.error('Error creating admin:', error);
      return false;
    }
  },

  // Login
  login(email: string, password: string): boolean {
    try {
      const stored = localStorage.getItem(ADMIN_KEY);
      if (!stored) return false;

      const admin = JSON.parse(stored);
      if (admin.email === email && admin.password === password) {
        // Set auth token (simple timestamp)
        const token = {
          email: admin.email,
          name: admin.name,
          loginAt: new Date().toISOString()
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(token));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error logging in:', error);
      return false;
    }
  },

  // Check if logged in
  isLoggedIn(): boolean {
    return localStorage.getItem(AUTH_KEY) !== null;
  },

  // Get current user
  getCurrentUser(): { email: string; name: string } | null {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  // Logout
  logout(): void {
    localStorage.removeItem(AUTH_KEY);
  }
};

// Image Management (for future use)
export const imageStorage = {
  // Save image as base64
  save(key: string, file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const base64 = reader.result as string;
          localStorage.setItem(`sobo_image_${key}`, base64);
          resolve(base64);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  // Get image
  get(key: string): string | null {
    return localStorage.getItem(`sobo_image_${key}`);
  },

  // Delete image
  delete(key: string): void {
    localStorage.removeItem(`sobo_image_${key}`);
  }
};
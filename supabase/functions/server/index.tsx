import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase client for auth and storage
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Initialize storage bucket on startup
async function initStorage() {
  const bucketName = 'make-99b74b48-images';
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
  if (!bucketExists) {
    await supabase.storage.createBucket(bucketName, { public: false });
    console.log('Created storage bucket:', bucketName);
  }
}
initStorage();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-99b74b48/health", (c) => {
  return c.json({ status: "ok" });
});

// ========================================
// AUTH ROUTES
// ========================================

// Sign up new admin user
app.post("/make-server-99b74b48/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('Sign up error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user });
  } catch (err) {
    console.error('Sign up error:', err);
    return c.json({ error: String(err) }, 500);
  }
});

// Get current user session
app.get("/make-server-99b74b48/auth/session", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ user: null });
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error) {
      return c.json({ user: null });
    }

    return c.json({ user });
  } catch (err) {
    console.error('Session check error:', err);
    return c.json({ user: null });
  }
});

// ========================================
// CONTENT MANAGEMENT ROUTES
// ========================================

// Get all content
app.get("/make-server-99b74b48/content", async (c) => {
  try {
    const content = await kv.getByPrefix('content:');
    return c.json({ content });
  } catch (err) {
    console.error('Get content error:', err);
    return c.json({ error: String(err) }, 500);
  }
});

// Update content (requires auth)
app.post("/make-server-99b74b48/content", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id) {
      return c.json({ error: 'Unauthorized - Admin login required to update content' }, 401);
    }

    const { key, value } = await c.req.json();
    await kv.set(`content:${key}`, value);
    
    return c.json({ success: true });
  } catch (err) {
    console.error('Update content error:', err);
    return c.json({ error: String(err) }, 500);
  }
});

// Upload image (requires auth)
app.post("/make-server-99b74b48/upload", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id) {
      return c.json({ error: 'Unauthorized - Admin login required to upload images' }, 401);
    }

    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    const fileName = `${Date.now()}_${file.name}`;
    const bucketName = 'make-99b74b48-images';
    
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        contentType: file.type,
      });

    if (error) {
      console.error('Upload error:', error);
      return c.json({ error: error.message }, 500);
    }

    // Get signed URL (valid for 10 years)
    const { data: signedData } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fileName, 315360000);

    return c.json({ 
      url: signedData?.signedUrl,
      path: data.path 
    });
  } catch (err) {
    console.error('Upload error:', err);
    return c.json({ error: String(err) }, 500);
  }
});

// Get signed URL for existing image
app.post("/make-server-99b74b48/get-signed-url", async (c) => {
  try {
    const { path } = await c.req.json();
    const bucketName = 'make-99b74b48-images';
    
    const { data, error } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(path, 315360000);

    if (error) {
      console.error('Get signed URL error:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ url: data.signedUrl });
  } catch (err) {
    console.error('Get signed URL error:', err);
    return c.json({ error: String(err) }, 500);
  }
});

Deno.serve(app.fetch);
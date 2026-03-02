import React, { useState, useEffect } from 'react';
import { Database, CheckCircle, Copy, AlertCircle } from 'lucide-react';
import { setupDatabase } from '../../utils/database';
import { projectId } from '/utils/supabase/info';
import { toast } from 'sonner';

export const DatabaseSetup = () => {
  const [status, setStatus] = useState<'checking' | 'ready' | 'needs-setup'>('checking');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    checkDatabase();
  }, []);

  const checkDatabase = async () => {
    const result = await setupDatabase();
    setStatus(result.needsSetup ? 'needs-setup' : 'ready');
  };

  const sqlScript = `-- Create content table
CREATE TABLE IF NOT EXISTS content (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access
CREATE POLICY "Allow public read access" ON content
  FOR SELECT
  TO public
  USING (true);

-- Policy: Allow authenticated users to insert/update
CREATE POLICY "Allow authenticated users to modify" ON content
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Storage policies for images bucket
CREATE POLICY "Allow public read access" ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'images');

CREATE POLICY "Allow authenticated users to upload" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'images');

CREATE POLICY "Allow authenticated users to update" ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'images');

CREATE POLICY "Allow authenticated users to delete" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'images');`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlScript);
    setCopied(true);
    toast.success('SQL script copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  if (status === 'checking') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-black animate-pulse mb-4">CHECKING DATABASE...</div>
        </div>
      </div>
    );
  }

  if (status === 'ready') {
    return null; // Database is ready, don't show this component
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <Database className="w-16 h-16 mx-auto mb-6 text-yellow-500" />
          <h1 className="text-5xl font-black mb-4">DATABASE SETUP REQUIRED</h1>
          <p className="text-xl opacity-80">
            Your Supabase database needs to be initialized before you can use the CMS.
          </p>
        </div>

        <div className="bg-white/5 border border-white/20 p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <AlertCircle className="w-6 h-6" />
            Setup Instructions
          </h2>
          
          <ol className="space-y-4 text-sm font-['Space_Mono'] mb-8">
            <li className="flex gap-3">
              <span className="font-bold">1.</span>
              <span>Click the button below to copy the SQL script to your clipboard</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">2.</span>
              <span>
                Go to your{' '}
                <a 
                  href={`https://supabase.com/dashboard/project/${projectId}/sql/new`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Supabase SQL Editor →
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">3.</span>
              <span>Paste the SQL script and click "Run"</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">4.</span>
              <span>Come back here and click "I've Set Up the Database"</span>
            </li>
          </ol>

          <div className="bg-black/50 border border-white/20 p-4 rounded mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-['Space_Mono'] opacity-50">SQL SCRIPT</span>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-xs bg-white/10 px-3 py-1 hover:bg-white/20 transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-3 h-3" />
                    COPIED!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    COPY SCRIPT
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs overflow-x-auto text-green-400 max-h-64 overflow-y-auto">
              {sqlScript}
            </pre>
          </div>

          <div className="flex gap-4">
            <button
              onClick={copyToClipboard}
              className="flex-1 px-6 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center justify-center gap-3"
            >
              <Copy className="w-5 h-5" />
              Copy SQL Script
            </button>
            
            <a
              href={`https://supabase.com/dashboard/project/${projectId}/sql/new`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-4 bg-blue-600 text-white font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors flex items-center justify-center gap-3"
            >
              <Database className="w-5 h-5" />
              Open SQL Editor
            </a>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={checkDatabase}
            className="px-8 py-3 border border-white/20 text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
          >
            I've Set Up the Database
          </button>
        </div>
      </div>
    </div>
  );
};

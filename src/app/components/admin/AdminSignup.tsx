import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { apiClient, setAuthToken } from '../../utils/api';
import { supabase } from '../../utils/supabase';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';

export const AdminSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      setError('');

      console.log('Creating admin account via backend...');
      
      // Create user via backend
      const response = await apiClient.post('/auth/signup', {
        email,
        password,
        name
      });

      if (response.error) {
        console.error('Signup error:', response.error);
        setError(response.error);
        toast.error(response.error);
        return;
      }

      console.log('Account created, now logging in...');

      // Auto-login after signup
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error('Auto-login error:', authError);
        toast.warning('Account created! Please log in.');
        navigate('/admin/login');
        return;
      }

      if (data.session?.access_token) {
        setAuthToken(data.session.access_token);
        toast.success('Account created successfully!');
        navigate('/');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      setError('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-black tracking-tighter mb-2">SOBO STUDIO</h1>
          <p className="text-sm font-['Space_Mono'] opacity-50 uppercase tracking-widest">Create Admin Account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-['Space_Mono'] uppercase tracking-widest mb-2 opacity-70">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/20 text-white px-12 py-4 focus:outline-none focus:border-white transition-colors"
                placeholder="Your Name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-['Space_Mono'] uppercase tracking-widest mb-2 opacity-70">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/20 text-white px-12 py-4 focus:outline-none focus:border-white transition-colors"
                placeholder="admin@sobostudio.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-['Space_Mono'] uppercase tracking-widest mb-2 opacity-70">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/20 text-white px-12 py-4 focus:outline-none focus:border-white transition-colors"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 transition-opacity"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs opacity-50 mt-2">Minimum 6 characters</p>
          </div>

          <div>
            <label className="block text-xs font-['Space_Mono'] uppercase tracking-widest mb-2 opacity-70">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/20 text-white px-12 py-4 focus:outline-none focus:border-white transition-colors"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs opacity-50">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/admin/login')}
              className="underline hover:opacity-100 transition-opacity"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
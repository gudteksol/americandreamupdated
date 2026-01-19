import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { X, Lock, LogOut, MessageSquare, Calendar, Trash2 } from 'lucide-react';

interface Testimonial {
  id: string;
  content: string;
  created_at: string;
}

interface AdminDashboardProps {
  onClose: () => void;
}

export function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadTestimonials();
    }
  }, [isAuthenticated]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setIsAuthenticated(true);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (signInError) {
      setError('Invalid credentials. Please try again.');
    } else {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setTestimonials([]);
    setEmail('');
    setPassword('');
  };

  const loadTestimonials = async () => {
    setLoadingTestimonials(true);
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    setLoadingTestimonials(false);

    if (error) {
      console.error('Error loading testimonials:', error);
    } else {
      setTestimonials(data || []);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting testimonial:', error);
      alert('Failed to delete testimonial');
    } else {
      setTestimonials(testimonials.filter(t => t.id !== id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#2c1810] border-8 border-double border-[#8b0000] shadow-[0_0_60px_rgba(139,0,0,0.6)] max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-[#8b0000] p-6 flex items-center justify-between border-b-4 border-[#1a1410]">
          <div className="flex items-center gap-3">
            <Lock className="w-8 h-8 text-[#f4e8d8]" />
            <h2 className="fancy-text text-3xl font-bold text-[#f4e8d8]">
              Admin Dashboard
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#a00000] transition-colors duration-200 border-2 border-[#1a1410]"
          >
            <X className="w-6 h-6 text-[#f4e8d8]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {!isAuthenticated ? (
            <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-6">
              <div>
                <label className="block text-[#f4e8d8] text-lg font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1a1410] text-[#f4e8d8] border-2 border-[#8b0000] focus:border-[#a00000] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[#f4e8d8] text-lg font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1a1410] text-[#f4e8d8] border-2 border-[#8b0000] focus:border-[#a00000] focus:outline-none"
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-[#8b0000] border-2 border-[#ff0000] text-[#f4e8d8] text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#8b0000] hover:bg-[#a00000] text-[#f4e8d8] px-6 py-3 font-bold text-lg border-4 border-[#1a1410] shadow-xl hover:shadow-[0_0_30px_rgba(139,0,0,0.6)] transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-8 h-8 text-[#8b0000]" />
                  <h3 className="text-2xl font-bold text-[#f4e8d8]">
                    Submitted Testimonials ({testimonials.length})
                  </h3>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-[#8b0000] hover:bg-[#a00000] text-[#f4e8d8] border-2 border-[#1a1410] transition-colors duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>

              {loadingTestimonials ? (
                <div className="text-center py-12 text-[#c4b5a0] text-xl">
                  Loading testimonials...
                </div>
              ) : testimonials.length === 0 ? (
                <div className="text-center py-12 bg-[#1a1410] border-4 border-[#8b0000]">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 text-[#8b7355]" />
                  <p className="text-[#c4b5a0] text-xl">No testimonials yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="bg-[#1a1410] p-6 border-4 border-[#8b0000] hover:border-[#a00000] transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,0,0,0.4)] group"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-2 text-[#8b7355] text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(testimonial.created_at)}</span>
                        </div>
                        <button
                          onClick={() => handleDelete(testimonial.id)}
                          className="opacity-0 group-hover:opacity-100 p-2 hover:bg-[#8b0000] transition-all duration-200 border-2 border-[#8b0000]"
                          title="Delete testimonial"
                        >
                          <Trash2 className="w-4 h-4 text-[#f4e8d8]" />
                        </button>
                      </div>
                      <p className="text-[#f4e8d8] text-lg leading-relaxed whitespace-pre-wrap">
                        {testimonial.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { supabase } from './supabaseClient';
import { MessageSquare, Send, CheckCircle } from 'lucide-react';

export function TestimonialForm() {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      setError('Please write your testimonial');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const { error: submitError } = await supabase
      .from('testimonials')
      .insert([{ content: content.trim() }]);

    setIsSubmitting(false);

    if (submitError) {
      setError('Failed to submit testimonial. Please try again.');
      console.error('Error submitting testimonial:', submitError);
    } else {
      setShowSuccess(true);
      setContent('');
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-[#1a1410] to-[#2c1810] border-y-8 border-double border-[#8b0000]">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <MessageSquare className="w-16 h-16 mx-auto mb-6 text-[#8b0000] animate-pulse-slow" />
          <h2 className="fancy-text text-5xl font-bold mb-4 text-[#f4e8d8] tracking-wide">
            Share Your Story
          </h2>
          <p className="text-xl text-[#c4b5a0] italic">
            Tell us about your experience with $DREAM
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#2c1810] p-8 border-4 border-[#8b0000] shadow-2xl hover:shadow-[0_0_40px_rgba(139,0,0,0.4)] transition-all duration-300">
          <div className="mb-6">
            <label htmlFor="testimonial" className="block text-[#f4e8d8] text-lg font-semibold mb-3">
              Your Testimonial
            </label>
            <textarea
              id="testimonial"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts about $DREAM..."
              rows={6}
              className="w-full px-4 py-3 bg-[#1a1410] text-[#f4e8d8] border-2 border-[#8b0000] focus:border-[#a00000] focus:outline-none focus:shadow-[0_0_15px_rgba(139,0,0,0.3)] transition-all duration-300 placeholder-[#8b7355] resize-none"
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-[#8b0000] border-2 border-[#ff0000] text-[#f4e8d8] text-sm">
              {error}
            </div>
          )}

          {showSuccess && (
            <div className="mb-4 p-3 bg-[#1a5c1a] border-2 border-[#2d8b2d] text-[#f4e8d8] flex items-center gap-2 animate-fade-in-up">
              <CheckCircle className="w-5 h-5" />
              <span>Thank you for sharing your story!</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#8b0000] hover:bg-[#a00000] text-[#f4e8d8] px-8 py-4 font-bold text-xl border-4 border-[#1a1410] shadow-2xl hover:shadow-[0_0_30px_rgba(139,0,0,0.6)] transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 group"
          >
            {isSubmitting ? (
              <span>Submitting...</span>
            ) : (
              <>
                <span>Submit Testimonial</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </button>

          <p className="text-center text-sm text-[#8b7355] mt-4 italic">
            Your submission is anonymous
          </p>
        </form>
      </div>
    </section>
  );
}

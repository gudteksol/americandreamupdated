/*
  # Fix Testimonials RLS Security
  
  1. Changes
    - Drop the insecure INSERT policy that allows unrestricted access
    - Create new secure INSERT policy with proper validation
    
  2. Security Improvements
    - Validate that name is provided and between 1-100 characters
    - Validate that story is provided and between 10-2000 characters
    - Ensure status is always set to 'pending' for new submissions (not 'approved')
    - Prevent users from setting approved_at timestamp
    
  3. Notes
    - This prevents spam and abuse while still allowing public submissions
    - All submissions must go through moderation (pending status)
    - Reasonable length limits prevent database abuse
*/

-- Drop the insecure policy
DROP POLICY IF EXISTS "Anyone can submit testimonials" ON testimonials;

-- Create secure INSERT policy with validation
CREATE POLICY "Validated testimonial submissions"
  ON testimonials
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Validate name is provided and reasonable length
    name IS NOT NULL 
    AND length(trim(name)) >= 1 
    AND length(name) <= 100
    -- Validate story is provided and reasonable length
    AND story IS NOT NULL 
    AND length(trim(story)) >= 10 
    AND length(story) <= 2000
    -- Ensure status is pending (users cannot approve their own submissions)
    AND (status = 'pending' OR status IS NULL)
    -- Ensure approved_at is not set by users
    AND approved_at IS NULL
  );

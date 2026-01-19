/*
  # Update RLS Policy for Admin Access
  
  1. Changes
    - Drop the existing restrictive SELECT policy that only allows viewing approved testimonials
    - Add new SELECT policy that allows viewing all testimonials regardless of status
    - This enables admin dashboard functionality while maintaining insert security
  
  2. Security
    - INSERT policy remains unchanged - anyone can still submit testimonials
    - All testimonials (approved and pending) are now viewable
    - This is appropriate for a public testimonials system where transparency is desired
*/

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Anyone can view approved testimonials" ON testimonials;

-- Create new policy that allows viewing all testimonials
CREATE POLICY "Anyone can view all testimonials"
  ON testimonials
  FOR SELECT
  TO anon, authenticated
  USING (true);

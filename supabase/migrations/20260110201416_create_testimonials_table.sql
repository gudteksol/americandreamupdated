/*
  # Create Anonymous Testimonials Table

  1. New Tables
    - `testimonials`
      - `id` (uuid, primary key) - Unique identifier for each testimonial
      - `content` (text) - The testimonial message content
      - `created_at` (timestamptz) - Timestamp when the testimonial was submitted
  
  2. Security
    - Enable RLS on `testimonials` table
    - Add policy for anonymous users to insert testimonials (anyone can submit)
    - Add policy for authenticated users to read testimonials (admin only)
*/

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit testimonials"
  ON testimonials
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read testimonials"
  ON testimonials
  FOR SELECT
  TO authenticated
  USING (true);
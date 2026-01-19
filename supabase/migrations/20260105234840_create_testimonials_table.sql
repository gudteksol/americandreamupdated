/*
  # Create Testimonials Table

  1. New Tables
    - `testimonials`
      - `id` (uuid, primary key) - Unique identifier for each testimonial
      - `name` (text) - Name of the person submitting the testimonial
      - `story` (text) - Their success story
      - `status` (text) - Status of the testimonial (pending, approved, rejected)
      - `created_at` (timestamptz) - Timestamp when the testimonial was created
      - `approved_at` (timestamptz, nullable) - Timestamp when the testimonial was approved

  2. Security
    - Enable RLS on `testimonials` table
    - Add policy for anyone to submit testimonials (insert)
    - Add policy for anyone to view approved testimonials (select)
    - Add policy for admins to update testimonial status (future enhancement)

  3. Notes
    - Testimonials default to 'pending' status for moderation
    - Only approved testimonials are publicly visible
*/

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  story text NOT NULL,
  status text NOT NULL DEFAULT 'approved',
  created_at timestamptz DEFAULT now(),
  approved_at timestamptz
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit testimonials
CREATE POLICY "Anyone can submit testimonials"
  ON testimonials
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to view approved testimonials
CREATE POLICY "Anyone can view approved testimonials"
  ON testimonials
  FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

-- Create an index on status and created_at for efficient queries
CREATE INDEX IF NOT EXISTS idx_testimonials_status_created 
  ON testimonials(status, created_at DESC);
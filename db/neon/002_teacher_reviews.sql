-- Parte 3 — revisões do professor

CREATE TABLE IF NOT EXISTS teacher_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  essay_id uuid NOT NULL REFERENCES essays(id) ON DELETE CASCADE,
  teacher_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  action text NOT NULL CHECK (action IN ('publish', 'return')),
  competencies jsonb NOT NULL DEFAULT '[]'::jsonb,
  total int NOT NULL DEFAULT 0,
  teacher_note text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_teacher_reviews_essay ON teacher_reviews (essay_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_essays_status_updated ON essays (status, updated_at DESC);

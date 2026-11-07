-- Redação Nota Mil 2027 — schema core (Neon, sa-east-1)
-- Auth fica no Supabase; aqui só dados do app.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin', 'guardian');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE essay_status AS ENUM (
    'draft', 'sent', 'ai_pregrading', 'ai_ready',
    'teacher_review', 'official', 'revision_requested', 'failed'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY,
  email text NOT NULL UNIQUE,
  full_name text NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  is_minor boolean NOT NULL DEFAULT false,
  guardian_email text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  year int NOT NULL DEFAULT 2027,
  week_theme text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (class_id, student_id)
);

CREATE TABLE IF NOT EXISTS essays (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  class_id uuid REFERENCES classes(id) ON DELETE SET NULL,
  theme text NOT NULL,
  status essay_status NOT NULL DEFAULT 'draft',
  version int NOT NULL DEFAULT 1,
  lines_max int NOT NULL DEFAULT 30,
  sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS essay_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  essay_id uuid NOT NULL REFERENCES essays(id) ON DELETE CASCADE,
  version int NOT NULL,
  body text NOT NULL DEFAULT '',
  lines_used int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (essay_id, version)
);

CREATE TABLE IF NOT EXISTS pre_corrections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  essay_id uuid NOT NULL REFERENCES essays(id) ON DELETE CASCADE,
  essay_version_id uuid REFERENCES essay_versions(id) ON DELETE SET NULL,
  model text NOT NULL,
  estimated_total int NOT NULL,
  max_total int NOT NULL DEFAULT 1000,
  competencies jsonb NOT NULL DEFAULT '[]'::jsonb,
  attention jsonb,
  raw_response jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS repertoire_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL,
  competency text NOT NULL,
  title text NOT NULL,
  subtitle text NOT NULL DEFAULT '',
  body text NOT NULL,
  how_to_use text NOT NULL DEFAULT '',
  source text NOT NULL DEFAULT '',
  theme_tags text[] NOT NULL DEFAULT '{}',
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS student_repertoire_saves (
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  repertoire_id uuid NOT NULL REFERENCES repertoire_items(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (student_id, repertoire_id)
);

CREATE TABLE IF NOT EXISTS feed_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  week_key text NOT NULL,
  done int NOT NULL DEFAULT 0,
  target int NOT NULL DEFAULT 5,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (student_id, week_key)
);

CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  class_id uuid NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  present int NOT NULL DEFAULT 0,
  total int NOT NULL DEFAULT 0,
  label text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (student_id, class_id)
);

CREATE TABLE IF NOT EXISTS drive_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  drive_file_id text NOT NULL UNIQUE,
  name text NOT NULL,
  mime_type text,
  class_id uuid REFERENCES classes(id) ON DELETE SET NULL,
  folder_path text,
  web_view_link text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_essays_student_updated ON essays (student_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_essays_status ON essays (status);
CREATE INDEX IF NOT EXISTS idx_essay_versions_essay ON essay_versions (essay_id, version DESC);
CREATE INDEX IF NOT EXISTS idx_pre_corrections_essay ON pre_corrections (essay_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON enrollments (student_id);
CREATE INDEX IF NOT EXISTS idx_drive_assets_class ON drive_assets (class_id);

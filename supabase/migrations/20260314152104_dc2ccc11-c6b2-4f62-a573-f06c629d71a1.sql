
-- Create profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  age integer,
  gender text,
  profile_photo_url text,
  language text,
  height_cm float,
  weight_kg float,
  blood_group text,
  bmi float,
  occupation text,
  hostel_mode boolean DEFAULT false,
  activity_level text,
  sleep_time text,
  wake_time text,
  diet_type text,
  cuisine_preference text,
  allergies text,
  meal_budget text,
  health_conditions text[] DEFAULT '{}',
  health_goals text[] DEFAULT '{}',
  smoking boolean DEFAULT false,
  drinking boolean DEFAULT false,
  gym_member boolean DEFAULT false,
  fitness_goal text,
  period_date date,
  pcos boolean DEFAULT false,
  pregnant boolean DEFAULT false,
  onboarding_complete boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Create medications table
CREATE TABLE public.medications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  dose text,
  frequency text,
  reminder_time text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own medications" ON public.medications
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Create reminders table
CREATE TABLE public.reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL,
  time text,
  enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own reminders" ON public.reminders
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Create storage bucket for profile photos
INSERT INTO storage.buckets (id, name, public) VALUES ('profile-photos', 'profile-photos', true);

CREATE POLICY "Users can upload own photo" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'profile-photos' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Anyone can view photos" ON storage.objects
  FOR SELECT TO public USING (bucket_id = 'profile-photos');

CREATE POLICY "Users can update own photo" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'profile-photos' AND (storage.foldername(name))[1] = auth.uid()::text);

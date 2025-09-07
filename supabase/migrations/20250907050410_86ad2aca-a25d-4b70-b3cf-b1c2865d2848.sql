-- Create user roles enum
CREATE TYPE user_role AS ENUM ('student', 'teacher');

-- Update profiles table to include role
ALTER TABLE public.profiles 
ADD COLUMN role user_role DEFAULT 'student',
ADD COLUMN class_code TEXT,
ADD COLUMN subjects_teaching TEXT[],
ADD COLUMN institution TEXT;

-- Create classes table for teachers to manage
CREATE TABLE public.classes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on classes
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;

-- Create policies for classes
CREATE POLICY "Teachers can manage their own classes" 
ON public.classes 
FOR ALL 
USING (auth.uid() = teacher_id);

CREATE POLICY "Students can view classes they're enrolled in" 
ON public.classes 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND class_code = classes.code
  )
);

-- Update user_progress table to include class_id
ALTER TABLE public.user_progress 
ADD COLUMN class_id UUID REFERENCES public.classes(id) ON DELETE SET NULL;

-- Create trigger for classes updated_at
CREATE TRIGGER update_classes_updated_at
BEFORE UPDATE ON public.classes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
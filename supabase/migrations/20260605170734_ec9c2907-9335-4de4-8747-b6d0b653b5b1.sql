CREATE TABLE public.connection_test (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message text,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.connection_test TO authenticated;
GRANT ALL ON public.connection_test TO service_role;

ALTER TABLE public.connection_test ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own connection_test rows"
  ON public.connection_test
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_connection_test_updated_at
  BEFORE UPDATE ON public.connection_test
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
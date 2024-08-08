-- Create budgets table
CREATE TABLE public.budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  -- Constraints
  CONSTRAINT fk_owner FOREIGN KEY (owner_id) REFERENCES auth.users(id) ON DELETE CASCADE ON UPDATE CASCADE 
);
COMMENT ON TABLE public.budgets IS 'Stores individual budget records';

-- Create transaction_categories table
CREATE TABLE public.transaction_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description_en TEXT NOT NULL,
  label_en TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);
COMMENT ON TABLE public.transaction_categories IS 'System defined categories that can be applied to individual transactions';
COMMENT ON COLUMN public.transaction_categories.name IS 'The name used to identify the category at the system level';
COMMENT ON COLUMN public.transaction_categories.description_en IS 'The English description of the category';
COMMENT ON COLUMN public.transaction_categories.label_en IS 'The English label of the category';

-- Insert records into transaction_categories table
INSERT INTO public.transaction_categories (name, description_en, label_en)
VALUES
('groceries', 'Groceries and other household items', 'Groceries'),
('mortgage', 'Mortgage payment', 'Mortgage'),
('pets', 'Pet related expenses', 'Pets'),
('phone', 'Phone payment', 'Phone');

-- Create monthly_budgets table
CREATE TABLE public.monthly_budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  budget_id UUID NOT NULL,
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  year INTEGER NOT NULL CHECK (year >= 2000 AND year <= 2100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  -- Constraints
  CONSTRAINT fk_budget FOREIGN KEY (budget_id) REFERENCES public.budgets(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT unique_budget_month_year UNIQUE (budget_id, month, year)
);

-- Create monthly_budgets_categories table
CREATE TABLE public.monthly_budget_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amount_cents INTEGER NOT NULL,
  monthly_budget_id UUID NOT NULL,
  transaction_category_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  -- Constraints
  CONSTRAINT fk_monthly_budget FOREIGN KEY (monthly_budget_id) REFERENCES public.monthly_budgets(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_transaction_category FOREIGN KEY (transaction_category_id) REFERENCES public.transaction_categories(id),
  CONSTRAINT unique_monthly_budget_transaction_category UNIQUE (monthly_budget_id, transaction_category_id)
);

-- Create monthly_budget_transactions table
CREATE TABLE public.monthly_budget_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amount_cents INTEGER NOT NULL,
  paid_by_id UUID NOT NULL,
  logged_by_id UUID NOT NULL,
  paid_at TIMESTAMP WITH TIME ZONE,
  note TEXT,
  monthly_budget_category_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  -- Constraints
  CONSTRAINT fk_paid_by FOREIGN KEY (paid_by_id) REFERENCES auth.users(id),
  CONSTRAINT fk_logged_by FOREIGN KEY (logged_by_id) REFERENCES auth.users(id),
  CONSTRAINT fk_monthly_budget_category FOREIGN KEY (monthly_budget_category_id) REFERENCES public.monthly_budget_categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Create shared_budgets table
CREATE TABLE public.shared_budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  budget_id UUID NOT NULL,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  -- Constraints
  CONSTRAINT fk_budget FOREIGN KEY (budget_id) REFERENCES public.budgets(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

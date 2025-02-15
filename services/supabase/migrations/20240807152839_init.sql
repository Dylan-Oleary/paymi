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

-- Create budget_default_categories table
CREATE TABLE public.budget_default_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  budget_id UUID NOT NULL,
  transaction_category_id UUID NOT NULL,
  amount_cents INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  -- Constraints
  CONSTRAINT fk_budget FOREIGN KEY (budget_id) REFERENCES public.budgets(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_transaction_category FOREIGN KEY (transaction_category_id) REFERENCES public.transaction_categories(id),
  CONSTRAINT unique_budget_transaction_category UNIQUE (budget_id, transaction_category_id)
);

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
  paid_to TEXT NOT NULL,
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

-- Create create_budget_with_default_categories function
CREATE TYPE public.budget_default_category_arg AS (
  amount_cents INTEGER,
  transaction_category_id UUID
);
CREATE OR REPLACE FUNCTION create_budget_with_default_categories(
  budget_name TEXT,
  budget_description TEXT,
  budget_owner_id UUID,
  default_categories public.budget_default_category_arg[]
)
RETURNS UUID AS $$
DECLARE
  new_budget_record_id UUID;
  category public.budget_default_category_arg;
BEGIN
  -- Insert into budgets table and set the new_budget_record_id
  INSERT INTO public.budgets(name, description, owner_id)
  VALUES (budget_name, budget_description, budget_owner_id)
  RETURNING id INTO new_budget_record_id;
  -- Insert into each category default into budget_default_categories table
  FOREACH category in ARRAY default_categories
  LOOP
    INSERT INTO public.budget_default_categories(budget_id, transaction_category_id, amount_cents)
    VALUES (new_budget_record_id, category.transaction_category_id, category.amount_cents);
  END LOOP;
  -- Return the new budget record id
  RETURN new_budget_record_id;
END;
$$ LANGUAGE plpgsql;

-- Create create_monthly_budget_with_default_categories function
CREATE TYPE public.budget_default_category_record AS (
  id UUID,
  amount_cents INTEGER,
  transaction_category_id UUID
);
CREATE OR REPLACE FUNCTION create_monthly_budget_with_default_categories(
  budget_record_id UUID,
  month INTEGER,
  year INTEGER
)
RETURNS UUID AS $$
DECLARE
  new_monthly_budget_record_id UUID;
  budget_default_category_record RECORD;
BEGIN
  -- Insert new monthly budget record into monthly_budgets table
  INSERT INTO public.monthly_budgets(budget_id, month, year)
  VALUES (budget_record_id, month, year)
  RETURNING id INTO new_monthly_budget_record_id;
  -- Iterate over the budget's default categories and insert into monthly_budget_categories
  FOR budget_default_category_record IN
    SELECT id, amount_cents, transaction_category_id
    FROM public.budget_default_categories as bdc
    WHERE bdc.budget_id = budget_record_id
  LOOP
    INSERT INTO public.monthly_budget_categories (
      monthly_budget_id,
      transaction_category_id,
      amount_cents
    )
    VALUES (
      new_monthly_budget_record_id,
      budget_default_category_record.transaction_category_id,
      budget_default_category_record.amount_cents
    );
  END LOOP;
  -- Return the new monthly budget record id
  RETURN new_monthly_budget_record_id;
END;
$$ LANGUAGE plpgsql;
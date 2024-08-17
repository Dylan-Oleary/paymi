export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      budget_default_categories: {
        Row: {
          amount_cents: number;
          budget_id: string;
          created_at: string | null;
          id: string;
          transaction_category_id: string;
          updated_at: string | null;
        };
        Insert: {
          amount_cents: number;
          budget_id: string;
          created_at?: string | null;
          id?: string;
          transaction_category_id: string;
          updated_at?: string | null;
        };
        Update: {
          amount_cents?: number;
          budget_id?: string;
          created_at?: string | null;
          id?: string;
          transaction_category_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_budget';
            columns: ['budget_id'];
            isOneToOne: false;
            referencedRelation: 'budgets';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_transaction_category';
            columns: ['transaction_category_id'];
            isOneToOne: false;
            referencedRelation: 'transaction_categories';
            referencedColumns: ['id'];
          },
        ];
      };
      budgets: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          name: string;
          owner_id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          owner_id: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          owner_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_owner';
            columns: ['owner_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      monthly_budget_categories: {
        Row: {
          amount_cents: number;
          created_at: string | null;
          id: string;
          monthly_budget_id: string;
          transaction_category_id: string;
          updated_at: string | null;
        };
        Insert: {
          amount_cents: number;
          created_at?: string | null;
          id?: string;
          monthly_budget_id: string;
          transaction_category_id: string;
          updated_at?: string | null;
        };
        Update: {
          amount_cents?: number;
          created_at?: string | null;
          id?: string;
          monthly_budget_id?: string;
          transaction_category_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_monthly_budget';
            columns: ['monthly_budget_id'];
            isOneToOne: false;
            referencedRelation: 'monthly_budgets';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_transaction_category';
            columns: ['transaction_category_id'];
            isOneToOne: false;
            referencedRelation: 'transaction_categories';
            referencedColumns: ['id'];
          },
        ];
      };
      monthly_budget_transactions: {
        Row: {
          amount_cents: number;
          created_at: string | null;
          id: string;
          logged_by_id: string;
          monthly_budget_category_id: string;
          note: string | null;
          paid_at: string | null;
          paid_by_id: string;
          paid_to: string;
          updated_at: string | null;
        };
        Insert: {
          amount_cents: number;
          created_at?: string | null;
          id?: string;
          logged_by_id: string;
          monthly_budget_category_id: string;
          note?: string | null;
          paid_at?: string | null;
          paid_by_id: string;
          paid_to: string;
          updated_at?: string | null;
        };
        Update: {
          amount_cents?: number;
          created_at?: string | null;
          id?: string;
          logged_by_id?: string;
          monthly_budget_category_id?: string;
          note?: string | null;
          paid_at?: string | null;
          paid_by_id?: string;
          paid_to?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_logged_by';
            columns: ['logged_by_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_monthly_budget_category';
            columns: ['monthly_budget_category_id'];
            isOneToOne: false;
            referencedRelation: 'monthly_budget_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_paid_by';
            columns: ['paid_by_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      monthly_budgets: {
        Row: {
          budget_id: string;
          created_at: string | null;
          id: string;
          month: number;
          updated_at: string | null;
          year: number;
        };
        Insert: {
          budget_id: string;
          created_at?: string | null;
          id?: string;
          month: number;
          updated_at?: string | null;
          year: number;
        };
        Update: {
          budget_id?: string;
          created_at?: string | null;
          id?: string;
          month?: number;
          updated_at?: string | null;
          year?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_budget';
            columns: ['budget_id'];
            isOneToOne: false;
            referencedRelation: 'budgets';
            referencedColumns: ['id'];
          },
        ];
      };
      shared_budgets: {
        Row: {
          budget_id: string;
          created_at: string | null;
          id: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          budget_id: string;
          created_at?: string | null;
          id?: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          budget_id?: string;
          created_at?: string | null;
          id?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_budget';
            columns: ['budget_id'];
            isOneToOne: false;
            referencedRelation: 'budgets';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fk_user';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      transaction_categories: {
        Row: {
          created_at: string | null;
          description_en: string;
          id: string;
          label_en: string;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description_en: string;
          id?: string;
          label_en: string;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description_en?: string;
          id?: string;
          label_en?: string;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      create_budget_with_default_categories: {
        Args: {
          budget_name: string;
          budget_description: string;
          budget_owner_id: string;
          default_categories: Database['public']['CompositeTypes']['budget_default_category_arg'][];
        };
        Returns: string;
      };
      create_monthly_budget_with_default_categories: {
        Args: {
          budget_record_id: string;
          month: number;
          year: number;
        };
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      budget_default_category_arg: {
        amount_cents: number | null;
        transaction_category_id: string | null;
      };
      budget_default_category_record: {
        id: string | null;
        amount_cents: number | null;
        transaction_category_id: string | null;
      };
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

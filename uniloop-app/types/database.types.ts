export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      schools: {
        Row: {
          id:         string;
          name:       string;
          city:       string;
          is_active:  boolean;
          created_at: string;
        };
        Insert: {
          id?:        string;
          name:       string;
          city?:      string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          name?:      string;
          city?:      string;
          is_active?: boolean;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id:         string;
          first_name: string;
          last_name:  string;
          phone:      string | null;
          address:    string | null;
          school_id:  string | null;
          role:       "buyer" | "seller" | "admin";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id:          string;
          first_name:  string;
          last_name:   string;
          phone?:      string | null;
          address?:    string | null;
          school_id?:  string | null;
          role?:       "buyer" | "seller" | "admin";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          first_name?: string;
          last_name?:  string;
          phone?:      string | null;
          address?:    string | null;
          school_id?:  string | null;
          role?:       "buyer" | "seller" | "admin";
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views:          { [_ in never]?: { Row: Record<string, unknown> } };
    Functions:      { [_ in never]?: { Args: Record<string, unknown>; Returns: unknown } };
    Enums:          { [_ in never]?: string };
    CompositeTypes: { [_ in never]?: Record<string, unknown> };
  };
}

// Convenience row types used throughout the app
export type School  = Database["public"]["Tables"]["schools"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

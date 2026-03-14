export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      medications: {
        Row: {
          created_at: string | null
          dose: string | null
          frequency: string | null
          id: string
          name: string
          reminder_time: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          dose?: string | null
          frequency?: string | null
          id?: string
          name: string
          reminder_time?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          dose?: string | null
          frequency?: string | null
          id?: string
          name?: string
          reminder_time?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "medications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          activity_level: string | null
          age: number | null
          allergies: string | null
          blood_group: string | null
          bmi: number | null
          created_at: string | null
          cuisine_preference: string | null
          diet_type: string | null
          drinking: boolean | null
          fitness_goal: string | null
          full_name: string | null
          gender: string | null
          gym_member: boolean | null
          health_conditions: string[] | null
          health_goals: string[] | null
          height_cm: number | null
          hostel_mode: boolean | null
          id: string
          language: string | null
          meal_budget: string | null
          occupation: string | null
          onboarding_complete: boolean | null
          pcos: boolean | null
          period_date: string | null
          pregnant: boolean | null
          profile_photo_url: string | null
          sleep_time: string | null
          smoking: boolean | null
          wake_time: string | null
          weight_kg: number | null
        }
        Insert: {
          activity_level?: string | null
          age?: number | null
          allergies?: string | null
          blood_group?: string | null
          bmi?: number | null
          created_at?: string | null
          cuisine_preference?: string | null
          diet_type?: string | null
          drinking?: boolean | null
          fitness_goal?: string | null
          full_name?: string | null
          gender?: string | null
          gym_member?: boolean | null
          health_conditions?: string[] | null
          health_goals?: string[] | null
          height_cm?: number | null
          hostel_mode?: boolean | null
          id: string
          language?: string | null
          meal_budget?: string | null
          occupation?: string | null
          onboarding_complete?: boolean | null
          pcos?: boolean | null
          period_date?: string | null
          pregnant?: boolean | null
          profile_photo_url?: string | null
          sleep_time?: string | null
          smoking?: boolean | null
          wake_time?: string | null
          weight_kg?: number | null
        }
        Update: {
          activity_level?: string | null
          age?: number | null
          allergies?: string | null
          blood_group?: string | null
          bmi?: number | null
          created_at?: string | null
          cuisine_preference?: string | null
          diet_type?: string | null
          drinking?: boolean | null
          fitness_goal?: string | null
          full_name?: string | null
          gender?: string | null
          gym_member?: boolean | null
          health_conditions?: string[] | null
          health_goals?: string[] | null
          height_cm?: number | null
          hostel_mode?: boolean | null
          id?: string
          language?: string | null
          meal_budget?: string | null
          occupation?: string | null
          onboarding_complete?: boolean | null
          pcos?: boolean | null
          period_date?: string | null
          pregnant?: boolean | null
          profile_photo_url?: string | null
          sleep_time?: string | null
          smoking?: boolean | null
          wake_time?: string | null
          weight_kg?: number | null
        }
        Relationships: []
      }
      reminders: {
        Row: {
          created_at: string | null
          enabled: boolean | null
          id: string
          time: string | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          time?: string | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          time?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reminders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

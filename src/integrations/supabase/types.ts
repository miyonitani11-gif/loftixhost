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
      blog_posts: {
        Row: {
          author_email: string
          content: string
          created_at: string
          excerpt: string
          id: string
          published: boolean
          slug: string
          tag: string
          title: string
          updated_at: string
        }
        Insert: {
          author_email: string
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          published?: boolean
          slug: string
          tag?: string
          title: string
          updated_at?: string
        }
        Update: {
          author_email?: string
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          published?: boolean
          slug?: string
          tag?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      footer_links: {
        Row: {
          enabled: boolean
          href: string
          id: string
          is_external: boolean
          label: string
          section: string
          sort_order: number
        }
        Insert: {
          enabled?: boolean
          href: string
          id?: string
          is_external?: boolean
          label: string
          section?: string
          sort_order?: number
        }
        Update: {
          enabled?: boolean
          href?: string
          id?: string
          is_external?: boolean
          label?: string
          section?: string
          sort_order?: number
        }
        Relationships: []
      }
      homepage_sections: {
        Row: {
          enabled: boolean
          id: string
          section_key: string
          sort_order: number
          title: string
        }
        Insert: {
          enabled?: boolean
          id?: string
          section_key: string
          sort_order?: number
          title: string
        }
        Update: {
          enabled?: boolean
          id?: string
          section_key?: string
          sort_order?: number
          title?: string
        }
        Relationships: []
      }
      hosting_plans: {
        Row: {
          backups: string
          category: string
          cpu: string
          created_at: string
          enabled: boolean
          features: string[]
          id: string
          name: string
          original_price: number | null
          popular: boolean
          price: number
          purchase_url: string
          ram: string
          sort_order: number
          storage: string
          updated_at: string
        }
        Insert: {
          backups?: string
          category?: string
          cpu?: string
          created_at?: string
          enabled?: boolean
          features?: string[]
          id?: string
          name: string
          original_price?: number | null
          popular?: boolean
          price: number
          purchase_url?: string
          ram?: string
          sort_order?: number
          storage?: string
          updated_at?: string
        }
        Update: {
          backups?: string
          category?: string
          cpu?: string
          created_at?: string
          enabled?: boolean
          features?: string[]
          id?: string
          name?: string
          original_price?: number | null
          popular?: boolean
          price?: number
          purchase_url?: string
          ram?: string
          sort_order?: number
          storage?: string
          updated_at?: string
        }
        Relationships: []
      }
      login_activity: {
        Row: {
          id: string
          ip_address: string | null
          logged_in_at: string
          user_agent: string | null
          user_email: string
          user_id: string
        }
        Insert: {
          id?: string
          ip_address?: string | null
          logged_in_at?: string
          user_agent?: string | null
          user_email: string
          user_id: string
        }
        Update: {
          id?: string
          ip_address?: string | null
          logged_in_at?: string
          user_agent?: string | null
          user_email?: string
          user_id?: string
        }
        Relationships: []
      }
      nav_items: {
        Row: {
          created_at: string
          enabled: boolean
          href: string
          id: string
          is_external: boolean
          label: string
          parent_id: string | null
          sort_order: number
        }
        Insert: {
          created_at?: string
          enabled?: boolean
          href: string
          id?: string
          is_external?: boolean
          label: string
          parent_id?: string | null
          sort_order?: number
        }
        Update: {
          created_at?: string
          enabled?: boolean
          href?: string
          id?: string
          is_external?: boolean
          label?: string
          parent_id?: string | null
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "nav_items_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "nav_items"
            referencedColumns: ["id"]
          },
        ]
      }
      network_status: {
        Row: {
          id: string
          service_name: string
          status: string
          updated_at: string
          uptime: string
        }
        Insert: {
          id?: string
          service_name: string
          status?: string
          updated_at?: string
          uptime?: string
        }
        Update: {
          id?: string
          service_name?: string
          status?: string
          updated_at?: string
          uptime?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          announcement_bar_enabled: boolean
          announcement_bar_text: string
          copyright_text: string
          discord_link: string
          footer_tagline: string
          id: string
          logo_url: string
          meta_description: string
          meta_title: string
          site_description: string
          site_name: string
          updated_at: string
        }
        Insert: {
          announcement_bar_enabled?: boolean
          announcement_bar_text?: string
          copyright_text?: string
          discord_link?: string
          footer_tagline?: string
          id?: string
          logo_url?: string
          meta_description?: string
          meta_title?: string
          site_description?: string
          site_name?: string
          updated_at?: string
        }
        Update: {
          announcement_bar_enabled?: boolean
          announcement_bar_text?: string
          copyright_text?: string
          discord_link?: string
          footer_tagline?: string
          id?: string
          logo_url?: string
          meta_description?: string
          meta_title?: string
          site_description?: string
          site_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      ticket_replies: {
        Row: {
          created_at: string
          id: string
          is_admin: boolean
          message: string
          ticket_id: string
          user_email: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_admin?: boolean
          message: string
          ticket_id: string
          user_email: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_admin?: boolean
          message?: string
          ticket_id?: string
          user_email?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_replies_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          category: string
          created_at: string
          id: string
          priority: string
          status: string
          subject: string
          updated_at: string
          user_email: string
          user_id: string
        }
        Insert: {
          category?: string
          created_at?: string
          id?: string
          priority?: string
          status?: string
          subject: string
          updated_at?: string
          user_email: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          priority?: string
          status?: string
          subject?: string
          updated_at?: string
          user_email?: string
          user_id?: string
        }
        Relationships: []
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

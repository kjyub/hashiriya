export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.4';
  };
  public: {
    Tables: {
      game_schedule_chats: {
        Row: {
          created_at: string;
          game_schedule_id: number;
          id: number;
          message: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          game_schedule_id: number;
          id?: number;
          message: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          game_schedule_id?: number;
          id?: number;
          message?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'game_schedule_chats_game_schedule_id_fkey';
            columns: ['game_schedule_id'];
            isOneToOne: false;
            referencedRelation: 'game_schedules';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'game_schedule_chats_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      game_schedule_members: {
        Row: {
          game_schedule_id: number;
          id: number;
          is_master: boolean | null;
          user_id: string;
        };
        Insert: {
          game_schedule_id: number;
          id?: number;
          is_master?: boolean | null;
          user_id: string;
        };
        Update: {
          game_schedule_id?: number;
          id?: number;
          is_master?: boolean | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'game_schedule_members_game_schedule_id_fkey';
            columns: ['game_schedule_id'];
            isOneToOne: false;
            referencedRelation: 'game_schedules';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'game_schedule_members_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      game_schedule_tracks: {
        Row: {
          game_schedule_id: number;
          id: number;
          index: number;
          track_id: number;
        };
        Insert: {
          game_schedule_id: number;
          id?: number;
          index: number;
          track_id: number;
        };
        Update: {
          game_schedule_id?: number;
          id?: number;
          index?: number;
          track_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'game_schedule_tracks_game_schedule_id_fkey';
            columns: ['game_schedule_id'];
            isOneToOne: false;
            referencedRelation: 'game_schedules';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'game_schedule_tracks_track_id_fkey';
            columns: ['track_id'];
            isOneToOne: false;
            referencedRelation: 'tracks';
            referencedColumns: ['id'];
          },
        ];
      };
      game_schedules: {
        Row: {
          content: string | null;
          created_at: string;
          datetime_end: string | null;
          datetime_start: string | null;
          discord_link: string | null;
          game_id: number;
          id: number;
          is_pre_revealed: boolean | null;
          join_guide: string | null;
          master_user_id: string;
          nano_id: string;
          password: string | null;
          schedule_mode: number;
          title: string;
          updated_at: string;
          weekly_days: number | null;
          weekly_time_end: string | null;
          weekly_time_start: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          datetime_end?: string | null;
          datetime_start?: string | null;
          discord_link?: string | null;
          game_id: number;
          id?: number;
          is_pre_revealed?: boolean | null;
          join_guide?: string | null;
          master_user_id: string;
          nano_id: string;
          password?: string | null;
          schedule_mode: number;
          title: string;
          updated_at?: string;
          weekly_days?: number | null;
          weekly_time_end?: string | null;
          weekly_time_start?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          datetime_end?: string | null;
          datetime_start?: string | null;
          discord_link?: string | null;
          game_id?: number;
          id?: number;
          is_pre_revealed?: boolean | null;
          join_guide?: string | null;
          master_user_id?: string;
          nano_id?: string;
          password?: string | null;
          schedule_mode?: number;
          title?: string;
          updated_at?: string;
          weekly_days?: number | null;
          weekly_time_end?: string | null;
          weekly_time_start?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'game_schedules_game_id_fkey';
            columns: ['game_id'];
            isOneToOne: false;
            referencedRelation: 'games';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'game_schedules_master_user_id_fkey';
            columns: ['master_user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      games: {
        Row: {
          code: string;
          created_at: string;
          id: number;
          image_url: string | null;
          name: string;
          tags: string[] | null;
          updated_at: string;
        };
        Insert: {
          code: string;
          created_at?: string;
          id?: number;
          image_url?: string | null;
          name: string;
          tags?: string[] | null;
          updated_at?: string;
        };
        Update: {
          code?: string;
          created_at?: string;
          id?: number;
          image_url?: string | null;
          name?: string;
          tags?: string[] | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      record_images: {
        Row: {
          created_at: string;
          id: number;
          image_url: string;
          record_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          image_url: string;
          record_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          image_url?: string;
          record_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'record_images_record_id_fkey';
            columns: ['record_id'];
            isOneToOne: false;
            referencedRelation: 'records';
            referencedColumns: ['id'];
          },
        ];
      };
      records: {
        Row: {
          content: string | null;
          created_at: string;
          game_id: number;
          id: number;
          is_certified: boolean | null;
          title: string;
          track_id: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          game_id: number;
          id?: number;
          is_certified?: boolean | null;
          title: string;
          track_id: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          game_id?: number;
          id?: number;
          is_certified?: boolean | null;
          title?: string;
          track_id?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'records_game_id_fkey';
            columns: ['game_id'];
            isOneToOne: false;
            referencedRelation: 'games';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'records_track_id_fkey';
            columns: ['track_id'];
            isOneToOne: false;
            referencedRelation: 'tracks';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'records_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      tracks: {
        Row: {
          code: string;
          country: string | null;
          created_at: string;
          id: number;
          name: string;
          parent_id: number | null;
          updated_at: string;
        };
        Insert: {
          code: string;
          country?: string | null;
          created_at?: string;
          id?: number;
          name: string;
          parent_id?: number | null;
          updated_at?: string;
        };
        Update: {
          code?: string;
          country?: string | null;
          created_at?: string;
          id?: number;
          name?: string;
          parent_id?: number | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'tracks_parent_id_fkey';
            columns: ['parent_id'];
            isOneToOne: false;
            referencedRelation: 'tracks';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          created_at: string;
          discord_access_token: string | null;
          discord_id: string | null;
          id: string;
          name_tag: string;
          nickname: string;
          oauth_id: string | null;
          oauth_provider: string | null;
          tier: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          discord_access_token?: string | null;
          discord_id?: string | null;
          id?: string;
          name_tag: string;
          nickname: string;
          oauth_id?: string | null;
          oauth_provider?: string | null;
          tier?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          discord_access_token?: string | null;
          discord_id?: string | null;
          id?: string;
          name_tag?: string;
          nickname?: string;
          oauth_id?: string | null;
          oauth_provider?: string | null;
          tier?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;

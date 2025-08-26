import type { SupabaseClient } from '@supabase/supabase-js';
import type { Tables, TablesInsert, TablesUpdate } from '../types/supabase';

export type GameScheduleMemberWithDetails = Tables<'game_schedule_members'> & {
  user: Tables<'users'>;
};

export const createGameScheduleMembersApi = (supabase: SupabaseClient) => {
  const TABLE_NAME = 'game_schedule_members';

  return {
    async listMembersForSchedule(game_schedule_id: number): Promise<GameScheduleMemberWithDetails[]> {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select(
          `
          *,
          user:users(*)
        `,
        )
        .eq('game_schedule_id', game_schedule_id);

      if (error) throw error;
      return data as GameScheduleMemberWithDetails[];
    },

    async createMember(memberData: TablesInsert<'game_schedule_members'>): Promise<Tables<'game_schedule_members'>> {
      const { data, error } = await supabase.from(TABLE_NAME).insert(memberData).select().single();
      if (error) throw error;
      return data as Tables<'game_schedule_members'>;
    },

    async updateMember(
      id: number,
      memberData: TablesUpdate<'game_schedule_members'>,
    ): Promise<Tables<'game_schedule_members'>> {
      const { data, error } = await supabase.from(TABLE_NAME).update(memberData).eq('id', id).select().single();
      if (error) throw error;
      return data as Tables<'game_schedule_members'>;
    },

    async deleteMember(id: number): Promise<Tables<'game_schedule_members'>> {
      const { data, error } = await supabase.from(TABLE_NAME).delete().eq('id', id).select().single();
      if (error) throw error;
      return data as Tables<'game_schedule_members'>;
    },
  };
};

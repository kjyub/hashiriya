import type { SupabaseClient } from '@supabase/supabase-js';
import type { Tables, TablesInsert, TablesUpdate } from '../types/supabase';

export type GameScheduleWithDetails = Tables<'game_schedules'> & {
  master_user: Tables<'users'>;
  game: Tables<'games'>;
};

export const createSchedulesApi = (supabase: SupabaseClient) => {
  const SCHEDULE_TABLE = 'game_schedules';
  const TRACK_TABLE = 'game_schedule_tracks';
  const MEMBER_TABLE = 'game_schedule_members';
  const CHAT_TABLE = 'game_schedule_chats';

  return {
    // GameSchedule
    async getScheduleById(id: number): Promise<GameScheduleWithDetails> {
      const { data, error } = await supabase
        .from(SCHEDULE_TABLE)
        .select(
          `
          *,
          master_user:users(id, nickname, name_tag, tier),
          game:games(*)
        `,
        )
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as GameScheduleWithDetails;
    },

    async listSchedules(): Promise<GameScheduleWithDetails[]> {
      const { data, error } = await supabase
        .from(SCHEDULE_TABLE)
        .select(
          `
          *,
          master_user:users(id, nickname, name_tag, tier),
          game:games(*)
        `,
        )
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as GameScheduleWithDetails[];
    },

    async createSchedule(scheduleData: TablesInsert<'game_schedules'>): Promise<Tables<'game_schedules'>> {
      const { data, error } = await supabase.from(SCHEDULE_TABLE).insert(scheduleData).select().single();
      if (error) throw error;
      return data as Tables<'game_schedules'>;
    },

    async updateSchedule(id: number, scheduleData: TablesUpdate<'game_schedules'>): Promise<Tables<'game_schedules'>> {
      const { data, error } = await supabase.from(SCHEDULE_TABLE).update(scheduleData).eq('id', id).select().single();
      if (error) throw error;
      return data as Tables<'game_schedules'>;
    },

    async deleteSchedule(id: number): Promise<Tables<'game_schedules'>> {
      const { data, error } = await supabase.from(SCHEDULE_TABLE).delete().eq('id', id).select().single();
      if (error) throw error;
      return data as Tables<'game_schedules'>;
    },

    // GameScheduleTrack
    async listTracksForSchedule(scheduleId: number): Promise<Tables<'game_schedule_tracks'>[]> {
      const { data, error } = await supabase.from(TRACK_TABLE).select('*').eq('game_schedule_id', scheduleId);
      if (error) throw error;
      return data as Tables<'game_schedule_tracks'>[];
    },

    // GameScheduleMember
    async listMembersForSchedule(scheduleId: number): Promise<Tables<'game_schedule_members'>[]> {
      const { data, error } = await supabase.from(MEMBER_TABLE).select('*').eq('game_schedule_id', scheduleId);
      if (error) throw error;
      return data as Tables<'game_schedule_members'>[];
    },

    // GameScheduleChat
    async listMessagesForSchedule(scheduleId: number): Promise<Tables<'game_schedule_chats'>[]> {
      const { data, error } = await supabase.from(CHAT_TABLE).select('*').eq('game_schedule_id', scheduleId);
      if (error) throw error;
      return data as Tables<'game_schedule_chats'>[];
    },

    async postMessage(chatData: TablesInsert<'game_schedule_chats'>): Promise<Tables<'game_schedule_chats'>> {
      const { data, error } = await supabase.from(CHAT_TABLE).insert(chatData).select().single();
      if (error) throw error;
      return data as Tables<'game_schedule_chats'>;
    },
  };
};

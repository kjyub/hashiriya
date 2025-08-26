import type { SupabaseClient } from '@supabase/supabase-js';
import type { Tables, TablesInsert, TablesUpdate } from '../types/supabase';

export type GameScheduleChatWithDetails = Tables<'game_schedule_chats'> & {
  user: Tables<'users'>;
};

export const createGameScheduleChatsApi = (supabase: SupabaseClient) => {
  const TABLE_NAME = 'game_schedule_chats';

  return {
    async listMessagesForSchedule(game_schedule_id: number): Promise<GameScheduleChatWithDetails[]> {
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
      return data as GameScheduleChatWithDetails[];
    },

    async postMessage(chatData: TablesInsert<'game_schedule_chats'>): Promise<Tables<'game_schedule_chats'>> {
      const { data, error } = await supabase.from(TABLE_NAME).insert(chatData).select().single();
      if (error) throw error;
      return data as Tables<'game_schedule_chats'>;
    },

    async updateMessage(
      id: number,
      chatData: TablesUpdate<'game_schedule_chats'>,
    ): Promise<Tables<'game_schedule_chats'>> {
      const { data, error } = await supabase.from(TABLE_NAME).update(chatData).eq('id', id).select().single();
      if (error) throw error;
      return data as Tables<'game_schedule_chats'>;
    },

    async deleteMessage(id: number): Promise<Tables<'game_schedule_chats'>> {
      const { data, error } = await supabase.from(TABLE_NAME).delete().eq('id', id).select().single();
      if (error) throw error;
      return data as Tables<'game_schedule_chats'>;
    },
  };
};

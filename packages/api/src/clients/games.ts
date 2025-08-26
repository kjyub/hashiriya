import type { SupabaseClient } from '@supabase/supabase-js';
import type { Tables, TablesInsert, TablesUpdate } from '../types/supabase';

export const createGamesApi = (supabase: SupabaseClient) => {
  const TABLE_NAME = 'games';

  return {
    async getById(id: number) {
      const { data, error } = await supabase.from(TABLE_NAME).select('*').eq('id', id).single();
      if (error) throw error;
      return data as Tables<'games'>;
    },

    async list() {
      const { data, error } = await supabase.from(TABLE_NAME).select('*');
      if (error) throw error;
      return data as Tables<'games'>[];
    },

    async create(gameData: TablesInsert<'games'>) {
      const { data, error } = await supabase.from(TABLE_NAME).insert(gameData).select().single();
      if (error) throw error;
      return data as Tables<'games'>;
    },

    async update(id: number, gameData: TablesUpdate<'games'>) {
      const { data, error } = await supabase.from(TABLE_NAME).update(gameData).eq('id', id).select().single();
      if (error) throw error;
      return data as Tables<'games'>;
    },

    async delete(id: number) {
      const { data, error } = await supabase.from(TABLE_NAME).delete().eq('id', id).select().single();
      if (error) throw error;
      return data as Tables<'games'>;
    },
  };
};

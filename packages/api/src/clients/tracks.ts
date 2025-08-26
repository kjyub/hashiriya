import type { SupabaseClient } from '@supabase/supabase-js';
import type { Tables, TablesInsert, TablesUpdate } from '../types/supabase';

export const createTracksApi = (supabase: SupabaseClient) => {
  const TABLE_NAME = 'tracks';

  return {
    async getById(id: number) {
      const { data, error } = await supabase.from(TABLE_NAME).select('*').eq('id', id).single();
      if (error) throw error;
      return data as Tables<'tracks'>;
    },

    async list() {
      const { data, error } = await supabase.from(TABLE_NAME).select('*');
      if (error) throw error;
      return data as Tables<'tracks'>[];
    },

    async create(trackData: TablesInsert<'tracks'>) {
      const { data, error } = await supabase.from(TABLE_NAME).insert(trackData).select().single();
      if (error) throw error;
      return data as Tables<'tracks'>;
    },

    async update(id: number, trackData: TablesUpdate<'tracks'>) {
      const { data, error } = await supabase.from(TABLE_NAME).update(trackData).eq('id', id).select().single();
      if (error) throw error;
      return data as Tables<'tracks'>;
    },

    async delete(id: number) {
      const { data, error } = await supabase.from(TABLE_NAME).delete().eq('id', id).select().single();
      if (error) throw error;
      return data as Tables<'tracks'>;
    },
  };
};

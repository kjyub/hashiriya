import type { SupabaseClient } from '@supabase/supabase-js';
import type { Tables, TablesInsert, TablesUpdate } from '../types/supabase';

export const createUsersApi = (supabase: SupabaseClient) => {
  const TABLE_NAME = 'users';

  return {
    async getById(id: string) {
      const { data, error } = await supabase.from(TABLE_NAME).select('*').eq('id', id).single();
      if (error) throw error;
      return data as Tables<'users'>;
    },

    async list() {
      const { data, error } = await supabase.from(TABLE_NAME).select('*');
      if (error) throw error;
      return data as Tables<'users'>[];
    },

    async create(userData: TablesInsert<'users'>) {
      const { data, error } = await supabase.from(TABLE_NAME).insert(userData).select().single();
      if (error) throw error;
      return data as Tables<'users'>;
    },

    async update(id: string, userData: TablesUpdate<'users'>) {
      const { data, error } = await supabase.from(TABLE_NAME).update(userData).eq('id', id).select().single();
      if (error) throw error;
      return data as Tables<'users'>;
    },

    async delete(id: string) {
      const { data, error } = await supabase.from(TABLE_NAME).delete().eq('id', id).select().single();
      if (error) throw error;
      return data as Tables<'users'>;
    },
  };
};

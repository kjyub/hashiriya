import type { SupabaseClient } from '@supabase/supabase-js';
import type { Tables, TablesInsert, TablesUpdate } from '../types/supabase';

// RecordWithDetails 타입 정의 (api 패키지 내에서 사용)
export type RecordWithDetails = Tables<'records'> & {
  user: Tables<'users'>;
  game: Tables<'games'>;
  track: Tables<'tracks'>;
  record_images: Tables<'record_images'>[];
};

export const createRecordsApi = (supabase: SupabaseClient) => {
  const TABLE_NAME = 'records';
  const IMAGE_TABLE_NAME = 'record_images';

  return {
    // Records
    async getRecordById(id: number): Promise<RecordWithDetails> {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select(
          `
          *,
          user:users(*),
          game:games(*),
          track:tracks(*),
          record_images(*)
        `,
        )
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as RecordWithDetails;
    },

    async listRecords(): Promise<RecordWithDetails[]> {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select(
          `
          *,
          user:users(*),
          game:games(*),
          track:tracks(*),
          record_images(*)
        `,
        )
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as RecordWithDetails[];
    },

    async createRecord(recordData: TablesInsert<'records'>): Promise<Tables<'records'>> {
      const { data, error } = await supabase.from(TABLE_NAME).insert(recordData).select().single();
      if (error) throw error;
      return data as Tables<'records'>;
    },

    async updateRecord(id: number, recordData: TablesUpdate<'records'>): Promise<Tables<'records'>> {
      const { data, error } = await supabase.from(TABLE_NAME).update(recordData).eq('id', id).select().single();
      if (error) throw error;
      return data as Tables<'records'>;
    },

    async deleteRecord(id: number): Promise<Tables<'records'>> {
      const { data, error } = await supabase.from(TABLE_NAME).delete().eq('id', id).select().single();
      if (error) throw error;
      return data as Tables<'records'>;
    },

    // 사용자별 레코드 조회
    async getRecordsByUserId(userId: string): Promise<RecordWithDetails[]> {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select(
          `
          *,
          user:users(*),
          game:games(*),
          track:tracks(*),
          record_images(*)
        `,
        )
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as RecordWithDetails[];
    },

    // 게임별 레코드 조회
    async getRecordsByGameId(gameId: number): Promise<RecordWithDetails[]> {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select(
          `
          *,
          user:users(*),
          game:games(*),
          track:tracks(*),
          record_images(*)
        `,
        )
        .eq('game_id', gameId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as RecordWithDetails[];
    },

    // 트랙별 레코드 조회
    async getRecordsByTrackId(trackId: number): Promise<RecordWithDetails[]> {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select(
          `
          *,
          user:users(*),
          game:games(*),
          track:tracks(*),
          record_images(*)
        `,
        )
        .eq('track_id', trackId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as RecordWithDetails[];
    },

    // 인증된 레코드만 조회
    async getCertifiedRecords(): Promise<RecordWithDetails[]> {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select(
          `
          *,
          user:users(*),
          game:games(*),
          track:tracks(*),
          record_images(*)
        `,
        )
        .eq('is_certified', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as RecordWithDetails[];
    },

    // Record Images
    async getImagesForRecord(recordId: number): Promise<Tables<'record_images'>[]> {
      const { data, error } = await supabase.from(IMAGE_TABLE_NAME).select('*').eq('record_id', recordId);
      if (error) throw error;
      return data as Tables<'record_images'>[];
    },

    async addImageToRecord(imageData: TablesInsert<'record_images'>): Promise<Tables<'record_images'>> {
      const { data, error } = await supabase.from(IMAGE_TABLE_NAME).insert(imageData).select().single();
      if (error) throw error;
      return data as Tables<'record_images'>;
    },

    async removeImage(id: number): Promise<Tables<'record_images'>> {
      const { data, error } = await supabase.from(IMAGE_TABLE_NAME).delete().eq('id', id).select().single();
      if (error) throw error;
      return data as Tables<'record_images'>;
    },
  };
};

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { Tables, TablesInsert, TablesUpdate } from '@api/types/supabase';

import { recordsApi } from '@/api'; // recordsApi 사용

const RECORDS_QUERY_KEY = ['records'];

// Record와 관련된 모든 정보를 조인하여 가져오는 타입
export type RecordWithDetails = Tables<'records'> & {
  user: Tables<'users'>;
  game: Tables<'games'>;
  track: Tables<'tracks'>;
  record_images: Tables<'record_images'>[];
};

// Record 목록 조회
export function useRecords() {
  return useQuery<RecordWithDetails[], Error>({
    queryKey: RECORDS_QUERY_KEY,
    queryFn: recordsApi.listRecords,
  });
}

// Record 상세 조회
export function useRecord(id: number) {
  return useQuery<RecordWithDetails, Error>({
    queryKey: [...RECORDS_QUERY_KEY, id],
    queryFn: () => recordsApi.getRecordById(id),
    enabled: !!id,
  });
}

// Record 생성
export function useCreateRecord() {
  const queryClient = useQueryClient();

  return useMutation<Tables<'records'>, Error, TablesInsert<'records'>>({
    mutationFn: (newRecord: TablesInsert<'records'>) => recordsApi.createRecord(newRecord),
    onSuccess: () => {
      // Record 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: RECORDS_QUERY_KEY });
    },
  });
}

// Record 수정
export function useUpdateRecord() {
  const queryClient = useQueryClient();

  return useMutation<Tables<'records'>, Error, { id: number; updatedRecord: TablesUpdate<'records'> }>({
    mutationFn: ({ id, updatedRecord }) => recordsApi.updateRecord(id, updatedRecord),
    onSuccess: (data) => {
      // Record 목록과 상세 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: RECORDS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...RECORDS_QUERY_KEY, data.id] });
    },
  });
}

// Record 삭제
export function useDeleteRecord() {
  const queryClient = useQueryClient();

  return useMutation<Tables<'records'>, Error, number>({
    mutationFn: recordsApi.deleteRecord,
    onSuccess: (_, id) => {
      // Record 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: RECORDS_QUERY_KEY });
      // 삭제된 Record 상세 쿼리 제거
      queryClient.removeQueries({ queryKey: [...RECORDS_QUERY_KEY, id] });
    },
  });
}

// 사용자별 Record 조회
export function useRecordsByUser(userId: string) {
  return useQuery<RecordWithDetails[], Error>({
    queryKey: [...RECORDS_QUERY_KEY, 'user', userId],
    queryFn: () => recordsApi.getRecordsByUserId(userId),
    enabled: !!userId,
  });
}

// 게임별 Record 조회
export function useRecordsByGame(gameId: number) {
  return useQuery<RecordWithDetails[], Error>({
    queryKey: [...RECORDS_QUERY_KEY, 'game', gameId],
    queryFn: () => recordsApi.getRecordsByGameId(gameId),
    enabled: !!gameId,
  });
}

// 트랙별 Record 조회
export function useRecordsByTrack(trackId: number) {
  return useQuery<RecordWithDetails[], Error>({
    queryKey: [...RECORDS_QUERY_KEY, 'track', trackId],
    queryFn: () => recordsApi.getRecordsByTrackId(trackId),
    enabled: !!trackId,
  });
}

// 인증된 Record만 조회
export function useCertifiedRecords() {
  return useQuery<RecordWithDetails[], Error>({
    queryKey: [...RECORDS_QUERY_KEY, 'certified'],
    queryFn: recordsApi.getCertifiedRecords,
  });
}

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { Tables, TablesInsert } from '@api/types/supabase';

import { gameScheduleChatsApi } from '@/api'; // src/api에서 임포트

const SCHEDULE_CHATS_QUERY_KEY = ['game_schedule_chats'];

export type GameScheduleChatWithDetails = Tables<'game_schedule_chats'> & {
  user: Tables<'users'>;
};

// 스케줄별 채팅 메시지 목록 조회
export function useGameScheduleChats(game_schedule_id: number) {
  return useQuery<GameScheduleChatWithDetails[], Error>({
    queryKey: [...SCHEDULE_CHATS_QUERY_KEY, game_schedule_id],
    queryFn: () => gameScheduleChatsApi.listMessagesForSchedule(game_schedule_id),
    enabled: !!game_schedule_id,
  });
}

// 채팅 메시지 생성
export function useCreateChatMessage() {
  const queryClient = useQueryClient();

  return useMutation<Tables<'game_schedule_chats'>, Error, TablesInsert<'game_schedule_chats'>>({
    mutationFn: (messageData) => gameScheduleChatsApi.postMessage(messageData),
    onSuccess: (data) => {
      // 해당 스케줄의 채팅 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: [...SCHEDULE_CHATS_QUERY_KEY, data.game_schedule_id],
      });
    },
  });
}

// 채팅 메시지 수정
export function useUpdateChatMessage() {
  const queryClient = useQueryClient();

  return useMutation<Tables<'game_schedule_chats'>, Error, { id: number; message: string }>({
    mutationFn: ({ id, message }) => gameScheduleChatsApi.updateMessage(id, { message }),
    onSuccess: (data) => {
      // 해당 스케줄의 채팅 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: [...SCHEDULE_CHATS_QUERY_KEY, data.game_schedule_id],
      });
    },
  });
}

// 채팅 메시지 삭제
export function useDeleteChatMessage() {
  const queryClient = useQueryClient();

  return useMutation<Tables<'game_schedule_chats'>, Error, number>({
    mutationFn: (id) => gameScheduleChatsApi.deleteMessage(id),
    onSuccess: (data) => {
      // 해당 스케줄의 채팅 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: [...SCHEDULE_CHATS_QUERY_KEY, data.game_schedule_id],
      });
    },
  });
}

// 실시간 채팅을 위한 쿼리 설정
export function useGameScheduleChatsRealtime(game_schedule_id: number) {
  return useQuery<GameScheduleChatWithDetails[], Error>({
    queryKey: [...SCHEDULE_CHATS_QUERY_KEY, game_schedule_id],
    queryFn: () => gameScheduleChatsApi.listMessagesForSchedule(game_schedule_id),
    enabled: !!game_schedule_id,
    refetchInterval: 5000, // 5초마다 자동 새로고침
    staleTime: 1000, // 1초 후 stale 상태
  });
}

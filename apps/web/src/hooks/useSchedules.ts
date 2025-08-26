import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { GameScheduleWithDetails } from '@api/clients/schedules';
import type { TablesInsert, TablesUpdate } from '@api/types/supabase';

import { schedulesApi } from '@/api'; // schedulesApi 사용

const SCHEDULES_QUERY_KEY = ['game_schedules'];

export function useGameSchedules() {
  return useQuery<GameScheduleWithDetails[], Error>({
    queryKey: SCHEDULES_QUERY_KEY,
    queryFn: schedulesApi.listSchedules,
  });
}

export function useGameSchedule(id: number) {
  return useQuery<GameScheduleWithDetails, Error>({
    queryKey: [...SCHEDULES_QUERY_KEY, id],
    queryFn: () => schedulesApi.getScheduleById(id),
    enabled: !!id,
  });
}

export function useCreateGameSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newSchedule: TablesInsert<'game_schedules'>) => schedulesApi.createSchedule(newSchedule),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SCHEDULES_QUERY_KEY });
    },
  });
}

export function useUpdateGameSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updatedSchedule }: { id: number; updatedSchedule: TablesUpdate<'game_schedules'> }) =>
      schedulesApi.updateSchedule(id, updatedSchedule),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SCHEDULES_QUERY_KEY });
    },
  });
}

export function useDeleteGameSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => schedulesApi.deleteSchedule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SCHEDULES_QUERY_KEY });
    },
  });
}

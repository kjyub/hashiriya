import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { TablesInsert, TablesUpdate } from '@api/types/supabase';

import { gamesApi } from '@/api';

const GAMES_QUERY_KEY = ['games'];

export function useGames() {
  return useQuery({
    queryKey: GAMES_QUERY_KEY,
    queryFn: gamesApi.list,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGame(id: number) {
  return useQuery({
    queryKey: [...GAMES_QUERY_KEY, id],
    queryFn: () => gamesApi.getById(id),
    enabled: !!id, // id가 있을 때만 쿼리 실행
  });
}

export function useCreateGame() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newGame: TablesInsert<'games'>) => gamesApi.create(newGame),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GAMES_QUERY_KEY });
    },
  });
}

export function useUpdateGame() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updatedGame }: { id: number; updatedGame: TablesUpdate<'games'> }) =>
      gamesApi.update(id, updatedGame),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GAMES_QUERY_KEY });
    },
  });
}

export function useDeleteGame() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => gamesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GAMES_QUERY_KEY });
    },
  });
}

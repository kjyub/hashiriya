import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { Tables, TablesInsert, TablesUpdate } from '@api/types/supabase';

import { tracksApi } from '@/api';

const TRACKS_QUERY_KEY = ['tracks'];

export function useTracks() {
  return useQuery<Tables<'tracks'>[], Error>({
    queryKey: TRACKS_QUERY_KEY,
    queryFn: tracksApi.list,
  });
}

export function useTrack(id: number) {
  return useQuery<Tables<'tracks'>, Error>({
    queryKey: [...TRACKS_QUERY_KEY, id],
    queryFn: () => tracksApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateTrack() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newTrack: TablesInsert<'tracks'>) => tracksApi.create(newTrack),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRACKS_QUERY_KEY });
    },
  });
}

export function useUpdateTrack() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updatedTrack }: { id: number; updatedTrack: TablesUpdate<'tracks'> }) =>
      tracksApi.update(id, updatedTrack),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRACKS_QUERY_KEY });
    },
  });
}

export function useDeleteTrack() {
  const queryClient = useQueryClient();
  return useMutation<Tables<'tracks'>, Error, number>({
    mutationFn: (id: number) => tracksApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRACKS_QUERY_KEY });
    },
  });
}

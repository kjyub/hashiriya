import { useQuery } from '@tanstack/react-query';

import type { Tables } from '@api/types/supabase';

import { schedulesApi } from '@/api';

const SCHEDULE_TRACKS_QUERY_KEY = ['game_schedule_tracks'];

export function useGameScheduleTracks(game_schedule_id: number) {
  return useQuery<Tables<'game_schedule_tracks'>[], Error>({
    queryKey: [...SCHEDULE_TRACKS_QUERY_KEY, game_schedule_id],
    queryFn: () => schedulesApi.listTracksForSchedule(game_schedule_id),
    enabled: !!game_schedule_id,
  });
}

import { useQuery } from '@tanstack/react-query';

import type { Tables } from '@api/types/supabase';

import { gameScheduleMembersApi } from '@/api'; // src/api에서 임포트

const SCHEDULE_MEMBERS_QUERY_KEY = ['game_schedule_members'];

export type GameScheduleMemberWithDetails = Tables<'game_schedule_members'> & {
  user: Tables<'users'>;
};

export function useGameScheduleMembers(game_schedule_id: number) {
  return useQuery<GameScheduleMemberWithDetails[], Error>({
    queryKey: [...SCHEDULE_MEMBERS_QUERY_KEY, game_schedule_id],
    queryFn: () => gameScheduleMembersApi.listMembersForSchedule(game_schedule_id),
    enabled: !!game_schedule_id,
  });
}

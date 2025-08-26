import {
  createUsersApi,
  createGamesApi,
  createTracksApi,
  createRecordsApi,
  createSchedulesApi,
  createGameScheduleMembersApi,
  createGameScheduleChatsApi,
} from '@api';

import { supabase } from '../lib/supabase';

// API 클라이언트 생성
export const usersApi = createUsersApi(supabase);
export const gamesApi = createGamesApi(supabase);
export const tracksApi = createTracksApi(supabase);
export const recordsApi = createRecordsApi(supabase);
export const schedulesApi = createSchedulesApi(supabase);
export const gameScheduleMembersApi = createGameScheduleMembersApi(supabase);
export const gameScheduleChatsApi = createGameScheduleChatsApi(supabase);

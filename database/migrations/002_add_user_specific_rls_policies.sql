-- 사용자별 권한이 다른 RLS 정책 추가

-- 1. users 테이블: 본인만 조회/수정/삭제 가능
CREATE POLICY "Users can view own profile" ON public.users
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can delete own profile" ON public.users
FOR DELETE USING (auth.uid() = id);

-- 2. 나머지 모든 테이블: 모든 사용자가 읽기 가능
-- tracks 테이블
CREATE POLICY "Enable read access for all users" ON public.tracks
FOR SELECT USING (true);

-- records 테이블  
CREATE POLICY "Enable read access for all users" ON public.records
FOR SELECT USING (true);

-- record_images 테이블
CREATE POLICY "Enable read access for all users" ON public.record_images
FOR SELECT USING (true);

-- games 테이블
CREATE POLICY "Enable read access for all users" ON public.games
FOR SELECT USING (true);

-- game_schedules 테이블
CREATE POLICY "Enable read access for all users" ON public.game_schedules
FOR SELECT USING (true);

-- game_schedule_tracks 테이블
CREATE POLICY "Enable read access for all users" ON public.game_schedule_tracks
FOR SELECT USING (true);

-- game_schedule_members 테이블
CREATE POLICY "Enable read access for all users" ON public.game_schedule_members
FOR SELECT USING (true);

-- game_schedule_chats 테이블
CREATE POLICY "Enable read access for all users" ON public.game_schedule_chats
FOR SELECT USING (true);

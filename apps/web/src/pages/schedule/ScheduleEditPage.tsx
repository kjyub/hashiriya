import { useMemo } from 'react';
import { useParams } from 'react-router';

export default function ScheduleEditPage() {
  const { id: scheduleId } = useParams();
  const isCreate = useMemo(() => !scheduleId, [scheduleId]);

  return (
    <div className="page px-12 py-6 flex flex-col gap-2.5">
      {/* 페이지 제목 */}
      <div className="flex flex-col h-[136px] justify-center text-center w-[148px]">
        <h1 className="text-white text-[32px] font-paperlogy-light">{isCreate ? '스케줄 추가' : '스케줄 수정'}</h1>
      </div>
    </div>
  );
}

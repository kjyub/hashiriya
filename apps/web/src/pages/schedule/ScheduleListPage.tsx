import GameFilter from '@/components/schedule/list/GameFilter';
import ScheduleList from '@/components/schedule/list/ScheduleList';

export default function ScheduleListPage() {
  return (
    <div className="page px-12 py-6 flex flex-col gap-2.5">
      {/* 페이지 제목 */}
      <div className="flex flex-col h-[136px] justify-center text-center w-[148px]">
        <h1 className="text-white text-[32px] font-paperlogy-light">멀티 스케줄</h1>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex flex-row gap-5 w-full">
        <ScheduleList />

        <GameFilter />
      </div>
    </div>
  );
}

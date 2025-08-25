import { ButtonPrimary, InputContainer } from '@ui';

export default function ScheduleList() {
  return (
    <div className="flex-1 flex flex-col gap-4">
      {/* 검색 및 추가 버튼 */}
      <div className="flex flex-row h-9 items-center justify-between">
        <InputContainer variant="no-border">
          <input type="text" placeholder="검색" />
          <button>
            <i className="fa-solid fa-magnifying-glass" />
          </button>
        </InputContainer>
        <ButtonPrimary className="h-9">스케줄 추가</ButtonPrimary>
      </div>

      {/* 스케줄 리스트 */}
      <div className="flex flex-col gap-2 w-full">
        {/* 스케줄 아이템들 - 임시 플레이스홀더 */}
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="h-32 w-full bg-gray-800/30 rounded-lg p-4 border border-gray-600/30">
            <div className="text-white text-lg mb-2">스케줄 제목 {item}</div>
            <div className="text-white/70 text-sm mb-4">스케줄 상세 내용이 들어갈 자리입니다...</div>
            <div className="flex justify-between items-end">
              <div className="text-white text-sm">시 23.05.05 20:00 인 5/8</div>
              <div className="text-white/80 text-sm font-bold">게임명</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

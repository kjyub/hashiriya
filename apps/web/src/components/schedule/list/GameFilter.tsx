import { InputContainer } from '@ui';

export default function GameFilter() {
  return (
    <div className="w-60 h-[181px] relative">
      {/* 게임 필터 헤더 */}
      <div className="flex justify-between h-9 items-center">
        <div className="text-white text-[16px] font-paperlogy">게임 필터</div>
        <InputContainer className="w-32" variant="no-border">
          <input type="text" placeholder="게임 검색" />
          <button>
            <i className="fa-solid fa-magnifying-glass" />
          </button>
        </InputContainer>
      </div>

      {/* 게임 필터 카드들 */}
      <div className="absolute top-[52px] flex flex-col gap-2 items-center w-60">
        {/* 게임 필터 카드들 - 임시 플레이스홀더 */}
        {[
          { name: 'Forza Horizon 5', active: false },
          { name: 'Assetto Corsa Competizione', active: true },
          { name: 'Forza Horizon 5', active: false },
          { name: 'Forza Horizon 5', active: false },
          { name: 'Assetto Corsa Competizione', active: false },
          { name: 'Forza Horizon 5', active: true },
        ].map((game, index) => (
          <div
            key={index}
            className={`h-[110px] w-full relative overflow-hidden rounded-lg cursor-pointer transition-all ${
              game.active ? 'ring-2 ring-blue-400' : ''
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600" />
            <div className={`absolute inset-0 ${game.active ? 'bg-black/0' : 'bg-black/50'}`} />
            <div className="absolute bottom-0 left-0 w-[138px] h-6">
              <div className="absolute inset-0 bg-black/60 rounded-t-lg" />
              <div className="absolute left-[7px] top-1 text-white/90 text-[14px] font-paperlogy [text-shadow:rgba(0,0,0,0.7)_2px_4px_8px]">
                {game.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

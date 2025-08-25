import { Button, ButtonPrimary } from '@ui';
import { Link } from 'react-router-dom';

import styles from './style.module.css';

export default function NotFound() {
  return (
    <div className="page flex flex-center">
      <div className="flex flex-col gap-4 max-sm:w-full sm:max-w-sm text-center">
        <div className="">
          <h1 className="text-9xl font-bold text-gray-300 mb-4">
            <span className={`inline-block text-gray-200/70 ${styles['fuzzy-animation-1']}`}>4</span>
            <span className={`inline-block text-gray-200/70 ${styles['fuzzy-animation-2']}`}>0</span>
            <span className={`inline-block text-gray-200/70 ${styles['fuzzy-animation-3']}`}>4</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-200/70 mb-4">페이지를 찾을 수 없습니다</h2>
          <p className="text-gray-200/50 text-sm sm:text-lg mb-8">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button className="w-full" onClick={() => window.history.back()}>
            이전 페이지로
          </Button>

          <Link to="/" className="w-full">
            <ButtonPrimary className="w-full">홈으로 돌아가기</ButtonPrimary>
          </Link>
        </div>

        <div className="text-sm text-gray-500">
          <p>문제가 지속되면 관리자에게 문의해주세요.</p>
        </div>
      </div>
    </div>
  );
}

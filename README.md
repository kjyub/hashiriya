# Hashiriya Frontend

Turborepo 모노레포 구조로 구성된 TanStack Start 프론트엔드 프로젝트입니다.

## 프로젝트 구조

```
hashiriya-frontend/
├── apps/
│   └── web/                 # TanStack Start 메인 앱
├── packages/
│   ├── ui/                 # UI 컴포넌트 & 디자인 시스템 (Emotion + Storybook)
│   ├── utils/              # 공용 유틸리티 함수
│   ├── supabase/           # Supabase 클라이언트 패키지
│   └── figma/              # Figma API 패키지
├── biome.json              # Biome 설정 (린팅/포맷팅)
├── turbo.json              # Turborepo 설정
└── pnpm-workspace.yaml     # PNPM 워크스페이스 설정
```

## 시작하기

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 환경변수 설정

`env.example` 파일을 참고하여 `.env` 파일을 생성하고 필요한 환경변수를 설정하세요:

```bash
cp env.example .env
```

필요한 환경변수:

- `VITE_SUPABASE_URL`: Supabase 프로젝트 URL
- `VITE_SUPABASE_ANON_KEY`: Supabase 익명 키
- `FIGMA_ACCESS_TOKEN`: Figma 개인 액세스 토큰

### 3. 개발 서버 실행

```bash
pnpm dev
```

## 사용 가능한 스크립트

- `pnpm dev`: 개발 서버 실행
- `pnpm build`: 프로덕션 빌드
- `pnpm lint`: 코드 린팅
- `pnpm format`: 코드 포맷팅
- `pnpm clean`: 빌드 캐시 정리
- `pnpm storybook`: Storybook 개발 서버 실행
- `pnpm build-storybook`: Storybook 빌드

## 패키지 정보

### @hashiriya/web

TanStack Start를 사용한 메인 웹 애플리케이션

### @hashiriya/ui

- Emotion 기반 UI 컴포넌트 라이브러리
- Storybook을 통한 컴포넌트 문서화
- 디자인 시스템 및 디자인 토큰 관리

### @hashiriya/utils

- 날짜, 문자열, 배열 등 공용 유틸리티 함수
- 타입 안전성이 보장된 헬퍼 함수들
- Vitest를 통한 단위 테스트 지원

### @hashiriya/supabase

Supabase 클라이언트 설정 및 유틸리티

### @hashiriya/figma

Figma API 클라이언트 및 디자인 토큰 추출 유틸리티

## 기술 스택

- **프레임워크**: TanStack Start
- **라우팅**: TanStack Router
- **스타일링**: Emotion
- **컴포넌트 문서화**: Storybook
- **빌드 도구**: Vite, Vinxi
- **모노레포**: Turborepo
- **패키지 매니저**: PNPM
- **린터/포맷터**: Biome
- **테스팅**: Vitest
- **백엔드**: Supabase
- **디자인**: Figma API

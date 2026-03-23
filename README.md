# 0. Getting Started

```bash
$ npm install

$ npm start
```

### Architecture

<img width="942" height="585" alt="스크린샷 2026-03-22 오후 5 18 02" src="https://github.com/user-attachments/assets/6ebd5d41-17b9-411c-a910-c7d99f10c841" />

### [👉 배포 링크](https://chefgpt-front.vercel.app/)

<br/>
<br/>

# 1. Project Overview

### 프로젝트 이름: ChefGPT

ChefGPT는 유튜브 영상 속 레시피를 텍스트 데이터로 변환하여  
영상에 의존하지 않고도 레시피를 쉽게 확인하고 활용할 수 있도록 만든 플랫폼입니다.

기존의 영상 기반 레시피는 필요한 정보를 빠르게 찾기 어렵다는 문제를 해결하고자 했습니다.

또한 단순한 레시피 저장을 넘어,  
사용자의 냉장고 데이터를 기반으로 한 레시피 추천과  
요리 투표 및 정보 공유 기능을 통해 커뮤니티 경험까지 제공합니다.

<br/>
<br/>

# 2. Tech Stack

<table align="center">
  <tr>
    <td align="center">
      <img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react.png" />
      <br/>
      <sub><b>React</b></sub>
    </td>
    <td align="center">
      <img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/typescript.png" />
      <br/>
      <sub><b>TypeScript</b></sub>
    </td>
    <td align="center">
      <img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react_query.png" />
      <br/>
      <sub><b>React Query</b></sub>
    </td>
    <td align="center">
      <img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/tailwind_css.png" />
      <br/>
      <sub><b>Tailwind CSS</b></sub>
    </td>
    <td align="center">
      <img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/shadcn_ui.png" />
      <br/>
      <sub><b>Shadcn</b></sub>
    </td>
    <td align="center">
      <img width="50" src="https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg" />
      <br/>
      <sub><b>Zustand</b></sub>
    </td>
    <td align="center">
      <img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/vite.png" />
      <br/>
      <sub><b>Vite</b></sub>
    </td>
  </tr>
</table>

<br/>
<br/>
<br/>

# 3. Key Features

- ### **🔐 인증**:
  - 로컬스토리지와, JWT를 통한 인증기능

- ### **🎬 유튜브 레시피 추출**:
  - 유튜브 링크를 입력하면 서버에서 자막 데이터를 추출 및 정제 -> 읽기 쉬운 레시피 형태로 변환

- ### **✍️ 수동 레시피 작성**:
  - 사용자가 직접 레시피를 작성하고 저장 가능

- ### **🧊 내 냉장고 관리**:
  - 보유 중인 식재료를 직접 등록 및 관리

- ### **🤖 레시피 추천**:
  - 사용자의 냉장고 식재료를 기반으로 레시피 추천

- ### **🗳️ 요리 투표 (커뮤니티 기능)**:
  - "부먹 VS 찍먹" 같은 주제로 투표 생성 가능

- ### **📚 요리 정보 공유**:
  - 재료 차이, 보관 방법등을 에디터로 작성하고 다른 사용자가 열람 가능

- ### **👤 마이페이지**:
  - 내가 작성한 콘텐츠를 한눈에 확인 가능

<br/>
<br/>
<br/>

# 4. 📁 Project Structure

```
src
├── assets        # 이미지 및 정적 파일
├── components    # 도메인별 컴포넌트
│   ├── article       # 요리정보 컴포넌트
│   ├── recipe        # 레시피 컴포넌트
│   ├── refrigerator  # 내 냉장고 컴포넌트
│   ├── vote          # 투표 기능 컴포넌트
│   ├── myInfo        # 내 정보 컴포넌트
│   ├── modal         # 모달 컴포넌트
│   ├── layout        # 레이아웃 구성
│   ├── common        # 공통 컴포넌트
│   └── ui            # Shadcn 컴포넌트
│
├── hooks
│   ├── API           # API 요청 로직 (React Query 기반)
│   │   ├── GET / POST / PATCH / DELETE 단위로 분리
│   │   └── 도메인별 (article, recipe, vote 등) 구성
│   └── custom hooks  # 공통 훅 (스크롤, 모바일 감지 등)
│
├── constants         # API URL, Query Key 등 상수 관리
├── store             # 전역 상태 관리 (인증, 모달)
├── provider          # 모달 Provider
├── types             # 프로젝트에서 사용하는 타입
├── page              # 라우팅되는 페이지
├── lib               # Shadcn 컴포넌트에서 사용하는 유틸함수
│
├── App.tsx
├── route.tsx         # 라우팅 설정
└── main.tsx          # 엔트리 포인트
```

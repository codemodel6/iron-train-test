## 실행 방법
1. git clone https://github.com/codemodel6/iron-train-test.git 명령어를 통해 local vsocode에 프로젝트를 클론받아주세요.
2. vscode의 명령어 터미널에 cd iron-train-test 로 클론받은 폴더로 들어간 후 npm install 명령어를 통해 package.json에 있는 패키지들을 다운 받아 주세요.
3. npm run start를 통해 프로젝트를 실행해주세요

## 실행 환경
- #### node 버전 16.16.0<br/>
- #### react 버전 18.2.0

## 문제 해결 방식
### 실행 환경 구축
처음에는 vite를 사용해 프로젝트를 생성하려 했으나 vite가 node 18보저# 실행 방법
1. git clone  명령어를 통해 local vsocode에 프로젝트를 클론받아주세요.
2. vscode의 명령어 터미널에 npm install 명령어를 통해 package.json에 있는 패키지들을 다운 받아 주세요.
3. npm run start를 통해 프로젝트를 실행해주세요

## 실행 환경
- #### node 버전 16.16.0<br/>
- #### react 버전 18.2.0

## 문제 해결 방식
### 실행 환경 구축
처음에는 vite를 사용해 프로젝트를 생성하려 했으나 vite가 node 18버전 이상만을 지원한다는 것을 알아내어 cra로 진행하였습니다. 하지만 cra는 항상 최신 버전의 react를 다운받기 때문에 19버전이 다운로드 받아졌습니다.
하지만 react 19버전은 node 16.16.0 버전에서 오류가 나서 안정적인 18버전으로 다운그레이드 진행했습니다. 다운그레이드의 방법으로는

```
npx create-react-app my-react-app --template typescript
이후에 
npm install react@18.2.0 react-dom@18.2.0
npm instal
```
명령어를 통해 진행했습니다.

### - gridUI구현
처음에는 테이블을 구현하는줄 알고 테이블로 구현하였으나 grid UI라고 적혀있어 display:grid를 사용했습니다. map을 돌릴 때 key값을 표현하기 위해 display:contents 를 사용하여 틀을 만들고 그 내부에 그리드 항목들 할 cell들을 배치했습니다.

### - Infinite Scrol
Infinite Scrol은 tanstack/react-query의 InfinityQuery를 사용해 해결했습니다. axios instance를 만든 후 상황에 맞는 api를 던져 문제를 해결하였습니다. 그리고 tanstack/react-query의 캐싱 기능을 이용해 따로 전역 상태 관리를 하지 않고도 이후 다른 컴포넌트에서 search, sort 작업을 진행할 수 있었습니다.

### - search/sort
api에서 처음 search를 진행할 때 파람에 다른 값이 넣어도 검색이 되지 않고 생일도 특정 날짜에서 오류가 나서 gender로만 search를 진행했습니다. 또한 sort는 이름으로 정렬해보았습니다. 무한스크롤이기때문에 상단에 컴포넌트를 만들어 언제든지 검색할 수 있게 제작하였습니다.

### - Sub Rows
subRow 같은 경우 객체 state를 하나 만들어 map을 돌린 객채의 id를 저장한 후 state에 그 객체 id가 있다면 SubRow를 보여주는 방식으로 제작했습니다.

### - tooltip
툴팁은 처음에는 긴 글자 표시를
```
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
```
으로 표시한 후 position : releative 와 position : absolute를 사용해 해결하려 했습니다. 하지만 여기서 문제가 발생했습니다.
display: contents를 사용해서 해당 부모에 position : releative 를 줄 수 없어서 문제가 생겼고 이것을 해결하기위해 툴팁을 보여줄 div 태그에 releative를 주었으나 글자가 넘칠 때   overflow: hidden; 속성때문에 툴팁이 가려져서 나왔었습니다. 그래서 저는 문자가 길다면 ...으로 표시하는 방법을 자바스크립트 함수로 대체하여 해결하였습니다.

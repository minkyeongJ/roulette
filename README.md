# roulette

면접 질문을 랜덤으로 뽑기 위한 룰렛입니다.

배포링크: https://dollyeo.vercel.app/

# 목차
### [사용방법](#사용방법)
- [메인화면](#메인화면)
- [질문 입력](#질문-입력)
- [질문 제외 및 포함](#질문-제외-및-포함)
- [질문 삭제](#질문-삭제)
- [룰렛 돌리기](#룰렛-돌리기)
- [문항 전체 삭제하기](#문항-전체-삭제하기)
- [발표 순서 정하기](#발표-순서-)

### [요구사항](#요구사항)

### [참고자료](#참고자료)

### [트러블 슈팅](#트러블-슈팅)

# 사용방법

### 메인화면

링크 접속 시 질문을 입력할 수 있는 인풋창과 룰렛을 돌릴 수 있는 버튼을 확인할 수 있습니다.
![홈화면](https://user-images.githubusercontent.com/67677374/193418668-b364a222-6141-4167-b0e1-b6d1d4c882d3.png)

### 질문 입력

원하는 질문을 입력하고 등록 버튼 혹은 enter를 누르면 질문이 등록됩니다.
![질문입력](https://user-images.githubusercontent.com/67677374/193418925-80b550a8-2257-4812-81c8-d4cc691dc716.gif)

### 질문 제외 및 포함

제외하고 싶은 질문을 한 번 클릭하면 글 가운데 줄이 그어지며 선택 대상에서 제외됩니다.
제외된 질문을 한 번 클릭하면 글 가운데 줄이 사라지며 선택 대상에 포함됩니다.
![질문제외포함](https://user-images.githubusercontent.com/67677374/193419308-af3a8f31-e33f-4475-a715-533deb16acca.gif)

### 질문 삭제

문항을 연속 클릭하면 클릭된 문항이 삭제됩니다.
![질문삭제](https://user-images.githubusercontent.com/67677374/193419363-e7a58b7c-5bd6-4df1-b302-6fe0276e17fb.gif)

### 룰렛 돌리기

선택 대상에 포함되어있는 질문 중 랜덤으로 문항 하나가 회색 배경으로 선택됩니다.
선택된 문항은 다음 시도에서 제외됩니다.
![룰렛돌리기](https://user-images.githubusercontent.com/67677374/193419667-565c0eee-d7cd-4140-971c-badb40000d45.gif)

### 문항 전체 삭제하기

페이지를 새로고침하면 입력된 문항이 전부 삭제됩니다.
![질문새로고침](https://user-images.githubusercontent.com/67677374/193419438-2bf89388-c70d-4377-a7ab-80d27c1f04ea.gif)

### 발표 순서 정하기
참여자 추가 삭제 버튼으로 발표에 참여할 사람의 인원을 추가 삭제할 수 있습니다.
![참여자 추가 삭제](https://user-images.githubusercontent.com/67677374/198960540-fc621fdc-0612-4ad2-87a2-174e0c872873.gif)

순서정하기 버튼을 누르면 발표순서를 랜덤으로 설정하여 나타냅니다.
![참여자 순서 정하기](https://user-images.githubusercontent.com/67677374/198960435-58561dde-05be-4de2-86d4-b9af78e7c75c.gif)

# 요구사항

## 필수 요구사항

- [x] 텍스트창에 질문을 입력할 수 있어야 한다.
- [x] 룰렛 버튼을 누르면 랜덤으로 저장된 내용중 하나를 선택한다.
- [x] 선택된 문항은 다시 선택되지 않는다.
- [x] 입력된 항목은 삭제할 수 있다.

# 추가 요구사항

- [x] 발표 순서를 랜덤으로 정해준다. - 2022/10/31
- [ ] 출력 버튼을 누르면 입력한 항목을 pdf로 출력한다.
- [ ] 저장 버튼을 누르면 로컬 스토리지에 저장한다.
- [ ] 저장된 리스트가 화면에 나타난다.

# 참고자료

## 선택된 html 요소로 화면 이동하기

- [자바스크립트를 사용하여 특정 엘리먼트로 화면을 이동시키는 방법은?](https://webisfree.com/2017-03-30/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%ED%8A%B9%EC%A0%95-%EC%97%98%EB%A6%AC%EB%A8%BC%ED%8A%B8%EB%A1%9C-%ED%99%94%EB%A9%B4%EC%9D%84-%EC%9D%B4%EB%8F%99%EC%8B%9C%ED%82%A4%EB%8A%94-%EB%B0%A9%EB%B2%95%EC%9D%80)
  - `scrollIntoView()`

## 배열 랜덤으로 섞기(shuffle)
- [배열 요소 무작위로 섞기](https://ko.javascript.info/task/shuffle)
  - ```function shuffle(array) { array.sort(() => Math.random() - 0.5) }```

# 트러블 슈팅

## appendChild() 실행 안됨

- We called the Node.appendChild method on a NodeList and not on a DOM element, which caused the error.
  - index번호를 명시해 에러 해결
  - 참고: https://bobbyhadz.com/blog/javascript-typeerror-appendchild-is-not-a-function

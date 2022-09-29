// <질문 입력 및 삭제 하기>
let $inputQuestion = document.getElementById("input-question"); //질문 입력창
let $buttonAddQuestion = document.getElementById("button-addquestion"); // 버튼
let $showQuestionList = document.getElementById("showquestion-list"); // 질문 리스트창

const makeListHandle = () => {
  // 버튼에 클릭 이벤트가 발생하면
  let list = document.createElement("li"); // html 'li' 태그 만들기
  if (!$inputQuestion.value)
    // 할 일 입력창에 내용이 입력되지 않으면 alert 발생
    alert("내용을 입력해 주세요!");
  else {
    list.innerText = $inputQuestion.value; // <li>입력된 할 일</li>
    list.classList.add("include-choose");
    $showQuestionList.appendChild(list); // 할 일 리스트창에 자식으로 붙이기
    $inputQuestion.value = ""; // 할 일 입력창 초기화
  }

  list.addEventListener("click", () => {
    if (list.className === "include-choose") {
      // 만들어진 list에 클릭 이벤트가 발생하면 줄 긋기
      list.classList.remove("include-choose");
      list.classList.add("except-choose");
    } else {
      // 만들어진 list에 클릭 이벤트가 발생하면 줄 제거
      list.classList.remove("except-choose");
      list.classList.add("include-choose");
    }
  });
  list.addEventListener("dblclick", () => {
    // list에 더블클릭 이벤트가 발생하면 할 일 리스트창에서 지우기
    $showQuestionList.removeChild(list);
  });
};

$buttonAddQuestion.addEventListener("click", () => {
  makeListHandle();
});

//엔터 눌렀을 때 리스트 추가
$inputQuestion.addEventListener("keyup", () => {
  if (window.event.keyCode == 13) {
    makeListHandle();
  }
});
// </질문 입력 및 삭제 하기>

// <룰렛 돌리기>
let $questionList = $showQuestionList.querySelectorAll("li");
let $buttonChooseQuestion = document.getElementById("button-choosequestion");

$buttonChooseQuestion.addEventListener("click", () => {
  if (document.querySelector(".list-chosen")) {
    const finallyChosenList = document.querySelector(".list-chosen");
    finallyChosenList.classList.remove("include-choose");
    finallyChosenList.classList.add("except-choose");
    finallyChosenList.classList.remove("list-chosen");
  }

  $questionList = $showQuestionList.querySelectorAll(".include-choose");
  const questionLength = $questionList.length;
  const turn = Math.floor(questionLength * (Math.random() * 5 + 1));
  let questionNumber = 0;
  for (let i = 0; i < turn; i++) {
    if (questionNumber >= questionLength) {
      questionNumber = 0;
    }
    if (questionNumber - 1 === -1) {
      $questionList[questionLength - 1].classList.remove("list-chosen");
      $questionList[questionNumber].classList.add("list-chosen");
    } else {
      $questionList[questionNumber - 1].classList.remove("list-chosen");
      $questionList[questionNumber].classList.add("list-chosen");
    }
    questionNumber++;
  }
});
// </룰렛 돌리기>
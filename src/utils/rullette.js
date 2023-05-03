/*<참여 인원 관리 및 순서 정하기> */
let $participantsLists = document.getElementsByClassName("lists-participants");
let $buttonAddParticipants = document.getElementById("button-add");
let $buttonDeleteParticipants = document.getElementById("button-delete");

/*인원 추가하기 */
const addParticipants = () => {
  let list = document.createElement("li");
  let input = document.createElement("input");
  input.className = "participants-name";
  input.placeholder = "참여자 이름";
  list.appendChild(input);
  $participantsLists[0].appendChild(list);
};

$buttonAddParticipants.addEventListener("click", () => {
  addParticipants();
});

/*인원 삭제하기 */
const deleteParticipants = () => {
  if ($participantsLists[0].childNodes.length > 5) {
    $participantsLists[0].lastChild.remove();
  }
};

$buttonDeleteParticipants.addEventListener("click", () => {
  deleteParticipants();
});

/*이름 랜덤으로 섞기 */
let $buttonShuffle = document.getElementById("button-shuffle");

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const shuffleHandle = () => {
  let $participantsNameArr = [];
  let $participantsNameNodes = document.querySelectorAll(
    "input.participants-name"
  );
  let $participantsOrder = document.getElementById("participants-order");
  let participantsShuffleArr = [];
  $participantsNameNodes.forEach((node) => {
    $participantsNameArr.push(node.value);
  });
  participantsShuffleArr = shuffle($participantsNameArr);
  $participantsOrder.innerText = participantsShuffleArr.join(" → ");
};

$buttonShuffle.addEventListener("click", () => {
  shuffleHandle();
});

/*</인원 추가 및 순서 정하기> */

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
    finallyChosenList.scrollIntoView();
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

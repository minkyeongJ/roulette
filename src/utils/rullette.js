import { NANUM_GOTHIC_BASE64 } from "../helper/font.js";

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

const addClickEventForList = (list) => {
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

const makeListHandle = () => {
  const inputQuestionValue = $inputQuestion.value.trim(); // 입력된 값을 양 옆 공백 제거하여 변수에 할당

  if (!inputQuestionValue) {
    // 할 일 입력창에 내용이 입력되지 않으면 alert 발생
    alert("내용을 입력해 주세요!");
    return; // 함수 실행 중단
  }

  const inputLines = inputQuestionValue.split("\n"); // 입력된 값을 줄바꿈을 기준으로 분할하여 배열에 할당

  inputLines.forEach((line) => {
    const trimmedLine = line.trim(); // 각 줄의 내용을 양 옆 공백 제거하여 변수에 할당

    if (!trimmedLine) {
      return; // 빈 줄은 처리하지 않고 넘어감
    }

    const list = document.createElement("li"); // html 'li' 태그 만들기
    list.innerText = trimmedLine; // 각 줄의 내용을 할당
    list.classList.add("include-choose");
    $showQuestionList.appendChild(list); // 생성한 li 요소를 추가
    addClickEventForList(list);
  });

  $inputQuestion.value = ""; // 할 일 입력창 초기화
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

//<전체 질문 삭제>
let $buttonReset = document.getElementById("button-reset");

$buttonReset.addEventListener("click", (event) => {
  event.preventDefault();
  $showQuestionList.innerHTML = "";
});
//</전체 질문 삭제>

//<pdf 인쇄하기>
// 개행 처리 함수
const getNewlineItem = (str, size) => {
  let height = 0;

  if (str.length > size) {
    const arr = [];

    for (let i = 0; i < str.length; i += size) {
      arr.push(str.substring(i, i + size));
      arr.push("\n");
      height++;
    }
    return { text: arr.join(""), height: height };
  }
  return { text: str, height: height };
};

//pdf 출력 로직
const NanumGothic = NANUM_GOTHIC_BASE64;
const { jsPDF } = window.jspdf;

const getQuestionListPdf = () => {
  const items = $showQuestionList.getElementsByTagName("li");

  if (items.length) {
    const itemsArr = [...items];
    const doc = new jsPDF({
      unit: "mm",
      orientation: "p",
      format: "a4",
    });

    let startHeight = 0; //라인 별 시작 높이

    doc.addFileToVFS("nanumGothic.ttf", NanumGothic);
    doc.addFont("nanumGothic.ttf", "nanumGothic", "normal");
    doc.setFont("nanumGothic");

    itemsArr.forEach((item, i) => {
      const newlineItem = getNewlineItem(item.innerText, 38);
      doc.text(
        `${i + 1}. ${newlineItem.text}`,
        15,
        20 + 10 * (i + startHeight)
      );
      startHeight += newlineItem.height / 2;
    });

    doc.save("questionList.pdf");
    return;
  }
  alert("질문을 입력해주세요.");
};

document
  .getElementById("button-pdfdownload")
  .addEventListener("click", getQuestionListPdf);
//</pdf 인쇄하기>

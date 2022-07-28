// 타이머
const timer = document.querySelector("#Timer");
let time = 9;
let sec = "";
timer.innerText = "00" + ":" + "10";
let goTimeZero = function () {
  if (time > -1) {
    sec = time;
    timer.innerText = "00" + ":0" + sec;
    time--;
  }
  if (time === -1) {
    clearInterval(setTime);
    incorrect.classList.remove("hidden");
    setTimeout(function () {
      clearInterval(incorrect.classList.add("hidden"));
    }, 500);
    order++;
    getQuestion(arr[order]);
    time = 9;
    sec = "";
    timer.innerText = "00" + ":" + "10";
    setTime = setInterval(goTimeZero, 1000);
  }
};
let setTime = setInterval(goTimeZero, 1000);

const next = document.querySelector("#next");
const people = localStorage.getItem("commonsenseNum");
const question = document.createElement("div");
const choice1 = document.createElement("div");
const choice2 = document.createElement("div");
const quiz = document.querySelector(".question");
const choiceLeft = document.querySelector(".choice:nth-child(2)");
const choiceRight = document.querySelector(".choice:nth-child(3)");
quiz.appendChild(question);
choiceLeft.appendChild(choice1);
choiceRight.appendChild(choice2);

const correct = document.querySelector(".correct");
const incorrect = document.querySelector(".incorrect");

function getQuestion(num) {
  fetch("http://localhost:3000/close/api/commonsense")
    .then((res) => res.json())
    .then((data) => {
      nextQuiz(data, num);
      return data;
    })
    .catch(() => console.log("fetch 에러!"));
}
let score = 0;
localStorage.setItem("SCORE", score);
// 왼쪽 선택지가 정답일 때
function compareLeft(num) {
  fetch("http://localhost:3000/close/api/commonsense")
    .then((res) => res.json())
    .then((data) => {
      if (data[num].answer === data[num].choice1) {
        score++;
        localStorage.setItem("SCORE", score);
        setTimeout(correct.classList.remove("hidden"), 250);
        setTimeout(function () {
          clearInterval(correct.classList.add("hidden"));
        }, 500);
      } else {
        setTimeout(incorrect.classList.remove("hidden"), 250);
        setTimeout(function () {
          clearInterval(incorrect.classList.add("hidden"));
        }, 500);
      }
      return data;
    })
    .catch(() => console.log("fetch 에러!"));
}

// 오른쪽 선택지가 정답일 때
function compareRight(num) {
  fetch("http://localhost:3000/close/api/commonsense")
    .then((res) => res.json())
    .then((data) => {
      if (data[num].answer === data[num].choice2) {
        score++;
        localStorage.setItem("SCORE", score);
        setTimeout(correct.classList.remove("hidden"), 250);
        setTimeout(function () {
          clearInterval(correct.classList.add("hidden"));
        }, 500);
      } else {
        setTimeout(incorrect.classList.remove("hidden"), 250);
        setTimeout(function () {
          clearInterval(incorrect.classList.add("hidden"));
        }, 500);
      }
      return data;
    })
    .catch(() => console.log("fetch 에러!"));
}

// 퀴즈 질문, 선택지 출력
function nextQuiz(obj, num) {
  question.innerText = obj[num].quiz;
  choice1.innerText = obj[num].choice1;
  choice2.innerText = obj[num].choice2;
}

let array = localStorage.getItem("arrayCommon");
let arr = JSON.parse(array);
console.log(arr);

// 키보드 방향키로 정답 입력 및 다음 퀴즈
const player = localStorage.getItem("PLAYER");
let order = 0;
getQuestion(arr[0 + 5 * (player - 1)]);

window.addEventListener("keydown", (e) => {
  clearInterval(setTime);
  if (e.keyCode === 37) {
    compareLeft(arr[order + 5 * (player - 1)]);
  } else if (e.keyCode === 39) {
    compareRight(arr[order + 5 * (player - 1)]);
  }

  if (order < 5) order++;
  getQuestion(arr[order + 5 * (player - 1)]);
  console.log(arr[order + 5 * (player - 1)]);
  time = 9;
  sec = "";
  timer.innerText = "00" + ":" + "10";
  setTime = setInterval(goTimeZero, 1000);
  if (order === 5) {
    compareLeft(order[4 + 5 * (player - 1)]);
    compareRight(order[4 + 5 * (player - 1)]);
    location.href = "http://localhost:3000/close/ranking_save";
  }

  console.log(localStorage.getItem("SCORE"));
});

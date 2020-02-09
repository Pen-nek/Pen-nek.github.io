
// 변수를 여러개 선언 시 콤마로도 할 수 있다!
// querySelector : 객체의 자식을 탐색. 여기서 객체란 document
const clockContainer = document.querySelector(".js_clock"),
    clockTitle = clockContainer.querySelector("h1");

function getTime(){
    // 현재 시간 구하기
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    // 삼항 연산자는 if와 비슷함. // 조건식 ? true일 때 : false일 때
    clockTitle.innerText = `${
        hours < 10 ? `0${hours}` : hours
    }:${
        minutes < 10 ? `0${minutes}` : minutes
    }:${
        seconds < 10 ? `0${seconds}` : seconds
    }`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();

// 쿼리셀렉터는 해당하는 조건의 첫번째 요소를 가져옴
// 쿼리셀렉터올은 해당하는 조건의 모든 요소를 가져옴 (array)
const form = document.querySelector(".js_form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js_greeting");

// LS = localStorage
// CN = ClassName
const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit() {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();
[]

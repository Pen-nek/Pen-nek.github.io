const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList")

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    // ul에서 li삭제
    toDoList.removeChild(li);

    // filter() : forEach()처럼 array에 담겨있는 것들 각각에 한 번씩 함수를 실행
    // 조건에 맞는 아이템들만 가지고 새로운 array 생성
    const cleanToDos = toDos.filter(function(toDo) {
        console.log(toDo.id, li.id);
        // toDo : toDos에 들어있는 객체 하나
        // 삭제된 li와 다른 id를 가진 toDo만 리턴
        return toDo.id !== parseInt(li.id);
    });
    // 기존 array를 필터링 거친 array로 교체
    toDos = cleanToDos;
    saveToDos();

    console.log(cleanToDos);
}

function saveToDos() {
    // 자료형이 [Object object] 일 때 보기 편하려면 JSON.stringify!
    // JSON : JavaScript Object Notation
    // JS가 전달된 데이터를 다룰 수 있도록 Object(객체)로 바꿔주는 것
    //
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {

    const li = document.createElement("li");
    const delBtn = document.createElement("span");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    delBtn.style.cursor = "pointer";
    span.innerText = text + " ";

    li.appendChild(span);
    li.appendChild(delBtn);
    li.classList.add("css-li")
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    };

    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        // string을 JSON형태로 변경
        const parsedToDos = JSON.parse(loadedToDos);
        // forEach() : array에 담겨있는 것들 각각에 한 번씩 함수를 실행
        // 아래의 toDo는 파라미터 이름
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();

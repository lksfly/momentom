//querySelector는 element의 자식을 탐색한다.
const form = document.querySelector('.js-form'),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = 'currentUser',   //localstorage의 key값.   //로컬스토리지는 도메인 주소
    SHOWING_CN = 'showing';  //block

function paintGreeting(text){
    form.classList.remove(SHOWING_CN); //form을 지운다
    greeting.classList.add(SHOWING_CN); // h4 를 보여준다.
    greeting.innerHTML = `Hello ${text}` //h4의 내용을 채운다.

}

function saveName(text) {   //컴퓨터가 나를 기억하게 하는 법
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();  //event의 기본동작을 막는다.
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName () {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    }else{
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
    
}

init();



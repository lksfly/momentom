const toDoForm = document.querySelector('.js-toDoForm');
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';

let toDos = [];  //할일들을 담아놓는 array  submit하게되면 어레이에 할일 정보가 있는 toDoObj를 push

//이 함수의 역할은 toDos를 가져와서 local에 저장하는 것.
//알아야 할 것! localstorage에는 자바스크립트의 data(어레이, 오브젝트 등등)를 저장할 수 없다. 오직 문자열만 저장 가능! 
//자바스크립트는 localstorage에 있는 모든 데이터를 string으로 저장하려고 한다.
//따라서 우리는 object가 string이 되도록 만들어야 한다. -> JSON.stringify
//JSON.stringify은 자바스크립트 오브젝트를 string으로 바꿔준다!
function saveToDos () {  
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}


//버튼이 눌릴때 어떤 버튼이 눌리는지 알아야 함.
function deleteTodo(event) {  //버튼의 부모노드를 찾아
    //console.log(event.path[1].id);
    //console.log(event);
    // console.dir(event.target.parentNode);
    //console.log(event.target.parentNode.id);
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(todo){    //toDos 에있는 요소들 중 삭제할 아이디가 아닌 것들만 새로운 배열로 만들어 cleanToDos에 넣음.
        return parseInt(li.id) !== todo.id;
    });
    toDos = cleanToDos;  // 새로 만들어진 cleanTodos를 기존의 toDos에 넣음. 
    saveToDos();    //새로운 toDos를 로컬스토리지에 저장
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length+1;
    delBtn.innerHTML = "❌"
    delBtn.addEventListener('click',deleteTodo);   //❌버튼 누르면 deleteTodo 함수 실행해서 버튼의 부모노드인 리스트 삭제!
    span.innerHTML = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj ={    //todo를 오브젝트로 저장하는 이유 : localstorage에도 저장해야 하기 때문(localstorage의 형식은 key-value 형태이니까!)
        text: text,
        id: newId
    }
    toDos.push(toDoObj);
    saveToDos();
    
}

function handleSubmit1(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    if(currentValue !== ""){
        paintToDo(currentValue);
    }    
    toDoInput.value = "";
    
}
//로드할때 localstorage에 있는 데이터를 가져와야 하는데 위에 save할때 스트링으로 바꿔서
//저장했기 때문에 다시 JSON을 사용해서 오브젝트로 만들어줘야 함.
// JSON.parse(string);
//이다음엔 parsedToDos를 웹페이지 상에 보여줘야함.
//정리하면 toDos를 가져온 뒤, 이 라인에서는 가져온 것을 오브젝트로 변환해 줄 것이고(parse),
//forEach문을 통해 각각에 각각의 array요소(객체)에 대해서 paintToDo라는 함수를 실행 시킨다. 
 
function loadToDos(){  
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos===null){
        //할게 없음.
    }else{
        const parsedToDos = JSON.parse(loadedToDos); //localstorage에 저장되있는 것
        parsedToDos.forEach(function(todo){
            paintToDo(todo.text);
        })
        
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener('submit',handleSubmit1);

}    

init();
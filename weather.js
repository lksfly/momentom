const weather = document.querySelector('.js-weather');

const API_KEY = "3b397ceab4115c7da37af99e5fa67894";
const COORDS = 'coords';


//https://openweathermap.org/
function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
    
    //fetch를 통해 API에 요청하고 respond된 것을 활용할 수 있다. response된건 개발자도구 네트워크에서 확인가능.
    //실제로 자바스크립트가 어떻게 동작하는지, js의 네트워크가 어떻게 동작하는지
    //then함수 호출 -> 데이터가 우리한테 넘어왔을때 then함수가 호출됨.
    //then을 사용한 이유는 그 위에 fetch가 완료되길 기다려야 하기 때문.
    // 우리는 서버로부터 데이터가 들어올 때까지 기다여야함.
}

 function saveCoords(coordsObj) {
     localStorage.setItem(COORDS,JSON.stringify(coordsObj));
 }

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordObj = {
        latitude,   //키값과 밸류값이 같을때는 키값만 써주면 된다.
        longitude 
    }
    saveCoords(coordObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log('cant access geo location');
}

function askForCoords() {
    
    //geolocation 은 오브젝트임.
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);  //위치정보 읽어오기 성공했을때와 실패했을때의 각각의 콜백함수 실행.

}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();

    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        const lat = parsedCoords.latitude;
        const lng = parsedCoords.longitude;
        getWeather(lat, lng);
        
    }
}


function init(){
    loadCoords();


}

init()
//https://opentdb.com/api.php?amount=10&difficulty=easy&type=boolean

let mainForm = document.getElementById("triviaForm");
let container = document.getElementById("question-container")
let finalScore = document.getElementById("final-score")

let preguntas;
let q=0;
let correctAnswer;
let qType;
let score=0;

//Funciones
const createApiUrl= (e) => {
    e.preventDefault();

    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;
    let difficulty = document.getElementById("difficulty").value;
    let type = document.getElementById("type").value;

    const API = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`;
    const API2 = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    

    category === "0"? fetchDataAPI(API):fetchDataAPI2(API2);
    if(type === "boolean"){
        qType="bool";
    }else{
        qType="multi"
    }
    
}

const fetchDataAPI = url => {
        fetch(url)
        .then(response => response.json())
        .then(data => fillQuestions(data.results))
        .catch(error => console.log(error))
        
    }

const fetchDataAPI2 = url => {
    fetch(url)
        .then(response => response.json())
        .then(data => fillQuestions(data.results))
        .catch(error => console.log(error))
};

const fillQuestions = question => {
    console.log(question)
    preguntas = question;
    if(preguntas.length >0){
        showQuestions() 
    }
    
}

const showQuestions = () => {
        
    correctAnswer=preguntas[q].correct_answer;

    if(qType=== "multi"){

        let first =correctAnswer;
        let second=preguntas[q].incorrect_answers[0];
        let third =preguntas[q].incorrect_answers[1];
        let fourth=preguntas[q].incorrect_answers[2];

        let randArray=[first,second,third,fourth];
        let shuffledArray= randArray.sort((a,b) => 0.5 - Math.random());
        
        randomQ1= shuffledArray[0]
        randomQ2= shuffledArray[1]
        randomQ3= shuffledArray[2]
        randomQ4= shuffledArray[3]

        container.innerHTML="";
        container.innerHTML += `
    <div class="padding-left">
        <h4>${preguntas[q].question}</h4>
        <ul>
            <li><button class="btn-fnt" onClick="handleCheckAnswer(this)">${randomQ1}</button></li>
            <li><button class="btn-fnt" onClick="handleCheckAnswer(this)">${randomQ2}</button></li>
            <li><button class="btn-fnt" onClick="handleCheckAnswer(this)">${randomQ3}</button></li>
            <li><button class="btn-fnt" onClick="handleCheckAnswer(this)">${randomQ4}</button></li>
        </ul>
    </div>`
    }else if(qType === "bool"){

        let firstb =correctAnswer;
        let secondb=preguntas[q].incorrect_answers[0];

        let randArray=[firstb,secondb];
        let shuffledArray= randArray.sort((a,b) => 0.5 - Math.random());
        
        randomQ1= shuffledArray[0]
        randomQ2= shuffledArray[1]

        container.innerHTML="";
        container.innerHTML += `
    <div class="padding-left">
        <h4>${preguntas[q].question}</h4>
        <ul>
            <li><button class="btn-fnt" onClick="handleCheckAnswer(this)">${randomQ1}</button></li>
            <li><button class="btn-fnt" onClick="handleCheckAnswer(this)">${randomQ2}</button></li>
        </ul>
    </div>`
    }
}

const handleCheckAnswer= (button) => {
    if(button.innerText === correctAnswer){
        score++;
        console.log("correct")
    }else{
        console.log("incorrecto")
    }
    // console.log(button.innerText)
    if((preguntas.length -1) !== q){
        q++;
        showQuestions();
    } else{
        console.log("juego terminado")
        mainForm.classList.add("js-end")
        container.classList.add("js-end")
        finalScore.innerHTML = `
    <div>
        <h4> Game Over. Final Score: ${score} out of ${preguntas.length}</h4>
    </div>`
        setTimeout(() => {location.reload(),5000})
    }
}

    

//Eventos
mainForm.onsubmit = createApiUrl;


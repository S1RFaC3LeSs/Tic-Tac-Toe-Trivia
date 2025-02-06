function loadBoard(){
    let parent = document.getElementById("board");
    let childAmount = parent.childElementCount;

    let buttons = document.getElementsByClassName("controls");
    buttons[0].addEventListener('click', newGameHandler);

    for(let childCount = 0; childCount < childAmount; childCount++){
        parent.children[childCount].classList.add("square");
        parent.children[childCount].addEventListener('click', clickHandler);
        parent.children[childCount].addEventListener('mouseover', hoverHandler);
        parent.children[childCount].addEventListener('mouseout', hoverHandler);
    }
    return parent;
}

function isEmpty(position){
    return playerMoves[position] === "0";
}

function clickHandler(event){
    if(!win){
        let index = Array.from(loadBoard().children).indexOf(event.target);
        if(isEmpty(index)){
            askQuestion(index);
        }
    }
}

function askQuestion(index){
    let questionData = questions[index];
    let questionContainer = document.getElementById("question-container");
    let questionText = document.getElementById("question-text");
    let answerOptions = document.getElementById("answer-options");

    questionText.textContent = questionData.question;
    answerOptions.innerHTML = "";

    questionData.options.forEach((option, idx) => {
        let button = document.createElement("button");
        button.textContent = option;
        button.classList.add("btn");
        button.addEventListener("click", () => checkAnswer(index, idx));
        answerOptions.appendChild(button);
    });
    
    questionContainer.style.display = "block";
}

function checkAnswer(index, selectedOption){
    let correctAnswer = questions[index].correct;
    let selectedAnswer = String.fromCharCode(65 + selectedOption); // Convert index to A, B, C, etc.
    
    if(selectedAnswer === correctAnswer){
        nextMove(index);
        moveAmount++;
        if(moveAmount >= 3){
            winChecker();
        }
    } else {
        alert("Game Over! Try again.");
        newGameHandler();
    }
}

function nextMove(position){
    loadBoard().children[position].classList.add("X");
    loadBoard().children[position].innerHTML = "X";
    playerMoves = playerMoves.substring(0, position) + "1" + playerMoves.substring(position + 1);
}

function isHover(event){
    return event.type === "mouseover";
}

function hoverHandler(event){
    let index = Array.from(loadBoard().children).indexOf(event.target);
    if(isHover(event)){
        loadBoard().children[index].classList.add("hover");
    } else {
        loadBoard().children[index].classList.remove("hover");
    }
}

function winChecker(){
    for(let combo of winCombos){
        let match = true;
        for(let i = 0; i < 9; i++){
            if(combo[i] === "1" && playerMoves[i] !== "1"){
                match = false;
                break;
            }
        }
        if(match){
            document.getElementById("status").classList.add("you-won");
            document.getElementById("status").innerHTML = "Congratulations! You're a Winner!";
            win = true;
            break;
        }
    }
}

function newGameHandler(){
    playerMoves = "000000000";
    moveAmount = 0;
    win = false;
    document.getElementById("status").classList.remove("you-won");
    document.getElementById("status").innerHTML = "Click on a square to play";

    for(let child of loadBoard().children){
        child.classList.remove("X");
        child.innerHTML = "";
    }

    document.getElementById("question-container").style.display = "none";
}

const questions = [
    { question: "When did The Sexual Harassment Prevention & Protection Act, 2021 take effect?", options: ["A) October 1, 2021", "B) March 27, 2022", "C) July 3, 2023", "D) February 14, 2024"], correct: "C" },
    { question: "Who has access to a sexual harassment complaint?", options: ["A) Everyone", "B) Sexual Harassment Complaints Coordinator (SHCC)", "C) The Principal", "D) Minister of Religion"], correct: "B" },
    { question: "Where can I file a sexual complaint?", options: ["A) reportsexualharassment@uwimona", "B) Cafe", "C) Bursary", "D) Church"], correct: "A" },
    { question: "Which of the following is a type of sexual harassment?", options: ["A) Walking", "B) Eye-Contact", "C) Stalking", "D) Texting"], correct: "C" },
    { question: "What are the consequences of filing a false complaint?", options: ["A) Fine not exceeding 1 million dollars AND imprisonment for a term not exceeding three months", "B) Fine not exceeding 1 hundred thousand dollars AND imprisonment for a term not exceeding one month", "C) Fine not exceeding 1 million dollars OR imprisonment for a term not exceeding three months", "D) Imprisonment for 6 months"], correct: "C" },
    { question: "What is the Definition of Sexual Harassment?", options: ["A) The making of any unwelcome sexual advance towards a person, by another person.", "B) Someone telling you their likes and dislikes", "C) Someone telling you how they feel", "D) The perception of someone looking at you the wrong way"], correct: "A" },
    { question: "When can an allegation of sexual harassment be filed?", options: ["A) within 6 years of the occurrence of the alleged incident of sexual harassment.", "B) 7 weeks", "C) 6 months", "D) By End of the Semester the incident was committed"], correct: "A" },
    { question: "Can you file a complaint for another person?", options: ["A) No, only a person directly involved can file", "B) Yes, you can file if you're a witness", "C) Yes, if you're associated with the victim", "D) No, because you may be biased"], correct: "A" },
    { question: "If you are accused of sexual harassment what is the deadline to write a response?", options: ["A) 1 Week", "B) 2 Weeks", "C) 24 Days", "D) 10 Days"], correct: "B" }
];

const winCombos = [
    "111000000",
    "111100000",
    "111010000",
    "111001000",
    "111000100",
    "111000010",
    "111000001",
    "111100010",
    "111100001",
    "111010100",
    "111010001",
    "111001100",
    "111001010",

    "000111000",
    "100111000",
    "010111000",
    "001111000",
    "000111100",
    "000111010",
    "000111001",
    "100111010",
    "100111001",
    "010111100",
    "010111001",
    "001111100",
    "001111010",

    "000000111",
    "100000111",
    "010000111",
    "001000111",
    "000100111",
    "000010111",
    "000001111",
    "100010111",
    "100001111",
    "010100111",
    "010001111",
    "001100111",
    "001010111",

    "100100100",
    "110100100",
    "101100100",
    "100110100",
    "100101100",
    "100100110",
    "100100101",
    "110110100",
    "110101100",
    "110100110",
    "110100101",
    "101110100",
    "101101100",
    "101100110",
    "101100101",

    "010010010",
    "110010010",
    "011010010",
    "010110010",
    "010011010",
    "010010110",
    "010010011",
    "110110010",
    "110011010",
    "110010110",
    "110010011",
    "011110010",
    "011011010",
    "011010110",
    "011010011",
    "010110110",
    "010110011",
    "010011110",
    "010011011",

    "001001001",
    "101001001",
    "011001001",
    "001101001",
    "001011001",
    "001001101",
    "001001011",
    "101101001",
    "101011001",
    "101001101",
    "101001011",
    "011101001",
    "011011001",
    "011001101",
    "011001011",
    "001101101",
    "001101011",
    "001011101",
    "001011011",

    "100010001",
    "110010001",
    "101010001",
    "100110001",
    "100011001",
    "100010101",
    "100010011",
    "110110001",
    "110011001",
    "110010101",
    "110010011",
    "101110001",
    "101011001",
    "101010101",
    "101010011",
    "100110101",
    "100110011",
    "100011101",
    "100011011",

    "001010100",
    "101010100",
    "011010100",
    "001110100",
    "001011100",
    "001010110",
    "001010101",
    "101110100",
    "101011100",
    "101010110",
    "101010101",
    "011110100",
    "011011100",
    "011010110",
    "011010101",
    "001110110",
    "001110101",
    "001011110",
    "001011101",
    
    ];

var win = false;
var playerMoves = "000000000";
var moveAmount = 0;

window.onload = loadBoard;

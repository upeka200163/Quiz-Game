const questions = [
   { 
        question: "Which keyword is used to inherit a class in Java?", 
        answers: [
            {text:"implements",c:false},
            {text:"extends",c:true},
            {text:"inherits",c:false},
            {text:"this",c:false}
        ] 
    },
    { 
        question: "What is the process of hiding internal details and showing functionality?", 
        answers: [
            {text:"Encapsulation",c:false},
            {text:"Abstraction",c:true},
            {text:"Polymorphism",c:false},
            {text:"Inheritance",c:false}
        ] 
    },
    { 
        question: "Which of these is NOT a pillar of OOP?", 
        answers: [
            {text:"Inheritance",c:false},
            {text:"Polymorphism",c:false},
            {text:"Compilation",c:true},
            {text:"Encapsulation",c:false}
        ] 
    },
    { 
        question: "What is it called when two or more methods in the same class have the same name but different parameters?", 
        answers: [
            {text:"Method Overriding",c:false},
            {text:"Method Overloading",c:true},
            {text:"Encapsulation",c:false},
            {text:"Abstraction",c:false}
        ] 
    },
    { 
        question: "Which access modifier makes a variable visible only within its own class?", 
        answers: [
            {text:"public",c:false},
            {text:"protected",c:false},
            {text:"default",c:false},
            {text:"private",c:true}
        ] 
    },
    { 
        question: "What does the 'super' keyword refer to in Java?", 
        answers: [
            {text:"Current class object",c:false},
            {text:"Parent class object",c:true},
            {text:"Static method",c:false},
            {text:"Final variable",c:false}
        ] 
    },
    { 
        question: "Which keyword is used to define a constant variable in Java?", 
        answers: [
            {text:"static",c:false},
            {text:"const",c:false},
            {text:"final",c:true},
            {text:"fixed",c:false}
        ] 
    },
    { 
        question: "Which concept allows one interface to be used for a general class of actions?", 
        answers: [
            {text:"Polymorphism",c:true},
            {text:"Inheritance",c:false},
            {text:"Abstraction",c:false},
            {text:"Encapsulation",c:false}
        ] 
    },
    { 
        question: "Can an abstract class have a constructor?", 
        answers: [
            {text:"Yes",c:true},
            {text:"No",c:false},
            {text:"Only if it's static",c:false},
            {text:"Only if it's private",c:false}
        ] 
    },
    { 
        question: "Which of these is used to achieve 100% abstraction in Java?", 
        answers: [
            {text:"Abstract Class",c:false},
            {text:"Interface",c:true},
            {text:"Final Class",c:false},
            {text:"Static Method",c:false}
        ] 
    }
];

let currentIndex = 0;
let score = 0;

// DOM Elements
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const qText = document.getElementById('question-text');
const ansBtns = document.getElementById('answer-buttons');
const pBar = document.getElementById('progress-bar');

// Sounds
const bgMusic = document.getElementById('bg-music');
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');

// Start Quiz
startBtn.onclick = () => {
    currentIndex = 0;
    score = 0;
    startScreen.classList.add('hide');
    resultScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    bgMusic.volume = 0.2;
    bgMusic.play();
    showQuestion();
};

// Restart Quiz
restartBtn.onclick = () => {
    resultScreen.classList.add('hide');
    startScreen.classList.remove('hide');
    bgMusic.pause();
    bgMusic.currentTime = 0;
};

// Show Question
function showQuestion() {
    ansBtns.innerHTML = '';
    let q = questions[currentIndex];

    qText.innerText = q.question;
    document.getElementById('question-number').innerText =
        `Question ${currentIndex + 1} of ${questions.length}`;
    document.getElementById('score-display').innerText =
        `Score: ${score}`;

    pBar.style.width = `${(currentIndex / questions.length) * 100}%`;

    q.answers.forEach(a => {
        const btn = document.createElement('button');
        btn.innerText = a.text;
        btn.classList.add('answer-btn');

        btn.onclick = () => {
            if (a.c) {
                btn.classList.add('correct');
                score++;
                correctSound.play();
            } else {
                btn.classList.add('wrong');
                wrongSound.play();
            }

            // Disable all buttons
            Array.from(ansBtns.children).forEach(b => b.disabled = true);

            setTimeout(() => {
                currentIndex++;
                currentIndex < questions.length ? showQuestion() : showResult();
            }, 1000);
        };

        ansBtns.appendChild(btn);
    });
}

// Show Result
function showResult() {
    quizScreen.classList.add('hide');
    resultScreen.classList.remove('hide');
    pBar.style.width = '100%';

    document.getElementById('final-score-text').innerText =
        `You scored ${score} out of ${questions.length}`;

    document.getElementById('feedback-message').innerText =
        score >= 7 ? "Excellent Job! 🎉" : "Good effort! Keep learning! 💪";
}

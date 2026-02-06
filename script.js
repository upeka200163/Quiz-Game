/* =========================================
   QUIZ DATA (Java OOP Questions)
   ========================================= */
const questions = [
    { 
        question: "Which keyword is used to inherit a class in Java?", 
        answers: [
            {text:"implements", c:false},
            {text:"extends", c:true},
            {text:"inherits", c:false},
            {text:"this", c:false}
        ] 
    },
    { 
        question: "What is the process of hiding internal details and showing functionality?", 
        answers: [
            {text:"Encapsulation", c:false},
            {text:"Abstraction", c:true},
            {text:"Polymorphism", c:false},
            {text:"Inheritance", c:false}
        ] 
    },
    { 
        question: "Which of these is NOT a pillar of OOP?", 
        answers: [
            {text:"Inheritance", c:false},
            {text:"Polymorphism", c:false},
            {text:"Compilation", c:true},
            {text:"Encapsulation", c:false}
        ] 
    },
    { 
        question: "What is it called when two or more methods in the same class have the same name but different parameters?", 
        answers: [
            {text:"Method Overriding", c:false},
            {text:"Method Overloading", c:true},
            {text:"Encapsulation", c:false},
            {text:"Abstraction", c:false}
        ] 
    },
    { 
        question: "Which access modifier makes a variable visible only within its own class?", 
        answers: [
            {text:"public", c:false},
            {text:"protected", c:false},
            {text:"default", c:false},
            {text:"private", c:true}
        ] 
    },
    { 
        question: "What does the 'super' keyword refer to in Java?", 
        answers: [
            {text:"Current class object", c:false},
            {text:"Parent class object", c:true},
            {text:"Static method", c:false},
            {text:"Final variable", c:false}
        ] 
    },
    { 
        question: "Which keyword is used to define a constant variable in Java?", 
        answers: [
            {text:"static", c:false},
            {text:"const", c:false},
            {text:"final", c:true},
            {text:"fixed", c:false}
        ] 
    },
    { 
        question: "Which concept allows one interface to be used for a general class of actions?", 
        answers: [
            {text:"Polymorphism", c:true},
            {text:"Inheritance", c:false},
            {text:"Abstraction", c:false},
            {text:"Encapsulation", c:false}
        ] 
    },
    { 
        question: "Can an abstract class have a constructor?", 
        answers: [
            {text:"Yes", c:true},
            {text:"No", c:false},
            {text:"Only if it's static", c:false},
            {text:"Only if it's private", c:false}
        ] 
    },
    { 
        question: "Which of these is used to achieve 100% abstraction in Java?", 
        answers: [
            {text:"Abstract Class", c:false},
            {text:"Interface", c:true},
            {text:"Final Class", c:false},
            {text:"Static Method", c:false}
        ] 
    }
];

let currentIndex = 0;
let score = 0;

/* =========================================
   DOM ELEMENTS
   ========================================= */
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const qText = document.getElementById('question-text');
const ansBtns = document.getElementById('answer-buttons');
const pBar = document.getElementById('progress-bar');
const qNumberText = document.getElementById('question-number');
const scoreText = document.getElementById('score-display');

/* =========================================
   AUDIO ELEMENTS
   ========================================= */
const bgMusic = document.getElementById('bg-music');
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');

/* =========================================
   GAME LOGIC
   ========================================= */

// Start Quiz function
startBtn.onclick = () => {
    currentIndex = 0;
    score = 0;
    startScreen.classList.add('hide');
    resultScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    
    // Background music settings
    if(bgMusic) {
        bgMusic.volume = 0.2;
        bgMusic.play().catch(e => console.log("Audio play blocked by browser"));
    }
    
    showQuestion();
};

// Restart Quiz function
restartBtn.onclick = () => {
    resultScreen.classList.add('hide');
    startScreen.classList.remove('hide');
    if(bgMusic) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
    }
};

// Function to display questions
function showQuestion() {
    ansBtns.innerHTML = '';
    let q = questions[currentIndex];

    qText.innerText = q.question;
    qNumberText.innerText = `Question ${currentIndex + 1} of ${questions.length}`;
    scoreText.innerText = `Score: ${score}`;

    // Progress bar logic
    let progressPercent = ((currentIndex) / questions.length) * 100;
    pBar.style.width = `${progressPercent}%`;

    q.answers.forEach(a => {
        const btn = document.createElement('button');
        btn.innerText = a.text;
        btn.classList.add('answer-btn');

        btn.onclick = () => {
            // Disable all buttons immediately to prevent multiple clicks
            Array.from(ansBtns.children).forEach(b => b.disabled = true);

            if (a.c) {
                btn.classList.add('correct');
                score++;
                if(correctSound) correctSound.play();
            } else {
                btn.classList.add('wrong');
                if(wrongSound) wrongSound.play();
                
                // Optional: Show the correct answer automatically
                Array.from(ansBtns.children).forEach(b => {
                    // This finds the correct answer in the UI and highlights it
                    let answerData = q.answers.find(ans => ans.text === b.innerText);
                    if(answerData && answerData.c) b.classList.add('correct');
                });
            }

            // Update score display immediately
            scoreText.innerText = `Score: ${score}`;

            // Wait for 1 second and go to next question
            setTimeout(() => {
                currentIndex++;
                if (currentIndex < questions.length) {
                    showQuestion();
                } else {
                    showResult();
                }
            }, 1200);
        };

        ansBtns.appendChild(btn);
    });
}

function showResult() {
    // 1. Quiz screen එක හංගන්න
    quizScreen.classList.add('hide'); 
    
    // 2. Result screen එක පෙන්වන්න
    resultScreen.classList.remove('hide'); 
    
    // 3. Progress bar එක සම්පූර්ණයෙන්ම පුරවන්න
    pBar.style.width = '100%';

    // 4. ලකුණු පෙන්වන Text එක update කරන්න
    const scoreElement = document.getElementById('final-score-text');
    if(scoreElement) {
        scoreElement.innerText = `You scored ${score} out of ${questions.length}`;
    }

    // 5. display to Feedback message 
    const feedback = document.getElementById('feedback-message');
    if (feedback) {
        if (score >= 7) {
            feedback.innerText = "Excellent Job! 🎉";
            feedback.style.color = "#2e7d32";
        } else {
            feedback.innerText = "Good effort! Keep learning! 💪";
            feedback.style.color = "#e65100";
        }
    }
}
const keyboard_container = document.querySelector(".keyboard_container");
const word_container = document.querySelector(".word_container");

import { WORDS, KEYS } from "./words.js";

let guessWord = "";
let userLetters = [];

let correctCounter = 0;
let counter = 0;

SetButtons();
GenerateWord();
KeyPress();

function GenerateWord() {
  const randomWord = WORDS[Math.floor(Math.random() * WORDS.length - 1)];

  for(let i = 0; i < randomWord.length; i++) {
    const word = document.createElement("div");
    const wordLetter = document.createElement("p");
    const wordUnderline = document.createElement("div");

    guessWord += randomWord[i];

    word.classList.add("word");
    wordUnderline.classList.add("word_underline")
    word.append(wordLetter);
    word.append(wordUnderline);

    word_container.append(word);

    userLetters.push("");
  }
}

function SetButtons() {
  for(let i = 0; i < KEYS.length; i++) {
    const key = document.createElement("button");
    key.textContent = KEYS[i].toUpperCase();
    key.classList.add("btn");
    keyboard_container.append(key);
  }
}

function KeyPress() {
  let buttons = document.querySelectorAll(".btn");
  
  buttons.forEach(button => {
    button.addEventListener("click", () => CheckKey(button.textContent), { once: true })
  });

  document.addEventListener("keyup", (e) => CheckKey(e.key));
}

function CheckKey(button) {
  const currentGuess = button.toLowerCase();
  const UI_Words = document.getElementsByTagName("p");

  let allKeys = document.querySelectorAll(".btn");
  let clickedBtn = null;
    
  for(let i = 0; i < allKeys.length; i++) {
    if(allKeys[i].textContent == currentGuess.toUpperCase()) {
        clickedBtn = allKeys[i];
    }

    if(clickedBtn && (clickedBtn.classList.contains("crossed") || clickedBtn.classList.contains("checked"))) {
      return;
    }
  }

  if(counter >= 6 || correctCounter >= guessWord.length) {
    return;
  } else {
    if(guessWord.includes(currentGuess)) {
      for(let i = 0; i < guessWord.length; i++) {
        if(guessWord[i] == currentGuess) {
          console.log(UI_Words);
          UI_Words[i].textContent = currentGuess.toUpperCase();
          userLetters[i] = currentGuess;
          correctCounter++;
          clickedBtn.classList.add("checked");
        }
      }
    } else {
      if(!clickedBtn) return;
      clickedBtn.classList.add("crossed");
      counter++;
      DrawHangMan();
    }
  }

  CheckResult();

  console.log(guessWord)
}

function CheckResult() {
  const Result = document.getElementById("result");

  let userWord = "";
  
  for(let i = 0; i < userLetters.length; i++) {
    userWord += userLetters[i];
  }

  if(userWord == guessWord && counter < 6) {
    Result.textContent = "Congradulations you won, refresh the page to play again!";
    return;
  } else if(counter >= 6) {
    Result.textContent = "You have lost, refresh to try again!";
    const UI_Words = document.getElementsByTagName("p");
    for(let i = 0; i < UI_Words.length; i++) {
      if(UI_Words[i].textContent == "") {
        UI_Words[i].style.color = "red";
        UI_Words[i].textContent = guessWord[i].toUpperCase();
      }
    }
    return;
  }
}

function DrawHangMan() {
  const head = document.querySelector(".guess_body_head");
  const torso = document.querySelector(".guess_body_torso");
  const arm1 = document.querySelector(".guess_body_arm1");
  const arm2 = document.querySelector(".guess_body_arm2");
  const leg1 = document.querySelector(".guess_body_leg1");
  const leg2 = document.querySelector(".guess_body_leg2");

  if(counter == 1) head.style.display = "block";
  if(counter == 2) torso.style.display = "block";
  if(counter == 3) leg2.style.display = "block";
  if(counter == 4) leg1.style.display = "block";
  if(counter == 5) arm1.style.display = "block";
  if(counter == 6) arm2.style.display = "block";
}
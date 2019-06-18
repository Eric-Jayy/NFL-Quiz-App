'use strict';

let datasource = STORE;
let currentQuestion = 0;

let score = 0;

// creates item HTML
function generateItemElement(item) {
  return `
      <div id="quiz-section">
        <div class="row">
          <legend><h3 class="question"></legend>
            ${datasource[item].question}
        </h3>
          <a><img class="logo" src="http://icons.iconarchive.com/icons/astahrr/nfl/128/NFL-icon.png" alt="NFL logo"/></a>
        </div>
        <section class="options">
            <button type="button" class="answer">${datasource[item].answers[0]}</button>
            <button type="button" class="answer">${datasource[item].answers[1]}</button>
            <button type="button" class="answer">${datasource[item].answers[2]}</button>
            <button type="button" class="answer">${datasource[item].answers[3]}</button>
        </section>
      </div>
      <div class="row answer-list">
        <div id="correctAnswer">Correct!</div>
        <div id="incorrectAnswer">Incorrect. The correct answer is ${datasource[item].correctAnswer}.</div>
        <button type="button" class="answer continue">Continue</button>
      </div>
      `
  }

// function to push item to page
function displayQuestion(item) {
  let htmlcontent = generateItemElement(item);
  $('.js-main').html(htmlcontent);
  // alert(htmlcontent+ " pushed to page");
}

// add function to reset score
function resetScore() {
  score = 0;
}

function resetcurrentQuestion() {
    currentQuestion = 0;
}

// function to listen for start game click
function handleStartClick() {
  $("html").on('click', ".start-button", event => {
    // reset background
    $('html').css("background", "url(footballfield.jpg)");
    $('html').css("background-size", "contain");

    $('.start-button').hide();
    // reset score
    resetScore();
    // push score to HTML
    $('.score').html('SCORE: '+score+'/6');
    // reset currentQuestion
    resetcurrentQuestion();
    // push question to page
    displayQuestion(currentQuestion);
  });
}

// endquiz function
function endQuiz() {
  $('.score').text("Your score is: " + score + '/6');
    if (score >= 4) {
        $('.js-main').text('THROUGH THE UPRIGHTS AND GOOD!!!');
    } else if (score <= 3) 
    $('.js-main').text("LOOKS LIKE YOU MISSED THIS WIDE LEFT, GO AHEAD AND TRY AGAIN");
  // show the start button again
  $(".start-button").html('RETRY');
  $('.start-button').show();
}

// listen for continue click
function listenForContinue(){
  $(".js-main").on('click',".continue", event => {
    if ((currentQuestion + 1) < datasource.length) {
        currentQuestion += 1;
            $('#quiz-section').show();
            displayQuestion(currentQuestion);
          }
          // once the questions are all answered, run endquiz function
          else {
            endQuiz();
          }
  });
}

// Add function to listen for answers to question in clicks
function listenForAnswer() {
    $(".js-main").on('click',".answer", event => {
      
      // hide the answers
      $('#quiz-section').hide();
      
      // if the index of the amswer matches the correct answer, then increase score
      
      if ($(event.currentTarget).text() == datasource[currentQuestion].correctAnswer) {
        score += 1;
        // make correctAnswer visible and continue button visible
        $('#correctAnswer').show();
        $('.continue').show();
         $('.score').html('SCORE: '+score+'/6');
      }
      // if the index of the answer doesn't match the correct answer, then 0 point
      else {
        $('#incorrectAnswer').show();
        $('.continue').show();
        // make incorrectAnswer and continue button visible
      }
      // if there is another question to be asked, loop and use the next key/value pair
    });
}

// load functions on page load

function pageLoad(){
$(handleStartClick);
$(listenForAnswer);
$(listenForContinue);
}

$(pageLoad);
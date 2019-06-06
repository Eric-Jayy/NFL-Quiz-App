const myQuestions = [
	{
	 'question':'Where did Tom Brady attend college?',
	 'answers': [            
        'Michigan', 
        'Notre Dame', 
        'USC', 
        'Boise St.'
    ],
   'correct': 0
	},
	{
	 'question': 'How many teams are in the NFL?',
	 'answers': [
        '30', 
        '32', 
        '34', 
        '36'
    ],
	 'correct':  1
	},
	{
	 'question': 'What team has the most SuperBowls?',
	 'answers': [
        'NY Giants',
        'Green Bay Packers', 
        'Pittsburgh Steelers', 
        'SF 49ers'
    ],
	 'correct':  2
	},
	{
	'question': 'What year did the NFL begin?',
	'answers': [
        '1910', 
        '1920', 
        '1930', 
        '1940'
    ],
	'correct':  1
	},
	{
	'question': 'How many points does a touchdown equal to?',
    'answers': [
        '2', 
        '3', 
        '6', 
        '7'
    ],
	'correct': 2
	},
	{
	 'question':'What is the name of the current team that resides in Chicago, Illinois?',
	 'answers': [    
        'Cardinals',
        'Cubs',
        'Fire',
        'Bears'
    ],
	 'correct': 3
	}
	];

var score = 0;
var current = 0;

$(document).ready(function(){
  // Create an event listener to listen for a click on the Start Quiz button
  $(".start-button").click(function(){
     $('.start-quiz').hide();
     $('.next').hide();
     $('.questions').show();
     displayQuestion();
      $('.score').text('Current Score: '+score);
    console.log("Start Quiz button clicked");
  });
  
  // Create an event listener to listen for a click on the Next button
  $(".next-button").click(function(event){
    console.log("Next button clicked");
    displayQuestion();
    $('.next').hide();
    $('.submit').show();
  });
  
  $(".submit-button").click(function(event){
    if($('li.selected').length){
      var answer = $('li.selected').attr('id');
      checkAnswer(answer);
      $('.next').show();
      $('.submit').hide();
    } else {
      alert('Please select an answer');
    }
  });
  
  // Create an event listener to listen for a click on the Retake button and refresh the page
  $(".retake-button").click(function(){
  location.reload();
    console.log("Retake button clicked");
  });
  
  //Click listener when clicking on a list item to change the color of the background
  $('ul.list').on('click', 'li', function(event) {
    $('.selected').removeClass();
    $(this).addClass('selected');
  });
  
});

//***************FUNCTIONS**************
function displayQuestion(){
  $('.question-number').text('Question Number: '+(current + 1)+"/6" );
  if(current < myQuestions.length){
    var listQuestion = myQuestions[current];
    $('h2').text(listQuestion.question);
    $('ul.list').html('');
    for (var i = 0; i < listQuestion.answers.length; i++) {
      $('ul.list').append('<li id = "'+i+'">'+listQuestion.answers[i] +'</li>');
    }
  } else {
    // show summary that says how many you got correct
    displayScore();
  }
}

// Checks answer from the array to see if the one chosen is the one that is correct
function checkAnswer(answer){
  var listQuestion = myQuestions[current];
  if(listQuestion.correct == answer){
    score++;
    $('li.selected').addClass('correct');
  } else {
    $('li.selected').addClass('incorrect');
    $('listQuestion.correct').addClass('correct');
  }
  $('.score').text('Current Score: '+score);
  current++;
}

//Display score
function displayScore(){
  $('.questions').hide();
  $('.end-quiz').show();
  $('.end-score').text("Your score is: " +score + '/6');
  if(score >= 4){
    $('.comment').text('GREAT JOB!');
  }
}
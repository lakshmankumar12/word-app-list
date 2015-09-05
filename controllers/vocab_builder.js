var todoApp = angular.module("vocab_builder");

var current_result = {
   'question' : "Question",
   'choice1'  : "Choice1",
   'choice2'  : "Choice2",
   'choice3'  : "Choice3",
   'choice4'  : "Choice4",
   'choice5'  : "Choice5"
};

var totalQuestions = 5000;
var unAsked = Array.apply(0, Array(totalQuestions)).map(function (x, y) { return y + 1; });

function getAlternateWords(word) {
  var i = 0;
  var result = [];
  for (i=0;i<4;i++) {
    var done = 0;
    while (!done) {
      var random = Math.floor(Math.random() * totalQuestions);
      var found_index = result.indexOf(random);
      if ( random != word && found_index == -1 ) {
        result.push(random);
        done = 1;
      }
    }
  }
  return result
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

todoApp.constant("dataUrl", "word-list?word-number=")
  .controller("vocab_builder_controller", function ($scope) {
    $scope.current_result = current_result;

    var totalAsked = 0;
    var totalRight = 0;
    var rightAnswer = 0;

    $scope.answered = 0;
    $scope.answer_result = "your answer is being checked";

    $scope.getNextQuestion = function () {
       var question_index = Math.floor(Math.random() * unAsked.length);
       var question = unAsked[question_index];
       unAsked.splice(question_index,1);

       var choices = getAlternateWords(question);
       choices.push(question);
       shuffle(choices);
       rightAnswer = choices.indexOf(question);

       var nextQuestion = {
          'question' : question,
          'choice1'  : choices[0],
          'choice2'  : choices[1],
          'choice3'  : choices[2],
          'choice4'  : choices[3],
          'choice5'  : choices[4]
       }

       $scope.current_result = nextQuestion;
       $scope.answered = 0;
    }

    $scope.checkAnswer = function (answer) {
      if (answer == rightAnswer) {
        $scope.answer_result = "Your answer is right";
      } else {
        $scope.answer_result = "Your answer is wrong";
      }
      $scope.answered = 1;
    }

    $scope.getNextQuestion();
});

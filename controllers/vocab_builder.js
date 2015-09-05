var todoApp = angular.module("vocab_builder");

var current_result = {
   'question' : "Question",
   'choice0'  : "Choice1",
   'choice1'  : "Choice2",
   'choice2'  : "Choice3",
   'choice3'  : "Choice4",
   'choice4'  : "Choice5"
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

function getUrlForWord(word) {
  url = "word-list?wordNumber=" + word;
  return url;
}

todoApp.controller("vocab_builder_controller", function ($scope, $http) {
    $scope.current_result = current_result;

    $scope.totalAsked = 0;
    $scope.rightAnswer = 0;
    $scope.rightPercent = 0;

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
          'question' : 'Fetching Question',
          'choice0'  : 'Fetching choices',
          'choice1'  : 'Fetching choices',
          'choice2'  : 'Fetching choices',
          'choice3'  : 'Fetching choices',
          'choice4'  : 'Fetching choices'
       }

       for (var i = 0 ; i < 5 ; i++) {
         $http.get(getUrlForWord(choices[i])).
           success((function (i) {
               return function(data) {
               var word = data;
               nextQuestion['choice' + i] = word[0]['meaning'];
               if (i == rightAnswer) {
                 wordMeaning = word[0]['word'];
                 nextQuestion['question'] = wordMeaning.charAt(0).toUpperCase() + wordMeaning.slice(1);
               }
               $scope.current_result = nextQuestion;
             }
           })(i))
           .error(function (error) {

           });
       }

       $scope.current_result = nextQuestion;
       $scope.answered = 0;

       $scope.totalAsked += 1;
    }

    $scope.checkAnswer = function (answer) {
      if (answer == rightAnswer) {
        $scope.answer_result = "Your answer is right";
        if ($scope.answered == 0) {
          $scope.rightAnswer += 1;
          $scope.rightPercent = ($scope.rightAnswer * 100.0/ $scope.totalAsked)
        }
      } else {
        $scope.answer_result = "Your answer is wrong";
      }
      $scope.answered = 1;
    }

    $scope.getNextQuestion();
});

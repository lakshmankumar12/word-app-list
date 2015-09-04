var todoApp = angular.module("vocab_builder");

var current_result = {
   'question' : "Question",
   'choice1'  : "Choice1",
   'choice2'  : "Choice2",
   'choice3'  : "Choice3",
   'choice4'  : "Choice4"
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

todoApp.constant("dataUrl", "http://localhost:2403/word-list")
  .controller("vocab_builder_controller", function ($scope) {
    $scope.current_result = current_result;

    $scope.getNextQuestion = function () {
       var question_index =Math.floor(Math.random() * unAsked.length);
       var question = unAsked[question_index];
       unAsked.splice(question_index,1);

       var choices = getAlternateWords(question);

       var nextQuestion = {
          'question' : question,
          'choice1'  : choices[0],
          'choice2'  : choices[1],
          'choice3'  : choices[2],
          'choice4'  : choices[3]
       }

       $scope.current_result = nextQuestion;
    }

    $scope.getNextQuestion();
});

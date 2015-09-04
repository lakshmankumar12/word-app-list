var todoApp = angular.module("vocab_builder");

var current_result = {
   'question' : "Question",
   'choice1'  : "Choice1",
   'choice2'  : "Choice2",
   'choice3'  : "Choice3",
   'choice4'  : "Choice4"
};

todoApp.constant("dataUrl", "http://localhost:2403/word-list")
  .controller("vocab_builder_controller", function ($scope) {
    $scope.current_result = current_result;
});

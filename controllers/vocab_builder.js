var model = {
    question: "Adam",
    items: [{ action: "Buy Flowers", done: false },
                { action: "Get Shoes", done: false },
                { action: "Collect Tickets", done: true },
                { action: "Call Joe", done: false }]
};

var todoApp = angular.module("vocab_builder");

todoApp.constant("dataUrl", "http://localhost:2403/word-list")
  .controller("vocab_builder_controller", function ($scope) {
    $scope.current_result.question = "Question";
    $scope.current_result.choice1  = "Choice1";
    $scope.current_result.choice2  = "Choice2";
    $scope.current_result.choice3  = "Choice3";
    $scope.current_result.choice4  = "Choice4";

});

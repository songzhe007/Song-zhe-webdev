
(function () {
    angular
        .module("WebAppMaker")
        .controller("HomeController", HomeController);

    function HomeController(currentUser) {
        var vm = this;
        vm.currentUser = currentUser;

        if(currentUser){
                vm.message="You are currently logged in";
            } else{
                vm.message="You are not logged in";
            }
            return;
        }




})();
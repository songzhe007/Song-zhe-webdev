(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = function (username, password) {
            UserService
                .findUserByCredentials(username, password)
                .then(login);


            function login(found) {
                if(found !== "") {
                    $location.url('/user/' + found._id);
                } else {
                    vm.message = "Username doesn't exist";
                }
            }
        };
    }

    function RegisterController($location, UserService) {
        var vm = this;


        vm.register = register;

        function register(username, password, vpassword) {

            if(password !== vpassword) {
                vm.error = "Passwords doesn't match";
                return;
            }

            var exist = UserService.findUserByUsername(username);

            if(exist !== null) {
                vm.error = "Username is already exist";
            } else {
                var user = {
                    username: username,
                    password: password,

                };

                UserService
                    .createUser(user)
                    .then(function (user) {
                        $location.url('/user/' + user._id);
                    });
            }
        }
    }

    function ProfileController($routeParams,UserService,$location) {
        var vm = this;
        var uid = $routeParams.uid;

        UserService
            .findUserById(uid)
            .then(renderUser);

        function renderUser(user) {
            vm.user = user;
        }

        vm.updateUser = updateUser;
        vm.removeUser = removeUser;

        function updateUser(user) {

            UserService
                .updateUser(user._id,user)
                .then(function(newuser) {
                    model.message = "Profile updated successfully!"
                    $location.url("/user/"+newuser._id);
                });
        }

        function removeUser(uid) {
            UserService
                .deleteUser(uid)
        }

    }
})();
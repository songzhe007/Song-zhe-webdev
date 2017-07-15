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
            if(username==="" || username=== null || password==="" || password===null
                || vpassword==="" || vpassword===null){
                vm.error="username/password can not be empty!"
                return;
            }
            if(password !== vpassword) {
                vm.error = "Passwords doesn't match";
                return;
            }
            var exist = UserService.findUserByUsername(username);

            UserService
                .findUserByUsername(username)
                .then(
                    function () {
                        if(exist !==null) {
                            vm.error = "Username already exists.";
                        }
                    },
                    function () {
                        var user = {
                            username: username,
                            password: password,

                        };
                        return UserService
                            .createUser(user);
                    }
                )
                .then(function (user) {
                    $location.url("/user/" + user._id);
                });
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

        function updateUser(username, email, firstName, lastName, passWord) {
            var user = {
                _id: $routeParams.uid,
                username: username,
                email: email,
                firstName: firstName,
                lastName: lastName,
                passWord: passWord
            };

            UserService
                .updateUser(user._id,user)
                .then(function() {
                    vm.message = "User updated successfully!"
                });
        }

        function removeUser(uid) {
            UserService
                .deleteUser(uid)
                .then(function () {
                    $location.url("/login");
                });
        }

    }
})();
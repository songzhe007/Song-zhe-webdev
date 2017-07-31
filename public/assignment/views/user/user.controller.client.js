(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            UserService
                .findUserByCredentials(username, password)
                .then(function (user) {
                    if (user) {
                        $location.url("/user/" + user._id);
                    } else {
                        vm.message = "Username does not exist.";
                    }
                });
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, vpassword) {
            if (username === undefined || username === null || username === "" || password === undefined || password === "") {
                vm.message = "Username and Passwords cannot be empty.";
                return;
            }
            if (password !== vpassword) {
                vm.message = "Password does not match.";
                return;
            }
            UserService
                .findUserByUsername(username)
                .then(function (user) {
                    if (user) {
                        vm.message = "Username already exists.";
                    }
                    else {
                        var NewUser = {
                            username: username,
                            password: password,
                            firstName: "",
                            lastName: "",
                            email: ""
                        }

                        UserService
                            .createUser(NewUser)
                            .then(function (newUser) {
                                if (newUser) {
                                    $location.url("/user/" + newUser._id);
                                }
                            });
                    }
                });
        }
    }

    function ProfileController($routeParams, $timeout, UserService, $location) {
        var vm = this;
        UserService.findUserById($routeParams.uid)
                   .then(renderUser);

        function renderUser (user) {
            vm.user = user;
        }

        vm.updateUser = updateUser;
        vm.removeUser = removeUser;

        function updateUser(user) {
            UserService
                .updateUser(vm.user._id, user)
                .then(
                    function (newUser) {
                        if (newUser) {
                            vm.updated = "Profile changes saved!";
                        }
                    });

            $timeout(function () {
                vm.updated = null;
            }, 3000);
        }

        function removeUser(user) {
            UserService
                .deleteUser(user._id)
                .then(function () {
                    $location.url("/login");
                });

        }
    }

})();
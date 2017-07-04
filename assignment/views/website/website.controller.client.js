(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);
    
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
    }

    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;
       // vm.websiteId = $routeParams.websiteId;
        //vm.websites = WebsiteService.findWebsiteById(vm.websiteId);
        vm.uid = $routeParams.uid;
        //vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        vm. createWebsite = createWebsite;

        function createWebsite(name,description){
            WebsiteService. createWebsite (vm.uid,website);
        }

    }

    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.websiteId = $routeParams.websiteId;
        vm.websites = WebsiteService.findWebsiteById(vm.websiteId);
        vm.uid = $routeParams.uid;
        vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        vm. deleteWebsite = deleteWebsite;

        function deleteWebsite() {
            WebsiteService. deleteWebsite (vm.websiteId);
        }
    }

})();


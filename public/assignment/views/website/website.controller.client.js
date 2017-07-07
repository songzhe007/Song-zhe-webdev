(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var model = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;

        WebsiteService
            .findWebsitesByUser(uid)
            .then(renderWebsite);

        function renderWebsite(website) {
            model.website = website;
        }
    }

    function NewWebsiteController($routeParams, WebsiteService) {
        var model = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;

        WebsiteService
            .findWebsitesByUser(uid)
            .then(renderWebsite);

        function renderWebsite(website) {
            model.website = website;
        }

        model.newWebsite = newWebsite;

        function newWebsite(name, description) {
            var website = {
                name: name,
                description: description,
                developerId: $routeParams.uid
            };
            WebsiteService
                .createWebsite(website)
        }
    }

    function EditWebsiteController($routeParams, WebsiteService,$location) {
        var model = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;

        WebsiteService
            .findWebsitesByUser(uid)
            .then(renderWebsites)

        function renderWebsites(websites) {
            model.websites = websites;
        }

        WebsiteService
            .findWebsiteById(wid)
            .then(renderWebsite)

        function renderWebsite(website) {
            model.website = website;
        }

        model.updateWebsite = updateWebsite;
        model.deletewebsite = deletewebsite;

        function updateWebsite(name, description) {
            var website = {
                _id: $routeParams.wid,
                name: name,
                description: description,
                developerId: $routeParams.uid
            };

            WebsiteService
                .updateWebsite(website._id,website)
                .then(function() {
                    $location.url("/user/" + vm.uid + "/website");
                });
        }
        function deletewebsite(websiteId) {
            WebsiteService
                .deleteWebsite(websiteId)
        }
    }

})();
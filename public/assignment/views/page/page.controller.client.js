(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService, WebsiteService) {
        var model = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;
        var pid = $routeParams.pid;

        WebsiteService
            .findWebsiteById(wid)
            .then(renderWebsite);

        function renderWebsite(website) {
            model.website = website;
        }

        PageService
            .findPageByWebsiteId(wid)
            .then(renderPage);

        function renderPage(page) {
            model.page = page;
        }
    }

    function NewPageController($routeParams, PageService, WebsiteService) {
        var model = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;
        var pid = $routeParams.pid;

        WebsiteService
            .findWebsiteById(wid)
            .then(renderWebsite);

        function renderWebsite(website) {
            model.website = website;
        }

        model.newPage = newPage;

        function newPage(name, description) {
            var page = {
                name: name,
                description: description,
                websiteId: $routeParams.wid
            };
            PageService
                .createPage(page)
        }

    }

    function EditPageController($routeParams, PageService, WebsiteService) {
        var model = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;
        var pid = $routeParams.pid;

        WebsiteService
            .findWebsiteById(wid)
            .then(renderWebsite);

        function renderWebsite(website) {
            model.website = website;
        }

        PageService
            .findPageById(pid)
            .then(renderPage)

        function renderPage(page) {
            model.page = page;
        }

        model.updatePage = updatePage;
        model.removePage = removePage;

        function updatePage(name, description) {
            var page = {
                _id: $routeParams.pid,
                name: name,
                description: description,
                websiteId: $routeParams.wid
            };

            PageService
                .updatePage(page._id, page)
                .then(function() {
                    model.message = "Page updated successfully!"
                });
        }
        function removePage(pid) {
            PageService
                .deletePage(pid)
        }
    }

})();
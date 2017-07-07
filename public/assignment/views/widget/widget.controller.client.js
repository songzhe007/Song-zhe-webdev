(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("CreateWidgetController", CreateWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, WebsiteService, PageService, WidgetService, $sce) {
        var model = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;
        var pid = $routeParams.pid;

        model.trust = trust;
        model.getYoutubeEmbedUrl = getYoutubeEmbedUrl;

        function trust(html) {
            return $sce.trustAsHtml(html);
        }

        function getYoutubeEmbedUrl(linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        WebsiteService
            .findWebsiteById(wid)
            .then(renderWebsite);

        function renderWebsite(website) {
            model.website = website;
        }
/**
        PageService
            .findPageByWebsiteId(wid)
            .then(renderPage);

        function renderPage(page) {
            model.page = page;
        }
 */

        WidgetService
            .findWidgetsByPageId(pid)
            .then(renderWidget);

        function renderWidget(widget) {
            model.widget = widget;
        }

    }

    function NewWidgetController($routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        WidgetService
            .findWidgetsByPageId(vm.pid)
            .then(function (widgets) {
                vm.widgets = widgets;
            });
    }

    function CreateWidgetController($routeParams, $location,WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.widgetType = $routeParams.wtype;
        vm.createWidget = createWidget;
        vm.createError = null;

        function createWidget() {
            if (vm.widgetType === 'YOUTUBE') {
                if (vm.widgetUrl === null || vm.widgetUrl === undefined) {
                    vm.createError = "Url is required for Image/Youtube";
                    return;
                }
            }
            if (vm.widgetType === 'HEADING') {
                if (vm.widgetText === null || vm.widgetText === undefined) {
                    vm.createError = "Text is required for Header";
                    return;
                }
            }
            var newWidget = {
                name: vm.widgetName,
                text: vm.widgetText,
                widgetType: vm.widgetType,
                size: vm.widgetSize,
                width: vm.widgetWidth,
                url: vm.widgetUrl
            };
            if (newWidget === null || newWidget === undefined) {
                vm.createError = "no new widget";
                return;
            }
            WidgetService
                .createWidget(vm.pid, newWidget)
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                });
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        WidgetService
            .findWidgetById(vm.wgid)
            .then(function (widget) {
                vm.widget = widget;

                if (vm.widget.widgetType === "HEADING") {
                    vm.widgetName = vm.widget.name;
                    vm.widgetText = vm.widget.text;
                    vm.widgetSize = vm.widget.size;
                } else if (vm.widget.widgetType === "IMAGE") {
                    vm.widgetName = vm.widget.name;
                    vm.widgetText = vm.widget.text;
                    vm.widgetUrl = vm.widget.url;
                    vm.widgetWidth = vm.widget.width;
                } else if (vm.widget.widgetType === "YOUTUBE") {
                    vm.widgetName = vm.widget.name;
                    vm.widgetText = vm.widget.text;
                    vm.widgetUrl = vm.widget.url;
                    vm.widgetWidth = vm.widget.width;
                }
            });

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function updateWidget() {
            WidgetService
                .findWidgetById(vm.wgid)
                .then(function (widget) {
                    vm.widget = widget;
                });
            var latestData = {
                _id: vm.wgid,
                name: vm.widgetName,
                text: vm.widgetText,
                widgetType: vm.widget.widgetType,
                size: vm.widgetSize,
                width: vm.widgetWidth,
                url: vm.widgetUrl
            };
            WidgetService
                .updateWidget(vm.wgid, latestData)
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                });
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.wgid)
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                });
        }

    }
})();
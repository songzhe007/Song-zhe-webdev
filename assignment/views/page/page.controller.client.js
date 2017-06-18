/**
 * Created by SongZheDerrick on 2017/6/18.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController)

   function PageListController($routeParams, PageService, WebService){
       var vm = this;
       vm.uid = $routeParams.uid;
       vm.websiteId = $routeParams.websiteId;
       vm.pageId = $routeParams.pageId;
       vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
       vm.pages = PageService.findPageById(pageId);


   }
   function NewPageController($routeParams, PageService){
       var vm = this;
       vm.websiteId = $routeParams.websiteId;
       vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
       vm.name = $routeParams.name;
       vm.description = $routeParams.description;
       vm. createPage = createPage;
       function createPage(){
           PageService.createPage(vm.websiteId,page);
       }

   }
   function EditPageController($routeParams, PageService){
       var vm = this;
       vm.websiteId = $routeParams.websiteId;
       vm.pageId = $routeParams.pageId;
       vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
       vm.name = $routeParams.name;
       vm.description = $routeParams.description;
       vm. updatePage = updatePage;
       function updatePage(){
           PageService.updatePage(vm.pageId,page);
       }
   }


})();
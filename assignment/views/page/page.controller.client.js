/**
 * Created by SongZheDerrick on 2017/6/18.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController)

   function PageListController($routeParams, PageService){
       var vm = this;
       vm.uid = $routeParams.uid;
       vm.wid = $routeParams.wid;
       vm.pid = $routeParams.pid;

       vm.pages = PageService.findPageByWebsiteId(vm.wid);



   }
   function NewPageController($routeParams, PageService){
       var vm = this;
       vm.uid = $routeParams.uid;
       vm.wid = $routeParams.wid;
       vm.newPage = newPage;

       vm.name = $routeParams.name;
       vm.description = $routeParams.description;


       function newPage(name, description) {
           var page = {
               name: name,
               description: description
           }
           PageService.createPage(vm.wid, page);
           $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
       }



   }

   function EditPageController($routeParams, PageService){
       var vm = this;

       vm.uid = $routeParams.uid;
       vm.wid = $routeParams.wid;
       vm.pid = $routeParams.pid;
       vm.deletePage = deletePage;
       vm.updatePage = updatePage;

       function updatePage(){

           var page = {
               name: name,
               description: description
           }
           PageService.updatePage(vm.pid, page);
           $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");


       }
       function deletePage() {
           PageService.deletePage(vm.pid);
           $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
       }

   }




})();
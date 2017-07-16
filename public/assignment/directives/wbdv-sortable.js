/**
 * Created by SongZheDerrick on 2017/7/16.
 */

(function(){
    angular.module('WebAppMaker').directive('sortable', elementSortable);

    function elementSortable(){
        function linkFunction(scope, element) {
            const pageId = scope.pageId;
            $(element).sortable({
                    update: function(event, ui){
                        const elemOrder = [];
                        const widgetsElem = $('.widget').toArray();
                        widgetsElem.forEach(function(item){
                            elemOrder.push(item.id);
                        });

                        $.post(
                            '/api/assignment/page/' + pageId + '/widget/order',
                            {elems: elemOrder}
                        );
                    }
                }
            );
        }

        return {
            scope: {
                pageId: '=pid'
            },
            link: linkFunction
        }
    }
})();
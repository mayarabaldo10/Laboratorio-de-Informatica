var app = angular.module('testApp', ['datatables'])
app.controller('testCtrl', function($scope, $compile, $http, DTOptionsBuilder, DTColumnBuilder) {

    /**
     * init the controller
     */
    $scope.init = function() {
        $scope.db = {}
        $scope.test = {}
        $scope.tests = {}
        $scope.dtInstance = {};
        $scope.init_dataTable()
        $scope.new()
    }

    /**
     * edit the supplier
     */
    $scope.edit = function(id) {
        $('#saveButton').show()
        $scope.test = $scope.db[id]
    }

    /**
     * add new supplier
     */
    $scope.new = function() {
        $('#saveButton').show()
        $scope.test = {
            att1: "",
            att2: "",
            
        }
    }

    $scope.view = function(id){
        $('#saveButton').hide();
        $scope.test = $scope.db[id]
    }

    /**
     * confirm to delete supplier
     */
    $scope.remove = function(id) {
        var test = $scope.db[id]
        if (test) {
            ngcurd.confirm({
                title: 'Confirm remove ',
                message: 'Warning: all this test\'s data will be removed!',
                ok: function() {
                    ngcurd.post('/test/remove', {att_id: id}, {
                        success: function(){
                            $scope.dtInstance.reloadData()
                        }
                    })
                }
            })
        }
    }

    /**
     * add or update supplier
     */
    $scope.save = function() {

        ngcurd.post('/test/update', $scope.test, {
            success: function(){
                $scope.dtInstance.reloadData()
            }
        })
    }

    /**
     * init the DataTable
     */
    $scope.init_dataTable = function() {

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('ajax', {
                url: '/test/query',
                type: 'POST'
            })
            // or here
            .withDataProp('data')
            .withOption('processing', true)
            .withOption('serverSide', true)
            .withOption('responsive', true)
            .withPaginationType('full_numbers')
            .withOption('createdRow', function(row, data, dataIndex) {
                // Recompiling so we can bind Angular directive to the DT
                $compile(angular.element(row).contents())($scope);
            });
        $scope.dtColumns = [
            
                DTColumnBuilder.newColumn('att_id').withTitle('Att Id'),
                DTColumnBuilder.newColumn('att1').withTitle('Att1'),
                DTColumnBuilder.newColumn('att2').withTitle('Att2'),
                DTColumnBuilder.newColumn('att_id').withTitle('').notSortable().renderWith(function(col, type, row) {
                    $scope.db[row.att_id] = row
                    return '<button ng-click="view(' + row.att_id + ')" class="btn btn-default btn-circle" data-toggle="modal"  data-target="#edit_test" ><i class="fa fa-eye"></i></button> '
                         + '<button ng-click="edit(' + row.att_id + ')" class="btn btn-success btn-circle" data-toggle="modal"  data-target="#edit_test"><i class="fa fa-edit"></i></button> ' 
                         + '<button ng-click="remove(' + row.att_id + ')" class="btn btn-warning btn-circle" data-toggle="modal" data-target="#edit_test" ><i class="fa fa-remove"></i></button>'
                        
                })
            ]
    }


    //init current app.controller
    $scope.init()

});

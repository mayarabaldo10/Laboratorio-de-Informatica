var app = angular.module('salasApp', ['datatables'])
app.controller('salasCtrl', function($scope, $compile, $http, DTOptionsBuilder, DTColumnBuilder) {

    /**
     * init the controller
     */
    $scope.init = function() {
        $scope.db = {}
        $scope.salas = {}
        $scope.salass = {}
        $scope.dtInstance = {};
        $scope.init_dataTable()
        $scope.new()
    }

    /**
     * edit the supplier
     */
    $scope.edit = function(id) {
        $('#saveButton').show()
        $scope.salas = $scope.db[id]
    }

    /**
     * add new supplier
     */
    $scope.new = function() {
        $('#saveButton').show()
        $scope.salas = {
            nome: "",
            sobrenome: "",
            ra: "",
            
        }
    }

    $scope.view = function(id){
        $('#saveButton').hide();
        $scope.salas = $scope.db[id]
    }

    /**
     * confirm to delete supplier
     */
    $scope.remove = function(id) {
        var salas = $scope.db[id]
        if (salas) {
            ngcurd.confirm({
                title: 'Confirm remove ',
                message: 'Warning: all this salas\'s data will be removed!',
                ok: function() {
                    ngcurd.post('/salas/remove', {id: id}, {
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

        ngcurd.post('/salas/update', $scope.salas, {
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
                url: '/salas/query',
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
            
                DTColumnBuilder.newColumn('id').withTitle('Id'),
                DTColumnBuilder.newColumn('nome').withTitle('Nome'),
                DTColumnBuilder.newColumn('sobrenome').withTitle('Sobrenome'),
                DTColumnBuilder.newColumn('ra').withTitle('Ra'),
                DTColumnBuilder.newColumn('id').withTitle('').notSortable().renderWith(function(col, type, row) {
                    $scope.db[row.id] = row
                    return '<button ng-click="view(' + row.id + ')" class="btn btn-default btn-circle" data-toggle="modal"  data-target="#edit_salas" ><i class="fa fa-eye"></i></button> '
                         + '<button ng-click="edit(' + row.id + ')" class="btn btn-success btn-circle" data-toggle="modal"  data-target="#edit_salas"><i class="fa fa-edit"></i></button> ' 
                         + '<button ng-click="remove(' + row.id + ')" class="btn btn-warning btn-circle" data-toggle="modal" data-target="#edit_salas" ><i class="fa fa-remove"></i></button>'
                        
                })
            ]
    }


    //init current app.controller
    $scope.init()

});

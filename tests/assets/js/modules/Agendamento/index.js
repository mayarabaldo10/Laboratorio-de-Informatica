var app = angular.module('AgendamentoApp', ['datatables'])
app.controller('AgendamentoCtrl', function($scope, $compile, $http, DTOptionsBuilder, DTColumnBuilder) {

    /**
     * init the controller
     */
    $scope.init = function() {
        $scope.db = {}
        $scope.Agendamento = {}
        $scope.Agendamentos = {}
        $scope.dtInstance = {};
        $scope.init_dataTable()
        $scope.new()
    }

    /**
     * edit the supplier
     */
    $scope.edit = function(id) {
        $('#saveButton').show()
        $scope.Agendamento = $scope.db[id]
    }

    /**
     * add new supplier
     */
    $scope.new = function() {
        $('#saveButton').show()
        $scope.Agendamento = {
            usuario: "",
            salaId: "",
            horaInicio: "",
            horaFim: "",
            
        }
    }

    $scope.view = function(id){
        $('#saveButton').hide();
        $scope.Agendamento = $scope.db[id]
    }

    /**
     * confirm to delete supplier
     */
    $scope.remove = function(id) {
        var Agendamento = $scope.db[id]
        if (Agendamento) {
            ngcurd.confirm({
                title: 'Confirm remove ',
                message: 'Warning: all this Agendamento\'s data will be removed!',
                ok: function() {
                    ngcurd.post('/Agendamento/remove', {id: id}, {
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

        ngcurd.post('/Agendamento/update', $scope.Agendamento, {
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
                url: '/Agendamento/query',
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
                DTColumnBuilder.newColumn('usuario').withTitle('Usuario'),
                DTColumnBuilder.newColumn('salaId').withTitle('SalaId'),
                DTColumnBuilder.newColumn('horaInicio').withTitle('HoraInicio'),
                DTColumnBuilder.newColumn('horaFim').withTitle('HoraFim'),
                DTColumnBuilder.newColumn('id').withTitle('').notSortable().renderWith(function(col, type, row) {
                    $scope.db[row.id] = row
                    return '<button ng-click="view(' + row.id + ')" class="btn btn-default btn-circle" data-toggle="modal"  data-target="#edit_Agendamento" ><i class="fa fa-eye"></i></button> '
                         + '<button ng-click="edit(' + row.id + ')" class="btn btn-success btn-circle" data-toggle="modal"  data-target="#edit_Agendamento"><i class="fa fa-edit"></i></button> ' 
                         + '<button ng-click="remove(' + row.id + ')" class="btn btn-warning btn-circle" data-toggle="modal" data-target="#edit_Agendamento" ><i class="fa fa-remove"></i></button>'
                        
                })
            ]
    }


    //init current app.controller
    $scope.init()

});

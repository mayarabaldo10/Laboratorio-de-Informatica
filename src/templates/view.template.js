<!-- .row title -->
<div class="row">
    <div class="col-lg-12">
        <h1 class="page-header"><%= title %></h1>
        
    </div>
    <!-- /.col-lg-12 -->
</div>
<!-- /.row -->

<!-- .row body -->
<div class="row" ng-app="<%= module %>App" ng-controller="<%= module %>Ctrl">
    <div class="row" style="margin-bottom:5px;">
        <div class="col-md-2">
            <button type="button" class="btn btn-primary" ng-click="new()" data-toggle="modal" data-target="#edit_<%= module %>"><i class="fa fa-plus" ></i> New</button>
        </div>
        <!-- /.col-lg-2 -->
        <div class="col-md-7">
            
        </div>
        <!-- /.col-lg-8 -->
        <div class="col-md-3" style="text-align:right">
        
            
        </div>
        <!-- /.col-lg-2 -->
    </div>    
    <!-- /.row -->
   
    <div class="row">
        <div class="col-lg-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    Product list

                </div>

                <!-- /.panel-heading -->
                <div class="panel-body">
                    <div class="dataTable_wrapper">
                        <table class="table table-striped table-bordered table-hover" id="dataTables-example" datatable dt-options="dtOptions"  dt-columns="dtColumns" dt-instance="dtInstance" >
                            <thead>
                                <tr><%for(var i in attrs){%>
                                    <th><%=attrs[i].title%></th><%}%>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    
                </div>
                <!-- /.panel-body -->
            </div>
            <!-- /.panel -->
        </div>
        <!-- /.col-lg-12 -->

        <!-- edit_<%= module %> Modal -->
        <div class="modal fade" id="edit_<%= module %>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">New/Edit <%= title %></h4>
                    </div>
                    <div class="modal-body">
                        <form id="orderform" role="form" action="/orders/new" method="post">
                        <div class="row">
                            <div class="col-lg-12">
                                 <div class="panel-body">
                                        <div class="row">
                                            <input type="hidden" id="<%= module %>_<%=primary.name%>" name="<%= module %>_<%=primary.name%>" ng-model="<%= module %>.<%=primary.name%>">
                                            <% for(var i in attrs){if(attrs[i].primary)continue%>
                                            <div class="form-group">
                                                <label><%=attrs[i].title%></label>
                                                <input class="form-control" placeholder="<%=attrs[i].title%>" id="<%=module%>_<%=attrs[i].name%>" name="<%=module%>_<%=attrs[i].name%>" ng-model="<%=module%>.<%=attrs[i].name%>">
                                                <p class="help-block"><%=title%>'s <%=attrs[i].title%></p>
                                            </div><%}%>
                                        </div>
                                        <!-- /.row (nested) -->
                                    </div>
                            </div>
                            <!-- /.col-lg-12 -->
                        </div>
                        </form>
                        <div class="row">
                            
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="saveButton" ng-click="save()" data-dismiss="modal">Submit</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!-- /.modal -->
    </div>

</div>
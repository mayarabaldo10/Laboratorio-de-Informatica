/**
 * TestController
 *
 * @description :: Server-side logic for managing test
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * `TestController.index()`
     */
    index: function(req, res) {
        return res.view('test/index', {
            footer : [
                '/js/modules/test/index.js'
            ]
        });
    },

    /**
     * `TestController.query()`
     */
    query: function(req, res) {
        var cols = ['att_id','att1','att2',]
        var all = req.allParams();
        var search = req.param('search')
        var order = req.param('order')
        if(!order.length){
            order=[{column: 'att_id', dir:'desc'}]
        }
        var limit = all['length']
        var skip = req.param('start')
        
        var sort = cols[order[0].column] + ' ' + order[0].dir
        var query;
        var cond = {}
        if (search && search.value) {
            cond = {
                or: [{
                    att_id: {
                        'contains': search.value
                    }
                }]
            }

            query = Test.find({
                or: [{
                    att_id: {
                        'contains': search.value
                    }
                }],
                limit: limit,
                skip: skip,
                //sort: sort
            })
            
        } else {
            query = Test.find({
                limit: limit,
                skip: skip,
                //sort: sort
            })
        }

        Test.count(cond).exec(function(error, count) {
            query.sort(sort).then(function(data) {
                //jquery datatables format
                return res.json({
                    'draw': req.param('draw'),
                    'recordsTotal': count,
                    'recordsFiltered': count,
                    'data': data
                })
            })
        });

    },



    /**
     * `TestController.update()`
     */
    update: function(req, res) {
        var rt = {
            success: false,
            msg: 'Server error'
        }
        //int primary id
        var pkid = parseInt(req.param('att_id'))
        var model = {
            att1: req.param('att1'),
            att2: req.param('att2'),
            
        }
        if(att_id && !isNaN(att_id)){
            Test.update({att_id:pkid}, model).exec(function(err, newmodel) {
                if(!err){
                    rt.success = true
                    rt.msg = ''
                } else {
                    rt.msg = err
                }
                return res.json(rt);
            })
        } else {
            Test.create(model).exec(function(err, newmodel) {
                if(!err){
                    rt.success = true
                    rt.msg = ''
                } else {
                    rt.msg = err
                }
                return res.json(rt);
            })
        }

        

        
    },


    /**
     * `TestController.remove()`
     */
    remove: function(req, res) {
        var rt = {
            success: false,
            msg: 'Server error'
        }
        //int primary id
        var pkid = parseInt(req.param('att_id'))
        if(pkid && !isNaN(pkid)){
            Test.destroy({att_id: pkid}).exec(function(err) {
                if(!err){
                    rt.success = true
                    rt.msg = ''
                } else {
                    rt.msg = err
                }
                return res.json(rt);
            })
        } else {
            rt.msg = 'Record not found!'
            return res.json(rt);
        }
        
        
    },

};

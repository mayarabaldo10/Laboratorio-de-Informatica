/**
 * SalaController
 *
 * @description :: Server-side logic for managing Sala
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * `SalaController.index()`
     * return view only
     */
    index: function(req, res) {
        return res.view('Sala/index', {
            footer: [
                '/js/modules/Sala/index.js'
            ]
        });
    },

    /**
     * `SalaController.query()`
     * This is jquery datatables format query
     * @see https://datatables.net/examples/data_sources/server_side.html
     */
    query: function(req, res) {
        var cols = [
            'id', 
            'numero', 
            'bloco', 
        ]
        var all = req.allParams();
        var search = req.param('search')
        var order = req.param('order')
        if (!order.length) {
            order = [{
                column: 'id',
                dir: 'desc'
            }]
        }
        var limit = all['length']
        var skip = req.param('start')

        var sort = cols[order[0].column] + ' ' + order[0].dir
        var query;
        var cond = {}
        //default search column is primary key
        /**
        * extend example:
        * search records by id like %search% or name like %search%
        * cond = {
        *       or: [{
        *           id: {
        *               'contains': search.value
        *           }, name: {
        *               'contains': search.value
        *           }
        *       }]
        *   }
        */

        if (search && search.value) {
            cond = {
                or: [{
                    id: {
                        'contains': search.value
                    }
                }]
            }
            //copy & extend condition
            queryCond = JSON.parse(JSON.stringify(cond))
            queryCond.limit = limit
            queryCond.skip = skip
            query = Sala.find(queryCond)

        } else {
            query = Sala.find({
                limit: limit,
                skip: skip,
            })
        }

        Sala.count(cond).exec(function(error, count) {
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
     * `SalaController.update()`
     * update modle api
     */
    update: function(req, res) {
        var rt = {
                success: false,
                msg: 'Server error'
            }
            //int primary id
        var pkid = parseInt(req.param('id'))
        var model = {
            numero: req.param('numero'),
            bloco: req.param('bloco'),
            
        }
        //TODO: model validation
        if (pkid && !isNaN(pkid)) {
            Sala.update({
                id: pkid
            }, model).exec(function(err, newmodel) {
                if (!err) {
                    rt.success = true
                    rt.msg = ''
                } else {
                    rt.msg = err
                }
                return res.json(rt);
            })
        } else {
            Sala.create(model).exec(function(err, newmodel) {
                if (!err) {
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
     * `SalaController.remove()`
     * remove model api
     */
    remove: function(req, res) {
        var rt = {
                success: false,
                msg: 'Server error'
            }
        //int primary id
        var pkid = parseInt(req.param('id'))
        if (pkid && !isNaN(pkid)) {
            Sala.destroy({
                id: pkid
            }).exec(function(err) {
                if (!err) {
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

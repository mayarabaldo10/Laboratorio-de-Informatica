/**
 * Module dependencies
 */

var util = require('util');
var _ = require('lodash');
_.defaults = require('merge-defaults');


/**
 * sails-generate-ng-curd
 *
 * Usage:
 * `sails generate ng-curd`
 *
 * @description Generates a ng-curd
 * @help See http://links.sailsjs.org/docs/generators
 */

module.exports = {

    /**
     * `before()` is run before executing any of the `targets`
     * defined below.
     *
     * This is where we can validate user input, configure default
     * scope variables, get extra dependencies, and so on.
     *
     * @param  {Object} scope
     * @param  {Function} cb    [callback]
     */

    before: function(scope, cb) {

        // scope.args are the raw command line arguments.
        //
        // e.g. if someone runs:
        // $ sails generate ng-curd user find create update
        // then `scope.args` would be `['user', 'find', 'create', 'update']`
        if (!scope.args[0]) {
            return cb(new Error('Please provide a name for this ng-curd.'));
        }

        if (!scope.args[1]) {
            return cb(new Error('Please provide a attribute for this ng-curd.'));
        }

        // scope.rootPath is the base path for this generator
        //
        // e.g. if this generator specified the target:
        // './Foobar.md': { copy: 'Foobar.md' }
        //
        // And someone ran this generator from `/Users/dbowie/sailsStuff`,
        // then `/Users/dbowie/sailsStuff/Foobar.md` would be created.
        if (!scope.rootPath) {
            return cb(INVALID_SCOPE_VARIABLE('rootPath'));
        }


        // Attach defaults
        _.defaults(scope, {
            createdAt: new Date()
        });
        // Decide the output filename for use in targets below:
        
        scope.getTitle = function(title){
            return title.replace('_', ' ').replace(/\b\w+\b/g,function(word){
              return word.substring(0,1).toUpperCase() + word.substring(1);
            })
        }

        scope.module = scope.args[0]
        scope.title = scope.getTitle(scope.module)
        scope.service = scope.title
        scope.moduleController = scope.title + 'Controller'
        scope.moduleControllerFile = scope.moduleController + '.js'

        var len = scope.args.length
        scope.primary = {
            name: scope.args[1],
            title: scope.getTitle(scope.args[1])
        }
         
        scope.attrs = []
        for (var i = 1; i < len; i++) {
            var attr = {
                name: scope.args[i],
                title: scope.getTitle(scope.args[i]),
                primary: i==1,
                value: ''
            }
            scope.attrs.push(attr)

        }

        // When finished, we trigger a callback with no error
        // to begin generating files/folders as specified by
        // the `targets` below.
        cb();
    },

    


    /**
     * The files/folders to generate.
     * @type {Object}
     */

    targets: {

        // Usage:
        // './path/to/destination.foo': { someHelper: opts }

        // Creates a dynamically-named file relative to `scope.rootPath`
        // (defined by the `filename` scope variable).
        //
        // The `template` helper reads the specified template, making the
        // entire scope available to it (uses underscore/JST/ejs syntax).
        // Then the file is copied into the specified destination (on the left).
        './api/controllers/:moduleControllerFile': {
            template: 'controller.template.js'
        },
        './views/:module/index.ejs': {
            template: 'view.template.js'
        },
        './assets/js/modules/:module/index.js': {
            template: 'js.template.js'
        },

        './assets/js/modules/common.js': {
            template: {templatePath: 'common.template.js', force: true} 
        },

    },


    /**
     * The absolute path to the `templates` for this generator
     * (for use with the `template` helper)
     *
     * @type {String}
     */
    templatesDirectory: require('path').resolve(__dirname, './templates')
};





/**
 * INVALID_SCOPE_VARIABLE()
 *
 * Helper method to put together a nice error about a missing or invalid
 * scope variable. We should always validate any required scope variables
 * to avoid inadvertently smashing someone's filesystem.
 *
 * @param {String} varname [the name of the missing/invalid scope variable]
 * @param {String} details [optional - additional details to display on the console]
 * @param {String} message [optional - override for the default message]
 * @return {Error}
 * @api private
 */

function INVALID_SCOPE_VARIABLE(varname, details, message) {
    var DEFAULT_MESSAGE =
        'Issue encountered in generator "ng-curd":\n' +
        'Missing required scope variable: `%s`"\n' +
        'If you are the author of `sails-generate-ng-curd`, please resolve this ' +
        'issue and publish a new patch release.';

    message = (message || DEFAULT_MESSAGE) + (details ? '\n' + details : '');
    message = util.inspect(message, varname);

    return new Error(message);
}

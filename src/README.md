# sails-generate-ng-curd

A `ng-curd` generator for use with the Sails command-line interface.

Certain generators are installed by default in Sails, but they can be overridden.  Other generators create entirely new things.  Check the [Sails docs](http://sailsjs.org/#!documentation) for information on installing generator overrides / custom generators and information on building your own generators.



### Installation

```sh
$ npm install sails-generate-ng-curd
```


### Usage

##### On the command line

```sh
$ sails generate ng-curd <a name for your scaffold> <primarykey> <optional: attributename:attributetype> <optional: --force>
```

Example:

```sh
$ sails generate scaffold user id name:string age:integer email:email
```

### Example Project

- [Test Project](https://github.com/shootsoft/sails-ng-curd/tree/master/tests)
- [WeBuyer](https://github.com/shootsoft/webuyer)

### Quick Start

1. Define your Model

`api/models/Test.js`

```javascript
module.exports = {

  attributes: {

    att_id : {     
    	type: 'integer',
        primaryKey: true 
    },

    att1 : { type: 'string' },

    att2 : { type: 'string' }
  }
};
```

2. Add JQuery, Bootstrap, JQuery Datatables, JQuery Block UI, Angular, Angular Datatables into your layout file 

Examples: https://github.com/shootsoft/sails-ng-curd/blob/master/tests/views/layout.ejs


3. Generate your controller/view/js

```sh
sails generate ng-curd test att_id att1 att2
```

4. Launch your sails and visit http://localhost:1337/Test
```sh
sails lift
```

### UI Prevew

![List page](https://raw.githubusercontent.com/shootsoft/sails-ng-curd/master/imgs/list_page.png)

![New or edit record](https://raw.githubusercontent.com/shootsoft/sails-ng-curd/master/imgs/new_edit.png)


### Development

To get started quickly and see this generator in action, ...

Also see `CONTRIBUTING.md` for more information on overriding/enhancing existing generators.



### Questions?

See `FAQ.md`.



### More Resources

- [Stackoverflow](http://stackoverflow.com/questions/tagged/sails.js)
- [#sailsjs on Freenode](http://webchat.freenode.net/) (IRC channel)
- [Twitter](https://twitter.com/sailsjs)
- [Professional/enterprise](https://github.com/balderdashy/sails-docs/blob/master/FAQ.md#are-there-professional-support-options)
- [Tutorials](https://github.com/balderdashy/sails-docs/blob/master/FAQ.md#where-do-i-get-help)
- <a href="http://sailsjs.org" target="_blank" title="Node.js framework for building realtime APIs."></a>


### License

**[MIT](./LICENSE)**
&copy; 2015 [balderdashy](http://github.com/balderdashy) & contributors

As for [Sails](http://sailsjs.org)?  It's free and open-source under the [MIT License](http://sails.mit-license.org/).

![image_squidhome@2x.png](http://i.imgur.com/RIvu9.png)

# sails-ng-curd

Generate scaffold for sails application. Ajax create/update/remove/pagination/search.

CURD function based on
- [Sails](http://sailsjs.org/)
- [Angular](https://www.angular.org)
- [JQuery](https://jquery.com)
- [JQuery Datatables](https://datatables.net)
- [JQuery BlockUI](http://malsup.com/jquery/block/)

# DEMO Project

[WeBuyer](https://github.com/shootsoft/webuyer)

# Useage

[Useage](src/README.md)

## To create a scaffold

On the command line

```
$ sails generate ng-curd <a name for your scaffold> <primarykey> <optional: attributename:attributetype> <optional: --force>
```

Example:

```
$ sails generate scaffold user id name:string age:integer email:email
```

#TODO

- support attribute type
- help file
- quick start
- auto load model's attributes
- angular module
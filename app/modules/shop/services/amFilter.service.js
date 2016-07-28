(function() {
    'use strict';

    angular
        .module('angularMart')
        .service('amFilterService', amFilterService);

    amFilterService.$inject = ["$rootScope"];

    /* @ngInject */
    function amFilterService($rootScope) {
      this.$filters;
      this.setFilter = setFilter;
      this.getFilters = getFilters;
      this.isInFilterList = isInFilterList




      function setFilter(key, value){
        var filters=this.$filters || [];
        var key =_.toLower(key);

        var existingFilter = _.some(filters, {'type': key} );

        if(existingFilter){

            _.forEach(filters, function(filter){
              if(filter.type ===key){
                if(key !== 'pricerange'){
                    var idx= _.indexOf(filter.option, _.toLower(value));
                    if(idx >-1){
                      filter.option.splice(idx, 1);
                    }else{
                      filter.option.push(_.toLower(value));
                    }
                }else{
                  filter.option =[];
                  filter.option=[value[0], value[1]];
                }
              }
            })
        }else{
          var filter ={}
          filter.type= key;
          filter.option =[];
          if(key !=='pricerange'){
            filter.option.push(_.toLower(value));
          }else{
            filter.option =[value[0], value[1]];
          }
          filters.push(filter);
        }
        this.$filters = filters;
        $rootScope.$broadcast('filter:changed', this.$filters)
      };


      function getFilters(){
        return this.$filters;
      };


      function isInFilterList( key, vlaue){
        return _.some(this.$filters, { 'type': key, 'option':[value]});
      };
    }
})();

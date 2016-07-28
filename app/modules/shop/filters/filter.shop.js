(function() {
    'use strict';

    angular
        .module('angularMart')
        .filter('pfilter', pfilter);

    function pfilter() {
        return pfilterFn;

        function pfilterFn(products, filters) {
          if('undefined' == typeof filters) return products;
            var filtered =[];
            _.forEach(products, function(product){
              var include=true;
              _.forEach(filters, function(filter){
                if(filter.type !== 'pricerange'){
                    var v= product[filter.type] ;

                    if(filter.option.length >0 && _.isArray(v) ){
                      if(_.intersection( filter.option, _.toLower(v).split(',')).length <= 0){

                        include = false;
                      }
                    }else{
                      if(!_.isEmpty(filter.option)  && _.indexOf(filter.option, _.lowerCase(v)) === -1){
                        include = false;
                      }
                    }
                }else{
                  if(!(product.price >= filter.option[0] && product.price <= filter.option[1])){
                      include = false;
                  }
                }

              });

                if(include){
                  filtered.push(product);
                }

            });

            return filtered;
        }
    }
})();

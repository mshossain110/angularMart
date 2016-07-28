#Shop page

** class: page-leftSidebar -> for left sidebar
         page-rightSidebar -> for left sidebar
         page-topSidebar -> for left sidebar

#view
** class: list-view -> product list view
         plarge-view  -> This will show 100% width modern view
         psmall-view -> this will show only title, picture, price, rate with small view

#Product per row
 ** class: '' -> 4 product per row
          three-ppr -> 3 product per row



#Shop Single page

#Cart page

#payment page

#comment template


#directives  ------------------------------------

##starRating
<star-rating ng-model="rating"  max-rating="5" read-only="false" click="function(ratingObj)" mouse-hover="function(ratingObj)" mouse-leave="function(ratingObj)"></star-rating>


#Services ----------------------------------------

##PService
  product service for manage product

  Methods
  init() -> initialize service
  setProducts(items, cb)
  getProducts(cb)
  isEmpty()
  getProductByID(ids, cb)
  getAllCategory(products, cb)
  getProductByCategory(category, number, cb)
  getVariable(cb({
    "minPrice":minPrice,
    "maxPrice":maxPrice,
    "categories":categories,
    "brands": brands,
    "colors": colors,
    "sizes": sizes,
  }))
##amFilterService

Methods

setFilter(key, value)
getFilters
isInFilterList( key, vlaue)
##amCart
init()
addItem(id, name, image, price, quantity, data)
getItemById(id)
getCart()
setCart(cart)
setShipping(shipping)
getShipping()
setQuantity(id, q)
getAllItems
getTotalItems()
getSubTotal
getTotal
removeItemById(id)
isEmpty()
toObject()
restore()
save()

Event
amCart:add
amCart:update
amCart:change
amCart:remove
amCart:beforeSave
##AmItem

##store
Data save to local storage

get(key)
set(key, value)

#controller
cartCtrl
productCtrl
ShopSingleCtrl
commentsCtrl

#Account module

## controller
  * authenticationCtrl

  Description: for authentication use this controller for singin singup, and gorget password

## service
  ** authentication
  authentication service for using in controller

  ** auth
  auth service for verify jwt

  ** authInterceptor
  authInterceptor factory to add jwt in your request header and save with every request
  NOTE: Some how your server cannot alowe Authorization header. then you have to set Authorization header request


##directive

##view
 **three singin and singup working form add.
 **Sicial login button added

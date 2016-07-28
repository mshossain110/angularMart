'use strict';

describe('Service: isMobile', function () {

  // load the service's module
  beforeEach(module('angularMartApp'));

  // instantiate service
  var isMobile;
  beforeEach(inject(function (_isMobile_) {
    isMobile = _isMobile_;
  }));

  it('should do something', function () {
    expect(!!isMobile).toBe(true);
  });

});

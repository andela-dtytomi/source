'use strict';

describe('should pass test', function() {
  
  it('should return true for true', function() {
    expect(true).toBe(true);
  });

  it('should check for name', function() {
    /*globals Name */
    var name = new Name();
    expect(name.myName).toBe('Ayo');
  });

  it('should change myname', function() {

    var name = new Name();
    name.change('tomi');
    expect(name.myName).toBe('tomi');

  });

});
QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});
QUnit.test( "Is scroll intent there?", function( assert ) {
  $(window).scrollIntent();
  assert.equal($('[scroll-intent]').length, 1, 'there should be a scroll intent');
});

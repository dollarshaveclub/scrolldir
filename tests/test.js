QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});
QUnit.test( "Is scroll intent there?", function( assert ) {
  scrollDir();
  assert.equal(Document.querySelector('[scrolldir]').length, 1, 'there should be a scroll intent');
});

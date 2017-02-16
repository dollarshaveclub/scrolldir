QUnit.test( "hello test", function(assert) {
  scrollDir();
  assert.ok(1 == "1", "Passed!");
});
QUnit.test( "Is scroll intent there?", function(assert) {
  scrollDir();
  assert.equal(document.querySelector('[data-scrolldir]').getAttribute('data-scrolldir'), 'down', 'there should be a scroll intent');
});
QUnit.test( "scrollDir off", function(assert) {
  scrollDir({off: true});
  assert.equal(document.querySelector('[data-scrolldir]').getAttribute('data-scrolldir'), 'off', 'scrolldir should read as off');
});
QUnit.test( "scrollDir has a different attribute", function(assert) {
  scrollDir({attribute: 'data-scroll-direction'});
  assert.equal(document.querySelector('[data-scroll-direction]').getAttribute('data-scroll-direction'), 'down', 'scrolldir attribute should be scroll-direction');
});
QUnit.test( "scrollDir has a different attribute", function(assert) {
  scrollDir({el: document.body, attribute: 'data-scroll-new-attribute'});
  assert.equal(document.querySelector('[data-scroll-new-attribute]').getAttribute('data-scroll-new-attribute'), 'down', 'scrolldir attribute should be on a new element');
});

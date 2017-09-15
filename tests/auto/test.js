QUnit.test('hello test', (assert) => {
  assert.ok(1 == '1', 'Passed!')
})
QUnit.test('Is scroll intent there?', (assert) => {
  assert.equal(document.querySelector('[data-scrolldir]').getAttribute('data-scrolldir'), 'down', 'there should be a scroll intent')
})

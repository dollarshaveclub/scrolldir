QUnit.test('Is scrolldir there?', (assert) => {
  scrollDir()
  scrollDir({ off: true })
  assert.equal(document.querySelector('[data-scrolldir]').getAttribute('data-scrolldir'), 'off', 'there should not be scrolldir')
})

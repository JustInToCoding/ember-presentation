import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('presentation-slideshow', 'Integration | Component | presentation slideshow', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{presentation-slideshow}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#presentation-slideshow}}
      template block text
    {{/presentation-slideshow}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

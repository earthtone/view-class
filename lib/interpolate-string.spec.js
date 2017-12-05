const test = require('tape');
const interpolate = require('./interpolate-string');

test('Interpolates String Literal with Data', function(assert){
	var template = 'Hello ${name}!';
	assert.equal(interpolate(template, {name: 'World'}), 'Hello World!');
	assert.equal(interpolate(template, {name: 'Bryan'}), 'Hello Bryan!');
	assert.end();
});
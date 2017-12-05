const EventEmitter = require('events');
const test = require('tape');
const View = require('./view');

test('View Class Init', function(assert){
	var v = new View({
		parentNode: document.body,
		configurable: true,
		classList: ['component', 'demo', 'arbitrary']
	});

	assert.ok(v.configurable, 'takes config options & updates itself');
	assert.deepEqual(v.classList, ['component', 'demo', 'arbitrary'], 'takes config options & updates itself');
	assert.ok(v.id, 'assigns random id if none given');
	assert.throws(function(){
		new View();
	}, Error, 'throws error if no parent node given');

	teardown(v);
	assert.end();
});

test('View Class Mount Method', function(assert){
	var v = new View({
		id: 'component-view',
		parentNode: document.body
	});

	var actual = v.render();

	assert.equal(actual.toString(), '[object HTMLDivElement]', 'has a render method which returns valid DOM Nodes');

	v.mount();

	assert.ok(document.body.querySelector('#component-view'), 'appends component to its parentNode');
	teardown(v);
	assert.end();
});

test('View Class Update Method', function(assert){
	var component = new View({
		id: 'component-view',
		parentNode: document.body,
		data: {
			textContent: 'Hello World!'
		}
	});

	var actual = component.mount();
	var $el = document.body.querySelector('#component-view');

	assert.equal($el.textContent.trim(), 'Hello World!', 'after initial mount');
		
	component.data.textContent = 'Goodbye World!';
	component.update();

	$el = document.body.querySelector('#component-view');
	assert.equal($el.textContent.trim(), 'Goodbye World!', 'replaces component on parent node');
	
	teardown(component);
	assert.end();
});


test('View Class Escape Method', function(assert){
	var component = new View({
		parentNode: document.body
	});
	
	var inner = '<h1>Hello World</h1>';
	var actual = component.escape(inner, 'class-name', 'second-class-name');

	assert.equal(typeof inner, 'string', 'HTML in a string literal');
	assert.equal(actual.toString(), '[object HTMLDivElement]', 'returns a DOM Node');
	assert.ok(actual.classList.contains('class-name'), 'adds classes');
	assert.ok(actual.classList.contains('second-class-name'), 'adds classes');
	
	teardown(component);
	assert.end();
});

test('View Class Interpolate Method', function(assert){
	var component = new View({
		parentNode: document.body
	});

	var template = '<h1>Hello ${name}</h1>';
	var actual = name => component.interpolate(template, { name });

	assert.equal(actual('World'), '<h1>Hello World</h1>');
	assert.equal(actual('Bryan'), '<h1>Hello Bryan</h1>');
	
	teardown(component);
	assert.end();
});

test('View Class Render Method', function(assert){
	var component = new View({
		id: 'component-view',
		parentNode: document.body,
		data: {
			textContent: 'Default Render Method Exists',
			items: ['red', 'yellow', 'blue']
		}
	});

	component.mount();
	assert.equal(document.querySelector('#component-view').textContent, 'Default Render Method Exists');

	component.render = function(state){
		var template = '<ul class="item-list">${items}</ul>';
		var content = this.interpolate(template, {
			items: this.data.items.map(item => `<li class="list-item">${item}</li>`)
		});

		return this.escape(content);
	};

	component.update();
	assert.ok(document.querySelector('ul.item-list'));
	assert.equal(document.querySelectorAll('.list-item').length, 3);

	teardown(component);
	assert.end();
});

function teardown(view){
	view.parentNode.innerHTML = '';
}
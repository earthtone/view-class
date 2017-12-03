# View Class

Standard View Class for Frontend Javascript projects, using [bel](https://www.npmjs.com/package/bel) to transform [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) containing HTML into DOM Nodes.

### Installation
```
npm install --save-dev @earthtone/view-class
```

### Usage

```
var html = require('@earthtone/view-class/html');
var View = require('@earthtone/view-class');

var $root = document.querySelector('#container');

// Choose  parent element to mount to
var home = new View({
    parentNode: $root,
    data: {
        textContent: 'Hello from inside a view class',
        items: ['red', 'blue', 'yellow']
    }
});

// Define a render function
home.render = function(){
    return html`<main id="home-page">
    <h3>${this.data.textContent}</h3>
        <ul class="item-list">
            ${this.data.items.map(item => html`<li class="list-item">${item}</li>`)}
        </ul>
    </main>`;
};

window.addEventListener('load', function(){
    home.mount();   
});

```

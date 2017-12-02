# View Class

Standard View Class for Frontend Javascript projects, using [bel](https://www.npmjs.com/package/bel) to transform [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) containing HTML into DOM Nodes.

### Usage

```
var $root = document.querySelector('#container');

var home = new View({
    parentNode: $root,
    data: {
        textContent: 'Hello from inside a view class',
        items: ['red', 'blue', 'yellow']
    }
});

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

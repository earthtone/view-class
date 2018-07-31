# View Class

JavaScript class for browser-centric projects, using [bel](https://www.npmjs.com/package/bel) to transform [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) containing HTML into DOM Nodes. Use with a [routing library](https://github.com/krasimir/navigo) and an [event bus](https://nodejs.org/api/events.html#events_class_eventemitter) to build out small, simple projects that need "dumb", unopinionated UI components.

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


// Class Syntax
class AboutPage extends View {
  constructor(options){
    super(options);
  }

  render () { 
    return html`<main id="about-page">
      <h3>About ${props.org}</h3>
      <p>${this.data.textContent}</p>
    </main>`;
  }
}

var about = new AboutPage({
  parentNode: $root,
  data: {
    textContent: 'This is a page describing the origin story of an organization!'
  }
});

window.addEventListener('load', function () {
  about.mount();
})
```

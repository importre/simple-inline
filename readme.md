# inline

> :necktie: Generate inline elements from plain text using `begin` & `offset`


## Usage

```javascript
const inline = require('inline');

const text = 'hello world';
const styles = [{
  begin: 0,
  offset: 5,
  types: ['underline']
}, {
  begin: 6,
  offset: 5,
  types: ['bold', 'strike']
}, {
  begin: 4,
  offset: 3,
  types: ['italic']
}];

// generate html
const result = inline(text, styles);

```

### Output

```html
<span class="underline">hell</span><span class="underline italic">o</span><span class="italic"> </span><span class="bold strike italic">w</span><span class="bold strike">orld</span>
```


## API

### inline(text, styles[, options])

#### text

type: `string`

#### styles

type: `object` (array)

An item must have `begin`, `offset` and `types`.  
`types` is string array and will be `<span class="<types>"...`

#### options

##### returnType

specify return type. `html`(default) or `object`.

```javascript
const result = inline(text, styles, {
  returnType: 'object'
});
```

## Test

```sh
$ npm test
```

## License

MIT © Jaewe Heo

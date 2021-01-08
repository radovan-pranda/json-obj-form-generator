<center>
<img src="https://radovan-pranda.github.io/json-obj-form-generator/assets/logo-sm.png" height="160px" />

  <h1>json-obj-form-generator</h1>
  <p>generate forms from JSON object<p>

[![NPM](https://img.shields.io/npm/v/json-obj-form-generator.svg)](https://www.npmjs.com/package/json-obj-form-generator) 
[![License](https://img.shields.io/npm/l/json-obj-form-generator.svg)](https://github.com/radovan-pranda/json-obj-form-generator/blob/master/LICENSE)
</center>


## Install

```bash
npm install --save json-obj-form-generator
```

For more informations check documentation with sandbox (playground), designer translation generator and much more - [here](https://radovan-pranda.github.io/json-obj-form-generator/).

## Usage of designer

```jsx
import { JOFGENDesigner } from 'json-obj-form-generator';
import 'bootstrap/dist/css/bootstrap.css'; // most styles are from bootstrap library
import 'json-obj-form-generator/dist/css/designer.css';

...

  render()
  {
    return (
      <JOFGENDesigner 
        extended={true|false}
        json={json} 
        export={true|false} 
        onChange={(json, isValid) =>  {  }} 
        mode={"tree"|"linear"|"linear_merge"} 
      />
    );
  }

...
```

## Usage of generator
```jsx
import { JOFGENGenerator } from 'json-obj-form-generator';
import 'bootstrap/dist/css/bootstrap.css'; // most styles are from bootstrap library
import 'json-obj-form-generator/dist/css/generator.css';

...

  render()
  {
    return (
      <JOFGENGenerator 
        value={value} 
        json={json} 
        onChange={(value, isValid) => { }} 
        mode={"tree"|"linear"|"linear_merge"} 
      />
    )
  }

...
```

## License

MIT © [Radovan Pranda](https://github.com/radovan-pranda)
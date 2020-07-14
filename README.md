# json-obj-form-generator

> generate forms from JSON object

[![NPM](https://img.shields.io/npm/v/json-obj-form-generator.svg)](https://www.npmjs.com/package/json-obj-form-generator) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save json-obj-form-generator
```

## Usage of designer

```jsx
import { JOFGENDesigner } from 'json-obj-form-generator';

...

  render()
  {
    return (
      <JOFGENDesigner 
        extended={true|false}
        json={jsonObject} 
        export={true|false} 
        isValid={(validity) => { }} 
        onChange={(jsonObject, validity) =>  {  }} 
      />
    );
  }

...
```

## Usage of generator
```jsx
import { JOFGENGenerator } from 'json-obj-form-generator';

...

  render()
  {
    return (
      <JOFGENGenerator 
        value={jsonValue} 
        json={jsonObjectFromDesigner} 
        onChange={(value, validity) => { }} 
        mode={"tree"|"linear"|"linear_merge"} 
      />
    )
  }

...
```

## License

MIT © [Radovan Pranda](https://github.com/radovan-pranda)

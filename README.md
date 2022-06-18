# vicsek-fractal-cli
Print the Vicsek Fractal to the console!

## Usage
### Via `npx`:
Cross Pattern:
```
$ npx vicsek-fractal-cli <n>
$ npx vicsek-fractal-cli <n> <size>
```

X Pattern:
```
$ npx vicsek-fractal-cli <n> -x
$ npx vicsek-fractal-cli <n> <size> -x
```

### Via Global Install
```
$ npm install --global vicsek-fractal-cli
```

Cross Pattern:
```
$ vicsek-fractal-cli <n>
$ vicsek-fractal-cli <n> <size>
```

X Pattern:
```
$ vicsek-fractal-cli <n> -x
$ vicsek-fractal-cli <n> <size> -x
```

### Via Import
```
$ npm install vicsek-fractal-cli
```
then:
```
const vicsek = require('vicsek-fractal-cli');
console.log(vicsek.create(<n>));
console.log(vicsek.create(<n>, <size>));
console.log(vicsek.create(<n>, <size>, <drawX>));
```


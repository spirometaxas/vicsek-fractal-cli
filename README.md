# vicsek-fractal-cli
Print the [Vicsek Fractal](https://en.wikipedia.org/wiki/Vicsek_fractal) to the console!

## Usage
### Via `npx`:
Cross Pattern:
```
$ npx vicsek-fractal-cli <n>
$ npx vicsek-fractal-cli <n> <size>
```

Diagonal Pattern:
```
$ npx vicsek-fractal-cli <n> -d
$ npx vicsek-fractal-cli <n> <size> --diagonal
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

Diagonal Pattern:
```
$ vicsek-fractal-cli <n> -d
$ vicsek-fractal-cli <n> <size> --diagonal
```

### Via Import
```
$ npm install vicsek-fractal-cli
```
then:
```
const vicsek = require('vicsek-fractal-cli');
console.log(vicsek.create(<n>));
console.log(vicsek.create(<n>, { size: <number>, diagonal: <boolean>, character: <character> }));
```
The config params are optional.


<p align="center"><img src="./Icon.png" alt="Peppa Car" width="200" /></p>

<h1 align="center">Peppa Car</h1>
<p align="center">The Frontend of Peppa Car 小車（jū）佩奇</p>

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## WebSocket Packet Format

### Gamepad Format

``` json
{
  "mode": "user|track|ball",
  "direction": 0,
  "speed": 8
}
```

P.S. `mode` is one of `user`, `track` or `ball`. Fields `direction` and `speed` are only displayed when `mode` is equal to `user`. `direction` is set to 0 to 359. And `speed` is in range of 0 to 10.

### Sensor Status Format


``` json
{
  "type": "sensor",
  "data": {
    "xxsensor": 3.1415,
    "yysensor": 2.7182
  }
}
```



For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

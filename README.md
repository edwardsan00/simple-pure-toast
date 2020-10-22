# simple-pure-toast

This proyect is a fork from [notify-zh](https://github.com/xavivzla/notify-zh/)

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).

you cand add in lib like React, Vue js and angular

## Install


```bash
 yarn add simple-pure-toast or npm install simple-pure-toast
```

## Usage

### React js

```jsx
  import React from 'React'
  import toast from 'simple-pure-toast'

  const MyComponent = () => {
    return (
      <div>
        <button onClick={() => toast.success('Yeah! Toast')}>
          Success
        </button>
      </div>
    )
  }
```


### Vue js

```js
import Vue from "vue";
import toast from "simple-pure-toast";
import App from "./App.vue";

Vue.config.productionTip = false;

const MyPlugin = {
  install() {
    Vue.toast = toast;
    Vue.prototype.$toast = toast;
  }
};

Vue.use(MyPlugin);

new Vue({
  render: h => h(App)
}).$mount("#app");

### component 

<template>
  <div>
    <button @click="runError">Error</button>
  </div>
</template>

<script>
export default {
  name: "Component1",
  methods: {
    runError() {
      this.$toast.error('Problem');
    }
  }
}
</script>
```
## Methods and params
```js
const params = {
  message?: string // optional
  options?: options // optional
}
toast.success(params)
toast.error()
toast.info()
toast.warning()
```

## Options

| Name        | Description           | default       | type |
| :---        |    :----:             |          ---: | ---: |
| description |                       |               |  `string` |
| icon        | show icon             | true          | `boolean` |
| time        | setTime               | 6000          | `number`  |
| position    | toast position        | topLeft       | ` 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight'` |
import Vue from "vue";

import { Button, Cell, CellGroup, Image, NumberKeyboard, Field, PasswordInput, Picker, Skeleton, Lazyload, Uploader, Toast, Form, NavBar } from "vant";

function vantUse (arrs) {
  if (Object.prototype.toString.call(arrs) === "[object Array]" && arrs.length > 0) {
    arrs.forEach(element => {
      Vue.use(element);
    });
  }
}

const arrs = [
  Button, Cell, CellGroup, Image, NumberKeyboard, Field, PasswordInput, Picker, Skeleton, Lazyload, Uploader, Toast, Form, NavBar
];
vantUse(arrs);


Vue.prototype.$toast = Toast;
let infos = null;
Vue.prototype.$loading = {
  open: config => {
    if (infos) {
      return infos;
    }
    const configs = Object.assign({
      duration: 0,
      mask: false,
    }, config);
    infos = Toast.loading(config);
  },
  close: () => {
    infos && infos.clear();
    infos = null;
  }
};

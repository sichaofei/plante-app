// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './utils/rem.js'
import Header from '@/components/header.vue'
import store from './store/' 
import Toast from '@/components/toast.vue'
Vue.config.productionTip = false

Vue.component('m-header', Header)
Vue.component('toast', Toast)
document.addEventListener('plusready', function() {
    var webview = plus.webview.currentWebview();
    plus.key.addEventListener('backbutton', function() {
        webview.canBack(function(e) {
            if(e.canBack) {
                webview.back();             
            } else {
                //webview.close(); //hide,quit
                //plus.runtime.quit();
                //首页返回键处理
                //处理逻辑：1秒内，连续两次按返回键，则退出应用；
                var first = null;
                plus.key.addEventListener('backbutton', function() {
                    //首次按键，提示‘再按一次退出应用’
                    if (!first) {
                        first = new Date().getTime();
                        console.log('再按一次退出应用');
                        setTimeout(function() {
                            first = null;
                        }, 1000);
                    } else {
                        if (new Date().getTime() - first < 1500) {
                            plus.runtime.quit();
                        }
                    }
                }, false);
            }
        })
    });
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})

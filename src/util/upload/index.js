/*
 * @Author: syyao
 * @Date: 2019-05-19 14:05:15
 * @Last Modified by: syyao
 * @Last Modified time: 2019-05-19 14:31:17
 */

import my_upload from './my-upload.vue'
const myUpload = {
  install:function (Vue) {
    Vue.component('my-upload', my_upload)
  }
}

export default myUpload

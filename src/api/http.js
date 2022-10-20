// 封装axios
import axios from 'axios'
// 导入加载条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Vue from 'vue'
// 导入router实例
import router from '../router/index'

// import {
//     BASE_URl
// } from '../config'
// 初始化axios 对象
let instance = axios.create({
    //以application / x-www-form-urlencoded格式发送数据
    headers: {
        // "content-type": "application/x-www-form-urlencoded",
        "content-type": "application/json",
    },
    //带cookie请求
    withCredentials: true,
    timeout: 3000
})
// 添加请求拦截器
instance.interceptors.request.use(
    function (config) {
        console.log(config)
        NProgress.start()
        return config
    },
    function (error) {
        NProgress.done()
        return error
    }
)
// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        if ((response.data.status == 0 && response.status == 200)) {
            return response
        } else if (response.data.status == 1) {
            router.replace('/timeOut')
        } else {
        }
        NProgress.done()

    },
    function (error) {
        NProgress.done()
        const data = error;
        Vue.prototype.$alert(data ? data : '请求失败,错误码: ' + data.data.status);
        return Promise.reject(error)
    }
)

let get = async function (url, params) {
    let {
        data
    } = await instance.get(url, {
        params
    })
    return data
}

let post = async function (url, params) {
    let {
        data
    } = await instance.post(url, params)
    return data
}

// 导出
export {
    get,
    post
}
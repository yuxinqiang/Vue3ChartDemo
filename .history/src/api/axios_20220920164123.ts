// axios封装
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { close, start } from '@/utils/nprogress' // 页面加载进度条
import { useCommon } from '@/store/modules/common' // 状态管理器
import { errorStatusHandle } from './config/checkStatus'
import { AxiosCanceler } from './config/axiosCancel'

// 初始化状态管理器
const commonStore = useCommon()

const axiosCanceler = new AxiosCanceler()

// 获取当前环境的请求路径
export const getUrl = (): string => {
  const value: string = import.meta.env.VITE_BASE_PATH as string
  return value
}

const noTokenUrlList: [string | undefined] = ['/authentication/admin/login'] // 不需要传递token的接口请求路径集合
// interface Options { }

const httpService = (axiosConfig: AxiosRequestConfig) => {
  // 初始化axios实例
  const Axios = axios.create({
    baseURL: getUrl(),
    timeout: 1000 * 10,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    method: 'post'
  })

  /* 请求拦截 */
  Axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      // * 将当前请求添加到 pending 中
      axiosCanceler.addPending(config)
      // 进度条加载
      start()
      //自动携带token
      if (config.headers) {
        if (!noTokenUrlList.includes(config.url)) {
          // 从状态管理器获取token数据
          config.headers['token'] = commonStore.getAdminToken
          // 仅联调测试时使用
          config.headers['userId'] = '3'
        }
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  /* 响应拦截 */
  Axios.interceptors.response.use(
    (response: AxiosResponse) => {
      const { config } = response
      // * 在请求结束后，移除本次请求，并关闭请求 loading
      axiosCanceler.removePending(config)
      // 关闭进度条
      close()
      if (response.data && response.data.code != 200) {
        ElMessage({
          type: 'error',
          message: response.data.message || response.data.errmsg || response.data.msg,
          duration: 5000
        })
        if (response.data.code != 401) {
          return Promise.reject(response.data)
        } else {
          commonStore.removeToken()
          router.replace({
            path: '/login'
          })
        }
      } else if (response.data && response.data.code == 200) {
        return response.data
        // ElMessage({
        //   type: 'success',
        //   message: response.data.msg ? response.data.msg : '操作成功！',
        //   duration: 5000
        // })
      }
    },
    (error) => {
      error.config && axiosCanceler.removePending(error.config)
      // 关闭进度条
      close()
      errorStatusHandle(error) // 处理错误状态码
      return Promise.reject(error) // 错误继续返回给到具体页面
    }
  )
  return Axios(axiosConfig)
}

export default httpService

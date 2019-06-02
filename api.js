import axios from 'axios'
import qs from 'qs'//对参数进行编译
 
class httpService {
  constructor () { 
    //原型和自己的区别
    
    this.URL = '//oper.ppdai.com/forward/forwardreq'
    this._http = axios.create({
      timeout: 100000,
      baseURL: '//oper.ppdai.com/',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
          return qs.stringify(data)
        }]
      })
    this.interceptors()
  } 
  //post接口
  postHttp(params,errinfo) {
     return this._http.post(this.URL,{...params}).catch(err=>{
      errinfo&&errinfo.$vux.toast.text('网络异常，请稍后重试！', 'middle')
     })
  }
  //get接口
  getHttp(url,Params) {
     return this._http.get(this.URL,{
       params:{
         ...Params
       }
     })
  }
  //拦截器
  interceptors(){
    // 添加一个请求拦截器
    this._http.interceptors.request.use(function (config) {
        // Do something before request is sent
        document.getElementById("loading").style.display = "block";
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });
    // 添加一个响应拦截器
    this._http.interceptors.response.use(function (response) {
        // Do something with response data
        document.getElementById("loading").style.display = "none"; //隐藏loading框
        return response;
      }, function (error) {
        // Do something with response error
        return Promise.reject(error);
      });
  }
}
export default new httpService();
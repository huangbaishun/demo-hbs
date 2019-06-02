# demo-hbs
关于前端的一些demo案例

## 学习唐的vue记录

## 子组件为何不建议修改父组件传递的 prop,如果修改了，vue是如何监控的？
- Object.defineProperty();
- MDN 文档

## this.$emit 的返回值是什么？
- this
- 如果需要返回值可以使用 回掉参数
```
  在子组件中
  this.$emit('change', e.target.value, val => {
    console.log(val);
  });
  在父组件中，接收emit 函数使用第二个参数
  change(msg, callback) {
    callback('message');
    return message;//不建议
  }
  表示子组件需要父组件的callback中的 message 值。
```
## 相同插槽是合并还是替换 
- 2.6版本 都是替换

## 非空
- /^1[0-9]{10}$/.test(phone)  校验手机号

## 数组有哪些方法支持响应性更新？ 不支持底层如何实现的
- 支持：push(), pop(), shift(), unshift(), splice(), sort(), reverse()
- 不支持：filter(), concat(), slice()
```
  不支持的底层同样是Object.defineProperty对数组方法进行该写
```
## vuex是一种状态管理模式
- state ———————— this.$store.state.xxx 取值----mapState----提供一个响应式数据
- Getter ———————— this.$store.getters.xxx 取值(逻辑/计算/缓存)---mapGetters ---- 借助computed来实现缓存
- Mutation ——————this.$store.commit('xxx') 赋值 -----mapMutations
- Action ———————— this.$store.dispatch('xxx) 赋值 ----mapActions
- Module -------Vue.set动态添加state到响应式数据中, 嵌套不要过深，开启命名空间namespaced: true,灵活运用 createNamespacedHelpers

### vuex是通过什么方式提供响应式数据到？
- new Vue({});

### watch 中 immediate: true 表示该回掉在监听开始之后被立即调用
## vue-router
- hash 模式：丑无法使用锚点定位
- history模式：需要后端配合，IE9不兼容（可强制刷新处理）model: 'history' 

- 底层实现
```
 1. router-link/$router.push/a href/浏览器前进后退/手动修改URL  ----> 2.  触发 updateRoute --------> 3. Vue.util.defineReactive_route ------> 4. <router-view>
```

- SPA 缺点
  * 不利于 SEO ---- 1. 可以购买排名 2. 服务端渲染 SSR(配置繁琐)
  * 首屏渲染时间过长 ----- 1. 预渲染 Prerendering 适用于静态站点（不常变动到页面）

## Nuxt 解决了什么问题？
- 动态渲染
- 静态站点
- 简化配置

##  Ant Design Pro 

## echarts
- 图表在渲染的时候，初始化的时候DOM可能还没有更新，可以使用 resize-detector 第三方库监听图表DOM的改变。

## 点击加载更多 保持dom效率，vue的库  virtual-scroll-list

## 移动端300ms延迟 fastclick  -----> fastclick.attach(document.body)

## 项目中利用 vue-clipboard2 实现剪切板功能
```
原生实现
  <body>
    <textarea cols="20" rows="10" id="test">用户定义的代码区域</textarea>
    <input type="button" onClick="copyUrl2()" value="点击复制代码" />
</body>
<script type="text/javascript">
function copyUrl2(){
    var Url2=document.getElementById("test");
    Url2.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    alert("已复制好，可贴粘。");
}
</script>
```

## npm run build -- --report    在dist文件下输出report.html可以进行打包分析。

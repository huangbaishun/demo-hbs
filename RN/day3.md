# react-native - day3



## 1. FlatList使用步骤

1. 按需导入`FlatList`

   ```js
   import { View, Text, FlatList } from 'react-native'
   ```

2. 创建一个userlist数组：

   ```js
   this.state = {
         userlist: [
           { id: 1, name: '张三', age: 22 },
           { id: 2, name: '张三2', age: 33 },
           { id: 3, name: '张三3', age: 24 },
           { id: 4, name: '张三4', age: 44 },
           { id: 5, name: '张三5', age: 55 },
           { id: 6, name: '张三6', age: 66 },
           { id: 7, name: '张三7', age: 77 },
           { id: 8, name: '张三8', age: 88 }
          ]
       }

   ```

3. 为 `FlatList`指定`data`数据源和`renderItem`渲染方法：

   ```jsx
   <FlatList
           data={this.state.userlist} // 数据源
           renderItem={({ item, index }) => <Text>{item.name}</Text>} // 要把每一条数据渲染成什么样子
         >
   </FlatList>
   ```

4. `keyExtractor`属性，相当于是Vue中的`:key`，用来标识每条数据唯一性的，注意， `keyExtractor`接收一个function，并且这个function的返回值必须是`string`类型：

   ```jsx
   <FlatList
           data={this.state.userlist}
           renderItem={({ item, index }) => <Text>{item.name}</Text>}
           keyExtractor={(item, index) => item.id + ''}
         >
   </FlatList>
   ```

5. 通过`ItemSeparatorComponent`为每一项之间，添加分割线，注意，`ItemSeparatorComponent`接收一个function，并且需要return一个合法的reactNative元素：

   ```jsx
   <FlatList
           data={this.state.userlist}
           renderItem={({ item, index }) => <View style={styles.item}>
             <Text><Text style={styles.boldText}>编号：</Text>{item.id}</Text>
             <Text><Text style={styles.boldText}>姓名：</Text>{item.name}</Text>
             <Text><Text style={styles.boldText}>年龄：</Text>{item.age}</Text>
           </View>}
           keyExtractor={(item, index) => item.id + ''}
           ItemSeparatorComponent={() => <View style={styles.sep}></View>}
         >
   </FlatList>
   ```

6. 结合`onEndReachedThreshold`和`onEndReached`可以实现加载下一页数据的效果；

   + `onEndReachedThreshold`距离列表底部的百分比，值是一个数字，一般都要在`0~1`之间；
   + `onEndReached`是一个函数，表示当距离列表底部不足某个大小的时候，执行此函数；

   ```jsx
   <FlatList
           data={this.state.userlist}
           renderItem={({ item, index }) => <View style={styles.item}>
             <Text><Text style={styles.boldText}>编号：</Text>{item.id}</Text>
             <Text><Text style={styles.boldText}>姓名：</Text>{item.name}</Text>
             <Text><Text style={styles.boldText}>年龄：</Text>{item.age}</Text>
           </View>}
           keyExtractor={(item, index) => item.id + ''}
           ItemSeparatorComponent={() => <View style={styles.sep}></View>}
           onEndReachedThreshold={0.2} // 距离底部不足此百分比值的时候，会触发 onEndReached 函数
           onEndReached={() => this.loadNextPage()}
         >
   </FlatList>
   ```




## 2. 安装路由

> 注意：大家目前电脑上安装的`npm`都是`5.x`的版本，在RN项目中，如果使用`5.x版本的npm`去装包，会出现丢包的情况；因此，千万不要使用`cnpm`和`npm`来装包；
>
> 推荐大家使用 `yarn add 包名 ` 来装RN中需要的包；

1. 运行`yarn add react-native-router-flux`安装路由的包；
2. 注意：`react-native-router-flux`只提供了编程式导航，并没有提供`标签式`导航；也就是，必须使用路由提供的 JS API 实现路由的导航；
3. `react-native-router-flux`包中，提供了三个最基本的组件：
   - `Router`表示 路由的根容器，在一个RN项目中，`Router`组件应该只出现一次，就好比React网页项目开发中的`HashRouter`；
   - `Stack ` 表示 路由的分组，所有的 路由规则，必须嵌套到 `Stack `中，否则路由无法正常使用；
   - `Scene ` 在RN项目中，每个`Scene`就表示一个路由规则
     - `key（必选项）`是当前这个路由规则的唯一标识符，每个`Scene`路由规则，必须提供一个`key`属性；
     - `component（必选项）`表示当前路由规则匹配成功后，展示哪个组件页面；
     - `title（可选项）`表示 路由规则匹配成功后，在页面顶部展示的页面名称；




## 3. 路由的一些基本使用方法

1. 实现路由的编程式导航跳转：

   ```js
   // Actions 提供了编程式跳转的能力
   import { Actions } from 'react-native-router-flux';

   // 从 A 页面 -> B 页面
   Actions.页面的key()
   ```

2. 路由跳转并传参：

   ```js
   // 跳转并传递 一个参数对象，注意， 参数对象中，不要使用 name, 因为 name 有特殊含义；
   Actions.movieview({ username: 'zs', age: 20 })

   // 在 页面中，直接访问 this.props 就能够拿到路由传递的参数：
   console.warn(this.props.username)
   console.warn(this.props.age)
   ```

3. 使用`Scene`组件的`hideNavBar`属性，隐藏指定页面的导航条；

   ```jsx
   <Scene key="homeview" component={Home} hideNavBar={true}></Scene>
   ```

4. 使用`Actions.pop()`实现路由的后退功能；

5. 使用路由中提供了`Tabs`组件，来设置 tabbar:

   ```jsx
   // 1. 需要把 tabbar 相关的 Scene ，统一嵌套到 同一个 tabs 组件中：
   <Router>
         <Tabs key="root" tabBarStyle={{ backgroundColor: 'pink' }} tabBarPosition="bottom">
           {/* 注意： 在 路由规则中，第一个路由规则，就是项目的首页 */}
           <Scene 
               key="homeview" 
               component={Home} 
               hideNavBar={true} 
               title="首页" 
               tabBarLabel="自定义Label" 
               icon={() => <Image source={require('./images/menu1.png')} style={{ width: 25, height: 25 }} />}></Scene>
           <Scene key="movieview" component={Movie} title="电影列表"></Scene>
           <Scene key="aboutview" component={About} title="关于我们"></Scene>
         </Tabs>
       </Router>
   ```

   + 通过 为 `Scene`提供`tabBarLabel`设置tab栏的文字；通过`icon`设置tab栏的图标；

6. 如果只想有一个在顶部显示的tab栏，并且，不期望有Icon图标，默认只显示文字，此时，大家需要显示的为tabs组件，设置`tabBarPosition="top"`属性：

   ```jsx
   <Tabs key="root" tabBarStyle={{ backgroundColor: '#50B2FF' }} tabBarPosition="top">
   </Tabs>
   ```

   ​

## 4. [配置Tab栏](https://github.com/happypancake/react-native-tab-navigator)

1. 运行`yarn add react-native-tab-navigator`安装包

2. 导入 tab 栏组件

   ```js
   import TabNavigator from 'react-native-tab-navigator'
   ```

3. 导入 tabbar 的组件页面

   ```js
   import Home from './components/tabbar/home'
   import Search from './components/tabbar/search'
   import Cart from './components/tabbar/cart'
   import Me from './components/tabbar/me'
   ```

4. 使用 TabNavigator 组件创建对应的 Tab 栏结构：

   ```jsx
   <TabNavigator>

         <TabNavigator.Item
           title="首页"
           selected={this.state.selectedname === 'home'}
           onPress={() => this.setState({ selectedname: 'home' })}
           // renderIcon={() => <Icon name="home" size={22} />}
           // renderSelectedIcon={() => <Icon name="home" size={22} color="#000" />}
         >
           <Home></Home>
         </TabNavigator.Item>

         <TabNavigator.Item
           title="搜索"
           selected={this.state.selectedname === 'search'}
           onPress={() => this.setState({ selectedname: 'search' })}
           // renderIcon={() => <Icon name="search" size={22} />}
           // renderSelectedIcon={() => <Icon name="search" size={22} color="#000" />}
         >
           <Search></Search>
         </TabNavigator.Item>

         <TabNavigator.Item
           title="购物车"
           badgeText={0 + ''}
           selected={this.state.selectedname === 'cart'}
           onPress={() => this.setState({ selectedname: 'cart' })}
           // renderIcon={() => <Icon name="shopping-cart" size={22} />}
           // renderSelectedIcon={() => <Icon name="shopping-cart" size={22} color="#000" />}
         >
           <Cart></Cart>
         </TabNavigator.Item>

         <TabNavigator.Item
           title="会员"
           selected={this.state.selectedname === 'me'}
           onPress={() => this.setState({ selectedname: 'me' })}
           selectedTitleStyle={{ color: 'red' }}
           // renderIcon={() => <Icon name="user" size={22} />}
           // renderSelectedIcon={() => <Icon name="user" size={22} color="#000" />}
         >
           <Me></Me>
         </TabNavigator.Item>

       </TabNavigator>
   ```

5. 需要在 state 上定义 `selectedname`来保存当前被选中的tab栏：

   ```js
   constructor() {
       super()
       this.state = {
         selectedname: 'home'
       }
     }
   ```

   ​

## 5. [配置Tab栏的图标](https://github.com/oblador/react-native-vector-icons)
> 注意：使用图标，需要使用 `Android SDK Manager` 安装 `Android SDK Build-tools 26.0.1` 并接收其 license;

1. 运行`yarn add react-native-vector-icons`安装包

2. 运行`react-native link`,来快速 进行相关的配置；

3. 打开`android/app/build.gradle`，定位到第`81行`，添加如下代码：

   ```java
   // 自定义项目用用到的 字体文件
   project.ext.vectoricons = [
       iconFontNames: ['Ionicons.ttf'] // Name of the font files you want to copy
   ]

   // 应用导入的字体文件
   apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
   ```

4. 当做完以上3步之后，我们已经手动地修改了安卓的原生代码，因此不要直接刷新代码，这样会报错；我们需要重新运行`react-native run-android`命令，进行打包编译，并重新部署到手机上，进行调试开发；

5. 字体图标已经配置好了，如何用起来呢：

   ```jsx
   // 导入 字体图标
   import Icon from 'react-native-vector-icons/Ionicons'

   <TabNavigator.Item
           title="首页"
           selected={this.state.selectedname === 'home'}
           onPress={() => this.setState({ selectedname: 'home' })}
      +    renderIcon={() => <Icon name="home" size={22} color="#900" />}
         >
           <Home></Home>
   </TabNavigator.Item>
   ```

   ​

## 6. 配置首页的轮播图
1. 轮播图官网：`https://github.com/leecade/react-native-swiper`
2. 运行`yarn add react-native-swiper`安装轮播图组件
3. 导入轮播图组件`import Swiper from 'react-native-swiper';`
4. 其中，在Swiper身上，`showsPagination={false}`是用来控制页码的；`showsButtons={false}`是用来控制左右箭头显示与隐藏；`height={160}`是用来控制轮播图区域的高度的！
5. 设置轮播图的样式：
```
var styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    image:{
        width:'100%',
        height:'100%'
    }
})
```
6. 将组件的代码结构引入到页面上：
```jsx
// 注意： 在 Swiper 的外面，一定要包裹一个 View， 并给这个 View 设置高度；否则无法看到轮播图
<View style={{ height: 200 }}>
    <Swiper style={styles.wrapper} showsButtons={true}>
      <View style={styles.slide1}>
        <Text style={styles.text}>Hello Swiper</Text>
      </View>
      <View style={styles.slide2}>
        <Text style={styles.text}>Beautiful</Text>
      </View>
      <View style={styles.slide3}>
        <Text style={styles.text}>And simple</Text>
      </View>
    </Swiper>
  </View>
```

#### 首页轮播图片URL地址：
+ 图片地址1：http://www.itcast.cn/images/slidead/BEIJING/2017410109413000.jpg
+ 图片地址2：http://www.itcast.cn/images/slidead/BEIJING/2017440109442800.jpg
+ 图片地址3：http://www.itcast.cn/images/slidead/BEIJING/2017441409442800.jpg




## 7. 项目API接口地址

> 开发环境 - 请求根地址：`http://39.106.32.91:3005`
>
> 上线环境 - 请求根地址：`https://api.douban.com`

1. 正在热映：`/v2/movie/in_theaters?start=0&count=1`
2. 即将上映：`/v2/movie/coming_soon?start=0&count=1`
3. Top250：  `/v2/movie/top250?start=0&count=1`
4. 电影详情：`/v2/movie/subject/26861685`




## 8. 渲染电影列表数据

## 9. 渲染电影详情页面

## 10. 调用摄像头拍照
[react-native-image-picker的github官网](https://github.com/marcshilling/react-native-image-picker)
[react native 之 react-native-image-picke的详细使用图解](http://www.cnblogs.com/shaoting/p/6148085.html)
1.  运行`npm install react-native-image-picker@latest --save`安装到项目运行依赖，此时调试**可能会报错**，如果报错，需要使用下面的步骤解决：
	+ 先删除`node_modules`文件夹
	+ 运行`npm i`
	+ 运行`npm start --reset-cache`
2. 运行`react-native link`自动注册相关的组件到原生配置中
3. 打开项目中的`android`->`app`->`src`->`main`->`AndroidManifest.xml`文件，在第8行添加如下配置：
```
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```
4. 打开项目中的`android`->`app`->`src`->`main`->`java`->`com`->`当前项目名称文件夹`->`MainActivity.java`文件，修改配置如下：
    ```
    package com.native_camera;
    import com.facebook.react.ReactActivity;

    // 1. 添加以下两行：
    import com.imagepicker.permissions.OnImagePickerPermissionsCallback; // <- add this import
    import com.facebook.react.modules.core.PermissionListener; // <- add this import

    public class MainActivity extends ReactActivity {
        // 2. 添加如下一行：
        private PermissionListener listener; // <- add this attribute

        /**
         * Returns the name of the main component registered from JavaScript.
         * This is used to schedule rendering of the component.
         */
        @Override
        protected String getMainComponentName() {
            return "native_camera";
        }
    }
    ```

5. 在项目中添加如下代码：
    ```
    // 第1步：
    import {View, Button, Image} from 'react-native'
    import ImagePicker from 'react-native-image-picker'
    var photoOptions = {
      //底部弹出框选项
      title: '请选择',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '选择相册',
      quality: 0.75,
      allowsEditing: true,
      noData: false,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }

    // 第2步：
    constructor(props) {
    super(props);
        this.state = {
          imgURL: ''
        }
      }

    // 第3步：
    <Image source={{ uri: this.state.imgURL }} style={{ width: 200, height: 200 }}></Image>
    <Button title="拍照" onPress={this.cameraAction}></Button>

    // 第4步：
    cameraAction = () => {
    ImagePicker.showImagePicker(photoOptions, (response) => {
      console.log('response' + response);
      if (response.didCancel) {
        return
      }
      this.setState({
        imgURL: response.uri
      });
    })
    }
    ```

6. **一定要退出之前调试的App**，并重新运行`react-native run-android`进行打包部署；这次打包期间会下载一些jar的包，需要耐心等待！



## 11. 修改应用图标和名称

1. `android/app/src/main/res/values/strings.xml`修改应用名称
2. `android\app\src\main\res\mipmap-xxxxxx`修改图标



## 12. 签名打包发布Release版本的apk安装包
+ 请参考以下两篇文章：
 - [ReactNative之Android打包APK方法（趟坑过程）](http://www.jianshu.com/p/1380d4c8b596)
 - [React Native发布APP之签名打包APK](http://blog.csdn.net/fengyuzhengfan/article/details/51958848)

### 如何发布一个apk
1. 先保证自己正确配置了所有的 RN 环境
2. 在 cmd 命令行中，运行这一句话`keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000`
 + 其中： `my-release-key.keystore` 表示你一会儿要生成的那个 签名文件的 名称【很重要，要找个小本本记下来】
 + `-alias` 后面的东西，也很重要，需要找个小本本记下来，这个名称可以根据自己的需求改动`my-key-alias`
 + 当运行找个命令的时候，需要输入一系列的参数，找个口令的密码，【一定要找个小本本记下来】
3. 当生成了签名之后，这个签名，默认保存到了自己的用户目录下`C:\Users\liulongbin\my-release-key.keystore`
4. 将你的签名证书copy到 android/app目录下。
5. 编辑 `android` -> `gradle.properties`文件，在最后，添加如下代码：
```
MYAPP_RELEASE_STORE_FILE=your keystore filename
MYAPP_RELEASE_KEY_ALIAS=your keystore alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```
6. 编辑 android/app/build.gradle文件添加如下代码：
```
...
android {
    ...
    defaultConfig { ... }
    + signingConfigs {
    +    release {
    +        storeFile file(MYAPP_RELEASE_STORE_FILE)
    +        storePassword MYAPP_RELEASE_STORE_PASSWORD
    +        keyAlias MYAPP_RELEASE_KEY_ALIAS
    +        keyPassword MYAPP_RELEASE_KEY_PASSWORD
    +    }
    +}
    buildTypes {
        release {
            ...
    +        signingConfig signingConfigs.release
        }
    }
}
...
```
7. 进入项目根目录下的`android`文件夹，打开终端，然后输入`./gradlew assembleRelease`开始发布APK的Release版；
8. 当发行完毕后，进入自己项目的`android\app\build\outputs\apk`目录中，找到`app-release.apk`，这就是我们发布完毕之后的完整安装包；就可以上传到各大应用商店供用户使用啦；

>注意：请记得妥善地保管好你的密钥库文件，不要上传到版本库或者其它的地方。

## 相关文章
+ [React Native 小米（红米）手机安装失败、白屏 Failed to establish session 解决方案](http://blog.csdn.net/u011240877/article/details/51983262)
+ [React Native Android 初次试用遇到的各种坑](http://lib.csdn.net/article/reactnative/48721)
+ [Redux 中文文档](http://www.redux.org.cn/)
+ [react-native 在使用require加载本地图片时报Unexcepted character](http://blog.csdn.net/u014038534/article/details/53943862)
+ [React Native for Android 发布独立的安装包](http://blog.csdn.net/u013531824/article/details/51003775)
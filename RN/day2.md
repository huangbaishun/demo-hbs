# react-native - day2



## 1. 配置RN基本的开发环境

请大家参考rn课程第1天笔记中的【10. 移动App开发环境配置】进行开发环境的配置；

1. 注意：自己电脑的用户名必须是英文的；否则，在进行RN项目编译的时候，会报错；
2. 如果在第一次进行项目编译的时候，可能会联网下载很多的包，第一次编译，一定要确保自己的电脑联网了；
3. 我们可以手动的，把一个叫做 `gradle-2.14.1-all.rar`的压缩包，手动拷贝到`C:\Users\自己的用户名文件夹\.gradle\wrapper\dists`，右键`x`解压出来即可；
4. 当我们手动把 `gradle` 解压出来以后，在此运行`react-native run-android`命令，此时，还会联网下载许多的依赖包，此时，耐心等待即可；如果中间，某个包下载很久还没成功，此时`Ctrl+C`终止这次打包，重新运行`react-native run-android`;



##2. 对手机进行相关配置

1. 要把自己的安卓手机，开启开发者模式，并勾选USB调试；
2. 我们需要为自己的手机，信任这台开发的电脑；就是当手机连上电脑以后，`允许USB调试`；
3. 要把自己的手机USB，选择为`MTP 文件传输模式`；
4. 针对于不同的电脑，要保证电脑上，正确安装了 手机的USB驱动；
5. 如果以上步骤，都正确进行操作了，但是还无法通过`adb devices`查看到手机，则考虑自己手机是否为 oppo 和 vivo；




## yarn使用说明

> yarn 作用和 npm 完全一样，但是从体验上来说，yarn 更胜一筹； 而且 ， RN 中只能使用 yarn 装包，千万不要用 `cnpm` 或 `npm`;

1. 装包运行 `yarn add jquery`，这里不需要指定 `--save` 或 `-S` ，因为 yarn 默认就是安装到了 `dependencies` 节点下；
2. 运行 `yarn add webpack -D`， 这里的 `-D` ，就表示，把对应的包，安装到 `devDependencies` 节点下；
3. 运行 `yarn remove 包名` 就可以卸载包，同时，会自动 把 `package.json`中记录的包信息删除；
4. `yarn init -y`表示快速初始化一个 包管理配置文件，如果在项目中，不初始化就装包，也会出现 安装到 用户目录下的问题；
5. 运行 `yarn` 可以安装所有在 `package.json` 中记录的包；




## 3. 搭建RN项目

1. 注意：RN项目，必须放在纯英的目录下，否则 运行会报错！






## 4. 项目结构介绍

> 参考博客：[react-native之项目结构分析](http://blog.csdn.net/dachaoxuexi/article/details/78676291)

1. 在项目的根目录中，通过 终端 运行 `react-native start` 可以快速启动 `packager server`



## 5. 修改项目首屏页面



## 6. 使用样式

1. `Text`组件支持 `textAlign`，但是 `View`不支持；
2. 在 网页中，一个 div 盒子，默认 没有启用 `flexbox` 布局，所以需要手动 设置 `display: flex;`；但是， 在 RN 中，默认 每个 `View` 组件，都是启用了 `flexbox` 布局的；
3. 注意：在 网页中，默认 主轴 是 横向的（从左到右），用 `justifyContent` 来进行控制； 默认网页中，侧轴 是 纵向的（从上到下）， 用 `alignItems` 来进行控制；
4. 但是，在 RN 中，默认主轴是纵向的，因此，``justifyContent` 控制的是纵向上的对齐方式； 默认 侧轴 是横向的，因此，`alignItems `控制 水平方向上的对其方式；




## 7. 基本组件的使用介绍

- View：相当于网页中的 div 元素，主要负责布局；

- Text：相当于网页中的 span 元素，主要用来展示文本；

- TextInput：文本框组件

  1. 默认在安卓平台有默认底边框，需要使用`underlineColorAndroid="transparent"` 来隐藏底边框；
  2. 在 RN 中，为元素设置边框，不能直接使用`border`，要使用 各自 拆开的属性`borderWidth`、`borderColor`
  3. `keyBoardType` 是 `enum` 枚举类型；

- Image：用来在 RN 中显示图片；

  - 显示本地图片：

    ```jsx
    {/* 引用本地的图片资源 */}
    <Image source={require('./images/1.jpg')}/>
    ```

  - 显示网络上的图片

    ```jsx
    {/* 引用 网络上的 图片资源 */}
    {/* 如果引用网络上的图片，除了指定 source 之外，还要通过 样式指定 宽 和 高 */}
    <Image source={{ uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3878847766,3988120331&fm=200&gp=0.jpg' }} style={{ width: 150, height: 150 }} />
    ```

- Button：按钮组件

- Touchable 系列组件，提供了响应 点击事件的能力：

  - TouchableHighlight：效果 `activeOpacity `可以设置被点击元素的透明度；`underlayColor ` 可以设置背景色；
  - TouchableOpacity：只能够改变透明度
  - TouchableNativeFeedback：安卓下原生的视觉反馈;
    - `background={TouchableNativeFeedback.SelectableBackground()}` 只有灰色的涟漪效果，并且超出 `View` 区域；
    - `background={TouchableNativeFeedback.SelectableBackgroundBorderless()}`只有灰色的涟漪效果，但是，涟漪会超出 `View` 区域；
    - `background={TouchableNativeFeedback.Ripple('red', false)}` 既可以配置 涟漪颜色，又可以配置涟漪是否可以超出 `View` 区域；

- ActivityIndicator：loading效果

- ScrollView：页面的滚动组件；被 ScrollView 包裹的元素，如果超出了屏幕的高度，会自动添加滚动条；

  - 注意：在使用 此组件的时候，最好为 `ScrollView` 添加 `style={{ flex: 1 }}`样式，使其撑满父元素
  - 应用场景：那些不是用 `for` 循环创建出来的 `列表` 都可以使用 `ScrollView` 包裹；

- FlatList ：使用 `FlatList ` 适合做列表渲染；

  - 最精简的用法：

    ```jsx
    <FlatList
            data={this.state.mylist1} // 要渲染的数据
            // renderItem 是来渲染每一项的，指定了每一项 要被渲染成 什么样子
            renderItem={({ item, index }) => <View>
              <Text style={{ lineHeight: 150 }}>编号：{item.id} --- 姓名：{item.name} --- 年龄：{item.age}</Text>
            </View>}
            keyExtractor={(item, index) => item.id + ''} // 表示 自定义key
          />
    ```

    ​




## 相关文章

1. [Win10怎么开启超级管理员administrator帐户](https://jingyan.baidu.com/article/fdffd1f87f7d6ff3e98ca1ff.html)
2. [Win10怎么将中文登录用户文件夹名改为英文名?](https://jingyan.baidu.com/article/27fa732689e0eb46f8271f27.html)
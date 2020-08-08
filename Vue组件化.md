为什么要组件化？

我们可以将一个完整的页面分成很多个组件，每个组件都用于实现页面的一个功能块，而每一个组件又可以进行细分，便于管理、维护，还能进行复用。

### 注册组建的步骤

- 创建构造器
- 注册组件
- 使用组件

#### 创建构造器

- 调用 `vue.extend()` 方法创建
- 该方法接收一个对象作为参数，参数有一个template属性，属性值为要作为组件的html模板。

#### 注册组件

- 调用 `vue.component()` 方法注册；
- 该方法接收两个参数，第一个为字符串，作为组件的标签，第二个参数为组件构造器。

#### 使用组件

- 必须在Vue实例的范围内使用
- 在页面显示必须在Vue实例/全局注册过

```
<body>
    <div id="app">
    3、使用组件（全局组件）
        <cpn></cpn>
    </div>

</body>
<script src="vue.js"></script>
<script>
	1、创建组件构造器
    const cpnC = Vue.extend({
        template: `
        <div>
            <h2>我是标题1</h2>
            <p>哈哈哈哈哈哈哈哈</p>
            <p>呵呵呵呵呵呵呵呵</p>
        </div>       
      `
    })
    
    2、注册组件
    Vue.component('cpn', cpnC);

    const app = new Vue({
        el: '#app',
    })
</script>
```

注意：

- HTML标签不区分大小写 ,组件的标签名可以都用小写，不要出现大写字母
- vue实例化要放在创建和注册后面
- template模板中的html代码必须要有一个根标签

### 全局和局部组件

原因：注册地点不一样

1. 全局组件：调用 `vue.component()` 方法注册，可以在多个vue实例中用

   ```
   Vue.component('cpn', cpnC);
   ```

2. 局部组件：在Vue实例对象中注册，只能在该vue实例中用

```
    const app = new Vue({
        el: '#app',
        data: {
            message: "hhhh"
        },
        // 2、注册组件（局部组件：只能在该vue实例中用）
        components: {
            // cpn为标签名
            cpn: cpnC
        }
    })
```

#### 组件语法糖

将创建和注册合在一起

省去extend，直接将extend中的对象作为注册方法的第二个参数。

```
<body>
    <div id="app">
        <cpn></cpn>
    </div>


</body>
<script src="vue.js"></script>
<script>
    // 全局语法糖
    // Vue.component('cpn', {
    //     template: `
    //     <div>
    //         <h2>我是标题</h2>
    //         <p>哈哈哈哈哈哈哈哈</p>
    //         <p>呵呵呵呵呵呵呵呵</p>
    //         <cpn1></cpn1>
    //     </div>        
    //   `
    // })

    const app = new Vue({
        el: '#app',
        components: {
     // 局部语法糖
            cpn: {
                template: `
        <div>
            <h2>我是标题</h2>
            <p>哈哈哈哈哈哈哈哈</p>
            <p>呵呵呵呵呵呵呵呵</p>
            <cpn1></cpn1>
        </div>        
      `
            }
        }
    })
</script>
```

### 父组件和子组件

子组件（<cpn1></cpn1>）因为没有被注册过，所以子组件只能在父组件的 template 中使用

在组件的template中使用另一个组件时，会优先在该组件构造器中搜索有无注册要使用的组件，若没有，则去上一级搜索

```
<body>
    <div id="app">
        <cpn2></cpn2>
        <!-- 组件要想在页面上使用，必须在 全局注册过/vue实例中注册过 -->
        <cpn1></cpn1>
    </div>

</body>
<script src="vue.js"></script>
<script>
    // 子组件
    const cpnC1 = Vue.extend({
        template: `
        <div>
            <h2>我是标题1</h2>
            <p>哈哈哈哈哈哈哈哈</p>
            <p>呵呵呵呵呵呵呵呵</p>
        </div>
        
      `
    })

    // 父组件
    const cpnC2 = Vue.extend({
        template: `
        <div>
            <h2>我是标题2</h2>
            <p>哈哈哈哈哈哈哈哈</p>
            <p>呵呵呵呵呵呵呵呵</p>
            <cpn1></cpn1>
        </div>        
      `,
        components: {
            cpn1: cpnC1
        }
    })

    // root组件（可以看作爷爷）
    const app = new Vue({
        el: '#app',
        components: {
            cpn2: cpnC2
        }
    })
</script>
```

### 模板的分离写法

template模块的写法不方便而且可读性差，分离出来挂载到对应组件上，会使结构更加清晰

- 使用 `<script>` 标签，类型是 `text/x-template`，最后用 id 绑定

  ```
  <script type="text/x-template" id="cpn">
      <div>
          <h2>标题1</h2>
          <p>内容a</p>
      </div>
  </script>
  
  <script>
      Vue.component('cpn',{
          template: '#cpn'
      })
  </script>
  ```

- 直接template标签，用id绑定

  ```
  <template id="cpn2">
      <div>
          <h2>标题2</h2>
          <p>内容b</p>
      </div>
  </template>
  
  <script>
      Vue.component('cpn2',{
          template: '#cpn2'
      })
  </script>
  ```



### 组件数据存放

- 组件不能访问 Vue 实例中的数据，每个组件有自己存放数据的地方。

- 组件对象也有一个 data，但是此处的 data 是一个函数，返回一个对象，对象保存着组件的数据。

为什么data要是一个函数？

可复用性



### 组件通信

父组件往子组件传数据：

props 

$parent（还能访问各种方法）

- props仅仅只能接收，单项绑定。着重数据传递。向子组件传递数据。
- parent既可以接受父组件数据，又可以修改父组件数据。是双向的。
- parent还可以调用父组件的方法。



子组件往父组件传递数据

$emit (自定义事件)

#### 数据通信

- props向子组件传递数据
- 通过自定义事件向父组件发送消息

##### 父传子

props

```
<body>
    <div id="app">
        <!-- 这里要用v-bind，否则会把后面的message和movies当作字符串处理 -->
        <cpn :cmessage="message" :cmovies="movieslist"></cpn>
    </div>

    <template id='cpn'>
    <div>
        <h2>{{cmessage}}</h2>
        <p >
            <ul>
                <li v-for="item in cmovies">{{item}}</li>
            </ul>
        </p>
    </div>
    </template>

</body>
<script src="vue.js"></script>
<script>
    const cpn = {
        template: '#cpn',
        // 1、数组格式：要用变量要用引号
        // props: ['cmovies', 'cmessage'],
        // 2、对象格式
        props: {
            // 类型限制(多个可以用数组) 
            // cmessage:string,
            // cmovies:Array

            //提供一些默认值（没有数据给它时） 必传值（没传会报错）
            cmessage: {
                type: String,
                default: 'aaaa',
                required: true
            },
            cmovies: {
                type: Array,
                // default:['hhh','eee']有条件
                // 当类型是数组和对象时，默认值必须为一个函数
                default () {
                    return []
                }
            }
        }
    }

    let app = new Vue({
        el: '#app',
        data: {
            message: '父组件',
            movieslist: ['想见你', '甜心格格', '樱桃小丸子']
        },
        components: {
            // 对象增强写法
            cpn
        }
    })
</script>
```

##### 子传父

- 在子组件中，通过 `$emit()` 来触发事件。
- 在父组件中通过 `v-on` 来监听子组件事件。

```
<body>
    <div id="app">
     <!-- 自定义事件这里，参数不写，会默认把 发射那里的item  传进去，而不会把event传进去 -->
        <cpn @itemclick="cpnclick"></cpn>
    </div>

    <template id="cpn">
        <div>
            <button v-for="item in categories" @click="btnclick(item)">{{item.name}}</button>
        </div>
    </template>

</body>
<script src="vue.js"></script>
<script>
    const cpn = {
        template: '#cpn',
        data() {
            return {
                categories: [{
                    id: 1,
                    name: '热门推荐'
                }, {
                    id: 2,
                    name: '热门推荐'
                }, {
                    id: 3,
                    name: '热门推荐'
                }, {
                    id: 4,
                    name: '热门推荐'
                }]

            }
        },
        methods: {
            btnclick(item) {
                // 向父组件发射自定义事件
                // itemclick：自定义事件，item：传递过去的参数
                this.$emit('itemclick', item)
            }
        }
    }


    const app = new Vue({
        el: '#app',
        components: {
            cpn
        },
        methods: {
            cpnclick(item) {
                console.log(item);
            }
        }
    })
</script>
```



#### 访问方式

- 父组件访问子组件：$children   $refs
- 子组件访问父组件：$parent

##### 父访问子

this.$children 为一个数组类型，包含所有子组件对象

this.$refs指向一个空对象

通常使用 `$refs` 方式访问，因为 `$children` 需要使用索引值

```
<body>
    <div id="app">
        <cpn ref="aaa"></cpn>
        <cpn></cpn>
        <button @click="btnclick">按钮</button>
    </div>

    <template id="cpn">
        <div>
            <p>我是组件模板</p>
        </div>
    </template>

</body>
<script src="vue.js"></script>
<script>
    const app = new Vue({
        el: '#app',
        data: {
            name: '实例',
            //movieslist: this.$children[0].cmovieslist
            // movieslist: this.$refs.aaa.cmovieslist
        },
        methods: {
            btnclick() {
                // console.log(11);
                // this.$children指向一个数组,数组元素是子组件(直接儿子的集合)
                console.log(this.$children);
                console.log(this.$children[0].cmovieslist);
                this.$children[0].showMessage()

                // this.$refs指向一个空对象
                // aaa是上面一个子组件定义的,为key;属性值为该子组件
                console.log(this.$refs.aaa);
            }
        },
        components: {
            cpn: {
                template: '#cpn',
                data() {
                    return {
                        cmovieslist: ['想见你', '甜心格格', '樱桃小丸子']
                    }
                },
                methods: {
                    showMessage() {
                        console.log('子组件');
                    }
                }
            },

        }
    })
</script>
```

##### 子访问父

```
<body>
    <div id="app">
        <cpn></cpn>
    </div>

    <template id="cpn">
        <div>
            <p>我是组件模板{{cname}}</p>
            <ul>
                <li v-for="item in clist">{{item}}</li>
            </ul>
            <button @click="btnclick">按钮</button>
        </div>
    </template>

</body>
<script src="vue.js"></script>
<script>
    const app = new Vue({
        el: '#app',
        data: {
            name: '实例',
            list: ['wkj', 'wy', 'yyqx']
        },
        methods: {
            showMessage() {
                console.log('父组件');
            }
        },
        components: {
            cpn: {
                template: '#cpn',
                data() {
                    return {
                        cmovieslist: ['想见你', '甜心格格', '樱桃小丸子'],
                        // 父传子(props)
                        cname: this.$parent.name,
                        clist: this.$parent.list
                    }
                },
                methods: {
                    btnclick() {
                        // 一个组件只能由一个父组件吧
                         // this.$parent指向一个对象(此处为vue实例)
                        console.log(this.$parent);
                        console.log(this.$parent.name);
                    }
                },
            }
        }
    })
</script>
```

## 插槽

为了让原来的设备具有扩展性，比如：电脑的USB可以插入U盘、鼠标等

### 组件的插槽

- 让封装的组件更加具有扩展性
- 让使用者可以决定组件内部的**一些内容**（安装插槽的地方）到底显示什么
- 若组件的模板中没有包含一个 `<slot>` 元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃。



```
    <div id="app">
        <cpn>我是插槽的替换内容</cpn>
    </div>

    <template id="cpn">
        <div>
            <h2>我是组件的模板</h2>
            <slot></slot>
        </div>
    </template>
```

当组件渲染的时候，`<slot></slot>` 将会被替换为“我是插槽的替换内容”



```
    <div id="app">
        <cpn>我是插槽的替换内容</cpn>
        <cpn></cpn>
    </div>

    <template id="cpn">
        <div>
            <h2>我是组件的模板</h2>
            <slot>我是插槽的默认内容</slot>
            <slot></slot>
            <slot></slot>
        </div>
    </template>
```

渲染时，看到插槽有内容时，先看看组件的起始标签之间有没有内容；

若有，则插槽内部显示起始标签之间的内容；

若没有，则显示插槽的之间的内容（默认内容）

#### 具名插槽

当有多个插槽时，在外面如何给 指定插槽 插入相应内容?

照往常，则每个插槽都插入外面给的一样的内容

给`slot`加一个name属性，这时候，只有外面有该名字的标签内容才能替换`slot`中的默认内容



1. slot语法（已废弃）

```
    <div id="app">
        <cpn>标题</cpn>
    </div>

    <template id="cpn">
        <div>
            <slot name="left">左边</slot>
            <slot>中间</slot>
            <slot>右边</slot>
        </div>
    </template>
```

结果：左边 标题 标题

若外面的标签没有指定名字，则只会替换没有加名字的标签



```
    <div id="app">
        <cpn>
            <span slot="left"> 内容 </span>
        </cpn>
    </div>

    <template id="cpn">
        <div>
            <slot name="left">左边</slot>
            <slot>中间</slot>
            <slot>右边</slot>
        </div>
    </template>
```

结果：内容 中间 右边

外面加上名字则只会替换有对应名字的标签



2、v-slot

简写 `v-slot:header` 可以被重写为 `#header`

```
<cpn>
  <template v-slot:header>
    <h1>标题</h1>
  </template>

  <p>内容</p>

  <template v-slot:footer>
    <p>页底</p>
  </template>
</cpn>

<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  
  <main>
    <slot></slot>
  </main>
  
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

结果：标题 内容 页底



区别：

- **`v-slot` 只能添加在 `<template>` 上**
- v-slot:名字



总结：从上往下渲染时，
遇到有名字的标签，则看外面是否有对应名字的标签；
若有，则替换，若没有，则显示默认内容；
遇到没有名字的标签，看外面 是否有没有名字的标签；
若有， 则替换， 若没有， 则显示默认内容



#### 编译作用域

父级模板里的所有内容都是在父级作用域中编译的；

子模板里的所有内容都是在子作用域中编译的。

```
<body>
    <div id="app">
    	<!-- 这里的isShow=true -->
        <cpn v-show="isShow"></cpn>
    </div>

    <template id="cpn">
        <div>
            <h2>我是组件的模板</h2>
             <!-- 这里的isShow=false-->
            <button v-show="isShow">按钮</button>
        </div>
    </template>

</body>
<script src="vue.js"></script>
<script>
    const app = new Vue({
        el: '#app',
        data: {
            isShow: true
        },
        components: {
            cpn: {
                template: '#cpn',
                data() {
                    return {
                        isShow: false
                    }
                }
            },

        }
    })
</script>
```

结果：我是组件的模板

#### 作用域插槽

父组件替换插槽的标签，但是内容由子组件来提供



此处为什么不可以用$refs?

ref在初始渲染时时访问不到的，它是作为渲染结果拿到的；

不要用ref做数据绑定和计算属性



```
    <div id="app">
        <cpn></cpn>
        <cpn>
            <!-- 获取子组件中的cmovieslist -->
            <!-- 这里的slot可以随便取 -->
            <template v-slot="slot">
                <!-- data来自下面取名 -->
                <!-- slot来自上面的取名 -->
                <!-- <span v-for="item in slot.data">{{item}}-</span> -->
                <!-- 这里的join()将数组元素用-间隔变成字符串 -->
                <span>{{slot.data.join('-')}}</span>
            </template>
        </cpn>
    </div>

    <template id="cpn">
        <div>
            <!-- data 可以随便取 -->
            <slot :data="cmovieslist">
                <ul>
                    <li v-for="item in cmovieslist">{{item}}</li>
                </ul>
            </slot>
        </div>
    </template>
```


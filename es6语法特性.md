### 变量

#### 新的声明方法

let：防止重复声明（变量）、块级作用域

const：防止重复声明（常量）、块级作用域

##### let

- 防止重复声明：不允许在相同作用域内，重复声明同一个变量,不能在函数内部重新声明参数

- 块级作用域

  ```
  
      {
          let j = 5;
          console.log(j);// 5
      }; 
      {
          console.log(j); //6
      }
  ```

  

- 暂时性死区：只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

- 没有变量提升

  ```
   // let不可以直接赋值，应该先声明
  // 在let命令声明变量h之前，都属于变量h的“死区”
   h = 8;
   let h;
   console.log(h);// 报错
   
   // 如果一个变量根本没有被声明，反而不会报错。
   k = 99;
   console.log(k);
  ```

##### const

- 具有块级作用域
- 声明常量时必须赋值
- 常量赋值后，值不能修改

#### 块级作用域

一定程度可以替代闭包

var作用域 -函数级

let作用域 - 块级

-  块级作用域之中，函数声明语句的行为类似于`let`，在块级作用域之外不可引用。 

#### 解构赋值

**用于多变量的赋值**

```
 // 多个变量赋值
let [a, b, c] = [1, 2, 3];

// 用于对象（）
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"
```

1. 两边的结构必须一样
2. 右边必须明确是一个东西`let {a,b}={12,12} // 报错`
3. 赋值和解构必须同时完成

### 函数

#### 箭头函数

简写：有利于小函数的应用

  function() {

  }

  ()=>{}

##### 注意点

1.  如果有且仅有一个参数，（）可以省略

2. 如果有且仅有一个语句并且是return，{}和return均可以省略

3.  由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错或得到错误结果。 

   ```
   // 报错
   let getTempItem = id => { id: id, name: "Temp" };
   
   // 不报错
   let getTempItem = id => ({ id: id, name: "Temp" });
   ```

   ```
   let foo = () => { a: 1 };
   foo() // undefined
   ```

   

4. 固定this： 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象

   （当前函数父级作用域的this）。 

   - **普通this跟着执行人走**
   -  **箭头函数的this会继承定义函数时的上下文，可以理解为和外层函数指向同一个this。** 

   ```
   // 正常this跟着执行人走：
    // 1、方法指向那个对象
    let json = {
               a: 2,
               fn: function() {
                   console.log(this);
                   alert(this.a); 
               }
           }
       json.fn(); // 2
       let oDate = new Date();
       oDate.fn = json.fn;
       oDate.fn();// undefined this：Thu Jul 23 2020 11:18:10 GMT+0800 (中国标准时间)；
    
    // 2、普通函数指向window
   var obj = {
     a: 2,
     fn: function () {
       return function () {
       	return this;
       }
     }
   }
   console.log(obj.fn()()); //返回window
    
   // 箭头函数将this指向当前函数父级作用域的this
    // 1、 
     class Json {
           constructor() {
               console.log(this); // json对象：Json {}
               this.a = 12;
               this.fn = () => {
                   console.log(this); // Json {a: 12, fn: ƒ}
                   alert(this.a);
               }
           }
       }
       let oDate = new Date();
       oDate.fn = json.fn;
       oDate.fn(); // 12
       
     // 2、
   var obj = {
     a: 2,
     fn: function () {
       return () => {
       	return this.name;
       }
     }
   }
   console.log(obj.fn()()); //2
   ```

##### 事件处理中箭头函数的this使用

1、 使用普通函数时this为当前DOM对象

```
<body>
  <button desc="hdcms">button</button>
</body>
<script>
  let Dom = {
    site: "后盾人",
    bind() {
      const button = document.querySelector("button");
      button.addEventListener("click", function() {
        console.log(this);
      });
    }
  };
  Dom.bind();
</script>
```

 2、使用`handleEvent`绑定事件处理器时，`this`指向当前对象而不是DOM元素。 

```
<body>
  <button desc="hdcms">button</button>
</body>
<script>
  let Dom = {
    site: "后盾人",
    handleEvent: function(event) {
      console.log(this);
    },
    bind() {
      const button = document.querySelector("button");
      button.addEventListener("click", this);
    }
  };
  Dom.bind();
</script>

```

3、使用箭头函数同时可以指向两个对象

```
<body>
  <button desc="hdcms">button</button>
</body>
<script>
  let Dom = {
    site: "后盾人",
    bind() {
      const button = document.querySelector("button");
      button.addEventListener("click", event => {
        console.log(this + event.target);
      });
    }
  };
  Dom.bind();
</script>
```

**总：用到对象多就用箭头函数，要指向DOM元素的用普通函数**

多重函数时要根据实际情况决定哪一层使用箭头函数



#### 扩展运算符...

##### 参数收集：必须是最后一个

```
    // ...c必须是最后一个
    function show(a, b, ...c) {
        console.log(a, b, c);
    }
    show(1, 2, 3, 4, 5) // 1 2 (3) [3, 4, 5]
    show(1, 2) // 1 2 []
    show(1) // 1 undefined []
```

##### 数组的扩展

```
let arr=[1,2,3];
 // ...arr :1,2,3 
 
 console.log(...[1, 2, 3])
// 1 2 3

// 用于数组的拼接  额外：concat()
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let arr = [...arr1, ...arr2];
alert(arr);
    
console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5
```

##### json的扩展

```
    // json展开(类似数组)
    let json = {
        a: 1,
        b: 2
    };
    alert(...json); // 报错 
    let json2 = {
        ...json,
        d: 999
    }
    console.log(json2);
```





### 原生对象的扩展

- map：映射，一一对应（2个参数）
- reduce：多出一（3）
- filter：过滤（2）
- forEach：遍历
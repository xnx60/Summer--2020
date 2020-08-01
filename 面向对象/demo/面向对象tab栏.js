// alert(1)
let that;
class Tab {

    // 构造函数用来接收参数
    constructor(tab) {
        that = this;
        // 获取元素
        this.main = document.querySelector('main');
        this.add = this.main.querySelector('.tabadd');
        // li的父元素
        this.ul = this.main.querySelector('ul');
        // section的父元素
        this.tabcon = this.main.querySelector('.tabscon');
        // 一旦调用就绑定事件
        this.init();

    }

    // 获取所有的li和section
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.icons = this.main.querySelectorAll('.icon');
        this.spans = this.main.querySelectorAll('li span:first-child');
    };

    // init初始化操作让相关元素绑定事件
    init() {
        this.updateNode();
        this.add.onclick = this.addTab;
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab; // 此处若加（）则页面一加载就会调用这个函数，要点击才调用这个函数
            this.icons[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }

    // 1、切换功能
    toggleTab() {
        // 这里面的this指向小li
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    };
    // 清除所有li和section样式
    clearClass() {
        // 这里面的this=that，因为此方法是that调用的
        for (let i = 0; i < that.lis.length; i++) {
            that.lis[i].className = '';
            that.sections[i].className = '';
        }
    };
    // 2、添加功能
    addTab() {
        that.clearClass();
        // （1）、创建li元素和section元素
        let random = Math.random()
        let li = '<li class="liactive"><span>新选项卡</span><span class="icon"></span> </li>';
        let section = '<section class="conactive">内容' + random + '</section>';
        // （2）、把这两个元素追加到对应的父元素里面
        that.ul.insertAdjacentHTML('beforeend', li);
        that.tabcon.insertAdjacentHTML('beforeend', section);
        //重新获取元素且要绑定事件
        that.init();
    };
    // 3、删除功能
    removeTab(e) {
            e.stopPropagation(); // 阻止冒泡，防止触发li的切换点击事件
            let index = this.parentNode.index;
            console.log(index);
            that.lis[index].remove();
            that.sections[index].remove();
            that.init();
            // 当删除的不是选中状态时，原来处于选中状态的li保持不变
            if (document.querySelector('.liactive')) return;
            // 当删除选中状态的小li时，让前一个小li处于选中状态
            index--;
            // 手动调用点击事件（可以同时改变section中的内容） 不需要鼠标触发
            that.lis[index] && that.lis[index].click();
        }
        // 4、修改功能
    editTab() {
        // 先获取原先文字
        let str = this.innerHTML;
        // 双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text"/>';
        // 获取双击的文本框
        let input = this.children[0];
        input.value = str;
        input.select(); // 让文本框里面的文字处于选中状态
        // 当离开文本框时就把文本框里面的值赋给span
        input.onblur = function() {
            this.parentNode.innerHTML = this.value;
        };
        // 当按下回车也可以把文本框内容给span
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                // this.parentNode.innerHTML = this.value;
                this.blur();
            }
        }

    }

}
let tab1 = new Tab('.tabsbox')
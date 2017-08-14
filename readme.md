# TimeCounter (又一个Demo.)

## 功能
获取并显示当前时间，另外支持设置倒计时。

倒计时功能中可以设置一个标题，时间支持最长无限制，最短到分钟。

## TODO
更新页面外观：倒计时显示效果（例如添加动画），日期选择框外观

使用更优雅的方式处理时间戳的运算

anyother TODO.

## What I learn?

### localstorage的使用 !important
localstorage中储存的键值对，可以通过localstorage["foo"]="string"进行设置，localstorage["foo"]进行读取。

同一域名下的不同页面共享同一个localstorage空间。

localstorage永久储存，除非使用
	
	localstorage.clear()

清除，或者用户操作浏览器自行清除.

	为什么不使用localstorage.foo 调用？
	变量名储存格式为字符串，使用.无法处理字符串中含空格的情况

### window.location API
使用window.location.replace('foo.link')进行页面跳转

	还有window.location.reaload()刷新页面（会清除history记录,或者说相当于打开一个新页面不含history记录）

### 原生Js的使用
函数的调用，DOM onload的检测回调

### Date()类型中数据的相互转换
input.date控件传输的日期格式和Date()的日期格式不同，通过

	Date.parse(foo) =>转换为UTC时间戳
	foo.split("string") =>字符串分隔，string定义分隔位置
	
对数据进行转换

不过仍然觉得不够优雅，但是没有看到更好的解决方案。

### CSS @media 的使用
使用媒体查询，分别在移动端和PC上显示不同的布局。

另外，布局上也实践了一些处理方法。
	
	居中：设置父元素text-align:center，子元素display:inline-block对子元素进行居中
	input中的提示文字：使用placeholder属性 

## what I unsatisfy?
时间戳相减的代码太不优雅了。

anymore...

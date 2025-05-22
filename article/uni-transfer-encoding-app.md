---

title: uniapp中app端流式请求解决方法

date: 2025-05-22 16:24:12

tags:
- uniApp

categories:
- uniApp

---

> 引言：为解决uniapp中流式请求的解决方法，
> 因为后端请求返回的是Transfer-Encoding: chunked, 
> 而且只有小程序端支持（开启EnabledChunked: true就可以接受流式请求），
> app端目前没有好的解决方案，所以只能自己写一个流式请求。
> 研究了半天，最终使用了renderjs的方法，导入fetch文件


解决代码如下：
```html
<script lang="renderjs" module="renderjs">
	let data, ctrl
	export default {
		mounted() {
            data = this.data
			const script = document.createElement('script')
			// 导入路径是根据根目录路径算的，因为renderjs 是在视图层
			script.src = 'static/fetch.js'
			document.head.appendChild(script)
		},
        methods: {
          async moduleSendMessage(e) {
            // 使用此方法调用视图层方法
            this.$ownerInstance.callMethod('viewMethod', 'value')
            
            ctrl = new AbortController()
            const res = await fetch(opts.url, {
              method: opts.method,
              headers: opts.header,
              body: JSON.stringify(opts.data),
              signal: ctrl.signal
            })
            const reader = res.body.getReader()
            const textDecoder = new TextDecoder();
            while (true) {
              const { value, done } = await reader.read();
              if (done) {
                this.$ownerInstance.callMethod('resDone')
                break;
              }
              let content = textDecoder.decode(value);
            }
        },
      }
</script>
```

初始化的时候给renderjs传递参数的方法
```html
<!--    放到视图任意地方都行，都会执行renderjs中的mounted方法，给data赋值-->
    <view :dataProp="data" :change:dataProp="renderjs.update"></view>
```

视图层代码如下：
```javascript
    export default {
      data() {
        return {
          data: 'name' // 这个是传递到renderjs 中的值
        }
      },
      methods: {
        viewMethod() {
          // renderjs 中调用的此方法，处理一些逻辑
        }
      }
    }
```

有什么问题可以联系我，具体解决方案的话我也是一点点看文档解决出来的，不想麻烦就直接使用websocket解决就行了。


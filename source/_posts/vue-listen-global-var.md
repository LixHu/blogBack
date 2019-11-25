---
title: Vue使用Vuex监听全局变量并更新内容
date: 2019-11-25 15:58:44
tags:
- vue
- 前端
---

> 今天做项目时遇到一个问题，要根据头部选择的ID来切换显示不同的数据内容，就涉及到了监听全局变量的问题
> 后引入vuex， 然后使用$store作为全局变量的使用

> 下面是使用vuex的介绍，使用到了action, mutations

---------------

```
    import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        gameId: ''
    },
    getters: {
        getGameId:function( state ) {
            return state.gameId
        }
    },
    mutations: {
        setValueGameId: function(state, value) {
            state.gameId = value
        }
    },
    actions: {
        setGameId: function(context, value) {
            context.commit('setValueGameId', value)
        }
    }
})

export default store
```

> 然后再main.js中引入store
---------------
```
    import Vue from 'vue'
    import store from './utils/store'
    
    new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app')
```

> 然后子组件中使用gameId 属性，并监听其变化, 需要在computed中写一个计算函数返回状态管理中的gameId
> 此处的子组件就能监听到gameId 的变化，并能进行操作
-------------
```
    <template>
        <div>{{ gameId }}</div>
    </template>
    
    <script>
        export default {
            data() {
                return {
                    
                }
            },
            methods: {
                // 切换gameId的值，使监听生效
                setGameIds(value) {
                    // 使用状态管理中的action，设置gameId的值
                    this.$store.dispatch("setGameId", value)
                }
            },
            computed: {
                getGameIds: {
                    return this.$store.state.gameId
                }
            },
            watch: {
                getGameIds(val) {
                    console.log(val)
                }
            }
        }
    </script>
```
-----------------
> 此处只是记录一下，并没有深入研究vuex，写的不好的地方请见谅。勿喷

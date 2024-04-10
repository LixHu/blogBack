---

title: Vue3使用G6自定义节点问题整理

date: 2022-01-06 16:42:34

tags:

- Vue

categories:

- Vue

---

# 前言

最近在开发关系图，拓扑图等应用，所以用到了Antv G6模块，遇到自定义节点的问题，这边整理一下碰到的问题以及解决方案。以及针对文档上面group的整理。

其实文档上面有对group这个参数做介绍,找起来比较麻烦。这边整理一下，以及对应的设置。 这边ts的类型自己定义，我这边就不定义ts类型了。

### 自定义节点

G6文档上面有说明，自定义节点的方法如下：

```javascript
  // 方法说明： registerNode(节点名称,配置项,继承的节点名称)
    G6.registerNode('nodeName', options, extendedNodeName)
```

也就是说，可以扩展某个内置节点，或者从无到有绘制一个节点。

##### 扩展节点
扩展一个节点的话，这边以扩展rect内置节点为例，添加一个describe属性，放到label标签下面，方法如下：

```javascript
    G6.registerNode('rect-desc', {
  afterDraw(cfg, group) {
    const shape = group.get('children')[1]
    shape.attr({
      x: 0,
      y: -10,
    })
    if (cfg.describe) {
      return group.addShape('text', {
        attrs: {
          x: 0,
          y: 10,
          textAlign: 'center',
          textBaseline: 'middle',
          text: cfg.describe,
          fill: '#000',
        },
        name: 'desc-shape',
        draggable: true,
      })
    }
  }
}, 'rect')
```

这边有很多个问题，我为什么不直接使用draw方法来创建，因为使用draw直接重写了rect的draw方法，一些rect基本的属性都会失效，包括锚点，路径等。
afterDraw 是在rect绘制之后进行添加，这边就使用了afterDraw方法来实现这个逻辑。


使用`group.get`获取元素，并针对该元素进行对应的修改。文章后有介绍。

这边使用了`group.addShape`这个方法来进行新增一个shape, 方法在文档中有进行介绍。
##### 8.20更新,update扩展节点问题

因自定义节点可能会涉及到更新问题，所以自定义节点的时候，需要加上update属性，直接使用上面的方法，新增update方法。

```javascript

G6.registerNode('rect-desc', {
  afterDraw(cfg, group) {
    // 绘制之后重写部分方法
    const shape = group.get('children')[1]
    shape.attr({
      x: 0,
      y: -10,
    })
    if (cfg.describe) {
      return group.addShape('text', {
        attrs: {
          x: 0,
          y: 10,
          textAlign: 'center',
          textBaseline: 'middle',
          text: cfg.describe,
          fill: '#000',
        },
        name: 'desc-shape',
        draggable: true,
      })
    }
  },
  update(cfg, node) {
     // 当节点更新时，重新修改当前组件的内容
    const group = node.getContainer()
    const shape = group.get('children')[1]
    shape.attr({
      x: 0,
      y: -25
    })
    if (cfg.describe !== undefined) {
      const child = group.find((ele) => ele.get('name') === 'desc-shape')   // 因为新增的描述属性，这边更新的话需要先删除再新增。
      group.removeChild(child)
      return group.addShape('text', {
        attrs: {
          x: 0,
          y: 10,
          textAlign: 'center',
          textBaseline: 'middle',
          text: cfg.describe,
          fill: '#000',
        },
        name: 'desc-shape',
        draggable: true,
      })
    } 
  }
}, 'rect')
```

然后使用updateItem方法，来更新当前节点，如：
```javascript
const node = {
  describe: 'test test',
  label: '测试'
}
graph.updateItem('node', node)
```
#### 从无到有绘制一个节点
从无到有就引用官方的一个实例，新增一个节点，包括锚点、路径等内容都需要重新自己配置。

```javascript
G6.registerNode('diamond', {
  draw(cfg, group) {
    // 如果 cfg 中定义了 style 需要同这里的属性进行融合
    const keyShape = group.addShape('path', {
      attrs: {
        path: this.getPath(cfg), // 根据配置获取路径
        stroke: cfg.color, // 颜色应用到描边上，如果应用到填充，则使用 fill: cfg.color
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: 'path-shape',
      // 设置 draggable 以允许响应鼠标的图拽事件
      draggable: true,
    });
    if (cfg.label) {
      // 如果有文本
      // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
      // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
      // style.text = cfg.label;
      const label = group.addShape('text', {
        // attrs: style
        attrs: {
          x: 0, // 居中
          y: 0,
          textAlign: 'center',
          textBaseline: 'middle',
          text: cfg.label,
          fill: '#666',
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: 'text-shape',
        // 设置 draggable 以允许响应鼠标的图拽事件
        draggable: true,
      });
    }
    return keyShape;
  },
  // 返回菱形的路径
  getPath(cfg) {
    const size = cfg.size || [40, 40]; // 如果没有 size 时的默认大小
    const width = size[0];
    const height = size[1];
    //  / 1 \
    // 4     2
    //  \ 3 /
    const path = [
      ['M', 0, 0 - height / 2], // 上部顶点
      ['L', width / 2, 0], // 右侧顶点
      ['L', 0, height / 2], // 下部顶点
      ['L', -width / 2, 0], // 左侧顶点
      ['Z'], // 封闭
    ];
    return path;
  },
});
```

上面使用的是G6官方文档中绘制的节点，因为是新建节点，所以使用draw方法，来绘制一个新的节点。path 也就是路径，在getPah中有体现是怎么来绘制的。
总之，会创建一个图形分组，也就是group，对应节点中图形对象容器。

### group方法介绍

文档中有各个方法介绍，这边只介绍几个在使用中遇到的问题，文档中group对象的介绍地址[group对象介绍地址](https://g6.antv.vision/zh/docs/api/Group)

1. 修改对应节点

这边使用中有遇到获取group节点并进行修改位置的方法，也就是使用`group.get`方法

```javascript
group.get('children')
```

此方法返回值在于在一个group中有几个子元素，比如rect。方法中返回了了两个元素，可以针对元素进行修改，如下：

```javascript
const shape = group.get('children')[1]
shape.attr({
  x: 0,
  y: -10
})
```

元素修改和创建的shape方式相同，属性也相同。







### 遇到的问题以及处理方法

1. 涉及外层transform，节点位置和鼠标位置不一致的问题

需要给canvas设置一下适配css的transform
```javascript
    graph.get('canvas').set('supportCSSTransform', true)
```

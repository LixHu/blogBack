---

title: THREEJS小白学习踩坑经验

date: 2022-04-18 11:53:24

tags:
- JavaScript
- React

categories:
- React
- JavaScript

---


- 最近公司要做一个2.5D插件，然后自己学旋转角度不太好，然后就使用了THREEJS, 用起来还是比较繁琐的，整体支持不太好，整体都是自己研究，看到写的不好地方勿怪

1. 首先，要创建一个场景，以及一个相机（相机分为透视相机和正交摄像机，区别在后面会解释），代码如下

```javascript
export default class ThreeComponent extends React.Component<any, any> {
  private mount: any
  private camera: any
  private scene: any
  private renderer: any
  
  componentDidMount() {
    this.init()
    this.renders()
  }
  
  init = () => {
    // 相机
    this.camera = new THREE.PerspectiveCamera(30, this.mount.clientWidth / this.mount.clientHeight, 1, 2500)
    this.camera.position.set(500, 800, 1300)
    this.camera.lookAt(30, 0, 0)
    // 场景
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x000000)

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setClearColor(0xEEEEEE, 0.0)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight)
    this.mount.appendChild(this.renderer.domElement)
    window.addEventListener('resize', () => this.onWindowResize.bind(this))
  }

  onWindowResize = () => {
    this.camera.aspect = this.mount.clientWidth / this.mount.clientHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight)

    this.renders()
  }
  
  renders = () => {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div id='canvas'
           style={{ width: '100%', height: '100%' }}
           ref={(mount) => {
             this.mount = mount
           }}/>
    )
  }
}
```
2. 相机和平面创建完成，接来下我这边是直接创建一个平面放到场景中，代码如下

```javascript
    const geometry = new THREE.PlaneGeometry(800, 400)
    // 设置透明以及颜色
    const material = new THREE.MeshBasicMaterial({ color: 0x091A20, transparent: true, opacity: 0.8 })
    const plane = new THREE.Mesh(geometry, material)
    // 这边操作的是旋转还是位置
    plane.rotation.x = 300.1
    plane.rotation.y = 0
    plane.rotation.z = 49.8
    plane.rotation.y = 0
    plane.position.x = 120
    plane.position.y = 200
    this.scene.add(plane)
```

3. 添加一个图片到场景中，接着上面的代码
```javascript
    const image = require('../../assets/images/test.png').default
    // 因为添加图片加载是异步的，所以在load方法中操作，每次加载之后都要执行一遍renders方法，重新渲染场景
    new THREE.TextureLoader().load(image, (texture) => {
      // 设置透明度，以及基础材质的map
      const mat = new THREE.MeshBasicMaterial({ map: texture, transparent: true })
      const geom = new THREE.BoxGeometry(100, 100)
      const mesh = new THREE.Mesh(geom, mat)
      mesh.receiveShadow = true
      mesh.rotation.z = 19.7
      mesh.position.x = 0
      mesh.position.y = -30
      // 往plane平面中添加，这样就可以直接放到plane中，位置就是plane的位置
      plane.add(mesh)
      this.renders()
    })
```
4. 创建点对点的线

> 首先要说，因为正常ThreeJs的line不能设置线宽，所以要用到的MeshLine,github地址为： [MeshLine](https://github.com/spite/THREE.MeshLine)

```javascript
// 这里引入MeshLine
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline'

      const mat = new THREE.MeshBasicMaterial({ map: texture1, transparent: true })
      const boxGeom = new THREE.BoxGeometry(60, 150)
      const mesh = new THREE.Mesh(boxGeom, mat)
      const mat1 = new THREE.MeshBasicMaterial({ map: texture2, transparent: true })
      const boxGeom1 = new THREE.BoxGeometry(60, 150)
      const mesh1 = new THREE.Mesh(boxGeom1, mat1)
      const point = []
      point.push(mesh.position) // mesh的位置
      point.push(mesh1.position)  // mesh1的位置
      // 点对点的线
      const line = new MeshLine()
      line.setPoints(point)
      const lineMaterial = new MeshLineMaterial({
        color: new THREE.Color(0xffffff),
        lineWidth: 10,
        transparent: true,
        opacity: 0.5
      })
      // 添加线
      const lineMesh = new THREE.Mesh(line.geometry, lineMaterial)
      plane.add(mesh)
      plane.add(mesh1)
      plane.add(lineMesh)
      // 更新完之后在执行一遍render，把东西渲染到画布中
      this.renders()
```

5. 添加轴线
```javascript
    const axesHelper = new THREE.AxesHelper(800)
    this.scene.add(axesHelper)
```
6. 缩放、定位、以及旋转

```typescript
    // 缩放功能对应mesh进行缩放，每个mesh添加后都有固定的position， rotation， scale 属性
    mesh.position.set(x, y, z)
    mesh.rotation.set(x, y, z)
    mesh.scale.set(x, y, z)
    // 也可以这样, scale, rotation 都可以这么设置
    mesh.position.x = 0 
    mesh.position.y = 0
    mesh.position.z = 0
```
7. 添加文字
添加文字使用threeJS官方的添加文字需要导入json文件，而且还需要中文配置，所以使用起来占用内存会比较大，所以当前项目中使用的是Canvas导入文字图片

```typescript
    //创建canvas
    const canvas = document.getElementById('text-canvas') as HTMLCanvasElement
    const ctx = canvas?.getContext('2d') as any
    canvas.width = 100
    canvas.height = 100
    ctx.fillStyle = 'transparent'
    ctx.fillRect(0, 0, 100, 100)
    ctx.fillStyle = '#FFFFFF'
    ctx.font = `normal ${attr.fontSize ?? 14}px "楷体"`
    ctx.fillText(text.length > 5 ? text.substr(0, 5) + '...' : text, 0, 40)
    // 导出图片路径
    const url = canvas.toDataURL('image/png')
    // 设置图片位置等信息
    new THREE.TextureLoader().load(url, (texture: any) => {
      const textGeom = new THREE.PlaneGeometry(200, 200)
      const mat1 = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
      })
      const mesh1 = new THREE.Mesh(textGeom, mat1)
      mesh1.position.set(attr.x, attr.y, attr.z)
      if (attr.rotation !== undefined) {
        mesh1.rotation.set(attr.rotation.x, attr.rotation.y, attr.rotation.z)
      }
      mesh1.scale.set(0.8, 0.8, 0.8)
      if (attr.group !== undefined) {
        attr.group.add(mesh1)
        plane.add(attr.group)
      } else {
        plane.add(mesh1)
      }
      this.renders()
    })
```

8. 正交摄像机和透视摄像机的区别

这边画图的话我就不画了，这块只是稍微的解释一下，具体的可以看一下搜到的文章：[正交相机的应用](https://blog.csdn.net/qq_37338983/article/details/78691705)

简单来说

- 正交摄像机的特点就是：场景中远处的物体和近处的物体是一样大的
- 透视摄像机的特点就是：场景中物体遵循近大远小的摆列，如果物体在最近，物体相对就会比较大

下面就是怎么使用这两个相机：

```typescript
    // 透视摄像机
    this.camera = new THREE.PerspectiveCamera(30, this.mount.clientWidth / this.mount.clientHeight, 1, 2500)

    // 正交摄像机
    this.camera = new THREE.OrthographicCamera(width / -4, width / 4, height / 4, height / -4, -100, 10000)
```
透视摄像机`PerspectiveCamera`属性介绍（以下都是个人理解，如果有不清楚的欢迎指出）：

- fov 摄像机视锥体垂直视野角度 （就是从摄像机看视角的角度有多大）
- aspect 摄像机视锥体长宽比 （通常就是你整个场景的长宽比）
- near 摄像机视锥体近端面 (就是摄像机最近看到的距离)
- far 摄像机视锥体远端面 (摄像机最远看到的距离，和near组合起来就相当于你摄像机从某个位置到某个位置的整体能看到的一个面)

正交摄像机`OrthographicCamera`属性介绍：

- left 摄像机视锥体左侧面。
- right  摄像机视锥体右侧面。
- top 摄像机视锥体上侧面。
- bottom  摄像机视锥体下侧面。
- 上面四个属性推荐配置为场景的长款比，如代码所示（使这个等式成立： | left / right | = 1，| top / buttom | = 1），如果不成立，可能看到的效果不太一样
- near
- far
- 以上两个属性通透视摄像机原理

角度计算：

如果设计刚好给你出了一个图，表示3d的位置等，这块需要一个角度计算，就需要改动摄像机的位置，以及lookAt属性：
```typescript
    this.camera.position.set(x, y, z)
    this.camera.lookAt(x, y, z)
```
这个属性的设置需要自己设置（目前算法还不太了解，之后可能了解了会更新一下），把自己想象成一个摄像机，摆在哪里看到的效果都是不一样的，然后lookAt就是你眼睛看哪个位置，可以看的偏移一点这样的效果

..... 持续更新中
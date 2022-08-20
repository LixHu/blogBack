---

title: Webpack配置SVG不生效解决方法

date: 2021-11-16-09:50:19

tags:
- JavaScript
categories:
- JavaScript

---

最近配置vue3+ts项目导入Svg文件时一直不生效，网上找了很多解决方法都没用，所以就开始自己排查了一下。
首先，我这边不清楚是版本的原因还是因为代码更新的原因，就突然svg-sprite-loader就加载不进来了。

废话不多说，先直接上解决方法：

```javascript
    config.module.rules.delete('svg');
    const rule = config.module.rule('svg')
    rule
        .test(/\.svg$/)
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
            symbolId: 'icon-[name]'
        })
        .end()
```

上面步骤是先清除原有的svg配置，然后再重新配置svg-sprite-loader 的配置。下面开始讲排查步骤。

- 首先，修改svg配置，用 `vue inspect` 查看配置
```javascript
    const rule = config.module.rule('svg')
    rule
        .test(/\.svg$/)
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
            symbolId: 'icon-[name]'
        })
        .end()
```
svg部分的配置输出如下（只包含了svg那部分，其它部分的需要自己去查看）
```text
{
    test: /\.svg$/,
        type: 'asset/resource',
        generator: {
        filename: 'static/img/[name].[hash:8].[ext]'
    },
    use: [
        /* config.module.rule('svg').use('svg-sprite-loader') */
        {
            loader: 'svg-sprite-loader',
            options: {
                symbolId: 'icon-[name]'
            }
        }
    ]
},
```
目前看来svg-sprite-loader 是生效的，但是就是不行，这时我这边就新建了一个rule进行测试，把svg的test改掉，配置如下
```javascript
const rule = config.module.rule('svg')
rule.test(/\.svg2$/)
const rule2 = config.module.rule('my-svg')
rule2
    .test(/\.svg$/)
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
        symbolId: 'icon-[name]'
    })
    .end()
```
之后接着使用vue inspect 查看配置， svg部分和my-svg部分的配置如下
```text
/* config.module.rule('svg') */
{
    test: /\.svg2$/,
    type: 'asset/resource',
    generator: {
      filename: 'static/img/[name].[hash:8].[ext]'
    }
},
/* config.module.rule('my-svg') */
  {
    test: /\.svg$/,
    use: [
      /* config.module.rule('my-svg').use('svg-sprite-loader') */
      {
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        }
      }
    ]
  }
```
这时候my-svg 的这个配置是生效的，这时候就得知，svg的配置中有两个配置一直是没用的，然后且清除不掉，所以这边直接需要把svg的配置给删了，然后再重新写入svg-sprite-loader的配置
```javascript
// 就是开头说的直接删除svg配置
config.module.rules.delete('svg');
const rule = config.module.rule('svg')
rule
    .test(/\.svg$/)
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
        symbolId: 'icon-[name]'
    })
    .end()
```
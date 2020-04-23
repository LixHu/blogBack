---
title: phpDoc标签说明以及使用方法
date: 2020-03-26 17:43:51
tags:
- PHP
- PHPDoc
---
# PHPDoc标签说明

> PHPDoc 是一个 PHP 版的 Javadoc。它是一种注释 PHP 代码的正式标准。它支持通过类似 phpDocumentor 这样的外部文档生成器生成 API 文档，也可以帮助一些例如 Zend Studio, NetBeans, ActiveState Komodo Edit and IDE 和 Aptana Studio 之类的 集成开发环境 理解变量类型和弱类型语言中的其他歧义并提供改进的代码完成，类型提示和除错功能。

> <font color="red">此文档只讲关于PHPDoc的标签说明</font>

> PHPDoc 可同时支持 面向对象 的和 面向过程的 代码。

> Tags are single words prefixed by a "@" symbol. Tags inform parsers how to present information and modify display of documentation as well as allow the IDE to define variable types. All tags are optional, but if you use a tag, they do have specific requirements to parse properly.

> 标签是以“@”符号为前缀的单个单词。标签告知解析器如何呈现信息和修改文档的显示，并允许集成开发环境定义变量类型。所有的标签都是可选的，但是如果你使用一个标签，它们有特定的需求来正确解析。

#### @api
> 表示这是一个提供给第三方使用的API接口

#### @author
> 作者

> 格式@author [名称] [<邮箱>]

> 例如@author lixhu <testyida@163.com>

#### @copyright
> 版权声明。例如很多网站底部都有

> 格式@copyright [描述]

> 例如@copyright 2000-2019 China

#### @deprecated
> 不建议使用的、已过期的、将被删除的

> 格式@deprecated [<版本号>] [<描述>]

> 例如@deprecated 1.0.0 新版本将不再包含此函数
如果它是被其他方法所取代了，建议添加@see标记

#### @example
> 例子、示例、用例。也可表示方法返回值的例子

> 格式@example [位置] [<起始行号> [<行数>] ] [<描述>]

> 例如@example userModel.php 155 3 使用示例

#### @filesource
> 只可作为文档级文本块(DocBlock)的应用, 解析当前文件的源代码，将其源代码进行语法高亮、添加行号，并且在生成的文档中添加它的链接。

> 描述有点模糊，大概就是语法高亮

> @filesource


#### @global
> 全局变量

> 格式@global [类型][名称][描述]

> @global string name 用户名


#### @ignore
> 忽略

> 格式@ignore [<描述>]

> 例如你在if和else的语句块中定义分别同一个变量但值不同时，可以通过此标记让phpDocumentor忽略其中一个，以免生成重复的文档。例如

```
    if ($ostest) {
         /**
          * This define will either be 'Unix' or 'Windows'
          */
         define("OS","Unix");
     } else {
         /**
          * @ignore
          */
         define("OS","Windows");
     }
 ```

#### @internal
> 仅限内部使用的

> 格式@internal [描述]

> 例如@internal 仅限内部使用


#### @license
> 协议

> 格式@license [<url>] [名称]

> 例如@license GPL

#### @link
> 链接

> 格式@link [url] [<描述>]

> 例如@link http://lixhu.github.io myblog

#### @method
> 方法。

> 格式@method [返回值类型] [名称]([[类型] [参数]<, ...>]) [<描述>]

> 例如@method string test(string $test) 测试xxx

#### @package
> 包。

> 例如@package Admin\Index\Admin


#### @param
> 参数

> 格式@param [Type] [name] [<description>]

> 例如@param int $tunnel GET到的渠道

#### @property
> 类属性，与@method类似，可以告诉IDE我这类里有哪些属性

> 格式@property [Type] [name] [<description>]

> 例如@property int gameId 游戏ID

#### @property-read

> 只读的属性。例如__get魔术方法能够取到的属性

> 格式@property-read [Type] [name] [<description>]

> 例如@property-read int gameId 游戏ID


#### @property-write
> 只可写的属性。例如__set魔术方法能够设置的属性

> 格式@property-write [Type] [name] [<description>]

> 例如@property-write string gameName 游戏名称

#### @return
> 返回值

> 格式@return [类型] [<描述>]]

> 例如@return int 返回Id

#### @see
> 参考，类似@link，可与@deprecated联动

> 格式@see [url或完整方法名] [<描述>]

> 例如@see \Admin\Index\Admin::static

#### @since
> 从xx版本开始。例如从1.0之后添加了xx功能、删除了xx参数等

> 格式@since [1.0.0] [<描述>]

> 例如@since 1.3 添加了$gameDesc参数

#### @throws
> 可能会抛出的错误类型

> 格式@throws [类型] [<描述>]

> 例如@throws GameException 游戏内部问题

#### @todo
> 待办。提示自己或他人还需要做些什么

> 格式@todo [描述]

> 例如@todo 这个类还没做完善

#### @uses
> 使用

> 格式@uses [完整方法名] [<描述>]

> 例如@uses \Admin\Index\Admin::$user 使用此属性作为用户唯一标识

#### @var
> 变量

> 格式@var [类型] [变量名] [<描述>]

> 例如@var int gameId 游戏id

#### @version
> 版本号

> 格式@version [<载体>] [<描述>]

> 例如@version 1.0 2020-01-01更新

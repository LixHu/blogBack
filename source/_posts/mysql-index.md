---
title: Mysql的单列索引和复合索引说明
date: 2018-08-18 09:36:43
tags: Mysql
---
# Mysql 的单列索引和复合索引

- 先说下单列索引和复合索引的意义

    - 单列索引：一个索引包含单个列，一个表可以有多个单列索引。
    - 复合索引：一个索引包含多个列。

在性能优化过程中，选择在那些列建立索引是最重要的步骤之一。可以考虑使用索引的主要有两种类型的列：在where字句中出现的列，在join 字句中出现的列。
## 单列索引

举个🌰：

```
    SELECT typename FROM game_category WHERE sort = 1 AND close = 0;

```
查询中需要查询的字段（typename）不需要使用索引，sort 和 close 需要考虑用索引，优化查询速度

再看下下面这个🌰：

```
    SELECT game_category.game_desc,game.game_name FROM game_category
    LEFT JOIN game ON game_category.id = game.cid
    AND close = 0
```
上面的🌰中和第一个🌰的一样，除了需要查询的字段，出现在join 字句中的字段都需要加入索引。
Mysql 只会对以下操作符使用索引：<,<=,>,>=,=,BETWEEN,IN,以及某些时候的LIKE，
可以在LIKE操作中使用索引的情况是指另一个操作数不是以通配符（%或者_）开头的情形

举个🌰
```
    SELECT id FROM game WHERE game_name LIKE '吃%';
```
上面这个🌰会用到索引
```
    SELECT id FROM game where game_name LIKE '%🐔';
```
而👆这个🌰不会用到索引。

## 复合索引

索引可以是单列索引，也可以是多列索引。下面我们通过具体的例子来说明这两种索引的区别。假设有这样一个game表：

```
    CREATE TABLE game (
        id SMALLINT NOT NULL AUTO_INCREMENT,
        game_name CHAR(50) NOT NULL,
        game_desc CHAR(50) NOT NULL,
        cid SMALLINT NOT NULL,
        close SMALLINT NOT NULL,
        PRIMARY KEY (id)
    );
```
例如，我们可能需要查找姓名为Mike Sullivan、年龄17岁用户的peopleid：
```
SELECT id FROM game Where  game_name='农药' AND cid=2 AND close = 0;
```

由于我们不想让MySQL每次执行查询就去扫描整个表，这里需要考虑运用索引。
首先，我们可以考虑在单个列上创建索引，比如game_name、cid或者close列。如果我们创建game_name列的索引
```
ALTER TABLE game ADD INDEX game_name (game_name);
```
MySQL将通过这个索引迅速把搜索范围限制到那些game_name='农药'的记录，然后再在这个“中间结果集”上进行其他条件的搜索：它首先排除那些cid不等于2的记录，然后排除那些close不等于0的记录。当记录满足所有搜索条件之后，MySQL就返回最终的搜索结果。

由于建立了game_name列的索引，与执行表的完全扫描相比，MySQL的效率提高了很多，但我们要求MySQL扫描的记录数量仍旧远远超过了实际所需要的。
虽然我们可以删除game_name列上的索引，再创建cid或者close列的索引，但总地看来，不论在哪个列上创建索引搜索效率仍旧相似。

为了提高搜索效率，我们需要考虑运用复合索引。如果为game_name、cid和close这三个列创建一个多列索引，MySQL只需一次检索就能够找出正确的结果！下面是创建这个多列索引的SQL命令：

```
ALTER TABLE game
ADD INDEX name_cid_close (game_name,cid,close);
```

由于索引文件以B-树格式保存，MySQL能够立即转到合适的game_name，然后再转到合适的cid，最后转到合适的close。在没有扫描数据文件任何一个记录的情况下，MySQL就正确地找出了搜索的目标记录！
那么，如果在game_name、cid、close这三个列上分别创建单列索引，效果是否和创建一个game_name、cid、close的多列索引一样呢？

答案是否定的，两者完全不同。当我们执行查询的时候，MySQL只能使用一个索引。如果你有三个单列的索引，MySQL会试图选择一个限制最严格的索引。但是，即使是限制最严格的单列索引，它的限制能力也肯定远远低于game_name、cid、close这三个列上的多列索引。
### 多列索引中最左前缀（Leftmost Prefixing）

多列索引还有另外一个优点，它通过称为最左前缀（Leftmost Prefixing）的概念体现出来。继续考虑前面的例子，现在我们有一个game_name、cid、close列上的多列索引，我们称这个索引为name_cid_close。当搜索条件是以下各种列的组合时，MySQL将使用name_cid_close索引：

- game_name，cid，close
- game_name，cid
- game_name

从另一方面理解，它相当于我们创建了(game_name，cid，close)、(game_name，cid)以及(game_name)这些列组合上的索引。下面这些查询都能够使用这个name_cid_close索引：
```
SELECT id FROM game WHERE game_name='吃鸡' AND cid = 2 AND close=0;

SELECT id FROM game WHERE game_name='吃鸡' AND cid= 2;

SELECT id FROM game WHERE game_name='吃鸡';

```

下面这些查询不能够使用这个name_cid_close索引：
```
SELECT id FROM game WHERE cid = 2;

SELECT id FROM game WHERE close = 0;

SELECT id FROM game WHERE cid = 2 AND close = 0;
```

- 🗣结束，谢谢大家观看，如果觉得文章还可以就加个QQ群哟。
### linux 群:556831675
### 瞎几把全栈群：796599732
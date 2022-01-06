# 直接合并test分支，之后进行数据库操作

ALTER TABLE `app_orders`
ADD COLUMN `refund_cause`  varchar(255) NULL COMMENT '拒绝理由' AFTER `refund_no`;

ALTER TABLE `app_user_withdraw`
ADD COLUMN `refuse_cause`  varchar(255) NULL COMMENT '拒绝理由' AFTER `service_money`;

insert into `app_config` values ('audit_free', 0, '免审核开关，1开启0关闭');

# 改了app_config 的内容，所以需要清理缓存。


加了一个脚本,内容是陪玩订单七天未开始的自动完成，要在后台登录之后进行跑，脚本地址是 /admin/index/runOrderAutoCompolete
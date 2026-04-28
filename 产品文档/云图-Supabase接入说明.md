# 云图 Supabase 接入说明

## 1. 当前接入内容

当前 demo 已接入以下能力：

- Supabase Auth 邮箱注册
- Supabase Auth 邮箱密码登录
- 登录态恢复
- 用户探索进度、碎片收藏、偏好轨迹写入数据库

当前前端配置文件：

- [demo/supabase-config.js](demo/supabase-config.js)

当前数据库 SQL：

- [supabase/schema.sql](supabase/schema.sql)

## 2. 开通步骤

1. 在 Supabase 创建新项目。
2. 打开 SQL Editor，执行 [supabase/schema.sql](supabase/schema.sql)。
3. 在 Auth 里启用 Email 登录。
4. 将项目 URL 和 anon key 填入 [demo/supabase-config.js](demo/supabase-config.js)。
5. 重新启动本地静态服务并刷新页面。

## 3. 当前数据模型

当前采用最小可用模型：

- `auth.users`：Supabase 内置用户表
- `public.user_profiles`：每个用户一行，保存 display_name 与 app_state

其中 `app_state` 为 jsonb，当前保存：

- 星球探索状态
- 碎片收藏列表
- 偏好得分
- 最近探索记录
- 交互统计

这是为了先把真实登录和真实用户数据跑通，后续如果要做分析型查询，再把 shards、events、progress 拆表。

## 4. 当前限制

- 如果 Supabase 项目开启邮箱确认，注册后需要先去邮箱确认再登录。
- 当前 demo 仍是静态前端，业务权限依赖 Supabase RLS。
- 当前探索数据以用户状态快照形式存储，适合一期验证，不适合直接做复杂 BI。

## 5. 下一步建议

1. 把探索事件和碎片收藏拆成独立表。
2. 增加 `user_events` 表，接探索确认、收藏、回访事件。
3. 增加内容表，逐步把前端内嵌探索卡迁移到数据库或内容后台。
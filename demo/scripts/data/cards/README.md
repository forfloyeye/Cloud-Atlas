# 首批内容录入说明

这个目录用于承接后续批量扩充的探索卡录入底稿。

当前建议工作流：

1. 先复制 `planet-first-batch.template.yaml`
2. 按单个星球填写 6 张首批起稿卡
3. 完成字段自查后，再整理进 `demo/scripts/data/cards.mjs`
4. 运行 `node ./demo/scripts/validate-content.mjs` 做结构校验

录入约束：

- `contentId` 使用 `planetId-序号` 形式，例如 `craft-002`
- 每个星球首批建议 6 张：`L1 x 2`、`L2 x 3`、`L3 x 1`
- `priority` 使用 `P1/P2/P3`
- `status` 使用 `draft/reviewing/published/archived`
- `sourceNote` 在录入期尽量补齐，便于后续校对与追溯

这批模板是录入中间层，不直接被前端读取。
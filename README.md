# 行小之 · 英语角

一个本地优先的英语练习站：查词、识图、自动背词、单词大冒险。

[在线使用](https://english.xn--9iq784ays8a.com/) · [日语角](https://nihongo.xn--9iq784ays8a.com/) · [English](./README.en.md) · [数据与许可](./docs/OPEN_DATA.md) · [贡献指南](./CONTRIBUTING.md)

## 现在有什么

- 14 个首发词库、126 条带语境的英语表达。
- 9 类职场岗位：产品/项目、研发、数据/AI、设计/研究、市场、销售、客户成功、人力、财务/运营。
- 4 类场景词库：旅行、会议、邮件、面试；另有日常高频表达。
- 中英文统一查词，支持词库筛选、收藏、掌握度和到期复习。
- 浏览器语音自动连播：表达 → 中文释义 → 英文例句。
- 图片英文 OCR，worker、模型和 WASM 均从本项目同源加载；图片不上传。
- 10 关单词大冒险，答题结果进入本地学习进度。
- 页头可直接切换到独立发布的行小之日语角。

等级不是产品主轴。条目可以保留 CEFR 等轻量元数据，但首页、查词和练习都以词库与场景组织。

## 本地运行

需要 Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

打开 <http://127.0.0.1:3000>。首次安装会随 npm 包下载英文 OCR 模型；`predev` / `prebuild` 会把模型解压并把运行资源同步到被忽略的 `public/tesseract/`。

```bash
npm run lint
npm run typecheck
npm test
```

`npm test` 会先执行生产构建，再检查服务器渲染的首页核心内容。

`npm run build:pages` 会生成 GitHub Pages 所需的 `out/` 静态站点。`main` 分支上的 Pages workflow 会自动构建并发布，仓库子路径会在构建时注入，无需硬编码。

## 数据与隐私

首发释义、例句和中文翻译由本项目编写；岗位分类与术语选题参考 O*NET 30.3。完整归属、修改说明和第三方许可见 [开放数据说明](./docs/OPEN_DATA.md) 与 [第三方声明](./THIRD_PARTY_NOTICES.md)。

学习记录和收藏保存在浏览器 `localStorage`。识图使用本地 Tesseract.js，不把图片发送到服务器。这个仓库不包含账号、云同步或分析埋点。

## 许可

- 源代码：[MIT](./LICENSE)
- 项目原创词库内容：[CC BY 4.0](./CONTENT_LICENSE.md)
- 第三方软件与数据：遵循各自许可，见 [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)

## 项目状态

当前是可运行的首发版本。源码位于 [GitHub 仓库](https://github.com/happyzhangdy-max/xingxiaozhi-english-corner)，`main` 分支通过 GitHub Actions 自动发布到 [GitHub Pages](https://english.xn--9iq784ays8a.com/)。

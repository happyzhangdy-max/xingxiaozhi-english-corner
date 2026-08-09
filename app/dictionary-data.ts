import { LESSONS as CORE_LESSONS, type Lesson } from "./learning-data";

export type BankKind = "通用" | "职场岗位" | "场景";

export type DictionaryBank = {
  id: string;
  title: string;
  englishTitle: string;
  description: string;
  kind: BankKind;
  sourceId: "original" | "onet-30.3";
};

export type DictionaryEntry = Lesson & {
  bankId: string;
  sourceId: DictionaryBank["sourceId"];
};

export const BANKS: DictionaryBank[] = [
  {
    id: "daily-core",
    title: "日常高频表达",
    englishTitle: "Everyday Core",
    description: "真实对话中高频出现的短语、回应和口语搭配。",
    kind: "通用",
    sourceId: "original",
  },
  {
    id: "travel-core",
    title: "旅行出行",
    englishTitle: "Travel English",
    description: "问路、交通、住宿与临场沟通。",
    kind: "场景",
    sourceId: "original",
  },
  {
    id: "project-product",
    title: "产品与项目",
    englishTitle: "Product & Project",
    description: "从需求、范围到交付的核心术语。",
    kind: "职场岗位",
    sourceId: "onet-30.3",
  },
  {
    id: "software-engineering",
    title: "研发与工程",
    englishTitle: "Software Engineering",
    description: "代码协作、部署、故障与质量管理。",
    kind: "职场岗位",
    sourceId: "onet-30.3",
  },
  {
    id: "data-ai",
    title: "数据与 AI",
    englishTitle: "Data & AI",
    description: "数据管线、模型、评估与实验术语。",
    kind: "职场岗位",
    sourceId: "onet-30.3",
  },
  {
    id: "design-research",
    title: "设计与研究",
    englishTitle: "Design & Research",
    description: "用户体验、视觉系统与设计交付。",
    kind: "职场岗位",
    sourceId: "onet-30.3",
  },
  {
    id: "marketing",
    title: "市场营销",
    englishTitle: "Marketing",
    description: "定位、投放、内容与增长指标。",
    kind: "职场岗位",
    sourceId: "onet-30.3",
  },
  {
    id: "sales",
    title: "销售商务",
    englishTitle: "Sales",
    description: "线索、商机、异议处理与成交。",
    kind: "职场岗位",
    sourceId: "onet-30.3",
  },
  {
    id: "customer-success",
    title: "客户成功与客服",
    englishTitle: "Customer Success",
    description: "入驻、支持、升级、留存与续约。",
    kind: "职场岗位",
    sourceId: "onet-30.3",
  },
  {
    id: "hr-recruiting",
    title: "人力与招聘",
    englishTitle: "HR & Recruiting",
    description: "招聘流程、薪酬、绩效与编制。",
    kind: "职场岗位",
    sourceId: "onet-30.3",
  },
  {
    id: "finance-operations",
    title: "财务与运营",
    englishTitle: "Finance & Operations",
    description: "预算、现金流、采购与经营分析。",
    kind: "职场岗位",
    sourceId: "onet-30.3",
  },
  {
    id: "meeting-room",
    title: "会议协作",
    englishTitle: "Meetings",
    description: "主持、澄清、分工、异议与收尾。",
    kind: "场景",
    sourceId: "original",
  },
  {
    id: "email-writing",
    title: "邮件写作",
    englishTitle: "Email Writing",
    description: "跟进、确认、附件、延期与礼貌收尾。",
    kind: "场景",
    sourceId: "original",
  },
  {
    id: "job-interview",
    title: "求职面试",
    englishTitle: "Job Interviews",
    description: "经历、优势、挑战、薪资与入职时间。",
    kind: "场景",
    sourceId: "original",
  },
];

type EntrySeed = [
  phrase: string,
  meaning: string,
  example: string,
  translation: string,
  note?: string,
];

function makeEntries(
  bankId: string,
  startId: number,
  seeds: EntrySeed[],
  category: Lesson["category"] = "工作学习",
): DictionaryEntry[] {
  const bank = BANKS.find((candidate) => candidate.id === bankId);
  if (!bank) throw new Error(`Unknown dictionary bank: ${bankId}`);

  return seeds.map((seed, index) => ({
    id: startId + index,
    level: "B1",
    phrase: seed[0],
    ipa: "",
    meaning: seed[1],
    example: seed[2],
    translation: seed[3],
    note: seed[4] ?? bank.description,
    category,
    bankId,
    sourceId: bank.sourceId,
  }));
}

const CORE_ENTRIES: DictionaryEntry[] = CORE_LESSONS.map((lesson) => {
  const bankId = lesson.category === "旅行出行" ? "travel-core" : "daily-core";
  return { ...lesson, bankId, sourceId: "original" };
});

const PRODUCT_PROJECT = makeEntries("project-product", 101, [
  ["roadmap", "产品路线图", "The roadmap shows what we plan to deliver this year.", "路线图展示了今年计划交付的内容。"],
  ["backlog", "待办需求池", "We moved the request to the product backlog.", "我们把这个需求移到了产品待办池。"],
  ["scope", "项目范围", "Adding payments would change the scope of this release.", "加入支付功能会改变本次发布的范围。"],
  ["milestone", "里程碑", "The prototype is our first project milestone.", "原型是我们的第一个项目里程碑。"],
  ["stakeholder", "利益相关方；关键协作人", "We need stakeholder approval before launch.", "上线前需要关键协作方批准。"],
  ["deliverable", "交付物", "The final deliverable is a tested mobile prototype.", "最终交付物是经过测试的移动端原型。"],
  ["dependency", "依赖项", "The release has a dependency on the billing team.", "这次发布依赖计费团队。"],
  ["acceptance criteria", "验收标准", "The acceptance criteria describe when the task is done.", "验收标准说明任务何时算完成。"],
]);

const SOFTWARE_ENGINEERING = makeEntries("software-engineering", 121, [
  ["repository", "代码仓库", "The source code lives in a private repository.", "源代码放在一个私有仓库里。"],
  ["pull request", "合并请求", "Open a pull request when the change is ready for review.", "改动可以评审时，请提交合并请求。"],
  ["code review", "代码评审", "The bug was caught during code review.", "这个问题在代码评审时被发现了。"],
  ["deployment", "部署", "The deployment finished without errors.", "这次部署顺利完成。"],
  ["rollback", "回滚", "We prepared a rollback in case the release failed.", "我们准备了回滚方案，以防发布失败。"],
  ["incident", "线上事故；事件", "The team wrote a report after the production incident.", "团队在线上事故后写了报告。"],
  ["technical debt", "技术债", "Ignoring the old module will increase technical debt.", "忽略旧模块会增加技术债。"],
  ["API endpoint", "API 接口端点", "This endpoint returns the user's current plan.", "这个接口返回用户当前的计划。"],
]);

const DATA_AI = makeEntries("data-ai", 141, [
  ["dataset", "数据集", "We trained the model on a balanced dataset.", "我们用一个均衡的数据集训练模型。"],
  ["data pipeline", "数据管线", "The data pipeline runs every night.", "数据管线每天夜里运行。"],
  ["feature engineering", "特征工程", "Feature engineering improved the prediction quality.", "特征工程提高了预测质量。"],
  ["model inference", "模型推理", "Model inference happens on the user's device.", "模型推理在用户设备上完成。"],
  ["false positive", "误报；假阳性", "The new rule reduced false positives.", "新规则减少了误报。"],
  ["overfitting", "过拟合", "The gap between training and test results suggests overfitting.", "训练与测试结果的差距说明可能存在过拟合。"],
  ["confidence score", "置信度分数", "Hide results with a very low confidence score.", "隐藏置信度过低的结果。"],
  ["benchmark", "基准测试", "We use the same benchmark to compare both models.", "我们用同一套基准测试比较两个模型。"],
]);

const DESIGN_RESEARCH = makeEntries("design-research", 161, [
  ["wireframe", "线框图", "The wireframe focuses on layout rather than color.", "线框图关注布局而不是颜色。"],
  ["design system", "设计系统", "The design system keeps buttons consistent.", "设计系统让按钮保持一致。"],
  ["usability testing", "可用性测试", "Usability testing revealed a confusing checkout step.", "可用性测试发现结账步骤让人困惑。"],
  ["user flow", "用户流程", "Map the user flow before polishing the screen.", "先梳理用户流程，再打磨界面。"],
  ["visual hierarchy", "视觉层级", "A stronger visual hierarchy makes the page easier to scan.", "更清楚的视觉层级让页面更易浏览。"],
  ["accessibility", "无障碍；可访问性", "Accessibility is part of the definition of done.", "无障碍是完成标准的一部分。"],
  ["design handoff", "设计交付", "The design handoff includes states and spacing rules.", "设计交付包含状态与间距规则。"],
  ["interaction pattern", "交互模式", "Reuse a familiar interaction pattern for filtering.", "筛选功能复用熟悉的交互模式。"],
]);

const MARKETING = makeEntries("marketing", 181, [
  ["target audience", "目标受众", "The campaign speaks to first-time founders as its target audience.", "这次活动面向首次创业者。"],
  ["positioning", "市场定位", "Our positioning emphasizes speed and privacy.", "我们的定位强调速度和隐私。"],
  ["campaign", "营销活动", "The summer campaign launches next Monday.", "夏季营销活动下周一启动。"],
  ["conversion rate", "转化率", "A clearer offer improved the conversion rate.", "更清楚的方案提高了转化率。"],
  ["organic reach", "自然触达", "The post gained strong organic reach without ads.", "这篇内容没有投放广告也获得了很好的自然触达。"],
  ["paid acquisition", "付费获客", "Paid acquisition is too expensive for this segment.", "这个细分市场的付费获客成本太高。"],
  ["lead magnet", "获客诱饵；线索磁铁", "The checklist works as a lead magnet.", "这份清单被用作获取潜在客户的内容。"],
  ["brand awareness", "品牌认知度", "The partnership increased brand awareness.", "这次合作提升了品牌认知度。"],
]);

const SALES = makeEntries("sales", 201, [
  ["prospect", "潜在客户", "The prospect asked for a security review.", "潜在客户要求进行安全审查。"],
  ["sales pipeline", "销售管线", "Three large deals entered the sales pipeline this week.", "本周有三个大单进入销售管线。"],
  ["qualified lead", "合格销售线索", "A qualified lead has both a need and a budget.", "合格线索既有需求也有预算。"],
  ["discovery call", "需求探索电话", "Use the discovery call to understand the real problem.", "通过需求探索电话理解客户的真实问题。"],
  ["objection handling", "异议处理", "Good objection handling starts with listening.", "好的异议处理从倾听开始。"],
  ["proposal", "商务方案；报价方案", "We sent a revised proposal after the meeting.", "会后我们发送了修订版方案。"],
  ["close the deal", "促成交易；成交", "A small pilot helped us close the deal.", "一个小规模试点帮助我们促成了交易。"],
  ["renewal", "续约", "The customer is reviewing the renewal terms.", "客户正在审阅续约条款。"],
]);

const CUSTOMER_SUCCESS = makeEntries("customer-success", 221, [
  ["onboarding", "客户入驻；上手流程", "The onboarding session covers the first three workflows.", "入驻培训会讲前三个工作流程。"],
  ["support ticket", "支持工单", "The support ticket includes steps to reproduce the issue.", "支持工单包含问题复现步骤。"],
  ["escalation", "升级处理", "This outage needs an immediate escalation.", "这次服务中断需要立即升级处理。"],
  ["workaround", "临时解决方案", "We shared a workaround while the fix was being tested.", "修复测试期间，我们提供了临时方案。"],
  ["service-level agreement", "服务等级协议", "The service-level agreement promises a four-hour response.", "服务等级协议承诺四小时内响应。"],
  ["retention", "客户留存", "Faster support improved customer retention.", "更快的支持提高了客户留存。"],
  ["churn", "客户流失", "Unexpected price changes can increase churn.", "意外的价格变化可能增加客户流失。"],
  ["knowledge base", "知识库", "The answer is documented in the knowledge base.", "这个答案已经记录在知识库中。"],
]);

const HR_RECRUITING = makeEntries("hr-recruiting", 241, [
  ["job description", "职位描述", "The job description should state the actual responsibilities.", "职位描述应该写明实际职责。"],
  ["candidate pipeline", "候选人管线", "The candidate pipeline has five people at the interview stage.", "候选人管线中有五人进入面试阶段。"],
  ["screening", "初筛", "The recruiter completed the first round of screening.", "招聘人员完成了第一轮初筛。"],
  ["hiring manager", "用人经理", "The hiring manager will join the final interview.", "用人经理会参加终面。"],
  ["offer letter", "录用通知书", "The offer letter lists the start date and salary.", "录用通知书列出了入职日期和薪资。"],
  ["compensation package", "薪酬方案", "The compensation package includes an annual bonus.", "薪酬方案包含年度奖金。"],
  ["performance review", "绩效评估", "We set new goals during the performance review.", "我们在绩效评估中设定了新目标。"],
  ["headcount", "人员编制；人数预算", "The team has approval for two additional headcount.", "团队获批增加两个编制。"],
]);

const FINANCE_OPERATIONS = makeEntries("finance-operations", 261, [
  ["budget variance", "预算差异", "The report explains the budget variance for July.", "报告解释了七月份的预算差异。"],
  ["cash flow", "现金流", "Annual profit looks healthy, but cash flow is tight.", "全年利润看起来不错，但现金流紧张。"],
  ["invoice", "发票；账单", "Please send the invoice to our finance team.", "请把发票发给财务团队。"],
  ["reimbursement", "报销", "Submit the receipt with your reimbursement request.", "提交报销申请时请附上收据。"],
  ["procurement", "采购", "Procurement is comparing three suppliers.", "采购团队正在比较三家供应商。"],
  ["forecast", "预测", "The updated forecast reflects slower growth.", "更新后的预测反映了增长放缓。"],
  ["break-even point", "盈亏平衡点", "We expect to reach the break-even point in month nine.", "我们预计第九个月达到盈亏平衡。"],
  ["operating expense", "运营费用", "Cloud hosting is a major operating expense.", "云托管是一项主要运营费用。"],
]);

const MEETING_ROOM = makeEntries("meeting-room", 301, [
  ["Let's get started.", "我们开始吧。", "We have a full agenda, so let's get started.", "今天议程很多，我们开始吧。"],
  ["What's the main takeaway?", "最重要的结论是什么？", "Before we move on, what's the main takeaway?", "继续之前，最重要的结论是什么？"],
  ["Could you clarify that?", "你能解释清楚一点吗？", "Could you clarify what you mean by ready?", "你能解释一下“准备好”具体指什么吗？"],
  ["I have a concern.", "我有一个顾虑。", "I have a concern about the launch date.", "我对上线日期有一个顾虑。"],
  ["Let's take this offline.", "我们会后单独讨论。", "This is important, but let's take it offline.", "这件事很重要，但我们会后单独讨论。"],
  ["Who owns this action item?", "这项行动由谁负责？", "Before we wrap up, who owns this action item?", "结束前确认一下，这项行动由谁负责？"],
  ["I'll follow up by Friday.", "我会在周五前跟进。", "I'll follow up by Friday with the final numbers.", "我会在周五前用最终数据跟进。"],
  ["Let's wrap up.", "我们收尾吧。", "We have five minutes left, so let's wrap up.", "还剩五分钟，我们收尾吧。"],
]);

const EMAIL_WRITING = makeEntries("email-writing", 321, [
  ["I'm writing to follow up on…", "我写信是想跟进……", "I'm writing to follow up on our conversation yesterday.", "我写信是想跟进昨天的谈话。"],
  ["As discussed,", "正如我们讨论的，", "As discussed, I've attached the revised plan.", "正如我们讨论的，我附上了修订版计划。"],
  ["For your reference,", "供你参考，", "For your reference, the earlier report is linked below.", "供你参考，之前的报告链接如下。"],
  ["Could you confirm…?", "你能确认……吗？", "Could you confirm the delivery address?", "你能确认一下送货地址吗？"],
  ["Apologies for the delay.", "抱歉耽搁了。", "Apologies for the delay. I needed to verify the figures.", "抱歉耽搁了，我需要核实这些数字。"],
  ["I'll get back to you by…", "我会在……之前回复你。", "I'll get back to you by the end of the day.", "我会在今天结束前回复你。"],
  ["Please let me know if…", "如果……请告诉我。", "Please let me know if you need anything else.", "如果你还需要别的信息，请告诉我。"],
  ["Best regards,", "此致；谨致问候。", "Best regards,\nMia", "此致\nMia"],
]);

const JOB_INTERVIEW = makeEntries("job-interview", 341, [
  ["Walk me through…", "请详细讲讲……", "Could you walk me through a recent project?", "你能详细讲讲最近的一个项目吗？"],
  ["One of my key strengths is…", "我的一项核心优势是……", "One of my key strengths is turning ambiguity into a clear plan.", "我的一项核心优势是把模糊问题变成清晰计划。"],
  ["I'm proud of…", "我为……感到自豪。", "I'm proud of how the team recovered from the launch issue.", "我为团队从上线问题中恢复过来的方式感到自豪。"],
  ["The most challenging part was…", "最具挑战的部分是……", "The most challenging part was aligning three teams.", "最具挑战的部分是协调三个团队。"],
  ["transferable skills", "可迁移技能", "Customer research gave me transferable skills for product work.", "客户研究让我获得了可迁移到产品工作的技能。"],
  ["salary expectations", "薪资期望", "My salary expectations depend on the role's full scope.", "我的薪资期望取决于岗位的完整职责范围。"],
  ["notice period", "离职通知期", "My current notice period is four weeks.", "我目前的离职通知期是四周。"],
  ["culture fit", "文化契合度", "I prefer to discuss working principles rather than vague culture fit.", "比起模糊的文化契合度，我更愿意讨论工作原则。"],
]);

export const DICTIONARY_ENTRIES: DictionaryEntry[] = [
  ...CORE_ENTRIES,
  ...PRODUCT_PROJECT,
  ...SOFTWARE_ENGINEERING,
  ...DATA_AI,
  ...DESIGN_RESEARCH,
  ...MARKETING,
  ...SALES,
  ...CUSTOMER_SUCCESS,
  ...HR_RECRUITING,
  ...FINANCE_OPERATIONS,
  ...MEETING_ROOM,
  ...EMAIL_WRITING,
  ...JOB_INTERVIEW,
];

export function getBank(bankId: string) {
  return BANKS.find((bank) => bank.id === bankId);
}

export type OrganId =
  | "heart"
  | "brain"
  | "lungs"
  | "liver"
  | "kidneys"
  | "eyeball"
  | "intestine"
  | "pancreas"
  | "skin";

export type Hotspot = {
  id: string;
  label: string;
  detail: string;
  position: [number, number, number];
  color: string;
};

export type Organ = {
  id: OrganId;
  name: string;
  scientificName: string;
  system: string;
  model: string;
  icon: string;
  accent: string;
  description: string;
  poetic: string;
  size: string;
  weight: string;
  location: string;
  function: string;
  dailyFact: string;
  medical: string;
  bloodSupply: string;
  /** A single memorable line, surfaced as the "Did you know" note. */
  funFact: string;
  tissue: string;
  comparison: string;
  conditions: string[];
  hotspots: Hotspot[];
  /** Whether `/anatomy/<id>/*.webp` illustrations exist. Organs without them
   *  fall back to the accent glyph rather than a broken image. */
  illustrated: boolean;
};

export const organs: Organ[] = [
  {
    id: "heart",
    name: "心脏",
    scientificName: "Cor",
    system: "心血管系统",
    model: "/models/heart.glb",
    icon: "♥",
    accent: "#ee7c6a",
    description: "一个肌肉器官，将血液泵送到全身，为每个细胞输送氧气和营养。",
    poetic: "不知疲倦的泵",
    size: "约拳头大小",
    weight: "250–350克",
    location: "胸骨后方，略偏左",
    function: "循环含氧血液",
    dailyFact: "每天跳动约10万次",
    medical: "其电节律协调每一次心跳。",
    bloodSupply: "左冠状动脉和右冠状动脉",
    funFact: "一生中大约跳动25亿次，在出生前就开始跳动。",
    tissue: "心肌组织",
    comparison: "心脏 vs. 大脑",
    conditions: ["冠心病", "心律失常", "心脏瓣膜病", "心力衰竭", "心肌病", "心肌炎", "房颤", "先天性心脏缺陷"],
    illustrated: true,
    hotspots: [
      { id: "aorta", label: "主动脉", detail: "主要动脉", position: [-0.35, 1.65, 0.55], color: "#ee7c6a" },
      { id: "left-atrium", label: "左心房", detail: "接收含氧血液", position: [0.82, 0.65, 0.5], color: "#f2a33b" },
      { id: "right-atrium", label: "右心房", detail: "接收静脉血", position: [-0.9, 0.35, 0.55], color: "#6393d8" },
      { id: "left-ventricle", label: "左心室", detail: "泵送到全身", position: [0.7, -0.75, 0.65], color: "#f2a33b" },
      { id: "right-ventricle", label: "右心室", detail: "泵送到肺部", position: [-0.65, -0.68, 0.66], color: "#ee7c6a" },
      { id: "mitral", label: "二尖瓣", detail: "防止血液回流", position: [0.18, -1.35, 0.48], color: "#d89bc4" },
    ],
  },
  {
    id: "brain",
    name: "大脑",
    scientificName: "Encephalon",
    system: "神经系统",
    model: "/models/brain.glb",
    icon: "◉",
    accent: "#c58696",
    description: "身体的指挥中心，整合感觉、记忆、情感和精确运动。",
    poetic: "内在的宇宙",
    size: "约两个拳头大小",
    weight: "1.3–1.4公斤",
    location: "保护在颅骨内",
    function: "处理和协调信号",
    dailyFact: "消耗约20%的身体能量",
    medical: "数十亿神经元通过电信号和化学信号进行交流。",
    bloodSupply: "颈内动脉和椎动脉",
    funFact: "它没有自己的痛觉感受器——头痛是在它周围的组织中感受到的。",
    tissue: "大脑皮层",
    comparison: "大脑 vs. 眼睛",
    conditions: ["偏头痛", "中风", "神经退行性疾病", "癫痫", "创伤性脑损伤", "脑膜炎", "多发性硬化", "脑动脉瘤"],
    illustrated: true,
    hotspots: [
      { id: "frontal", label: "额叶", detail: "规划与运动", position: [-0.7, 0.65, 0.8], color: "#ee7c6a" },
      { id: "parietal", label: "顶叶", detail: "感觉整合", position: [0.15, 1.1, 0.65], color: "#f2a33b" },
      { id: "temporal", label: "颞叶", detail: "记忆与听觉", position: [0.75, -0.1, 0.82], color: "#6393d8" },
      { id: "cerebellum", label: "小脑", detail: "平衡与协调", position: [0.72, -0.9, 0.55], color: "#d89bc4" },
    ],
  },
  {
    id: "lungs",
    name: "肺",
    scientificName: "Pulmones",
    system: "呼吸系统",
    model: "/models/lungs.glb",
    icon: "◍",
    accent: "#dd8f8b",
    description: "成对的器官，吸入空气并在广阔的精细表面上进行氧气与二氧化碳的交换。",
    poetic: "生命的呼吸",
    size: "每个约25厘米高",
    weight: "一对约1公斤",
    location: "心脏两侧，在胸腔内",
    function: "交换氧气和二氧化碳",
    dailyFact: "移动约11,000升空气",
    medical: "肺泡将一个网球场大小的交换表面折叠进胸腔。",
    bloodSupply: "肺动脉和支气管动脉",
    funFact: "右肺有三个叶，左肺只有两个叶，为心脏留出空间。",
    tissue: "肺泡组织",
    comparison: "肺 vs. 心脏",
    conditions: ["哮喘", "慢性阻塞性肺病", "肺炎", "肺栓塞", "肺纤维化", "支气管炎", "囊性纤维化", "肺癌"],
    illustrated: true,
    hotspots: [
      { id: "trachea", label: "气管", detail: "将空气输送到肺部", position: [0, 1.6, 0.2], color: "#6393d8" },
      { id: "right-lung", label: "右肺", detail: "三个叶", position: [-1.2, 0.1, 0.7], color: "#ee7c6a" },
      { id: "left-lung", label: "左肺", detail: "两个叶，为心脏留出空间", position: [1.2, 0.1, 0.7], color: "#f2a33b" },
      { id: "bronchus", label: "支气管", detail: "分支气道", position: [-0.03, 0.3, 0.35], color: "#d89bc4" },
      { id: "base", label: "肺底", detail: "位于膈肌上", position: [-1.14, -1.2, 1], color: "#7fa88a" },
    ],
  },
  {
    id: "liver",
    name: "肝脏",
    scientificName: "Hepar",
    system: "消化系统",
    model: "/models/liver.glb",
    icon: "≈",
    accent: "#b86858",
    description: "一个非凡的代谢器官，过滤血液、处理营养物质并产生胆汁。",
    poetic: "安静的炼金术士",
    size: "约足球大小",
    weight: "1.4–1.6公斤",
    location: "右上腹部",
    function: "代谢、解毒与胆汁分泌",
    dailyFact: "执行超过500种功能",
    medical: "它可以再生大部分失去的组织。",
    bloodSupply: "肝动脉和门静脉",
    funFact: "它是唯一一个可以从自身一小部分再生到完整大小的人体器官。",
    tissue: "肝小叶",
    comparison: "肝脏 vs. 肠道",
    conditions: ["脂肪肝", "肝炎", "肝硬化", "胆结石", "血色素沉着症", "肝癌", "自身免疫性肝炎", "门静脉高压"],
    illustrated: true,
    hotspots: [
      { id: "right-lobe", label: "右叶", detail: "最大的肝叶", position: [-0.75, 0.35, 0.75], color: "#ee7c6a" },
      { id: "left-lobe", label: "左叶", detail: "跨越中线", position: [0.85, 0.25, 0.75], color: "#f2a33b" },
      { id: "portal", label: "门静脉", detail: "富含营养的流入", position: [0.1, -0.3, 0.82], color: "#6393d8" },
    ],
  },
  {
    id: "kidneys",
    name: "肾脏",
    scientificName: "Renes",
    system: "泌尿系统",
    model: "/models/kidneys.glb",
    icon: "∞",
    accent: "#c96963",
    description: "成对的过滤器官，平衡体液、电解质、血压和废物排出。",
    poetic: "过滤大师",
    size: "每个约鼠标大小",
    weight: "每个120–170克",
    location: "脊柱两侧，肋骨下方",
    function: "过滤血液并形成尿液",
    dailyFact: "过滤约180升液体",
    medical: "肾单位微调血液的化学成分。",
    bloodSupply: "肾动脉",
    funFact: "它们几乎回收过滤的所有物质——只有约1–2升以尿液形式排出体外。",
    tissue: "肾皮质",
    comparison: "肾脏 vs. 肝脏",
    conditions: ["肾结石", "慢性肾病", "尿路感染", "肾小球肾炎", "多囊肾", "肾性高血压", "急性肾损伤", "肾病综合征"],
    illustrated: true,
    hotspots: [
      { id: "cortex", label: "肾皮质", detail: "外层过滤层", position: [-0.9, 0.55, 0.7], color: "#ee7c6a" },
      { id: "medulla", label: "肾髓质", detail: "浓缩尿液", position: [0.85, 0.2, 0.7], color: "#f2a33b" },
      { id: "ureter", label: "输尿管", detail: "输送尿液", position: [0.4, -1.1, 0.5], color: "#6393d8" },
    ],
  },
  {
    id: "eyeball",
    name: "眼睛",
    scientificName: "Oculus",
    system: "感觉系统",
    model: "/models/eyeball.glb",
    icon: "⊙",
    accent: "#7294b9",
    description: "一个精密的感觉器官，将聚焦的光线转化为被解释为视觉的神经信号。",
    poetic: "光的窗口",
    size: "直径约24毫米",
    weight: "约7.5克",
    location: "在眼眶内",
    function: "捕捉和聚焦光线",
    dailyFact: "进行数千次微小运动",
    medical: "视网膜是中枢神经系统的延伸。",
    bloodSupply: "眼动脉",
    funFact: "角膜完全没有血管；它直接从空气中获取氧气。",
    tissue: "视网膜层",
    comparison: "眼睛 vs. 大脑",
    conditions: ["近视", "白内障", "青光眼", "黄斑变性", "视网膜脱离", "干眼症", "散光", "结膜炎"],
    illustrated: true,
    hotspots: [
      { id: "cornea", label: "角膜", detail: "透明聚焦表面", position: [-0.94, 0.05, 1.47], color: "#6393d8" },
      { id: "iris", label: "虹膜", detail: "控制光线进入", position: [-1.22, -0.53, 1.15], color: "#f2a33b" },
      { id: "optic", label: "视神经", detail: "传输视觉信号", position: [1.61, -0.18, 0.54], color: "#d89bc4" },
    ],
  },
  {
    id: "intestine",
    name: "肠道",
    scientificName: "Intestinum",
    system: "消化系统",
    model: "/models/intestine.glb",
    icon: "§",
    accent: "#d78b77",
    description: "一个折叠的消化通道，营养物质在此被吸收，微生物群支持全身健康。",
    poetic: "内在的花园",
    size: "展开时约6–7米",
    weight: "随内容物变化",
    location: "腹部中央和下部",
    function: "消化和营养吸收",
    dailyFact: "容纳数万亿微生物",
    medical: "其表面通过褶皱、绒毛和微绒毛得到放大。",
    bloodSupply: "肠系膜上动脉和下动脉",
    funFact: "它的内衬每隔几天更新一次——是体内任何组织中更新速度最快的。",
    tissue: "肠绒毛",
    comparison: "肠道 vs. 肝脏",
    conditions: ["肠易激综合征", "炎症性肠病", "乳糜泻", "憩室炎", "肠梗阻", "结肠息肉", "克罗恩病", "乳糖不耐受"],
    illustrated: true,
    hotspots: [
      { id: "duodenum", label: "十二指肠", detail: "小肠第一段", position: [0.6, 0.8, 0.75], color: "#f2a33b" },
      { id: "jejunum", label: "空肠", detail: "主要吸收区域", position: [-0.45, 0.1, 0.82], color: "#ee7c6a" },
      { id: "colon", label: "结肠", detail: "回收水分", position: [0.75, -0.55, 0.72], color: "#6393d8" },
    ],
  },
  {
    id: "pancreas",
    name: "胰腺",
    scientificName: "Pancreas",
    system: "内分泌系统",
    model: "/models/pancreas.glb",
    icon: "◈",
    accent: "#c69a5e",
    description: "一个双重功能的腺体，向肠道释放消化酶，并分泌稳定血糖的激素。",
    poetic: "安静的调节器",
    size: "长约15厘米",
    weight: "70–100克",
    location: "胃后方，横跨上腹部",
    function: "消化酶和胰岛素",
    dailyFact: "产生约1.5升富含酶的液体",
    medical: "胰岛释放胰岛素和胰高血糖素以平衡血糖。",
    bloodSupply: "脾动脉和胰十二指肠动脉",
    funFact: "只有2%的部分产生激素；其余部分用于消化酶。",
    tissue: "胰腺腺泡",
    comparison: "胰腺 vs. 肝脏",
    conditions: ["胰腺炎", "1型糖尿病", "胰腺癌", "2型糖尿病", "外分泌功能不全", "胰腺囊肿", "胆石性胰腺炎", "胰岛素瘤"],
    illustrated: true,
    hotspots: [
      { id: "head", label: "胰头", detail: "被十二指肠环绕", position: [-1.32, -0.36, 0.55], color: "#ee7c6a" },
      { id: "body", label: "胰体", detail: "横跨脊柱", position: [0.05, 0.25, 0.45], color: "#f2a33b" },
      { id: "tail", label: "胰尾", detail: "延伸至脾脏", position: [1.55, 0.3, 0.35], color: "#6393d8" },
      { id: "duct", label: "胰管", detail: "将酶排入肠道", position: [-0.61, 0.39, 0.5], color: "#d89bc4" },
    ],
  },
  {
    id: "skin",
    name: "皮肤",
    scientificName: "Integumentum",
    system: "皮肤系统",
    model: "/models/skin.glb",
    icon: "▦",
    accent: "#c99277",
    description: "身体最大的器官——一个活的屏障，感知触觉、保持水分并调节温度。",
    poetic: "活的边界",
    size: "展开时约2平方米",
    weight: "3.5–5公斤",
    location: "覆盖全身",
    function: "保护、感知和冷却",
    dailyFact: "脱落约5亿个细胞",
    medical: "三层结构——表皮、真皮和皮下组织——各有不同的功能。",
    bloodSupply: "皮肤血管丛",
    funFact: "一平方厘米可以容纳数百个汗腺和数米长的血管。",
    tissue: "表皮层",
    comparison: "皮肤 vs. 肠道",
    conditions: ["湿疹", "银屑病", "黑色素瘤", "痤疮", "蜂窝织炎", "接触性皮炎", "酒糟鼻", "白癜风"],
    illustrated: true,
    hotspots: [
      { id: "epidermis", label: "表皮", detail: "外层保护层", position: [-0.05, 0.88, 1.4], color: "#ee7c6a" },
      { id: "dermis", label: "真皮", detail: "神经、血管和腺体", position: [0.29, 0.05, 1.4], color: "#f2a33b" },
      { id: "hypodermis", label: "皮下组织", detail: "脂肪和保温", position: [-0.39, -1.15, 1.4], color: "#6393d8" },
      { id: "follicle", label: "毛囊", detail: "固定每根毛发", position: [0.89, -0.44, 1.4], color: "#d89bc4" },
    ],
  },
];

export const organById = Object.fromEntries(organs.map((organ) => [organ.id, organ])) as Record<OrganId, Organ>;

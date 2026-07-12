import type { CompanySite } from './types'
import { wordDocuments } from './generated-documents'

export const jikeSite: CompanySite = {
  key: 'jike',
  name: '深圳市积科科技有限公司',
  shortName: '积科科技',
  slogan: '科技赋能绿色橡塑，品质铸就长久合作',
  logo: '/assets/jike/logo.jpg',
  heroImage: '/assets/jike/hero.png',
  introDocument: wordDocuments.jikeCompanyIntro,
  strengths: [
    {
      title: '一体化产品体系',
      description:
        '核心主营 PVC / CPVC 环保热稳定剂，并自主生产赛克（THEIC），构建“稳定剂成品 + 核心协效原料”一体化供应。',
    },
    {
      title: '自动化生产 + 独立研发',
      description:
        '标准化自动化生产车间搭配独立研发实验室，专业化工团队持续优化合成工艺与产品配方。',
    },
    {
      title: '全流程品质管控',
      description:
        '严控原料甄选、生产加工、成品检测全流程，完善质量管控体系，保障产品批次稳定、供货充足。',
    },
    {
      title: '配套技术支持',
      description:
        '依托深圳区位与成熟供应链，兼顾国内深耕与外贸出口，提供定制配方研发、现场工艺指导与样品测试。',
    },
  ],
  intro: [
    '深圳市积科科技有限公司坐落于深圳，是一家专注于高分子环保助剂研发、生产、销售与技术服务一体化的现代化精细化工企业。公司深耕 PVC、CPVC 热稳定材料赛道多年，核心主营PVC 环保热稳定剂、CPVC 环保热稳定剂，同步自主生产赛克（三 (2 - 羟乙基) 异氰尿酸酯 / THEIC），构建起 “稳定剂成品 + 核心协效原料” 一体化产品体系，为橡塑、涂料、绝缘材料行业提供一站式环保解决方案。',
    '积科科技配备标准化自动化生产车间与独立研发实验室，组建专业化工研发与应用技术团队，持续优化合成工艺与产品配方，严控原料甄选、生产加工、成品检测全流程品质，建立完善质量管控体系，保障产品批次稳定、供货充足。依托深圳区位优势与成熟供应链，公司兼顾国内市场深耕与外贸出口，可为客户提供定制化配方研发、现场工艺指导、样品测试等配套技术支持。',
    '秉持 “科技赋能绿色橡塑，品质铸就长久合作” 的经营理念，积科科技以环保、高效、高性价比的助剂产品为核心竞争力，持续聚焦高分子新材料创新，致力成为 PVC/CPVC 环保热稳定剂与赛克领域值得信赖的源头生产服务商，携手下游产业共建低碳、安全、可持续的橡塑新材料生态。',
  ],
  address: '深圳市坪山区坪山街道六联社区福安西一巷',
  contactName: '丁丁',
  phone: '13155217718',
  factoryImages: [
    '/assets/shared/factory/1.png',
    '/assets/shared/factory/11.png',
    '/assets/shared/factory/12.png',
    '/assets/shared/factory/13.png',
    '/assets/shared/factory/14.jpg',
  ],
  products: [
    {
      slug: 'jk-100',
      name: 'JK-100 环保热稳定剂',
      category: 'PVC热稳定剂',
      summary:
        '专为 PVC 高温加工研发的替代有机锡复合稳定剂，适配各类硬质制品的高温成型需求。',
      document: wordDocuments.jikeJk100,
      features: [
        '全环保合规，适用出口与市政工程等多场景。',
        '长效耐热稳定，可低成本替代有机锡。',
        '提升熔体强度，成品力学性能优异。',
        '润滑平衡，成品外观光洁细腻。',
        '无析出、易加工，降低综合生产成本。',
      ],
      specs: [
        { label: '外观', value: '白色或微黄色均匀粉末' },
        { label: '挥发份', value: '≤1.2%' },
        { label: '堆积密度', value: '0.40～0.60g/cm³' },
        { label: '动态润滑性能', value: '内外润滑均衡，不析出、不粘模' },
        { label: '保质期', value: '原装密封状态 12 个月' },
      ],
      applications: [
        'PVC-U 大口径管材',
        '市政给水管、排水排污管、雨水管、电力穿线管',
        '挤出型材、塑料管件、挤出板材',
        '单螺杆、双螺杆挤出设备',
      ],
      packaging: '25kg / 袋，加厚防潮复合纸袋，内置防水内膜。',
    },
    {
      slug: 'aos-10',
      name: 'AOS-10 有机稳定剂（CPVC专用）',
      category: 'CPVC热稳定剂',
      summary:
        '专为 CPVC 高温加工研发的有机复合稳定剂，不含有机锡，兼具热稳定性与加工适配性。',
      document: wordDocuments.jikeAos10,
      features: [
        '适配 CPVC 185–205℃ 高温加工。',
        '挥发性极低，无明显异味，不易在制品表面析出。',
        '绝缘性能优良，适配高绝缘要求制品。',
        '无铅、无镉、无钡，不含有机锡。',
      ],
      specs: [
        { label: '产品型号', value: 'AOS-10' },
        { label: '产品类型', value: 'CPVC专用有机稳定剂（非有机锡）' },
        { label: '外观', value: '白色微粉状，无结块、无明显杂质' },
        { label: '推荐用量', value: 'CPVC硬质制品 3.0–3.8 phr' },
        { label: '加工温度', value: '175–205℃（挤出/注塑）' },
        { label: '保质期', value: '未开封状态 12 个月' },
      ],
      applications: [
        'CPVC电力管、工业化工管、给水管',
        'CPVC型材、板材、注塑管件',
        '食品接触级、卫生级CPVC制品',
        'CPVC高温挤出、注塑等成型工艺',
      ],
      packaging: '25 kg 牛皮纸袋，内衬 PE 薄膜，密封防潮。',
    },
    {
      slug: 'theic',
      name: '赛克',
      category: '功能助剂',
      summary: '三羟乙基异氰尿酸酯，用于 PVC 塑料稳定剂、耐热漆包线等产品的生产制造。',
      document: wordDocuments.jikeTheic,
      features: [],
      specs: [
        { label: '化学名称', value: '三羟乙基异氰尿酸酯' },
        { label: '分子式', value: 'C9H15N3O6' },
        { label: '分子量', value: '261.24' },
        { label: '外观', value: '白色结晶性粉末或颗粒' },
        { label: '熔点', value: '133.5 - 137℃' },
        { label: '羟值', value: '640±10(KOHmg/g)' },
        { label: '酸值', value: '≤1.0(KOHmg/g)' },
        { label: 'PH', value: '6.5-7.3' },
        { label: '浊度', value: '≤1.0NTU' },
        { label: '干燥失重', value: '≤0.3%' },
      ],
      applications: ['PVC塑料稳定剂', '耐热漆包线'],
      packaging: '25Kgs、500Kgs、800Kgs、1000Kgs，塑料编织袋内衬塑料袋。',
    },
  ],
}

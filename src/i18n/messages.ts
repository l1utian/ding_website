import type { Locale } from './locales'

export type Messages = Readonly<{
  metaPortalSuffix: string
  nav: Readonly<{
    about: string
    strengths: string
    products: string
    factory: string
    contact: string
    aria: string
  }>
  brandHomeAria: string
  sections: Readonly<{
    about: SectionCopy
    strengths: SectionCopy
    products: SectionCopy
    factory: SectionCopy
    contact: SectionCopy
  }>
  hero: Readonly<{
    capabilitiesAria: string
    ownedFactory: string
    ecoAdditives: string
    greenMaterials: string
    yearsLabel: string
    clientsLabel: string
    baseLabel: string
  }>
  cta: Readonly<{
    aria: string
    text: string
  }>
  contact: Readonly<{
    address: string
    person: string
    phone: string
    email: string
    note: string
    personPrefix: string
  }>
  footer: Readonly<{
    about: string
    quickNav: string
    contactHeading: string
    copyright: string
    navAria: string
  }>
  products: Readonly<{
    viewDetails: string
    notFound: string
    breadcrumb: string
    consult: string
    backToList: string
    keySpecs: string
    applications: string
    packaging: string
    business: string
  }>
  breadcrumb: Readonly<{
    home: string
    aria: string
  }>
  gallery: Readonly<{
    carousel: string
    photos: string
    prev: string
    next: string
    pick: string
  }>
  language: Readonly<{
    zh: string
    en: string
    switchAria: string
  }>
}>

type SectionCopy = Readonly<{
  eyebrow: string
  title: string
  summary?: string
}>

const zh: Messages = {
  metaPortalSuffix: '环保助剂与新材料门户',
  nav: {
    about: '关于我们',
    strengths: '核心优势',
    products: '产品中心',
    factory: '生产基地',
    contact: '联系我们',
    aria: '主导航',
  },
  brandHomeAria: '首页',
  sections: {
    about: {
      eyebrow: 'About Us',
      title: '公司简介',
      summary: '聚焦环保助剂与高分子新材料应用，服务 PVC、CPVC 及相关橡塑产业。',
    },
    strengths: {
      eyebrow: 'Core Strengths',
      title: '核心优势',
      summary: '以自有工厂和独立研发实验室为依托，服务橡塑新材料产业。',
    },
    products: {
      eyebrow: 'Products',
      title: '产品中心',
      summary: '点击任意产品查看与原始资料一致的详细说明。',
    },
    factory: {
      eyebrow: 'Production Base',
      title: '生产基地',
      summary: '标准化自动化生产车间与独立研发实验室，保障产品品质稳定。',
    },
    contact: {
      eyebrow: 'Contact Us',
      title: '联系我们',
    },
  },
  hero: {
    capabilitiesAria: '企业能力',
    ownedFactory: '自有生产工厂',
    ecoAdditives: '环保合规助剂',
    greenMaterials: '绿色低碳材料',
    yearsLabel: '年行业经验',
    clientsLabel: '合作客户',
    baseLabel: '生产基地',
  },
  cta: {
    aria: '合作咨询',
    text: '提供定制配方研发、现场工艺指导与样品测试，欢迎来电洽谈合作。',
  },
  contact: {
    address: '公司地址',
    person: '联系人',
    phone: '联系电话',
    email: '邮箱',
    note: '欢迎咨询产品选型、定制配方与样品测试。',
    personPrefix: '联系人：',
  },
  footer: {
    about:
      '聚焦环保助剂与高分子新材料研发生产，以自有工厂与研发实验室为依托，为橡塑产业提供高品质解决方案。',
    quickNav: '快捷导航',
    contactHeading: '联系方式',
    copyright: '版权所有',
    navAria: '页脚导航',
  },
  products: {
    viewDetails: '查看详情',
    notFound: '产品不存在',
    breadcrumb: '产品',
    consult: '咨询产品',
    backToList: '返回产品列表',
    keySpecs: '关键指标',
    applications: '应用领域',
    packaging: '包装规格',
    business: '业务咨询',
  },
  breadcrumb: {
    home: '首页',
    aria: '面包屑导航',
  },
  gallery: {
    carousel: '轮播图',
    photos: '生产基地照片',
    prev: '上一张',
    next: '下一张',
    pick: '选择照片',
  },
  language: {
    zh: '中文',
    en: 'EN',
    switchAria: '切换语言',
  },
}

const en: Messages = {
  metaPortalSuffix: 'Eco Additives & Advanced Materials',
  nav: {
    about: 'About',
    strengths: 'Strengths',
    products: 'Products',
    factory: 'Factory',
    contact: 'Contact',
    aria: 'Primary navigation',
  },
  brandHomeAria: 'Home',
  sections: {
    about: {
      eyebrow: 'About Us',
      title: 'Company Profile',
      summary:
        'Focused on eco-friendly additives and polymer materials for PVC, CPVC and related industries.',
    },
    strengths: {
      eyebrow: 'Core Strengths',
      title: 'Why Work With Us',
      summary: 'In-house production and R&D labs supporting the rubber and plastics value chain.',
    },
    products: {
      eyebrow: 'Products',
      title: 'Product Center',
      summary: 'Open any product for technical details aligned with our source data sheets.',
    },
    factory: {
      eyebrow: 'Production Base',
      title: 'Manufacturing Base',
      summary: 'Automated workshops and dedicated labs for stable, batch-consistent quality.',
    },
    contact: {
      eyebrow: 'Contact Us',
      title: 'Contact',
    },
  },
  hero: {
    capabilitiesAria: 'Capabilities',
    ownedFactory: 'In-house plant',
    ecoAdditives: 'Compliant additives',
    greenMaterials: 'Low-carbon materials',
    yearsLabel: 'Years of experience',
    clientsLabel: 'Partner customers',
    baseLabel: 'Plant area',
  },
  cta: {
    aria: 'Business inquiry',
    text: 'Custom formulations, on-site process support and sample testing — contact us to collaborate.',
  },
  contact: {
    address: 'Address',
    person: 'Contact',
    phone: 'Phone',
    email: 'Email',
    note: 'Inquiries welcome for product selection, custom formulations and sample evaluation.',
    personPrefix: 'Contact: ',
  },
  footer: {
    about:
      'Developing and producing eco-friendly additives and polymer materials, backed by our own plant and R&D labs.',
    quickNav: 'Quick links',
    contactHeading: 'Contact',
    copyright: 'All rights reserved',
    navAria: 'Footer navigation',
  },
  products: {
    viewDetails: 'View details',
    notFound: 'Product not found',
    breadcrumb: 'Products',
    consult: 'Inquire',
    backToList: 'Back to products',
    keySpecs: 'Key specs',
    applications: 'Applications',
    packaging: 'Packaging',
    business: 'Sales contact',
  },
  breadcrumb: {
    home: 'Home',
    aria: 'Breadcrumb',
  },
  gallery: {
    carousel: 'Carousel',
    photos: 'factory photos',
    prev: 'Previous',
    next: 'Next',
    pick: 'Select photo',
  },
  language: {
    zh: '中文',
    en: 'EN',
    switchAria: 'Switch language',
  },
}

const dictionary: Record<Locale, Messages> = { zh, en }

export function getMessages(locale: Locale): Messages {
  return dictionary[locale]
}

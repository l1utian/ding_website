import type { CompanySite } from './types'
import { sharedFactoryImages } from './factory-images'
import { wordDocumentsEn as wordDocuments } from './generated-documents-en'

export const jikeSiteEn: CompanySite = {
  key: 'jike',
  name: 'Shenzhen Jike Technology Co., Ltd.',
  shortName: 'Jike Technology',
  slogan: 'Technology empowering green rubber & plastics; quality building lasting partnerships',
  logo: '/assets/jike/logo.jpg',
  heroImage: '/assets/jike/hero.png',
  introDocument: wordDocuments.jikeCompanyIntro,
  strengths: [
    {
      title: 'Integrated product system',
      description:
        'Core focus on eco-friendly PVC / CPVC heat stabilizers plus in-house THEIC, delivering finished stabilizers and key co-stabilizer raw materials.',
    },
    {
      title: 'Automated production + independent R&D',
      description:
        'Standardized automated workshops with a dedicated lab; chemical teams continuously improve synthesis and formulations.',
    },
    {
      title: 'End-to-end quality control',
      description:
        'Strict control from raw materials through processing and finished testing ensures batch stability and reliable supply.',
    },
    {
      title: 'Application support',
      description:
        'From Shenzhen’s supply chain to domestic and export markets: custom formulas, on-site process guidance and sample testing.',
    },
  ],
  intro: [
    'Shenzhen Jike Technology Co., Ltd. is a modern fine-chemical company in Shenzhen integrating R&D, production, sales and technical service of polymer eco-friendly additives. With deep experience in PVC and CPVC heat-stabilizer materials, we supply eco PVC and CPVC heat stabilizers together with in-house THEIC, building an integrated portfolio of finished stabilizers plus key co-stabilizers for rubber & plastics, coatings and insulation.',
    'Jike runs automated production workshops and an independent R&D lab. Our chemical R&D and application team optimizes processes and formulas, with full-process quality control from raw materials to finished goods for stable batches and ample supply. Leveraging Shenzhen’s location and supply chain, we serve domestic and export customers with custom formulations, on-site guidance and sample evaluation.',
    'Upholding “Technology empowering green rubber & plastics; quality building lasting partnerships,” Jike competes on eco-friendly, efficient and cost-effective additives and aims to be a trusted source manufacturer of PVC/CPVC eco heat stabilizers and THEIC.',
  ],
  address: "Fu'an West Lane 1, Liulian Community, Pingshan Subdistrict, Pingshan District, Shenzhen",
  contactName: 'Ding Ding',
  phone: '13155217718',
  email: '13155217718dd@gmail.com',
  icpBeian: '粤ICP备2026097852号-1',
  factoryImages: sharedFactoryImages,
  products: [
    {
      slug: 'jk-100',
      name: 'JK-100 Eco-Friendly Heat Stabilizer',
      category: 'PVC heat stabilizer',
      summary:
        'Organotin-alternative composite stabilizer for high-temperature PVC processing of rigid articles.',
      document: wordDocuments.jikeJk100,
      features: [
        'Fully eco-compliant for export and municipal projects.',
        'Long-term heat stability; cost-effective organotin alternative.',
        'Higher melt strength and excellent mechanical properties.',
        'Balanced lubrication for smooth surface finish.',
        'Non-blooming, easy processing, lower total cost.',
      ],
      specs: [
        { label: 'Appearance', value: 'White or slightly yellow uniform powder' },
        { label: 'Volatile matter', value: '≤1.2%' },
        { label: 'Bulk density', value: '0.40–0.60 g/cm³' },
        { label: 'Dynamic lubrication', value: 'Balanced I/E; non-blooming, non-sticking' },
        { label: 'Shelf life', value: '12 months sealed' },
      ],
      applications: [
        'PVC-U large-diameter pipes',
        'Municipal water, drainage, rainwater and conduit pipes',
        'Extruded profiles, fittings and sheet',
        'Single- and twin-screw extrusion',
      ],
      packaging: '25 kg/bag, moisture-proof composite paper bag with PE liner.',
    },
    {
      slug: 'jk-619e',
      name: 'JK-619E Large-Diameter Pipe Eco Stabilizer',
      category: 'PVC heat stabilizer',
      summary:
        'Composite eco Ca-Zn heat stabilizer for large-diameter PVC water and drainage pipe extrusion.',
      document: wordDocuments.jikeJk619e,
      features: [
        'Eco and non-toxic; meets RoHS, REACH and related standards.',
        'Long high-temperature stability for thick-wall continuous production.',
        'Raises melt strength for pressure resistance and dimensional accuracy.',
        'Balanced lubrication; smooth walls; low plate-out.',
        'Suited to high-filler formulas with lower total cost.',
      ],
      specs: [
        { label: 'Appearance', value: 'White or slightly yellow uniform powder' },
        { label: 'Volatile matter', value: '≤1.2%' },
        { label: 'Bulk density', value: '0.40–0.60 g/cm³' },
        { label: 'Dynamic lubrication', value: 'Balanced I/E; non-blooming, non-sticking' },
        { label: 'Recommended dosage', value: '2.0–3.5 PHR' },
        { label: 'Shelf life', value: '12 months sealed' },
      ],
      applications: [
        'Large municipal water, drainage and rainwater pipes',
        'Large power conduit and irrigation pipes',
        'Rigid high-filler PVC-U pipes',
        'Single- and twin-screw large-pipe extrusion',
      ],
      packaging: '25 kg/bag, moisture-proof composite paper bag with PE liner.',
    },
    {
      slug: 'jk-318',
      name: 'JK-318 Ca-Zn Stabilizer for PVC Injection Fittings',
      category: 'PVC heat stabilizer',
      summary:
        'Ca-Zn stabilizer for PVC injection fittings and junction boxes with good initial color, fast plasticization and stable lubrication.',
      document: wordDocuments.jikeJk318,
      features: [
        'Good initial color and heat stability; high whiteness.',
        'Shorter plasticization time; good mold filling.',
        'Good dispersion; high gloss.',
        'High melt strength and part strength.',
        'SGS tested; meets RoHS 2.0.',
      ],
      specs: [
        { label: 'Appearance', value: 'White or slightly yellow powder' },
        { label: 'Volatile matter', value: '≤1%' },
        { label: 'Melting point', value: '≥80℃' },
        { label: 'Density', value: '0.8–0.9 g/cm³' },
        { label: 'Suggested dosage (on PVC)', value: '4–6%' },
        { label: 'Shelf life', value: '12 months' },
      ],
      applications: ['Injection fittings', 'Junction boxes', 'Large fittings'],
      packaging: '25 kg/bag, PP woven bag with PE liner.',
    },
    {
      slug: 'jk-315',
      name: 'JK-315 Ca-Zn Stabilizer for SPC Flooring',
      category: 'PVC heat stabilizer',
      summary:
        'Ca-Zn stabilizer for SPC flooring and stone-plastic panels with good heat stability, uniform plasticization and low warpage.',
      document: wordDocuments.jikeJk315,
      features: [
        'Good heat stability; long continuous run.',
        'Uniform plasticization and high-speed melt flow.',
        'Improves peel strength.',
        'Low shrinkage and warpage.',
        'May reduce or omit ACR/CPE for basic flooring needs.',
        'SGS tested; meets RoHS 2.0.',
      ],
      specs: [
        { label: 'Appearance', value: 'White or slightly yellow powder' },
        { label: 'Volatile matter', value: '≤1%' },
        { label: 'Initial melting point', value: '≥80℃' },
        { label: 'Density', value: '0.8–0.9 g/cm³' },
        { label: 'Suggested dosage (on PVC)', value: '6–8%' },
        { label: 'Shelf life', value: '24 months' },
      ],
      applications: ['SPC flooring', 'Marble-look boards', 'Stone-plastic wall panels'],
      packaging: '25 kg/bag, PP woven bag with PE liner.',
    },
    {
      slug: 'aos-508',
      name: 'AOS-508 Organic Eco Stabilizer for Calendering',
      category: 'PVC heat stabilizer',
      summary:
        'Composite eco heat stabilizer for rigid PVC calendered film with ultra-low VOC and odor, free of free phenol.',
      document: wordDocuments.jikeAos508,
      features: [
        'Pure organic high-zinc system for rigid PVC calendering.',
        'Ultra-low VOC and odor; free of free phenol.',
        'Very low heavy-metal content; strong eco performance.',
        'For opaque rigid film, card base sheet and flooring print layers.',
      ],
      specs: [
        { label: 'Appearance', value: 'White uniform powder / granules' },
        { label: 'Heating loss (105℃/2h)', value: '≤1.0%' },
        { label: 'Fineness', value: '99% through 120 mesh' },
        { label: 'Heavy metals (Pb, Cd, Hg, Cr6+)', value: 'each <5 ppm' },
        { label: 'Recommended dosage', value: '3–3.5 phr' },
        { label: 'Shelf life', value: '24 months from delivery' },
      ],
      applications: [
        'Opaque rigid PVC calendered film',
        'Card base sheet and printed film',
        'PVC flooring print layer',
      ],
      packaging: '25 kg woven bag; bulk bags available.',
    },
    {
      slug: 'aos-10',
      name: 'AOS-10 Organic Stabilizer (CPVC)',
      category: 'CPVC heat stabilizer',
      summary:
        'Organic composite stabilizer for high-temperature CPVC processing without organotin.',
      document: wordDocuments.jikeAos10,
      features: [
        'Suited to CPVC processing at 185–205℃.',
        'Very low volatility and odor; low plate-out.',
        'Excellent insulation for high-insulation articles.',
        'Free of Pb, Cd, Ba and organotin.',
      ],
      specs: [
        { label: 'Model', value: 'AOS-10' },
        { label: 'Type', value: 'Organic stabilizer for CPVC (non-organotin)' },
        { label: 'Appearance', value: 'White fine powder, free-flowing' },
        { label: 'Recommended dosage', value: '3.0–3.8 phr for rigid CPVC' },
        { label: 'Process temperature', value: '175–205℃ (extrusion/injection)' },
        { label: 'Shelf life', value: '12 months unopened' },
      ],
      applications: [
        'CPVC power, industrial chemical and water pipes',
        'CPVC profiles, sheets and injection fittings',
        'Food-contact / sanitary CPVC articles',
        'High-temperature extrusion and injection of CPVC',
      ],
      packaging: '25 kg kraft bag with PE liner, moisture-proof sealed.',
    },
    {
      slug: 'theic',
      name: 'THEIC',
      category: 'Functional additive',
      summary:
        'Tris(2-hydroxyethyl) isocyanurate for PVC plastic stabilizers and heat-resistant enameled wire.',
      document: wordDocuments.jikeTheic,
      features: [],
      specs: [
        { label: 'Chemical name', value: 'Tris(2-hydroxyethyl) isocyanurate' },
        { label: 'Molecular formula', value: 'C9H15N3O6' },
        { label: 'Molecular weight', value: '261.24' },
        { label: 'Appearance', value: 'White crystalline powder or granules' },
        { label: 'Melting point', value: '133.5–137℃' },
        { label: 'Hydroxyl value', value: '640±10 (mg KOH/g)' },
        { label: 'Acid value', value: '≤1.0 (mg KOH/g)' },
        { label: 'pH', value: '6.5–7.3' },
        { label: 'Turbidity', value: '≤1.0 NTU' },
        { label: 'Loss on drying', value: '≤0.3%' },
      ],
      applications: ['PVC plastic stabilizers', 'Heat-resistant enameled wire'],
      packaging: '25 / 500 / 800 / 1000 kg, woven bags with PE liner.',
    },
  ],
}

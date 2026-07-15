# -*- coding: utf-8 -*-
"""Build generated-documents-en.ts with full English TDS translations."""
from __future__ import annotations

from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]


def p(text: str) -> dict:
    return {"type": "paragraph", "text": text}


def t(rows: list[list[str]]) -> dict:
    return {"type": "table", "rows": rows}


def main() -> None:
    docs: dict[str, list[dict]] = {}

    docs["jikeCompanyIntro"] = [
        p(
            "Shenzhen Jike Technology Co., Ltd. is based in Shenzhen and is a modern fine-chemical enterprise integrating R&D, production, sales and technical service of polymer eco-friendly additives. With years of focus on PVC and CPVC heat-stabilizer materials, our core portfolio covers eco-friendly PVC heat stabilizers and CPVC heat stabilizers, together with in-house THEIC (tris(2-hydroxyethyl) isocyanurate), forming an integrated supply of finished stabilizers plus key co-stabilizer raw materials for rubber & plastics, coatings and insulation industries."
        ),
        p(
            "Jike operates standardized automated workshops and an independent R&D lab, with a professional chemical R&D and application team continuously optimizing synthesis processes and formulations. We control quality across raw materials, processing and finished-goods testing to ensure batch consistency and reliable supply. Leveraging Shenzhen location and mature supply chain, we serve both domestic and export markets with custom formulations, on-site process guidance and sample testing."
        ),
        p(
            'Guided by "Technology empowering green rubber & plastics; quality building lasting partnerships," Jike competes on eco-friendly, efficient and cost-effective additives, and aims to be a trusted source manufacturer of PVC/CPVC eco heat stabilizers and THEIC, co-building a low-carbon, safe and sustainable polymer materials ecosystem.'
        ),
        p("Shenzhen Jike Technology Co., Ltd."),
        p(
            "Address: Fu'an West Lane 1, Liulian Community, Pingshan Subdistrict, Pingshan District, Shenzhen"
        ),
        p("Contact: Ding Ding"),
        p("Phone: 13155217718"),
    ]

    docs["jikeJk100"] = [
        p("JK-100 Eco-Friendly Heat Stabilizer — Product Data Sheet"),
        p("Document version: V1.0  Effective date: 2026-07-02"),
        p("1. Product overview"),
        p(
            "JK-100 is an organic composite stabilizer developed as an organotin alternative for high-temperature PVC processing (contains no organotin). Built from multi-organic ligands and hyperbranched core compounds, it is environmentally compliant and suited to high-temperature forming of rigid PVC, combining heat stability with processing adaptability."
        ),
        t(
            [
                ["Item", "Specification"],
                ["Appearance", "White or slightly yellow uniform powder"],
                ["Volatile matter", "≤1.2%"],
                ["Bulk density", "0.40–0.60 g/cm³"],
                [
                    "Dynamic lubrication",
                    "Balanced internal/external lubrication; non-blooming, non-sticking",
                ],
            ]
        ),
        p("2. Physicochemical specifications"),
        p("3. Key advantages"),
        p("1. Fully eco-compliant for export and municipal projects"),
        p(
            "2. Long-term heat stability; cost-effective organotin alternative (typical dosage 1.5–2× organotin)"
        ),
        p("3. Higher melt strength and excellent mechanical properties"),
        p("4. Balanced lubrication for smooth, fine surface finish"),
        p("5. Non-blooming, easy processing, lower total cost"),
        p("4. Applications"),
        p(
            "1. PVC-U large-diameter pipes: municipal water, drainage/sewer, rainwater, conduit, irrigation"
        ),
        p("2. Medium/small rigid PVC: profiles, fittings, extruded sheet"),
        p(
            "3. Equipment: single- and twin-screw extrusion; low- to high-CaCO₃ rigid PVC formulations"
        ),
        p("5. Processing"),
        p(
            "Charge with PVC resin, CaCO₃, processing aids and color masterbatch into a high-speed mixer; blend at ambient temperature. Optional: small amounts of pipe antioxidant and external lubricant improve weatherability."
        ),
        p("6. Packaging, storage and shelf life"),
        p("1. Packaging: 25 kg/bag, moisture-proof composite paper bag with PE liner"),
        p(
            "2. Store cool, dry and ventilated; keep away from heat, flame and oxidizers; do not store with acids/corrosives"
        ),
        p("3. Shelf life: 12 months sealed; reseal after opening and use promptly"),
        p("7. Safety"),
        p("1. Eco powder additive; wear dust mask and gloves during handling"),
        p("2. Keep workshop ventilated; clean dust regularly"),
        p("3. Non-hazardous for normal road/rail transport; avoid crushing packages"),
        p("4. On skin/eye contact rinse with water; if ingested seek medical care"),
        p("8. Compliance and disclaimer"),
        p(
            "1. Compliant with RoHS, REACH-SVHC, 18 PAHs, PFOS/PFOA and domestic water-pipe hygiene rules; third-party reports available on request."
        ),
        p(
            "2. Data are laboratory typical values for guidance only. Validate with lab/pilot trials before mass production. We accept no liability for unvalidated non-standard use."
        ),
    ]

    docs["jikeJk619e"] = [
        p("JK-619E Large-Diameter Pipe Eco Stabilizer (TDS)"),
        p("Document version: V1.0"),
        p("Effective date: 2026-06-09"),
        p("Product type: Eco heat stabilizer for large-diameter PVC water/drainage pipes"),
        p("1. Product overview"),
        p(
            "A composite eco Ca-Zn heat stabilizer designed for extrusion of large-diameter PVC water, drainage, municipal sewer and conduit pipes. Based on an organic stabilizing system with high-temperature co-stabilizers and balanced lubrication. Free of heavy metals and sulfur pollution, offering long heat stability (no zinc burn), high melt strength, non-blooming and stable plasticization—suited to low-speed high-torque, thick-wall, long cooling cycles. Helps prevent inner-wall yellowing, melt sag, poor plasticization, black ends and brittleness, delivering uniform wall thickness, smooth surfaces, pressure resistance and dimensional stability."
        ),
        p("2. Physicochemical specifications"),
        t(
            [
                ["Item", "Specification", "Method"],
                ["Appearance", "White or slightly yellow uniform powder", "Visual"],
                ["Volatile matter", "≤1.2%", "GB/T 11275"],
                ["Bulk density", "0.40–0.60 g/cm³", "GB/T 16913"],
                [
                    "Dynamic lubrication",
                    "Balanced I/E lubrication; non-blooming, non-sticking",
                    "Internal",
                ],
            ]
        ),
        p("3. Core features"),
        p(
            "Eco and non-toxic: free of Pb, Cd, Hg, Cr; no sulfur odor; meets RoHS, REACH-SVHC, PAHs and national potable-pipe hygiene requirements."
        ),
        p(
            "Long high-temperature stability for thick walls, long residence and slow cooling—reduces yellowing, end scorch and inner degradation."
        ),
        p(
            "Mechanical performance: preserves PVC structure, raises melt strength, reduces sag and wall unevenness; meets national pipe mechanical tests."
        ),
        p(
            "Balanced lubrication for large-pipe extrusion: early plasticization, late release; smooth inner/outer walls without bubbles, scratches or pits."
        ),
        p("Low plate-out, non-sticking, easy sizing—less die cleaning, faster cooling/sizing."),
        p(
            "Broad compatibility with PVC, CaCO₃, impact modifiers and masterbatch; stable dosage; simplifies formulation and lowers cost."
        ),
        p("4. Applications"),
        p(
            "Large-diameter PVC-U municipal water, drainage/sewer, rainwater, power conduit and irrigation pipes; single- and twin-screw large-pipe lines; high-filler systems."
        ),
        p("5. Recommended use"),
        p(
            "Dosage: 2.0–3.5 PHR on 100 PVC; increase slightly for high filler, thick wall or low-speed runs."
        ),
        p(
            "Charge with resin, light/heavy CaCO₃, processing aids and masterbatch; high-speed mix at ambient temperature."
        ),
        p("May combine with pipe antioxidants and external lubricants for weatherability."),
        p("6. Packaging and storage"),
        p("Packaging: 25 kg/bag moisture-proof composite paper bag with PE liner."),
        p("Store cool, dry, ventilated; away from heat and moisture; not with acids/oxidizers."),
        p("Shelf life: 12 months sealed; reseal after opening."),
        p("7. Safety"),
        p("Wear dust mask and gloves; keep ventilated; clean spills."),
        p("Non-hazardous for normal transport; avoid crushing packages."),
        p("Rinse skin/eyes with water; seek medical care if ingested."),
        p("8. Compliance"),
        p(
            "Meets RoHS, REACH, 18 PAHs, PFOS/PFOA and water/drainage hygiene rules; third-party reports available."
        ),
        p("9. Disclaimer"),
        p(
            "Typical values for guidance only. Run lab/pilot trials before mass production. No liability for unvalidated use."
        ),
    ]

    docs["jikeJk318"] = [
        p("JK-318 Ca-Zn Stabilizer for PVC Injection Fittings — Overview"),
        p(
            "White or slightly yellow powder with good initial color, fast plasticization, good lubrication, long heat stability and long continuous run time. SGS tested, meets RoHS 2.0. Packaging: 25 kg/bag. Main uses: injection fittings, junction boxes, etc."
        ),
        p("JK-318 performance features"),
        p("1. Good initial color and heat stability; high whiteness."),
        p("2. Shorter plasticization time; good mold filling."),
        p("3. Good dispersion; high gloss."),
        p("4. Good processability; high melt strength and part strength."),
        p("JK-318 technical data"),
        t(
            [
                ["Item", "Unit", "Specification"],
                ["Appearance", "", "White or slightly yellow powder"],
                ["Volatile matter", "%", "≤1"],
                ["Melting point", "℃", "≥80"],
                ["Density", "g/cm³", "0.8–0.9"],
                ["Suggested dosage (on PVC)", "%", "4–6"],
            ]
        ),
        p("JK-318 use notes"),
        p("Applications: mainly injection fittings and junction boxes; also large fittings."),
        p("JK-318 purchasing notes"),
        p("• 25 kg/bag"),
        p(
            "• PP woven bag with PE liner; reseal after opening; store cool and dry; shelf life 12 months."
        ),
        p(
            "• Technical data from testing and field use; optimize dosage for your formula, equipment and process."
        ),
    ]

    docs["jikeJk315"] = [
        p("JK-315 Ca-Zn Stabilizer for SPC Flooring — Overview"),
        p(
            "White or slightly yellow powder; partially soluble in ethanol and other solvents, insoluble in water; decomposes in strong acid/base. Good initial color, fast plasticization, good lubrication, long heat stability and long run time. SGS tested, RoHS 2.0."
        ),
        p("JK-315 performance features"),
        p("1. Good heat stability; long continuous run."),
        p("2. Good dispersion for uniform plasticization and high-speed melt flow."),
        p("3. Improves peel strength of boards."),
        p("4. Good processability; good mechanicals, low shrinkage and warpage."),
        p("5. May reduce or omit ACR/CPE while meeting basic flooring needs."),
        p("JK-315 technical data"),
        t(
            [
                ["Item", "Unit", "Specification"],
                ["Appearance", "", "White or slightly yellow powder"],
                ["Volatile matter", "%", "≤1"],
                ["Initial melting point", "℃", "≥80"],
                ["Density", "g/cm³", "0.8–0.9"],
                ["Suggested dosage (on PVC)", "%", "6–8"],
            ]
        ),
        p("JK-315 use notes"),
        p("Applications: SPC flooring, marble-look boards, stone-plastic wall panels, etc."),
        p("Reference SPC formula:"),
        p("PVC      100"),
        p("CaCO3 300-350"),
        p("JK-315   7.5"),
        p("Regrind 100"),
        p("G60 1.5-1.8"),
        p("PE wax 1.5-1.8"),
        p("JK-315 purchasing notes"),
        p("• 25 kg/bag"),
        p("• PP woven bag with PE liner; store cool and dry; shelf life 24 months."),
        p("• Trial small batches first because process/equipment/environment differ."),
        p("JK-315 special notice"),
        p(
            "• Data are reliable measurements; users must verify suitability for their conditions. We cannot guarantee fitness for every process."
        ),
    ]

    docs["jikeAos508"] = [
        p("AOS-508 Organic Eco Stabilizer for Calendering — TDS"),
        p("1. Product overview"),
        p(
            "AOS-508 is a composite eco heat stabilizer for rigid PVC calendered film, made from self-synthesized metal-free pure organic compounds compounded with high-zinc co-stabilizers. Extremely low VOC and odor; free of free phenol; excellent environmental performance."
        ),
        p("2. Applications"),
        p("Opaque rigid PVC calendered film, card base sheet, printed film;"),
        p("Stable processing of PVC flooring print layers."),
        p("3. Physicochemical specifications"),
        p("Appearance: white uniform powder / granules"),
        p("Heating loss (105℃/2h): ≤1.0%"),
        p("Fineness: 99% through 120 mesh"),
        p("Heavy metals (Pb, Cd, Hg, Cr6+): each <5 ppm"),
        p("4. Recommended dosage"),
        p("3–3.5 phr; adjust based on formula and process trials."),
        p("5. Packaging"),
        p("25 kg woven bag; bulk bags available."),
        p("6. Storage"),
        p("Store at 15–30℃; highly hygroscopic—keep dry;"),
        p("Keep away from high heat;"),
        p("Reseal promptly after use;"),
        p("Shelf life: 24 months from delivery."),
        p("7. Notice"),
        p(
            "Data from lab tests for production reference only, not a quality guarantee. Validate with your formula, equipment and process."
        ),
    ]

    docs["jikeAos10"] = [
        p("AOS-10 Organic Stabilizer (CPVC)"),
        p("Model: AOS-10"),
        p("Type: Organic stabilizer for CPVC (non-organotin)"),
        p("1. Product overview"),
        p(
            "AOS-10 is an organic composite stabilizer for high-temperature CPVC processing (no organotin), based on multi-organic ligands and hyperbranched compounds. Eco-compliant for rigid CPVC high-temperature forming, combining heat stability and processability."
        ),
        p("2. Appearance"),
        p("White fine powder, free-flowing, no hard lumps or obvious impurities, low odor."),
        p("3. Key advantages"),
        p(
            "High heat stability: for CPVC at 185–205℃; excellent static/dynamic stability; suppresses degradation and HCl chain reaction; reduces yellowing and brittleness."
        ),
        p("Low volatility, non-blooming: low odor; protects surface finish and performance."),
        p("High electrical insulation for power conduit and cable sheath applications."),
        p(
            "Eco-compliant: free of Pb/Cd/Ba and organotin; meets RoHS, REACH and FDA food-contact related expectations for eco products."
        ),
        p("4. Applications"),
        p("Designed for rigid CPVC:"),
        p("CPVC power, industrial chemical and water pipes;"),
        p("CPVC profiles, sheets, injection fittings;"),
        p("Food-contact / sanitary CPVC (with food-grade formulations);"),
        p("High-temperature extrusion and injection of CPVC."),
        p("5. Dosage and process"),
        p("Dosage: 3.0–3.8 phr on 100 CPVC resin;"),
        p("Process temperature: 175–205℃ (extrusion/injection);"),
        p(
            "Mix at 90–120℃ for full dispersion; cool the dry-blend; optional lubricants."
        ),
        p("6. Packaging"),
        p("25 kg kraft bag with PE liner; custom packs available."),
        p("7. Storage"),
        p(
            "Cool, dry, ventilated; sealed; away from heat, oxidizers, strong acids/bases; shelf life 12 months unopened."
        ),
        p("8. Compliance"),
        p(
            "No organotin, Pb, Cd or Ba; meets RoHS 2.0, REACH (no SVHC), FDA 21 CFR 177.1210 context and GB 9685-2016."
        ),
        p("9. Liability"),
        p(
            "For technical reference only. Users must assess suitability; we are not liable for improper use."
        ),
    ]

    theic = [
        p("Trade name: THEIC (Saike)"),
        p("Chemical name: Tris(2-hydroxyethyl) isocyanurate"),
        p("Molecular formula: C9H15N3O6"),
        p("Molecular weight: 261.24"),
        p("Key specifications:"),
        p("Appearance: white crystalline powder or granules"),
        p("Melting point: 133.5–137℃"),
        p("Hydroxyl value: 640±10 (mg KOH/g)"),
        p("Acid value: ≤1.0 (mg KOH/g)"),
        p("pH: 6.5–7.3"),
        p("Turbidity: ≤1.0 NTU"),
        p("Loss on drying: ≤0.3%"),
        p("Applications: PVC plastic stabilizers, heat-resistant enameled wire, etc."),
        p("Packaging: 25 / 500 / 800 / 1000 kg, woven bags with PE liner."),
    ]
    docs["jikeTheic"] = theic
    docs["alphaTheic"] = theic

    docs["alphaCompanyIntro"] = [
        p(
            "Alpha (Shenzhen) Eco New Materials Co., Ltd. is a high-tech materials company in Shenzhen focused on R&D, production and technical service of eco functional additives for PVC. Core business is single-function PVC eco additives providing high-purity, well-matched, compliant raw materials for PVC manufacturers."
        ),
        p(
            "Since founding, Alpha has pursued focused single-product excellence to green the rubber & plastics industry, deepening the PVC eco mono-additive niche with pure, stable, high-performance specialties and low-carbon, low-VOC solutions. We aim to be a highly reliable specialty additive supplier and co-build a safe, low-carbon polymer materials ecosystem."
        ),
        p("Alpha (Shenzhen) Eco New Materials Co., Ltd."),
        p(
            "Address: Room 504, Building A, Zone 3, Rapoo Zhongcheng Life Science Park, Shenzhen"
        ),
        p("Contact: Xu Jun"),
        p("Phone: 13609623668"),
    ]

    docs["alphaDh273"] = [
        p("DH-273 Zinc-Burn Inhibitor"),
        p(
            "Overview: a polyol ester compound used as an auxiliary to suppress zinc burn in PVC heat stabilizers."
        ),
        p("Specifications:"),
        p("Appearance: slightly yellow powder"),
        p("Odor: none"),
        p("Specific gravity: 1.35 g/l"),
        p("Acid value: ≤2 mg KOH/g"),
        p("Melting point: 150–170℃"),
        p("Heating loss: ≤2%"),
        p("Features:"),
        p("1. Precise zinc-burn control via hydroxy chelation of Zn ions."),
        p("2. Improves plasticization uniformity and early whiteness."),
        p("3. Extends mid/late heat-stability window of Ca-Zn systems."),
        p(
            "4. High esterification improves transparency of Ca-Zn systems—closest to organotin among peers."
        ),
        p("5. Suppresses late yellowing and plate-out."),
        p(
            "6. Preferred for high-end transparent/translucent PVC (films, sheets, medical)."
        ),
        p("Dosage: typically 5–10% (adjust as needed)."),
        p("Applications: powder Ca-Zn and Ba-Zn formulations for flexible and rigid PVC."),
        p("Storage: cool and ventilated; reseal after opening."),
        p("Safety: odorless, non-sulfur-staining; see MSDS."),
        p("Packaging: 25 kg/pack"),
        p("Reference formula:"),
        p("Zinc stearate: 35–40%"),
        p("Calcium stearate: 5–30%"),
        p("DH-273: 5–10%"),
        p("Antioxidant: 1–3%"),
        p("DBM (beta-diketone): 1–5%"),
        p("Internal/external lubricants: 5–10%"),
        p("Others: 10–20%"),
        p("Disclaimer: technical reference only; user assesses suitability."),
    ]

    docs["alphaAef18"] = [
        p("PVC Processing Stabilizer Additive AEF-18"),
        p(
            "Molecular structure: AEF-18 is a calcium organic framework coordination polymer (MOFs) with Ca content 20%±0.5."
        ),
        p(
            "Applications: functional additive for dispersion, viscosity reduction, stabilization and lubrication in rubber and plastics."
        ),
        p("Application notes in PVC:"),
        p(
            "Excellent early whiteness in Ca-Zn stabilizers (avoids red-yellow undertone of calcium stearate);"
        ),
        p(
            "Strong dispersion; lowers viscosity; improves flow and melt flow; shortens residence; raises output and quality;"
        ),
        p(
            "Enables pure white stabilizers without yellow/red cast; does not hurt foaming;"
        ),
        p(
            "In SPC one-pack systems can reduce CPE/ACR while keeping toughness; stabilizes extrusion current;"
        ),
        p("3) Reduces residual stress and deformation; improves dimensional stability;"),
        p(
            "4) In profiles, helps avoid black lines and clouding and controls sink marks;"
        ),
        p(
            "5) Replacing ester lubricants can raise HDT by 1–5℃ depending on formula;"
        ),
        p(
            "6) In flexible PVC (e.g. cable): fewer blisters/oil-out; better appearance; stable water-immersion volume resistivity; replaces Ca-stearate for whiteness with less plate-out; can partially replace Zn-stearate to improve plasticization;"
        ),
        p(
            "7) Suggested to replace part of Zn/Ca stearate in Ca-Zn formulas; also usable as lubricant."
        ),
        p("Product specs:"),
        t(
            [
                ["Item", "Specification"],
                ["Appearance", "White fine powder"],
                ["Decomposition temperature, ℃", ">500"],
                ["Particle size D50, μm", "3–5"],
                ["Ash, %", "28.5±1.5"],
            ]
        ),
        p("Product features:"),
        p("1) Non-toxic; suitable for food-contact materials"),
        p("2) Decomposition >500℃, excellent heat resistance"),
        p("3) Non-migrating, non-blooming"),
        p("Safety: meets EU RoHS and REACH."),
        p("Storage: cool, ventilated, dry."),
        p("Packaging: composite bag, 25 kg net."),
        p("Notice: conclusions from experiments; not a product guarantee."),
    ]

    docs["alphaCcl601"] = [
        p("Volume Resistivity Stabilizer CCL-601"),
        p("Product specs:"),
        t(
            [
                ["Item", "Specification"],
                ["Appearance", "White fine powder"],
                ["Decomposition temperature, ℃", ">500"],
                ["Particle size D50, μm", "3–5"],
                ["Ash, %", "26±1.5"],
            ]
        ),
        p("Features:"),
        p(
            "1) Non-toxic organic calcium salt; maintains water-immersion (incl. brine) volume resistivity of wire products with little decay"
        ),
        p("2) Decomposition >500℃, excellent heat resistance"),
        p("3) Good PVC compatibility; non-migrating, non-blooming"),
        p("Application notes:"),
        p("1. Internal lubrication without plate-out or overdose issues"),
        p("2. Improves flow and surface gloss of wire products"),
        p("3. Suggested dosage: 0.5–1 phr"),
        p("4. Stabilizing effect; improves stability and whiteness"),
        p("Packaging:"),
        p(
            "Paper-plastic bag with PE liner, 25 kg; 40 bags per pallet (1000 kg), stretch-wrapped."
        ),
        p("Safety:"),
        p("1. Store as ordinary non-hazardous chemical."),
        p(
            "2. Considered non-hazardous under normal industrial hygiene; food-contact capable; MSDS available."
        ),
        p("Notice: experimental conclusions; not a guarantee."),
    ]

    docs["alphaAft180"] = [
        p("Powder Anti-Agglomeration Agent AFT-180"),
        p("1. Overview"),
        p(
            "A polycarboxylate coordination-polymer powder anti-agglomeration agent. Via chemical anchoring and steric hindrance, it enables ultrafine, uniform, stable dispersion of pigments/fillers in polymer compounds."
        ),
        p("2. Features"),
        p(
            "Ultrafine dispersion: prevents hard agglomerates and lowers dispersion particle size for uniform distribution in rubber/plastics."
        ),
        p(
            "Long-term stability: avoids Mooney rise and stress concentration from agglomeration; stabilizes mechanical properties of compounds and pre-dispersed masterbatch."
        ),
        p(
            "Eco and heat-resistant: non-toxic, odorless, non-blooming, non-polluting; withstands high-temperature processing."
        ),
        p("3. Use and dosage"),
        p("Mixing: add before powders."),
        p("Premix: can be pre-blended with powders."),
        p("Dosage: on total powder weight, start from 0.3%; typical 1.0%±0.5%."),
        p("4. Specifications"),
        t(
            [
                ["Item", "Specification"],
                ["Appearance", "White powder"],
                ["Heating loss, %", "≤1.5"],
                ["Ignition loss, %", ">70"],
                ["Fineness (325 mesh pass), %", "100%"],
                ["Decomposition temperature, ℃", "≥517"],
            ]
        ),
        p("5. Packaging and logistics"),
        p(
            "• Packaging: PE inner / woven outer, 25 kg net; small bags can be packed in 875 kg bulk bags."
        ),
        p("• Storage: cool, ventilated, dry."),
        p("• Transport: as general non-toxic powder."),
    ]

    docs["alphaAef477"] = [
        p("High-Efficiency Co-Stabilizer AEF-477"),
        p("Function: high-efficiency co-stabilizer for Ca/Zn and organotin heat stabilizers"),
        p(
            "Features: non-toxic PVC co-stabilizer that suppresses zinc burn; greatly improves long-term heat stability of Ca/Zn systems; with organotin improves heat stability without hurting Vicat; non-blooming."
        ),
        p("Recommended dosage: 0.1–0.6 phr (confirm by trial)"),
        p("Physical data:"),
        t(
            [
                ["Item", "Unit", "Typical", "Method"],
                ["Appearance", "—", "White powder", "Visual"],
                ["Bulk density", "g/cc", "0.3", "APF00500"],
                ["Alkalinity", "mg KOH/g", "520–580", ""],
                ["Specific gravity", "g/cm³", "1.1–1.2", ""],
            ]
        ),
        p("Note: typical values, not quality limits."),
        p("Packaging: 25 kg/bag or bulk bag"),
        p(
            "Storage: 15–30℃ preferred; moisture sensitive; reseal; max 24 months from delivery."
        ),
    ]

    docs["alphaAef32"] = [
        p("Stearate-Intercalated Mg-Al Hydrotalcite (AEF-32) TDS"),
        p("1. Basic information"),
        p(
            "1. Full name: stearate-intercalated magnesium-aluminum layered double hydroxide (St-LDH). 2. Formula: Mg3Al(OH)8(C18H35O2)·2H2O. 3. Structure: positively charged Mg-Al hydroxide layers with fully intercalated stearate anions (vs carbonate-coated LDH); long alkyl chains expand interlayer; XRD d-spacing 3.2–3.5 nm. 4. CAS: LDH matrix 11097-59-9; stearate 822-16-2. 5. Uses: rigid PVC pipes, window profiles, rigid film/sheet; lead-free Ca-Zn systems; twin/single-screw extrusion, injection, calendering."
        ),
        p("2. Core advantages in PVC"),
        p(
            "1. Dual heat stabilization: interlayer stearate rapidly scavenges HCl; long chains displace labile allylic Cl; early whiteness better than carbonate LDH. 2. Suppresses zinc burn with Ca-Zn; complexes ZnCl2; long-term stability +30–50%. 3. Excellent PVC compatibility; less agglomeration; no white/crystal spots; internal lubrication lowers torque. 4. Superior whiteness vs ordinary hydrotalcite. 5. Eco, no Pb/Cd; RoHS and food-contact related standards. 6. Low plate-out at high temperature; ionically fixed stearate."
        ),
        p("3. Factory specifications"),
        t(
            [
                ["Item", "Specification", "Method"],
                ["Appearance", "White ultrafine uniform powder", "Visual"],
                ["MgO, wt%", "34.0–37.0", "HG/T 3820 / ICP-OES"],
                ["Al2O3, wt%", "13.0–16.0", "HG/T 3820 / ICP-OES"],
                ["Interlayer stearate organic C", "18.0–23.0%", "EA + TG"],
                ["Volatile moisture 105℃ 2h", "≤0.50%", "Oven loss"],
                ["Total LOI 500℃", "42–48%", "TG-DTA"],
                ["325-mesh wet residue", "≤0.01%", "Wet sieve"],
            ]
        ),
        p("4. Packaging, storage, transport"),
        p(
            "1. 25 kg/bag, PE liner + woven outer. 2. Cool dry warehouse ≤30℃; protect from moisture; stack ≤8 layers. 3. Shelf life 12 months sealed; if caked, dry 105℃ 2h. 4. Ordinary inorganic powder; non-hazardous; avoid rain and package damage."
        ),
        p("5. Safety"),
        p(
            "1. Ultrafine powder—wear dust mask. 2. Do not ingest; rinse eyes/skin with water. 3. Dispose as general industrial solid waste."
        ),
        p("6. Disclaimer"),
        p(
            "Laboratory typical values for formulation guidance only. No liability for unvalidated non-standard use."
        ),
    ]

    docs["alphaF37"] = [
        p("F-37 High-Efficiency Composite Release / Lubricant Additive TDS"),
        p("Model: F-37 high-efficiency composite release lubricant"),
        p("Document version: V1.0     Date: 2026-07-11"),
        p("1. Product overview"),
        p("1.1 Introduction"),
        p(
            "F-37 is a polymer-modified composite release lubricant with special organometallic actives on a modified polyolefin carrier. It combines interfacial release with balanced melt lubrication, improving plasticization and reducing sticking, die deposit and surface defects in rigid PVC/CPVC, compatible with Ca-Zn, rare-earth and organotin stabilizer systems."
        ),
        p("1.2 Applications"),
        p(
            "CPVC high-temp chemical fittings and hot/cold water pipes; UPVC drainage pipes; window profiles; injection fittings; sheet/film; extrusion, injection and calendering."
        ),
        p("2. Typical physicochemical data (25℃)"),
        t(
            [
                ["Item", "Typical", "Method"],
                ["Appearance", "Uniform white fine powder", "Visual"],
                ["Odor", "Slight oily, non-irritating", "Sensory"],
                ["Melt/softening range", "110–125℃", "DIN ISO 2176"],
                ["Acid value (mg KOH/g)", "≤10.0", "GB/T 5530"],
                ["Moisture", "≤0.3%", "105℃ loss"],
                ["High-temp volatile (150℃/1h)", "≤0.5%", "Oven"],
                ["Heat resistance", "≥230℃", "TG"],
                ["Fineness (100 mesh pass)", "≥98%", "Sieve"],
            ]
        ),
        p("3. Core advantages"),
        p(
            "3.1 Strong long-term release: migrates to melt/metal interface forming a continuous lubricating film; less sticking, stringing and die deposit; longer cleaning cycles."
        ),
        p(
            "3.2 Balanced composite lubrication: improves dispersion and plasticization uniformity; balanced I/E lubrication; less local over-lubrication or bloom."
        ),
        p(
            "3.3 Broad compatibility with rigid PVC/CPVC stabilizers, ester lubricants and fillers; low discoloration risk (slight transparency trade-off)."
        ),
        p("3.4 Low volatility/smoke in PVC/CPVC processing windows."),
        p(
            "3.5 Better surface quality: fewer pits, scratches and unevenness; higher gloss."
        ),
        p("Usage"),
        p(
            "Charge with PVC/CPVC resin, heat stabilizer, fillers and lubricants in a high-speed mixer at 85–115℃; use directly in calendering/extrusion/injection."
        ),
        p("5. Packaging, storage, shelf life"),
        p("Packaging: 25 kg woven bag with PE liner."),
        p(
            "Storage: cool dry warehouse, protect from light/moisture, ≤35℃, away from strong acids/oxidizers."
        ),
        p(
            "Stack on pallets; avoid long heavy stacking; light caking can be crushed without performance loss."
        ),
        p("Shelf life: 12 months sealed; use within 3 months after opening."),
        p("6. Disclaimer"),
        p(
            "Typical lab values for guidance only. Validate dosage before mass production. Quality subject to sales contract."
        ),
    ]

    docs["alphaZincBenzoate"] = [
        p("Zinc Benzoate Product Sheet"),
        p("Basic information"),
        p(
            "Chinese name: zinc benzoate (zinc dibenzoate). English: Zinc Benzoate (Zinc Dibenzoate)"
        ),
        p("Formula: C14H10O4Zn  MW: 307.64  CAS: 553-72-0"),
        p(
            "Appearance: white crystalline powder, odorless/tasteless. Solubility: poorly water-soluble, slightly ethanol-soluble"
        ),
        p("Zinc content: 19.5–20.5% (dry basis)"),
        p("Quality standard (enterprise)"),
        t(
            [
                ["Item", "Specification"],
                ["Appearance", "White powder"],
                ["Particle size (mesh)", "≥325"],
                ["Zinc content (%)", "≥20.0"],
                ["Volatile (105℃ 2h) (%)", "≤1.0"],
            ]
        ),
        p("Main uses"),
        p(
            "1. Food: preservative (mold/yeast), acidulant, zinc fortifier; beverages, jams, canned foods, seasonings."
        ),
        p(
            "2. Plastics: PVC heat stabilizer (heat/weather for transparent/flexible PVC)."
        ),
        p("3. Coatings/textiles: paint biocide; textile softener/antistatic."),
        p("4. Pharma/cosmetics: antimicrobial; zinc supplement raw material."),
        p("Dosage"),
        p(
            "1. Food: 0.1–1.5 g/kg (as benzoic acid); jams may use 3–5% aqueous dip then rinse."
        ),
        p("2. PVC stabilizer: 1–4% of formula, often compounded."),
        p("3. Textile dyeing: 0.5–3% on bath weight."),
        p("Packaging"),
        p("25 kg kraft or woven bag with PE liner; custom packs available."),
        p("Storage"),
        p(
            "Cool, dry, ventilated; sealed; away from heat/oxidizers/acids/bases; shelf life 24 months unopened."
        ),
        p("Compliance"),
        p(
            "No organotin/Pb/Cd/Ba; RoHS 2.0, REACH (no SVHC), FDA 21 CFR 177.1210 context, GB 9685-2016."
        ),
        p("Liability"),
        p("Technical reference only; user assesses suitability."),
    ]

    out_path = ROOT / "src" / "data" / "generated-documents-en.ts"
    payload = json.dumps(docs, ensure_ascii=False, separators=(",", ":"))
    text = (
        "import type { DocumentBlock } from './types'\n\n"
        "// English TDS/document blocks for locale=en. Hand-maintained translations of Chinese Word extracts.\n"
        f"export const wordDocumentsEn = {payload} as const satisfies Record<string, readonly DocumentBlock[]>\n"
    )
    out_path.write_text(text, encoding="utf-8")
    print(f"wrote {out_path} ({out_path.stat().st_size} bytes, {len(docs)} docs)")


if __name__ == "__main__":
    main()

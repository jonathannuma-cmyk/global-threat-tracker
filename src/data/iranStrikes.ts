/**
 * Iranian Missile Strike History & 2026 Iran War Data
 *
 * Pre-2026: Documented IRGC Aerospace Force ballistic missile operations.
 * 2026: Comprehensive strike data from the 2026 Iran-Israel-US conflict.
 *
 * Sources: CSIS Missile Defense Project, FAS, open-source imagery,
 * DoD statements, UNSC Panel of Experts reports, news wire reporting.
 *
 * Array is ordered most-recent first.
 */

export interface StrikeOrigin {
  lat: number;
  lng: number;
  label: string;
}

export interface StrikeTarget {
  lat: number;
  lng: number;
  label: string;
}

export interface IranStrike {
  id: string;
  codename: string;
  date: string;
  year: number;
  title: string;
  description: string;
  launchOrigins: StrikeOrigin[];
  targets: StrikeTarget[];
  munitions: string;
  outcome: string;
  campaign?: string;
}

export interface DailyStrikeData {
  date: string;       // YYYY-MM-DD
  day: number;        // Day 1, Day 2, etc.
  iranOnIsrael: number;
  iranOnGulf: number;
  usIsraelOnIran: number;
  shippingAttacks: number;
  notes?: string;
}

export const DAILY_STRIKE_DATA: DailyStrikeData[] = [
  { date: "2026-02-28", day: 1,  iranOnIsrael: 50, iranOnGulf: 35, usIsraelOnIran: 150, shippingAttacks: 3, notes: "Day 1: Operation Epic Fury + True Promise IV. Khamenei killed. 1,000+ targets." },
  { date: "2026-03-01", day: 2,  iranOnIsrael: 40, iranOnGulf: 30, usIsraelOnIran: 72,  shippingAttacks: 5, notes: "Beit Shemesh: 9 killed. Dubai/Doha/Bahrain hit. 72 strikes across 20 Iranian provinces." },
  { date: "2026-03-02", day: 3,  iranOnIsrael: 25, iranOnGulf: 20, usIsraelOnIran: 56,  shippingAttacks: 2, notes: "56 strikes in 13 provinces. Natanz entrance damaged. Iranian fire declining." },
  { date: "2026-03-03", day: 4,  iranOnIsrael: 15, iranOnGulf: 12, usIsraelOnIran: 50,  shippingAttacks: 2, notes: "300 Iranian launchers destroyed. 200+ air defense systems hit. 70% drop in Iranian fire." },
  { date: "2026-03-04", day: 5,  iranOnIsrael: 8,  iranOnGulf: 8,  usIsraelOnIran: 45,  shippingAttacks: 1, notes: "Iranian missile attacks down ~90% from Day 1. Drone attacks down ~83%." },
  { date: "2026-03-05", day: 6,  iranOnIsrael: 6,  iranOnGulf: 6,  usIsraelOnIran: 40,  shippingAttacks: 2, notes: "30+ Iranian naval vessels destroyed. Navy declared 'combat ineffective.'" },
  { date: "2026-03-06", day: 7,  iranOnIsrael: 5,  iranOnGulf: 5,  usIsraelOnIran: 35,  shippingAttacks: 1, notes: "B-2 strikes on underground hardened sites." },
  { date: "2026-03-07", day: 8,  iranOnIsrael: 4,  iranOnGulf: 4,  usIsraelOnIran: 30,  shippingAttacks: 2, notes: "Cumulative 13 shipping attacks. US destroyed 16 Iranian minelayers." },
  { date: "2026-03-08", day: 9,  iranOnIsrael: 4,  iranOnGulf: 3,  usIsraelOnIran: 28,  shippingAttacks: 1 },
  { date: "2026-03-09", day: 10, iranOnIsrael: 3,  iranOnGulf: 3,  usIsraelOnIran: 30,  shippingAttacks: 1 },
  { date: "2026-03-10", day: 11, iranOnIsrael: 5,  iranOnGulf: 4,  usIsraelOnIran: 45,  shippingAttacks: 2, notes: "One of most intense US/Israeli strike days. 5,500+ cumulative targets hit." },
  { date: "2026-03-11", day: 12, iranOnIsrael: 3,  iranOnGulf: 3,  usIsraelOnIran: 25,  shippingAttacks: 1 },
  { date: "2026-03-12", day: 13, iranOnIsrael: 3,  iranOnGulf: 2,  usIsraelOnIran: 22,  shippingAttacks: 1 },
  { date: "2026-03-13", day: 14, iranOnIsrael: 3,  iranOnGulf: 2,  usIsraelOnIran: 20,  shippingAttacks: 1 },
  { date: "2026-03-14", day: 15, iranOnIsrael: 4,  iranOnGulf: 3,  usIsraelOnIran: 22,  shippingAttacks: 1 },
  { date: "2026-03-15", day: 16, iranOnIsrael: 3,  iranOnGulf: 2,  usIsraelOnIran: 20,  shippingAttacks: 1 },
  { date: "2026-03-16", day: 17, iranOnIsrael: 3,  iranOnGulf: 2,  usIsraelOnIran: 18,  shippingAttacks: 0 },
  { date: "2026-03-17", day: 18, iranOnIsrael: 8,  iranOnGulf: 5,  usIsraelOnIran: 30,  shippingAttacks: 1, notes: "Larijani + Basij chief killed. Iran retaliates: 2 killed in Ramat Gan. Israel invades S. Lebanon." },
  { date: "2026-03-18", day: 19, iranOnIsrael: 10, iranOnGulf: 12, usIsraelOnIran: 35,  shippingAttacks: 2, notes: "MAJOR ESCALATION: South Pars gas field struck. Iran hits Qatar LNG facility." },
  { date: "2026-03-19", day: 20, iranOnIsrael: 5,  iranOnGulf: 5,  usIsraelOnIran: 22,  shippingAttacks: 1 },
  { date: "2026-03-20", day: 21, iranOnIsrael: 5,  iranOnGulf: 4,  usIsraelOnIran: 25,  shippingAttacks: 2, notes: "Diego Garcia IRBM attempt — 4,000km range. One failed, one intercepted." },
  { date: "2026-03-21", day: 22, iranOnIsrael: 3,  iranOnGulf: 3,  usIsraelOnIran: 18,  shippingAttacks: 1 },
  { date: "2026-03-22", day: 23, iranOnIsrael: 12, iranOnGulf: 5,  usIsraelOnIran: 20,  shippingAttacks: 1, notes: "Arad/Dimona: cluster munitions used. 180+ wounded. Strikes near Israeli nuclear site." },
  { date: "2026-03-23", day: 24, iranOnIsrael: 4,  iranOnGulf: 3,  usIsraelOnIran: 18,  shippingAttacks: 1 },
  { date: "2026-03-24", day: 25, iranOnIsrael: 3,  iranOnGulf: 2,  usIsraelOnIran: 15,  shippingAttacks: 1 },
  { date: "2026-03-25", day: 26, iranOnIsrael: 3,  iranOnGulf: 2,  usIsraelOnIran: 15,  shippingAttacks: 0 },
  { date: "2026-03-26", day: 27, iranOnIsrael: 5,  iranOnGulf: 4,  usIsraelOnIran: 18,  shippingAttacks: 1, notes: "IRGC naval commander Tangsiri killed. Iran intensifies retaliatory fire." },
  { date: "2026-03-27", day: 28, iranOnIsrael: 3,  iranOnGulf: 2,  usIsraelOnIran: 12,  shippingAttacks: 1 },
  { date: "2026-03-28", day: 29, iranOnIsrael: 3,  iranOnGulf: 2,  usIsraelOnIran: 12,  shippingAttacks: 1, notes: "Cumulative 21-24 shipping attacks in Strait of Hormuz / Gulf of Oman." },
  { date: "2026-03-29", day: 30, iranOnIsrael: 2,  iranOnGulf: 2,  usIsraelOnIran: 10,  shippingAttacks: 0 },
  { date: "2026-03-30", day: 31, iranOnIsrael: 2,  iranOnGulf: 1,  usIsraelOnIran: 10,  shippingAttacks: 1 },
  { date: "2026-03-31", day: 32, iranOnIsrael: 2,  iranOnGulf: 1,  usIsraelOnIran: 8,   shippingAttacks: 0 },
  { date: "2026-04-01", day: 33, iranOnIsrael: 2,  iranOnGulf: 1,  usIsraelOnIran: 8,   shippingAttacks: 0, notes: "Day 33. Cumulative deaths >2,300 region-wide including ~1,300 Iranian civilians." },
  { date: "2026-04-02", day: 34, iranOnIsrael: 2,  iranOnGulf: 1,  usIsraelOnIran: 8,   shippingAttacks: 0 },
];

export const IRAN_STRIKES: IranStrike[] = [
  // ── 2026 Iran War (reverse chronological) ────────────────────────────────

  {
    id: "apr7-pardis-bridges",
    codename: "Strikes on Pardis & Kashan",
    date: "Apr 7, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "US/Israel Strike Pardis, Rail Bridge at Kashan, Train Station",
    description:
      "U.S. and Israeli aircraft struck multiple civilian and dual-use infrastructure targets across Iran on April 7. Airstrikes destroyed residential and administrative buildings in Pardis, a satellite city east of Tehran housing technology-sector workers and IRGC-affiliated research institutes. A major rail bridge on the Tehran–Isfahan corridor near Kashan was struck and collapsed, severing one of Iran's primary north-south rail arteries. Additional bridge strikes were reported in the Kashan district and a passenger train station was hit, halting rail service across central Iran. The strikes reflected a continued pattern of targeting transportation and logistics nodes to degrade Iran's ability to move military equipment and personnel.",
    launchOrigins: [
      { lat: 31.0,  lng: 34.5,  label: "Israeli Air Force — Negev bases" },
      { lat: 20.5,  lng: 63.0,  label: "USS CVN strike group — Arabian Sea" },
    ],
    targets: [
      { lat: 35.76, lng: 52.00, label: "Pardis — buildings destroyed" },
      { lat: 33.98, lng: 51.45, label: "Kashan — rail bridge / train station" },
    ],
    munitions: "GBU-39 SDB, JDAM-ER, AGM-158 JASSM-ER",
    outcome:
      "Buildings destroyed in Pardis. Rail bridge near Kashan collapsed; Tehran–Isfahan rail corridor severed. Train station hit. Central Iran rail service suspended. Casualties not confirmed.",
  },

  {
    id: "apr7-kharg-island",
    codename: "Strike on Kharg Island",
    date: "Apr 7, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "US Strikes Kharg Island — Iran's Primary Oil Export Hub",
    description:
      "U.S. forces struck military installations on Kharg Island, Iran's principal crude oil export terminal in the northern Persian Gulf, through which roughly 90% of Iranian oil exports are loaded onto tankers. The strikes targeted IRGC military positions, radar installations, and fuel handling infrastructure on the island. Kharg Island is the terminus of the undersea pipeline from onshore Iranian oil fields and hosts massive floating storage capacity. Damage to the terminal's loading systems would substantially curtail what remained of Iran's oil export capability after earlier war damage to South Pars and Asaluyeh.",
    launchOrigins: [
      { lat: 20.5,  lng: 63.0,  label: "USS CVN strike group — Arabian Sea" },
      { lat: -7.32, lng: 72.42, label: "Diego Garcia — B-2 bombers" },
    ],
    targets: [
      { lat: 29.25, lng: 50.32, label: "Kharg Island — oil terminal / IRGC positions" },
    ],
    munitions: "Tomahawk Block V cruise missiles, GBU-57 Massive Ordnance Penetrator (B-2 delivery)",
    outcome:
      "IRGC military positions and radar infrastructure on Kharg Island struck. Oil export loading operations severely disrupted. Iranian crude exports effectively halted — estimated loss of $120M/day in revenue. Full structural damage assessment pending.",
  },

  {
    id: "apr7-jubail",
    codename: "Missiles Near Jubail",
    date: "Apr 7, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Iran Fires at Jubail Industrial Complex, Saudi Arabia",
    description:
      "Iran launched a salvo of ballistic missiles targeting the Jubail Industrial City on Saudi Arabia's eastern coast, the world's largest industrial city and home to petrochemical plants, refineries, and heavy manufacturing facilities. Saudi air defenses intercepted 7 of the incoming missiles; debris from intercepts fell across the city and surrounding area, causing structural damage to industrial buildings and sparking a large fire at a chemical storage facility. The attack was assessed as deliberate targeting of Saudi industrial capacity in retaliation for continued Saudi overflight permissions granted to Israeli aircraft.",
    launchOrigins: [
      { lat: 32.40, lng: 51.38, label: "Isfahan — IRGC Aerospace" },
      { lat: 27.18, lng: 56.27, label: "Bandar Abbas region" },
    ],
    targets: [
      { lat: 27.00, lng: 49.70, label: "Jubail Industrial City, Saudi Arabia" },
    ],
    munitions: "Ballistic missiles (Fateh-313, Zolfaghar assessed)",
    outcome:
      "7 of incoming missiles intercepted. Intercept debris caused structural damage across Jubail. Large fire at chemical storage facility. No confirmed direct missile impacts on primary industrial infrastructure. Several workers injured by debris.",
  },

  {
    id: "apr7-ramat-hasharon",
    codename: "Strike on Ramat Hasharon",
    date: "Apr 7, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Iran Strikes Ramat Hasharon — Continued Tel Aviv District Pressure",
    description:
      "Iran continued sustained missile and drone attacks against the Tel Aviv metropolitan area on April 7, with strikes causing damage in the Ramat Hasharon district north of Tel Aviv. The attack formed part of an ongoing Iranian effort to maintain psychological and physical pressure on central Israel despite the significant degradation of its ballistic missile inventory. Israeli air defenses intercepted the majority of incoming munitions; at least one impact was confirmed in a residential zone of Ramat Hasharon, causing structural damage but no reported fatalities.",
    launchOrigins: [
      { lat: 34.35, lng: 46.95, label: "Kermanshah — western Iran launch zone" },
      { lat: 32.40, lng: 51.38, label: "Isfahan — central Iran" },
    ],
    targets: [
      { lat: 32.15, lng: 34.84, label: "Ramat Hasharon, Tel Aviv district" },
    ],
    munitions: "Ballistic missiles and Shahed drones",
    outcome:
      "Structural damage in Ramat Hasharon residential area. Most incoming munitions intercepted. No fatalities confirmed. Arrow-2 and Iron Dome engaged.",
  },

  {
    id: "apr6-sharif-synagogue",
    codename: "Strikes on Sharif & Tehran Center",
    date: "Apr 6, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "US/Israel Strike Sharif University, Destroy Tehran Synagogue — 34 Killed",
    description:
      "U.S. and Israeli airstrikes on April 6 hit multiple targets in Tehran, killing at least 34 people including 6 children. Strikes targeted Sharif University of Technology — Iran's most prestigious technical university and a key source of personnel for nuclear and missile programs — causing significant damage to academic and research buildings. Separately, strikes hit residential areas in northern Tehran. In what became one of the most internationally condemned single acts of the conflict, a strike destroyed the Rafi'-Nia synagogue in central Tehran — one of Iran's last functioning Jewish houses of worship. Israel did not claim responsibility for the synagogue strike; U.S. officials stated the building was assessed to be used for IRGC communications relay purposes. Iran and international observers disputed this characterization. The strike drew condemnation from Jewish organizations worldwide.",
    launchOrigins: [
      { lat: 31.0,  lng: 34.5,  label: "Israeli Air Force — Negev bases" },
      { lat: 20.5,  lng: 63.0,  label: "USS CVN strike group — Arabian Sea" },
    ],
    targets: [
      { lat: 35.70, lng: 51.34, label: "Sharif University of Technology, Tehran" },
      { lat: 35.69, lng: 51.43, label: "Rafi'-Nia Synagogue, central Tehran — destroyed" },
      { lat: 35.75, lng: 51.45, label: "Residential areas, northern Tehran" },
    ],
    munitions: "Spice-2000, GBU-39 SDB, JDAM-ER",
    outcome:
      "34 killed including 6 children. Sharif University research buildings damaged. Rafi'-Nia synagogue destroyed — Iran's oldest functioning synagogue. International condemnation. Israel disputed strike was intentional targeting of religious site. U.S. and Israeli justification disputed by international community.",
  },

  {
    id: "apr6-south-pars-petrochem",
    codename: "South Pars Petrochemical Strike",
    date: "Apr 6, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Israel Strikes South Pars Petrochemicals — 85% of Iran's Exports Hit",
    description:
      "Israeli airstrikes on April 6 targeted the South Pars Petrochemical facility in Asaluyeh, the largest petrochemical complex in Iran and the Middle East. The strikes caused catastrophic damage to processing plants, cracker units, and storage infrastructure. Combined with earlier attacks on the South Pars gas field (March 18) and Mahshahr Special Petrochemical Zone (April 4), Israeli and U.S. officials assessed that approximately 85% of Iran's petrochemical export capacity had now been taken offline. Iran's petrochemical sector had been one of the few remaining sources of hard currency export revenue following the collapse of crude oil exports. The strikes effectively ended Iran's ability to fund continued missile production through energy exports.",
    launchOrigins: [
      { lat: 31.0,  lng: 34.5,  label: "Israeli Air Force — long-range strike package" },
    ],
    targets: [
      { lat: 27.33, lng: 52.68, label: "South Pars Petrochemical Complex, Asaluyeh" },
    ],
    munitions: "F-35I delivered Spice-2000 and GBU-28 bunker busters; Popeye Turbo cruise missiles",
    outcome:
      "South Pars Petrochemical Complex severely damaged. Combined with prior strikes: ~85% of Iranian petrochemical export capacity offline. Iran's hard-currency export revenue effectively eliminated. Fires burned for multiple days.",
  },

  {
    id: "apr6-khademi-killed",
    codename: "Operation Decapitation III",
    date: "Apr 6, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "IRGC Intelligence Chief Khademi Killed — Quds Force Commander Also Targeted",
    description:
      "A joint U.S.-Israeli airstrike on April 6 killed IRGC Intelligence Organization chief Major General Majid Khademi, one of the senior-most remaining IRGC commanders following the deaths of Supreme Leader Khamenei and multiple generals in the opening days of the war. Khademi oversaw IRGC intelligence collection, counterintelligence, and covert operations across the region. Israel separately claimed credit for a strike that killed IRGC Quds Force commander Yazdan Mir — the officer responsible for managing Iran's proxy networks in Iraq, Syria, Lebanon, and Yemen — in a separate operation on the same day. The back-to-back leadership eliminations left Iran's external operations apparatus effectively leaderless.",
    launchOrigins: [
      { lat: 31.0,  lng: 34.5,  label: "Israeli Air Force — strike package" },
      { lat: 20.5,  lng: 63.0,  label: "USS CVN strike group — Arabian Sea" },
    ],
    targets: [
      { lat: 35.69, lng: 51.39, label: "Tehran — IRGC Intelligence HQ compound" },
      { lat: 35.69, lng: 51.39, label: "Tehran — Quds Force command facility" },
    ],
    munitions: "Precision-guided munitions; Israeli Popeye Turbo cruise missiles assessed",
    outcome:
      "IRGC Intelligence chief Maj Gen Majid Khademi confirmed killed. IRGC Quds Force commander Yazdan Mir killed (Israeli claim). Iran's external proxy operations command effectively leaderless. IRGC command structure at near-total collapse.",
  },

  {
    id: "apr5-ali-al-salem",
    codename: "Strike on Ali Al Salem",
    date: "Apr 5, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Iran Drones Ali Al Salem Air Base — 15 US Personnel Wounded",
    description:
      "Iranian drone strikes hit Ali Al Salem Air Base in Kuwait on April 5, wounding 15 U.S. military personnel in the most significant single strike on the base since the war began. Ali Al Salem hosts U.S. Air Force F-16s and A-10s operating in support of the regional campaign, as well as logistics and basing support. The attack used multiple Shahed-238 jet-powered drones in a coordinated approach designed to overwhelm the base's Patriot and C-RAM defenses. Several drones penetrated the perimeter and impacted near aircraft parking and maintenance areas. No aircraft were destroyed but two were damaged. The Kuwaiti government formally condemned the attack and summoned the Iranian chargé d'affaires.",
    launchOrigins: [
      { lat: 34.35, lng: 46.95, label: "Kermanshah — western Iran" },
    ],
    targets: [
      { lat: 29.35, lng: 47.52, label: "Ali Al Salem Air Base, Kuwait" },
    ],
    munitions: "Shahed-238 jet-powered kamikaze drones (multiple)",
    outcome:
      "15 U.S. military personnel wounded. Two U.S. aircraft damaged. Perimeter structures damaged. Base remained operational. Kuwait formally condemned attack and summoned Iranian envoy.",
  },

  {
    id: "apr5-haifa-collapse",
    codename: "Strike on Haifa Residential Block",
    date: "Apr 5, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Haifa Residential Building Collapses — 4 Civilians Killed",
    description:
      "An Iranian ballistic missile made a direct hit on a six-story residential apartment building in the Neve Sha'anan neighborhood of Haifa on April 5, causing partial structural collapse of the upper floors. Four civilians were killed and 22 were wounded. Israeli officials confirmed that the Haifa Arrow battery had attempted to intercept the missile but failed — assessed as a terminal-phase guidance failure of the interceptor rather than evasion by the incoming missile. The attack was the deadliest single Iranian strike on Haifa in the war and prompted renewed public criticism of IDF air defense commanders. The building's residents included Jewish and Arab Israeli families.",
    launchOrigins: [
      { lat: 38.08, lng: 46.29, label: "Tabriz — IRGC Aerospace" },
    ],
    targets: [
      { lat: 32.79, lng: 34.98, label: "Neve Sha'anan residential, Haifa" },
    ],
    munitions: "Ballistic missile — assessed Emad or Kheibar Shekan variant",
    outcome:
      "4 civilians killed, 22 wounded. Partial collapse of 6-story residential building. Arrow battery intercept failed. Deadliest Iranian strike on Haifa in the conflict. Public criticism of IDF air defense performance.",
  },

  {
    id: "apr4-bushehr-mahshahr",
    codename: "Bushehr and Mahshahr Strikes",
    date: "Apr 4, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Explosions at Bushehr Nuclear Plant Auxiliary Building — Mahshahr Petrochemicals Hit",
    description:
      "Explosions struck the auxiliary building of the Bushehr Nuclear Power Plant on April 4 — the only operational nuclear power reactor in Iran, built with Russian assistance. U.S. and Israeli officials stated the strike deliberately avoided the reactor core and primary containment structure; the auxiliary building housed administrative offices, turbine hall support systems, and electrical switching infrastructure. The IAEA expressed alarm and requested immediate access. On the same day, multiple strikes hit the Mahshahr Special Economic and Petrochemical Zone on the Persian Gulf coast, killing at least 5 people and wounding 170 others. Mahshahr is Iran's second-largest petrochemical export hub after South Pars. The strikes ignited large fires in chemical processing areas that burned for over 36 hours.",
    launchOrigins: [
      { lat: 31.0,  lng: 34.5,  label: "Israeli Air Force" },
      { lat: 20.5,  lng: 63.0,  label: "USS CVN strike group — Arabian Sea" },
    ],
    targets: [
      { lat: 28.83, lng: 50.90, label: "Bushehr Nuclear Power Plant — auxiliary building" },
      { lat: 30.55, lng: 49.18, label: "Mahshahr Special Petrochemical Zone" },
    ],
    munitions: "GBU-39 SDB (Bushehr auxiliary); GBU-31 JDAM and AGM-158 JASSM (Mahshahr)",
    outcome:
      "Bushehr NPP auxiliary building damaged — reactor core and primary containment intact. IAEA demanded access. Mahshahr: 5 killed, 170 wounded. Fires burned 36+ hours. Major portion of Mahshahr petrochemical output offline. Iran's remaining hard-currency export revenue further decimated.",
  },

  {
    id: "apr4-hakirya",
    codename: "HaKirya Area Strike",
    date: "Apr 4, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Missile Fragment Strikes Near IDF HaKirya HQ, Tel Aviv",
    description:
      "A missile fragment or intercepted warhead debris struck the vicinity of HaKirya — the Israeli Defense Forces military headquarters complex in central Tel Aviv, housing the IDF General Staff, war room, and senior command elements — on April 4. The Israeli military confirmed the impact was in the vicinity of the base perimeter but declined to provide further details for operational security reasons. No casualties were reported and operations at HaKirya were not disrupted. The incident was nonetheless regarded as a significant symbolic strike, with Iranian state media claiming it as a successful hit on the Israeli military nerve center.",
    launchOrigins: [
      { lat: 32.40, lng: 51.38, label: "Isfahan — central Iran" },
    ],
    targets: [
      { lat: 32.07, lng: 34.80, label: "IDF HaKirya HQ vicinity, Tel Aviv" },
    ],
    munitions: "Ballistic missile (intercept debris / partial penetration assessed)",
    outcome:
      "Impact in HaKirya perimeter vicinity confirmed. No casualties. No operational disruption to IDF command. Iranian state media claimed direct hit on IDF headquarters. IDF disputed claim.",
  },

  {
    id: "apr2-karaj-bridge",
    codename: "Karaj B1 Bridge Strike",
    date: "Apr 2, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "US/Israel Collapse Karaj B1 Bridge — 8 Killed, 95 Wounded",
    description:
      "U.S. and Israeli airstrikes struck and collapsed the Karaj B1 bridge, a major highway overpass and logistics chokepoint on the Tehran–Karaj motorway corridor connecting the Iranian capital to its western industrial suburbs. The bridge carried heavy vehicle traffic including military logistics convoys. The strike occurred during evening rush hour; 8 civilians were killed and 95 were wounded as vehicles on the bridge fell into the collapse. The Karaj motorway is a primary supply route for IRGC facilities west of Tehran. The bridge collapse added to a growing list of destroyed transportation infrastructure across Iran and provoked public anger in Tehran over the civilian casualties.",
    launchOrigins: [
      { lat: 31.0,  lng: 34.5,  label: "Israeli Air Force" },
    ],
    targets: [
      { lat: 35.83, lng: 50.99, label: "Karaj B1 motorway bridge — Tehran–Karaj corridor" },
    ],
    munitions: "GBU-28 bunker buster / GBU-31 JDAM — structural collapse munitions",
    outcome:
      "Bridge collapsed. 8 civilians killed, 95 wounded — most struck during rush hour. Tehran–Karaj motorway severed. Public outcry in Iran over civilian infrastructure targeting.",
  },

  {
    id: "apr2-petah-tikva",
    codename: "Drone Factory Strike",
    date: "Apr 2, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Iranian Missile Hits Israeli Drone Factory in Petah Tikva",
    description:
      "An Iranian ballistic missile struck and damaged an Israeli drone manufacturing facility in the Petah Tikva industrial district east of Tel Aviv on April 2. The factory, operated by an Israeli defense contractor, produces components for the IDF's drone fleet including loitering munitions used extensively in the Lebanon campaign and in retaliatory strikes against Iran. The strike was assessed as deliberate targeting of Israeli defense industrial capacity — a significant escalation from Iran's earlier focus on military bases. Israeli air defenses failed to intercept the incoming missile; investigators assessed that the trajectory and warhead configuration were specifically designed to maximize damage to the industrial building's roof and internal structure.",
    launchOrigins: [
      { lat: 34.35, lng: 46.95, label: "Kermanshah — western Iran" },
    ],
    targets: [
      { lat: 32.09, lng: 34.89, label: "Israeli drone factory, Petah Tikva" },
    ],
    munitions: "Ballistic missile — assessed Khorramshahr-4 variant",
    outcome:
      "Drone manufacturing facility structurally damaged. Production halted for weeks. No casualties confirmed publicly. Israeli defense officials confirmed damage to defense industrial capacity.",
  },

  {
    id: "apr1-beheshti-university",
    codename: "Beheshti University Strike",
    date: "Apr 1, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "US/Israel Strike Shahid Beheshti University and Former US Embassy Museum",
    description:
      "U.S. and Israeli aircraft struck Shahid Beheshti University in northern Tehran on April 1 — one of Iran's premier research universities with strong ties to the nuclear and aerospace programs through faculty and research contracts. Multiple buildings on the campus sustained damage. Separately, in a strike with high symbolic significance, U.S. aircraft hit the former U.S. Embassy building in Tehran — seized during the 1979 hostage crisis and since converted into a museum and IRGC training facility known as the 'Den of Spies.' U.S. officials stated the building was being used as an active IRGC signals intelligence and communications node. The strike destroyed several sections of the compound, which had served as an anti-American symbol for decades.",
    launchOrigins: [
      { lat: 20.5,  lng: 63.0,  label: "USS CVN strike group — Arabian Sea (Tomahawks)" },
      { lat: 31.0,  lng: 34.5,  label: "Israeli Air Force" },
    ],
    targets: [
      { lat: 35.80, lng: 51.44, label: "Shahid Beheshti University, Tehran" },
      { lat: 35.70, lng: 51.41, label: "Former US Embassy / 'Den of Spies' museum, Tehran" },
    ],
    munitions: "Tomahawk Block V (US Embassy strike); Spice-2000 and GBU-39 (Beheshti)",
    outcome:
      "Shahid Beheshti University buildings damaged. Former US Embassy compound struck and partially destroyed. Casualties not confirmed. IRGC signals facility in embassy compound destroyed. Significant symbolic impact — 1979 hostage crisis site hit.",
  },

  {
    id: "apr1-kuwait-airport",
    codename: "Kuwait Airport Fuel Strike",
    date: "Apr 1, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Iranian Drones Strike Kuwait Airport Fuel Facility — Major Fire",
    description:
      "Iranian drones struck the jet fuel storage facility at Kuwait International Airport on April 1, igniting a major fire at multiple fuel tanks. The airport was closed to all commercial and military traffic for 18 hours while Kuwaiti emergency services worked to contain the blaze. The attack represented Iran's continued effort to disrupt Gulf transportation and logistics infrastructure supporting coalition forces. Kuwait Airport serves as an important transit hub for U.S. military logistics, including cargo operations supporting Ali Al Salem and Camp Arifjan. The Kuwaiti civil aviation authority temporarily rerouted all regional traffic through Bahrain and Abu Dhabi.",
    launchOrigins: [
      { lat: 27.18, lng: 56.27, label: "Bandar Abbas — Hormozgan IRGC base" },
    ],
    targets: [
      { lat: 29.23, lng: 47.97, label: "Kuwait International Airport — fuel storage" },
    ],
    munitions: "Shahed-136/238 kamikaze drones",
    outcome:
      "Major fire at fuel storage facility. Kuwait Airport closed 18 hours. No casualties reported (area pre-evacuated). Regional flight traffic rerouted. US military logistics operations disrupted.",
  },

  {
    id: "apr1-bnei-brak-cluster",
    codename: "Cluster Munitions — Bnei Brak",
    date: "Apr 1, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Iran Fires Cluster Munitions at Bnei Brak and Tel Aviv — 14 Injured",
    description:
      "Iran launched multiple missile barrages at the Tel Aviv metropolitan area on April 1, with cluster munitions confirmed impacting the ultra-Orthodox city of Bnei Brak immediately east of Tel Aviv and in Tel Aviv's northern districts. Fourteen people were injured, primarily from submunition fragments scattered across residential streets and markets. The use of cluster munitions in dense urban areas drew sharp international condemnation, including from countries that had remained neutral in the conflict. Iranian cluster munition strikes represented a continuation of the pattern first seen in the Arad attack (March 22), suggesting deliberate policy rather than aberration. Israeli officials called for emergency UN Security Council action; the U.S. separately submitted a draft resolution condemning Iranian cluster munition use.",
    launchOrigins: [
      { lat: 34.35, lng: 46.95, label: "Kermanshah — western Iran" },
      { lat: 32.40, lng: 51.38, label: "Isfahan — central Iran" },
    ],
    targets: [
      { lat: 32.08, lng: 34.83, label: "Bnei Brak — residential / market areas" },
      { lat: 32.09, lng: 34.78, label: "Tel Aviv northern districts" },
    ],
    munitions: "Ballistic missiles with cluster submunition dispensers (Emad or Khorramshahr variant assessed)",
    outcome:
      "14 injured from submunition fragments. Residential streets and market areas in Bnei Brak contaminated with unexploded submunitions. International condemnation of cluster munition use in populated areas. US submitted UN Security Council draft resolution.",
  },

  {
    id: "irgc-naval-commander",
    codename: "Strike on Tangsiri",
    date: "Mar 26, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "IRGC Naval Commander Tangsiri Killed",
    description:
      "Israeli airstrikes targeted and killed Rear Admiral Alireza Tangsiri, commander of the IRGC Navy, in a strike assessed to have used precision-guided munitions on an IRGC naval command facility near Bandar Abbas on the Strait of Hormuz. Tangsiri had overseen Iran's asymmetric naval harassment campaign against commercial shipping in the Gulf of Oman and Arabian Sea throughout the war, including the deployment of naval mines and fast-attack craft targeting tankers. His death marked the highest-ranking IRGC naval officer killed in the conflict. Iran responded within hours with a salvo of ballistic missiles targeting Haifa and Tel Aviv-area military installations, as well as intensified drone attacks against Al Udeid Air Base in Qatar and NSA Bahrain.",
    launchOrigins: [
      { lat: 27.18, lng: 56.27, label: "Bandar Abbas / IRGC Naval HQ" },
      { lat: 32.07, lng: 34.78, label: "Israeli Air Force — Tel Aviv region" },
    ],
    targets: [
      { lat: 27.18, lng: 56.27, label: "IRGC Naval Command, Bandar Abbas" },
      { lat: 32.79, lng: 34.98, label: "Haifa military installations" },
      { lat: 26.24, lng: 50.52, label: "NSA Bahrain (5th Fleet)" },
      { lat: 25.12, lng: 51.32, label: "Al Udeid Air Base, Qatar" },
    ],
    munitions:
      "Israeli: precision-guided munitions (GBU-39 SDB or Spice-250 assessed); Iranian retaliation: Fateh-313 and Emad ballistic missiles, Shahed-238 drones",
    outcome:
      "Tangsiri killed. IRGC Navy's senior command structure severely degraded (following the destruction of most surface combatants on Day 6). Iranian retaliatory salvo caused damage at Haifa port infrastructure; one Haifa refinery fire suppressed after 6 hours. Al Udeid runway briefly closed.",
  },

  {
    id: "mar29-oman-sohar",
    codename: "Sohar Industrial Strike",
    date: "Mar 29, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Drone Attack on Sohar Industrial Area, Oman — 2 Killed",
    description:
      "A drone attack struck the Awahi Industrial Area in Sohar, Oman, killing 2 people and injuring 11 others. Port installations in Salalah in southern Oman were also hit by 2 drones in a separate simultaneous attack. Oman — which had until this point been acting as a back-channel for ceasefire diplomacy between Iran and Western parties, and which Iran had previously signaled it would not target — denied Iranian responsibility without naming an alternative perpetrator. Iran also denied responsibility. The strikes were the most serious attacks on Omani territory since the conflict began and put significant pressure on Oman's position as a neutral diplomatic interlocutor. Sources: Al Jazeera, Alma Research Center.",
    launchOrigins: [
      { lat: 32.40, lng: 51.38, label: "Central Iran — IRGC Aerospace (denied)" },
    ],
    targets: [
      { lat: 24.36, lng: 56.73, label: "Awahi Industrial Area, Sohar, Oman — 2 killed" },
      { lat: 17.02, lng: 54.09, label: "Port installations, Salalah, Oman" },
    ],
    munitions: "Drone (type unconfirmed — assessed Shahed-type; Iran denied responsibility)",
    outcome:
      "2 killed, 11 injured at Sohar industrial area. Salalah port installations hit by 2 drones. Iran denied responsibility. Oman's role as ceasefire mediator placed under severe pressure. Sources: Al Jazeera, Alma Research Center.",
  },

  {
    id: "mar29-kuwait-desal",
    codename: "Kuwait Desalination Strike",
    date: "Mar 29, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Iranian Strike on Kuwait Desalination Plant — 1 Worker Killed",
    description:
      "An Iranian drone or missile struck a water desalination plant in Kuwait, damaging a service building and killing one worker. Kuwait reported that 13 drones had entered Kuwaiti airspace in the 24 hours prior to the strike. The attack on Kuwait's water infrastructure — a critical vulnerability given the country's near-total dependence on desalinated water — followed Iran's strike on Bahrain's desalination plant on March 7 and reflected a deliberate pattern of targeting Gulf states' water security. Kuwaiti officials condemned the attack and activated emergency water rationing protocols as a precaution. Sources: Understanding War (ISW).",
    launchOrigins: [
      { lat: 32.40, lng: 51.38, label: "Central Iran — IRGC Aerospace" },
    ],
    targets: [
      { lat: 29.34, lng: 47.98, label: "Water desalination plant, Kuwait" },
    ],
    munitions: "Drone or short-range ballistic missile (type unconfirmed)",
    outcome:
      "1 worker killed. Desalination plant service building damaged. Kuwait reported 13 drones in airspace in prior 24 hours. Emergency water rationing protocols activated. Sources: Understanding War (ISW).",
  },

  {
    id: "mar28-houthis-enter",
    codename: "Houthis — First Strikes",
    date: "Mar 28, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Houthis Enter War — Missiles at Beersheba & Eilat",
    description:
      "Yemen's Houthi movement launched its first strikes of the 2026 war on March 28, firing a ballistic missile toward Beersheba in southern Israel followed by a second missile and drone toward Eilat on the Red Sea coast. One incoming missile was intercepted over the Red Sea. The Houthis vowed to continue attacks 'until the aggression on all resistance fronts stops,' framing their entry as solidarity with Iran and the broader 'axis of resistance.' The United States responded by deploying 2,500 Marines from the 31st Marine Expeditionary Unit to the region. The Houthi entry into the conflict opened a third front against Israel — in addition to Iran's direct fire and Hezbollah's Lebanese front — further stressing Israeli air defense resources. Sources: Al Jazeera, Anadolu Agency.",
    launchOrigins: [
      { lat: 15.35, lng: 44.21, label: "Yemen — Houthi launch sites" },
    ],
    targets: [
      { lat: 31.25, lng: 34.79, label: "Beersheba, southern Israel" },
      { lat: 29.56, lng: 34.95, label: "Eilat, Red Sea coast" },
    ],
    munitions: "Ballistic missile and drone (Houthi Burkan-3 / Zulfiqar variants assessed)",
    outcome:
      "1 missile intercepted over Red Sea. No Israeli casualties. Houthis vowed continued strikes. 2,500 US Marines from 31st MEU deployed to region. Third front against Israel opened alongside Iran and Hezbollah. Sources: Al Jazeera, Anadolu Agency.",
  },

  {
    id: "mar28-bahrain-bapco",
    codename: "Bahrain BAPCO & ALBA Strikes",
    date: "Mar 28, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Iran Strikes Bahrain BAPCO Energy Facilities & ALBA Plant",
    description:
      "Iran launched 20 missiles and 23 UAVs at Bahrain in a single day on March 28, one of the highest single-day attack volumes against the island kingdom in the war. The IRGC formally announced it had targeted the BAPCO (Bahrain Petroleum Company) energy facilities and the ALBA (Aluminium Bahrain) aluminum smelting plant — one of the largest in the world — using missiles and UAVs. BAPCO's refinery is critical to Bahrain's oil exports. The ALBA plant produces approximately 1.5 million tonnes of aluminum per year and is a major source of Bahraini export revenue. The attacks caused infrastructure damage at both facilities. Sources: Alma Research Center.",
    launchOrigins: [
      { lat: 32.40, lng: 51.38, label: "Central Iran — IRGC Aerospace" },
    ],
    targets: [
      { lat: 26.15, lng: 50.53, label: "BAPCO oil refinery, Bahrain" },
      { lat: 26.00, lng: 50.55, label: "ALBA aluminum plant, Bahrain" },
    ],
    munitions: "Fateh-313 ballistic missiles, Shahed-136/238 UAVs",
    outcome:
      "20 missiles and 23 UAVs launched at Bahrain. BAPCO refinery and ALBA aluminum plant struck. Infrastructure damage at both facilities. Sources: Alma Research Center.",
  },

  {
    id: "mar28-university-haftgel",
    codename: "University of Science & Haftgel",
    date: "Mar 28, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Iran University of Science & Technology & Haftgel Water Reservoir Struck",
    description:
      "Joint U.S.-Israeli strikes damaged the Iran University of Science and Technology in Tehran, one of the country's leading technical universities and a significant source of engineering talent for Iran's defense-industrial base. The IRGC responded with an explicit threat to target Israeli and U.S. universities across the region in retaliation. Separately, a water reservoir in Haftgel, Khuzestan province, was struck — continuing the pattern of targeting civilian water infrastructure to create humanitarian pressure. CENTCOM announced publicly that U.S. forces had struck over 11,000 targets in Iran since the start of operations on February 28, providing the first official cumulative strike total of the campaign. A residential building in Zanjan was also struck, killing 5 civilians. Sources: Al Jazeera.",
    launchOrigins: [
      { lat: 31.0,  lng: 34.5,  label: "Israeli Air Force" },
      { lat: 20.5,  lng: 63.0,  label: "USS CVN strike group — Arabian Sea" },
    ],
    targets: [
      { lat: 35.74, lng: 51.35, label: "Iran University of Science & Technology, Tehran" },
      { lat: 31.45, lng: 49.56, label: "Haftgel water reservoir, Khuzestan province" },
      { lat: 36.68, lng: 48.49, label: "Residential building, Zanjan — 5 killed" },
    ],
    munitions: "AGM-158 JASSM-ER, GBU-39 SDB (assessed)",
    outcome:
      "Iran University of Science & Technology damaged. IRGC threatened Israeli and US universities in retaliation. Haftgel water reservoir struck. 5 killed in Zanjan residential building. CENTCOM: 11,000+ targets struck in Iran since Feb 28. Sources: Al Jazeera.",
  },

  {
    id: "mar27-prince-sultan",
    codename: "Prince Sultan Air Base Strike",
    date: "Mar 27, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Prince Sultan Air Base Struck — 15+ US Wounded, E-3 Sentry Damaged",
    description:
      "Iranian missiles and drones struck Prince Sultan Air Base in Saudi Arabia — a key hub for U.S. air refueling and strategic bomber operations — damaging several U.S. aerial refueling aircraft and injuring at least 15 U.S. soldiers, five of them critically. An E-3 Sentry airborne early warning and control aircraft was also damaged in the strike, described by analysts as a 'serious blow to U.S. surveillance capabilities' given the aircraft's critical role in managing airspace over the complex multi-front campaign. The strike came one day after President Trump had publicly declared that Iran's military had been 'neutralized.' Saudi Arabia protested the use of its territory as a strike vector by Iran and convened an emergency security council session. Sources: Al Jazeera, Wall Street Journal, Alma Research Center.",
    launchOrigins: [
      { lat: 32.40, lng: 51.38, label: "Central Iran — IRGC Aerospace" },
    ],
    targets: [
      { lat: 24.06, lng: 47.58, label: "Prince Sultan Air Base, Saudi Arabia" },
    ],
    munitions: "Zolfaghar ballistic missiles, Shahed-238 drones",
    outcome:
      "15+ US soldiers wounded (5 critically). Multiple US refueling aircraft damaged. E-3 Sentry AWACS damaged — serious blow to US surveillance. Strike came 1 day after Trump declared Iran 'neutralized.' Saudi Arabia emergency security council session. Sources: Al Jazeera, Wall Street Journal, Alma Research Center.",
  },

  {
    id: "mar27-arak-ardakan",
    codename: "Arak & Ardakan Nuclear Strikes",
    date: "Mar 27, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Arak Heavy Water Complex & Ardakan Yellowcake Plant Hit",
    description:
      "Israeli airstrikes were confirmed to have damaged the Shahid Khondab Heavy Water Complex in Arak — Iran's research reactor facility used in plutonium-related R&D — and the Ardakan yellowcake production plant in Yazd Province, which processes uranium ore into yellowcake (uranium oxide) as the first stage of nuclear fuel production. Both facilities are safeguarded under IAEA agreements. The strikes expanded the nuclear infrastructure target set beyond Natanz and Fordow to include upstream fuel cycle facilities. On the same day, the United States began flying B-52 Stratofortress bombers over Iranian territory for the first time in the conflict — a highly symbolic demonstration of air supremacy that had been withheld until this point. Sources: Al Jazeera, GlobalSecurity.",
    launchOrigins: [
      { lat: 31.0,  lng: 34.5,  label: "Israeli Air Force" },
    ],
    targets: [
      { lat: 34.38, lng: 49.24, label: "Shahid Khondab Heavy Water Complex, Arak" },
      { lat: 32.30, lng: 54.02, label: "Ardakan yellowcake production plant, Yazd province" },
    ],
    munitions: "GBU-28 bunker buster, Spice-2000 (assessed)",
    outcome:
      "Arak heavy water complex damaged. Ardakan yellowcake plant struck — upstream nuclear fuel cycle disrupted. IAEA safeguarded facilities targeted. US flew B-52s over Iranian territory for first time — demonstrating full air supremacy. Sources: Al Jazeera, GlobalSecurity.",
  },

  {
    id: "mar27-hormuz-closed",
    codename: "Hormuz Formal Closure",
    date: "Mar 27, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "IRGC Formally Closes Strait of Hormuz to US/Allied Shipping",
    description:
      "The IRGC formally announced the closure of the Strait of Hormuz to any vessel travelling to or from ports of the United States, Israel, and their allies. Iranian naval forces turned away 3 container ships attempting to transit and blocked 2 Chinese vessels, demonstrating a willingness to enforce the closure even against nominally neutral parties. Iran stated it would allow passage to vessels from China, Russia, India, Iraq, and Pakistan. Approximately 2,000 vessels and 20,000 seafarers were reported stranded in the Persian Gulf and approaches, unable to proceed either through the strait or back to their origin ports under commercial insurance coverage. The formal closure — as opposed to the de facto suppression of shipping through attacks since February 28 — represented a significant escalation and triggered emergency energy consultations at the G7. Sources: Al Jazeera.",
    launchOrigins: [],
    targets: [
      { lat: 26.57, lng: 56.25, label: "Strait of Hormuz — formal closure zone" },
    ],
    munitions: "N/A — naval blockade enforcement and diplomatic declaration",
    outcome:
      "Strait of Hormuz formally closed to US/Israeli/allied shipping. 3 container ships turned away; 2 Chinese vessels blocked. ~2,000 vessels and 20,000 seafarers stranded. Only Chinese, Russian, Indian, Iraqi, Pakistani ships allowed through. G7 emergency energy consultations triggered. Sources: Al Jazeera.",
  },

  {
    id: "mar27-tel-aviv-civilian",
    codename: "Tel Aviv Civilian Killed",
    date: "Mar 27, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Iranian Missile Kills Civilian in Tel Aviv",
    description:
      "An Iranian ballistic missile struck Tel Aviv, killing one Israeli civilian in the impact zone. Additional missile impacts were recorded in Rosh HaAyin and the Beit Shemesh area, injuring 3 people. A separate strike also hit Eilat on the Red Sea coast. The Tel Aviv fatality raised the cumulative Israeli civilian death toll. Iran had by this point demonstrated a persistent ability to penetrate Israeli air defenses with individual missiles despite the massive attrition of its launch infrastructure, as surviving mobile launcher crews adapted their tactics to exploit seams in Israeli and U.S. multi-layered defense coverage. Sources: Alma Research Center.",
    launchOrigins: [
      { lat: 33.5,  lng: 52.0,  label: "Central Iran — IRGC Aerospace" },
    ],
    targets: [
      { lat: 32.09, lng: 34.78, label: "Tel Aviv — civilian strike" },
      { lat: 32.09, lng: 34.96, label: "Rosh HaAyin — 3 injured" },
      { lat: 31.75, lng: 35.00, label: "Beit Shemesh area" },
      { lat: 29.56, lng: 34.95, label: "Eilat" },
    ],
    munitions: "Khorramshahr-4 or Kheibar Shekan ballistic missile (assessed)",
    outcome:
      "1 Israeli civilian killed in Tel Aviv. 3 injured in Rosh HaAyin and Beit Shemesh area. Eilat also struck. Iranian ability to penetrate Israeli air defenses persists despite massive attrition of launch infrastructure. Sources: Alma Research Center.",
  },

  {
    id: "mar24-gulf-intercepts",
    codename: "Gulf-Wide Intercept Surge",
    date: "Mar 24, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Bahrain Intercepts 153 Missiles & 301 Drones — UAE Contractor Killed",
    description:
      "Bahrain's Ministry of Defence reported a cumulative total of 153 missiles and 301 drones intercepted since the start of the war — among the highest per-capita air defense loads of any country in the conflict. A Moroccan military contractor embedded with UAE armed forces was killed in Bahrain in an Iranian attack, becoming one of the few non-GCC foreign nationals killed in Gulf-state strikes. Saudi Arabia intercepted approximately 20 drones targeting the Eastern Province, home to the country's oil infrastructure. Kuwait sounded air raid alarms 7 times in a single night. Iran's Red Crescent Society reported that over 82,000 civilian structures across Iran had been damaged or destroyed since February 28, underscoring the scale of the humanitarian impact on both sides of the conflict. Sources: Al Jazeera.",
    launchOrigins: [
      { lat: 32.40, lng: 51.38, label: "Central Iran — IRGC Aerospace" },
      { lat: 27.18, lng: 56.27, label: "Bandar Abbas / Hormozgan" },
    ],
    targets: [
      { lat: 26.23, lng: 50.59, label: "Bahrain — 153 missiles, 301 drones intercepted cumulative" },
      { lat: 26.35, lng: 50.10, label: "Saudi Eastern Province — ~20 drones intercepted" },
      { lat: 29.35, lng: 47.52, label: "Kuwait — 7 air raid alerts in one night" },
    ],
    munitions: "Fateh-313 and Zolfaghar ballistic missiles, Shahed-136/238 drones",
    outcome:
      "Bahrain cumulative: 153 missiles and 301 drones intercepted. Moroccan UAE contractor killed in Bahrain. Saudi Eastern Province: ~20 drones intercepted. Kuwait: 7 alarms in one night. Iran Red Crescent: 82,000+ civilian structures damaged or destroyed in Iran. Sources: Al Jazeera.",
  },

  {
    id: "mar24-steelworks",
    codename: "Economic Infrastructure Strikes",
    date: "Mar 24, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "US/Israel Shifts to Economic Targets — Major Steelworks Hit",
    description:
      "The U.S.-Israeli campaign shifted toward systematic degradation of Iran's economic base by late March, with strikes on major steelworks and industrial facilities beyond the initial military and nuclear target set. By this point, cumulative strikes had reached into the thousands across Iran. HRANA reported that over 80% of Iran's air defense network had been destroyed, enabling near-unrestricted strike access to any target in the country. The shift to economic targeting — including steel, aluminum, and industrial production facilities — reflected a strategy of accelerating Iran's economic collapse to compel a ceasefire agreement. Civilian casualties in residential areas overlapping with industrial zones continued to accumulate. Sources: HRANA.",
    launchOrigins: [
      { lat: 31.0,  lng: 34.5,  label: "Israeli Air Force" },
      { lat: 20.5,  lng: 63.0,  label: "USS CVN strike group — Arabian Sea" },
    ],
    targets: [
      { lat: 32.65, lng: 51.67, label: "Major steelworks, Isfahan province" },
    ],
    munitions: "GBU-39 SDB, AGM-158 JASSM-ER, Spice-2000 (assessed)",
    outcome:
      "Major steelworks struck. Campaign shifted to economic base targeting. Cumulative strikes reached thousands. HRANA: 80%+ of Iran's air defense destroyed. Civilian casualties in overlapping residential areas. Sources: HRANA.",
  },

  {
    id: "mar22-unprecedented-tehran",
    codename: "Tehran — Unprecedented Wave",
    date: "Mar 22, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "'Unprecedented' Wave of Strikes on Eastern Tehran",
    description:
      "Israel and the United States launched what Al Jazeera's Tehran correspondent described as 'unprecedented' strikes on Tehran, with the eastern side of the capital bearing the brunt of the heaviest bombardment since the war began. The Al Jazeera correspondent on the ground reported that the size and volume of explosions heard and felt across the city were the largest of the entire war to that point. Iranian air defense systems were observed activating against U.S. and Israeli drones in Iranian airspace in a continuous response throughout the night. Iran's cumulative death toll surpassed 1,500, with UNICEF and UN agencies continuing to document civilian casualties. Sources: Al Jazeera.",
    launchOrigins: [
      { lat: 31.0,  lng: 34.5,  label: "Israeli Air Force" },
      { lat: 20.5,  lng: 63.0,  label: "USS CVN strike group — Arabian Sea" },
      { lat: -7.32, lng: 72.42, label: "Diego Garcia — B-2 Spirit" },
    ],
    targets: [
      { lat: 35.71, lng: 51.45, label: "Eastern Tehran — government and military infrastructure" },
    ],
    munitions: "GBU-57 MOP (B-2), GBU-31 JDAM, Spice-2000, JASSM-ER",
    outcome:
      "Heaviest bombardment of Tehran to date — Al Jazeera called strikes 'unprecedented.' Eastern Tehran hardest hit. Iranian air defenses activated throughout night. Cumulative Iranian death toll surpassed 1,500. Sources: Al Jazeera.",
  },

  {
    id: "mar22-riyadh-missiles",
    codename: "Riyadh Ballistic Missile Strike",
    date: "Mar 22, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Iran Fires Ballistic Missiles at Riyadh",
    description:
      "Iran launched two ballistic missiles at Riyadh, the Saudi capital. One was intercepted by Saudi air defenses; the second fell in an uninhabited area outside the city without causing casualties. Saudi Arabia responded by declaring Iranian diplomatic staff — including the military attaché — persona non grata and ordering them to leave the kingdom within 24 hours, effectively severing what remained of diplomatic relations. Qatar had taken the same action earlier in the week. The diplomatic expulsions significantly reduced Iran's ability to conduct intelligence collection and back-channel signaling through Gulf state diplomatic posts. Sources: Al Jazeera.",
    launchOrigins: [
      { lat: 34.35, lng: 46.95, label: "Kermanshah — IRGC Aerospace" },
    ],
    targets: [
      { lat: 24.71, lng: 46.68, label: "Riyadh, Saudi Arabia — 1 intercepted, 1 uninhabited area" },
    ],
    munitions: "Zolfaghar or Khorramshahr-4 ballistic missiles (assessed)",
    outcome:
      "1 missile intercepted; 1 fell in uninhabited area. No casualties. Saudi Arabia expelled Iranian military attaché and diplomats within 24 hours. Qatar had done the same earlier. Sources: Al Jazeera.",
  },

  {
    id: "mar22-cluster-telaviv",
    codename: "Tel Aviv Metro Cluster Strike",
    date: "Mar 22, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Cluster Munitions Hit Jaffa, Petah Tikva, Bat Yam, Holon",
    description:
      "At least three Iranian ballistic missiles carrying cluster munition warheads impacted across the Tel Aviv metropolitan area, striking the densely populated cities of Jaffa, Petah Tikva, Bat Yam, and Holon. The cluster warheads scattered submunitions over wide urban areas, maximizing damage in civilian zones. Israeli authorities canceled schools across the country in response. The attacks added to growing criticism of Iran's use of cluster munitions in populated areas. Sources: Understanding War (ISW).",
    launchOrigins: [
      { lat: 32.40, lng: 51.38, label: "Central Iran — IRGC Aerospace" },
    ],
    targets: [
      { lat: 32.06, lng: 34.76, label: "Jaffa, Tel Aviv" },
      { lat: 32.08, lng: 34.88, label: "Petah Tikva" },
      { lat: 32.02, lng: 34.75, label: "Bat Yam" },
      { lat: 32.01, lng: 34.77, label: "Holon" },
    ],
    munitions: "Ballistic missiles with cluster munition warheads (submunition-dispensing)",
    outcome:
      "Cluster munitions struck Jaffa, Petah Tikva, Bat Yam, and Holon. Schools canceled across Israel. Injuries reported. Iran's use of cluster munitions in dense civilian areas condemned. Sources: Understanding War (ISW).",
  },

  {
    id: "mar22-hezbollah-record",
    codename: "Hezbollah — 85 Attack Waves",
    date: "Mar 22, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Hezbollah Record 85 Attack Waves — Highest Day of War",
    description:
      "Hezbollah launched 85 separate attack waves against Israel on March 22 — the highest single-day total of the entire war from the Lebanese front. The waves included rockets, ballistic and guided missiles, and 18 UAV attack waves targeting northern Israeli towns, IDF positions in the Galilee, and military infrastructure along the southern Lebanon border. One drone landed in an open area near the Sea of Galilee. The volume of attacks exceeded Hezbollah's previous single-day record from the 2024 Lebanon war and stretched Israeli air defense networks covering both the Lebanese and Iranian fronts simultaneously. Tens of thousands of northern Israeli residents remained displaced from their communities due to the sustained Hezbollah fire. Sources: Understanding War (ISW), Critical Threats.",
    launchOrigins: [
      { lat: 33.27, lng: 35.21, label: "Southern Lebanon — Hezbollah" },
      { lat: 33.54, lng: 35.68, label: "Bekaa Valley — Hezbollah" },
    ],
    targets: [
      { lat: 33.00, lng: 35.50, label: "Northern Israel — Galilee communities and IDF positions" },
      { lat: 32.83, lng: 35.57, label: "Sea of Galilee area — drone landing" },
    ],
    munitions: "Rockets (Katyusha/Grad), Fateh-110 guided missiles, Shahed-type UAVs, Kornet ATGMs",
    outcome:
      "85 attack waves — record high for Hezbollah in the conflict. 18 UAV waves. Drone landed near Sea of Galilee. Northern Israeli population remains largely displaced. Israeli air defenses stretched across Lebanese and Iranian fronts. Sources: Understanding War (ISW), Critical Threats.",
  },

  {
    id: "arad-dimona",
    codename: "Operation Shadow Strike",
    date: "Mar 21, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Arad / Dimona Cluster Munition Strikes",
    description:
      "Iran launched a precision ballistic missile strike at the Negev Desert region of southern Israel, with missiles impacting in and around the towns of Arad and Dimona — the latter located approximately 13 km from the Shimon Peres Negev Nuclear Research Center (Dimona nuclear reactor). Iranian state media claimed the strike was a deliberate 'warning shot' against Israel's nuclear infrastructure. Israeli emergency responders confirmed that at least one warhead dispensed cluster submunitions over a residential area of Arad, injuring 180+ civilians. Structural damage was confirmed at several apartment blocks. Some incoming missiles were not intercepted — Israeli officials attributed partial defense failure to a combination of depleted interceptor stocks and deliberate saturation tactics.",
    launchOrigins: [
      { lat: 33.5, lng: 52.0, label: "Central Iran launch zone" },
    ],
    targets: [
      { lat: 31.26, lng: 35.21, label: "Arad, Negev" },
      { lat: 31.07, lng: 35.04, label: "Dimona / Negev NRC vicinity" },
    ],
    munitions:
      "Ballistic missiles assessed as Emad or Khorramshahr variant; cluster submunition payload confirmed in at least one warhead",
    outcome:
      "180+ civilians wounded in Arad. Significant structural damage to residential areas. 2–3 missiles impacted target areas despite Israeli intercept attempts. International condemnation for use of cluster munitions in populated areas. U.S. formally protested the cluster munition use.",
  },

  {
    id: "mar21-natanz-bunkerbuster",
    codename: "Natanz — Bunker Buster Strike",
    date: "Mar 21, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Natanz Nuclear Facility Struck with Bunker Busters",
    description:
      "U.S. and Israeli forces struck the Natanz Nuclear Enrichment Facility — Iran's primary uranium enrichment complex — using GBU-57 Massive Ordnance Penetrator bunker buster bombs delivered by B-2 Spirit stealth bombers from Diego Garcia. The IAEA confirmed damage to entrance buildings and a partial collapse of access shafts to the underground centrifuge halls. The agency's director-general stated that monitoring equipment had been destroyed and that inspectors could not rule out radiation contamination without on-site access. Russia condemned the strike as a 'gross violation of international law and the Nuclear Non-Proliferation Treaty.' Iran retaliated within hours with cluster munition strikes on the Arad and Dimona areas of the Negev, which Iran described as a warning against Israeli nuclear infrastructure. Sources: Euronews, NPR, IAEA.",
    launchOrigins: [
      { lat: -7.32, lng: 72.42, label: "Diego Garcia — B-2 Spirit" },
      { lat: 31.0,  lng: 34.5,  label: "Israeli Air Force" },
    ],
    targets: [
      { lat: 33.72, lng: 51.73, label: "Natanz Nuclear Enrichment Facility, Isfahan province" },
    ],
    munitions: "GBU-57 Massive Ordnance Penetrator (30,000 lb), delivered by B-2 Spirit",
    outcome:
      "Entrance buildings and access shafts damaged; partial collapse of underground centrifuge hall approaches confirmed by IAEA. Monitoring equipment destroyed; radiation contamination could not be ruled out without access. Russia condemned as violation of international law and NPT. Iran retaliated with strikes on Arad/Dimona. Sources: Euronews, NPR, IAEA.",
  },

  {
    id: "mar21-mina-ahmadi",
    codename: "Mina al-Ahmadi Drone Strike",
    date: "Mar 21, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Iranian Drones Hit Kuwait's Mina al-Ahmadi Refinery",
    description:
      "Two waves of Iranian drones struck Kuwait's Mina al-Ahmadi refinery complex, the country's primary oil export terminal with a processing capacity of approximately 730,000 barrels per day. The attack sparked fires in the crude storage area and forced a temporary shutdown of export operations. Iran framed the strike as retaliation for Kuwait allowing U.S. and Israeli military logistics through its territory. Part of Iran's escalated energy infrastructure campaign following Israeli South Pars strikes. Kuwait scrambled Patriot batteries but intercepted only a portion of the incoming drones. Sources: Reuters, Al Jazeera, Kuwait MOCI.",
    launchOrigins: [{ lat: 30.5, lng: 47.8, label: "IRGC — southern Iran" }],
    targets: [{ lat: 29.0614, lng: 48.1528, label: "Mina al-Ahmadi Refinery, Kuwait" }],
    munitions: "Shahed-136 loitering munitions (est. 14–18 drones)",
    outcome:
      "Fires in crude storage area; export operations halted for 38 hours. Approximately 4 Kuwaiti workers injured. Kuwait summoned Iranian chargé d'affaires; GCC emergency session convened. Oil markets spiked 4% on news. Sources: Reuters, Al Jazeera, Kuwait MOCI.",
  },

  {
    id: "diego-garcia",
    codename: "Operation Distant Thunder",
    date: "Mar 20, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Diego Garcia IRBM Strike Attempt",
    description:
      "Iran attempted the farthest ballistic missile strike in history, firing two IRBM-class missiles (assessed as Sejjil-3 variants or an as-yet-undesignated IRBM with ~4,000 km range) at the joint U.S.-UK military base on Diego Garcia, a coral atoll in the British Indian Ocean Territory approximately 3,900 km from the Iranian coast. The strike targeted B-2 stealth bombers and B-52s that had been conducting sustained strike operations against Iran from Diego Garcia throughout the war. The missiles were tracked from launch at Semnan by U.S. space-based infrared sensors (SBIRS) and a forward-deployed AN/TPY-2 radar network. One missile experienced an in-flight failure approximately 800 km after launch; the second was intercepted by a U.S. Navy SM-3 Block IIA fired from USS Gravely in the Arabian Sea.",
    launchOrigins: [
      { lat: 35.56, lng: 53.39, label: "Semnan Launch Complex" },
    ],
    targets: [
      { lat: -7.32, lng: 72.42, label: "Diego Garcia (BIOT)" },
    ],
    munitions: "2 × Sejjil-3 / IRBM variant (~4,000 km assessed range)",
    outcome:
      "Both missiles failed to reach target — one in-flight failure, one intercepted by USS Gravely SM-3 Block IIA. No damage to Diego Garcia. Marked Iran's longest-range strike attempt ever and demonstrated IRBM operational capability exceeding previous publicly acknowledged ranges.",
  },

  {
    id: "mar20-pmf-salahadin",
    codename: "PMF Salah al-Din Strikes",
    date: "Mar 20, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Strikes on 52nd PMF Brigade in Salah al-Din & Anbar",
    description:
      "U.S. and Israeli forces struck the 52nd Popular Mobilization Forces Brigade base in Salah al-Din province, killing at least one PMF member and wounding others. Additional strikes hit PMF-affiliated positions in Anbar province in western Iraq. The operations were part of the ongoing campaign to suppress Iranian proxy forces capable of conducting attacks on U.S. bases and supply lines in Iraq. The Iraqi government again formally protested the unauthorized strikes on its territory. The 52nd Brigade, affiliated with Badr Organization-linked Hashd factions, had been providing logistical support to IRGC operations. Sources: Understanding War (ISW).",
    launchOrigins: [
      { lat: 31.0,  lng: 34.5,  label: "Israeli Air Force" },
      { lat: 20.5,  lng: 63.0,  label: "USS CVN strike group — Arabian Sea" },
    ],
    targets: [
      { lat: 34.36, lng: 43.49, label: "52nd PMF Brigade base, Salah al-Din province" },
      { lat: 33.34, lng: 41.93, label: "PMF positions, Anbar province" },
    ],
    munitions: "AGM-158 JASSM-ER, GBU-39 SDB (assessed)",
    outcome:
      "At least 1 PMF member killed. 52nd Brigade base and Anbar positions struck. Iraqi government issued formal protest condemning unauthorized strikes on Iraqi territory. Sources: Understanding War (ISW).",
  },

  {
    id: "mar19-haifa-bazan",
    codename: "BAZAN Refinery Strike",
    date: "Mar 19, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "BAZAN Refinery in Haifa Hit — Iran Targets Israeli Oil",
    description:
      "Iranian army drones and missiles struck the BAZAN Group oil refinery complex in Haifa in retaliation for Israeli attacks on the South Pars gas field. The BAZAN refinery is Israel's largest oil refinery, processing approximately 9.8 million tonnes of crude per year. Israeli Energy Minister Eli Cohen said that damage was minor and that refinery operations were not significantly disrupted. On the same day, a U.S. F-35 made an emergency landing at a regional base after reportedly sustaining damage assessed as possibly caused by Iranian forces — either a surface-to-air missile or drone collision. The emergency landing was the first reported combat damage to an F-35 in the conflict. Sources: Al Jazeera, Alma Research Center, PBS.",
    launchOrigins: [
      { lat: 32.40, lng: 51.38, label: "Central Iran — Iranian Army UAV Command" },
    ],
    targets: [
      { lat: 32.79, lng: 35.01, label: "BAZAN Group oil refinery, Haifa, Israel" },
    ],
    munitions: "Iranian army drones, Fateh-110 or Zolfaghar ballistic missiles (assessed)",
    outcome:
      "BAZAN refinery struck; damage assessed as minor by Israeli Energy Minister. Refinery operations not significantly disrupted. US F-35 made emergency landing — first reported combat damage to an F-35 in the conflict. Sources: Al Jazeera, Alma Research Center, PBS.",
  },

  {
    id: "south-pars",
    codename: "Operation Black Tide",
    date: "Mar 18, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "South Pars Gas Field / Qatar LNG Strikes",
    description:
      "Israel, with U.S. coordination, struck the South Pars gas field and associated onshore refineries at Asaluyeh in the Persian Gulf — Iran's largest energy asset accounting for roughly 40% of its gas production. The strikes used precision-guided munitions delivered by F-35Is and B-2s operating from Diego Garcia. Iran retaliated within hours by firing ballistic missiles and armed Shahed drones at Qatar's North Field LNG production and processing facilities at Ras Laffan — the world's largest natural gas field, shared between Qatar and Iran. The attack caused fires at two LNG processing trains and a brief suspension of LNG exports. This marked a significant escalation: both sides were now targeting energy infrastructure critical to global markets, with LNG spot prices spiking 60% in 48 hours.",
    launchOrigins: [
      { lat: 31.0, lng: 34.5, label: "Israeli Air Force — Negev bases" },
      { lat: 27.5, lng: 52.5, label: "IRGC Aerospace — southern Iran" },
    ],
    targets: [
      { lat: 27.0, lng: 52.0, label: "South Pars gas field / Asaluyeh" },
      { lat: 25.3, lng: 51.5, label: "Qatar North Field LNG / Ras Laffan" },
    ],
    munitions:
      "Israeli/U.S.: GBU-39, JDAM-ER, AGM-158 JASSM-ER, cruise missiles; Iranian retaliation: Fateh-110, Zolfaghar ballistic missiles, Shahed-238 drones",
    outcome:
      "South Pars production severely degraded; Iranian gas output fell ~35%. Fires at Qatar's Ras Laffan; two LNG processing trains offline for weeks. Global LNG spot prices up 60%. Iranian retaliatory strikes on South Pars also damaged Iranian-operated production infrastructure — a significant self-inflicted blow.",
  },

  {
    id: "mar18-khatib-caspian",
    codename: "Khatib Killed — Caspian Strikes",
    date: "Mar 18, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Intelligence Minister Khatib Killed — First Caspian Sea Strikes",
    description:
      "Israel assassinated Iranian Intelligence Minister Esmaeil Khatib in overnight airstrikes on Tehran, eliminating the head of Iran's Ministry of Intelligence and Security (MOIS) — the primary civilian intelligence apparatus responsible for foreign espionage, counterintelligence, and domestic surveillance. The strike represented a significant blow to Iran's intelligence-gathering and counterespionage capability at a critical juncture in the war. On the same day, Israel conducted the first strikes on the Caspian Sea coast, targeting five Iranian Navy missile boats, a naval headquarters facility, and a shipyard at Bandar Anzali on the southern Caspian. The Bandar Anzali strikes were aimed at threatening the Russia-Iran weapons and logistics traffic route across the Caspian, through which Iranian drones and Russian arms had been transiting. Sources: Al Jazeera, Alma Research Center.",
    launchOrigins: [
      { lat: 31.0,  lng: 34.5,  label: "Israeli Air Force" },
    ],
    targets: [
      { lat: 35.69, lng: 51.39, label: "Tehran — MOIS building / Khatib location" },
      { lat: 37.47, lng: 49.46, label: "Bandar Anzali naval base & shipyard, Caspian Sea" },
    ],
    munitions: "GBU-39 SDB, AGM-158 JASSM-ER (assessed)",
    outcome:
      "Intelligence Minister Esmaeil Khatib killed. MOIS leadership decapitated. Five Iranian Navy missile boats, naval HQ, and shipyard destroyed at Bandar Anzali. First Israeli strikes on Caspian Sea — Russia-Iran weapons route threatened. Sources: Al Jazeera, Alma Research Center.",
  },

  {
    id: "larijani-targeted",
    codename: "Operation Decapitation II",
    date: "Mar 17, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Larijani & Basij Chief Killed — Lebanon Invasion Begins",
    description:
      "Israeli airstrikes on March 17 killed two senior Iranian officials: Ali Larijani — former Majlis speaker and senior advisor to the Supreme Leader's successor council — and Brigadier General Gholamreza Soleimani, commander of the Basij paramilitary force. Both were killed in separate precision strikes on facilities in Tehran and Karaj. Iran retaliated with a ballistic missile barrage that killed 2 Israeli civilians in Ramat Gan and wounded 44 others. The same day, Israel launched a ground invasion of southern Lebanon, opening a second front. IDF land forces crossed the border at multiple points supported by sustained air cover, targeting Hezbollah weapons storage sites and command infrastructure that had been used to coordinate with Iran throughout the war.",
    launchOrigins: [
      { lat: 35.69, lng: 51.39, label: "Israeli Air Force — Tehran area strikes" },
      { lat: 35.69, lng: 51.39, label: "IRGC Aerospace — Tehran launch zone" },
    ],
    targets: [
      { lat: 35.69, lng: 51.39, label: "Tehran — Larijani compound" },
      { lat: 35.83, lng: 50.99, label: "Karaj — Basij HQ" },
      { lat: 32.08, lng: 34.81, label: "Ramat Gan residential (Iranian retaliation)" },
      { lat: 33.27, lng: 35.20, label: "South Lebanon — IDF ground invasion axis" },
    ],
    munitions:
      "Israeli: Spice-2000, GBU-28; Iranian retaliation: Kheibar Shekan ballistic missiles",
    outcome:
      "Larijani and Soleimani confirmed killed. 2 Israeli civilians killed, 44 wounded in Ramat Gan. IDF ground forces enter southern Lebanon. Hezbollah declares full mobilization. Second front opened in Lebanon for first time since 2006 war.",
  },

  {
    id: "mar17-ramat-gan-cluster",
    codename: "Ramat Gan Cluster Munition",
    date: "Mar 17, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Cluster Munition Kills 2 in Ramat Gan — 'Revenge for Larijani'",
    description:
      "An Iranian ballistic missile equipped with a cluster munition warhead struck an apartment building in Ramat Gan, killing a man and a woman both in their 70s who were found outside their safe room. The IRGC publicly claimed the strike as 'revenge for the blood of martyr Dr. Ali Larijani,' referring to the former Majlis speaker killed in Israeli airstrikes on the same day. A separate impact damaged the Tel Aviv Savidor Center railway station, disrupting rail services in the greater Tel Aviv metropolitan area. The deaths brought the cumulative Israeli civilian and military death toll from Iranian attacks to 17. Sources: NPR, Alma Research Center.",
    launchOrigins: [
      { lat: 33.5,  lng: 52.0,  label: "Central Iran — IRGC Aerospace" },
    ],
    targets: [
      { lat: 32.07, lng: 34.81, label: "Ramat Gan — apartment building" },
      { lat: 32.09, lng: 34.79, label: "Tel Aviv Savidor Center railway station" },
    ],
    munitions: "Ballistic missile with cluster munition warhead (assessed Kheibar Shekan variant)",
    outcome:
      "2 civilians killed in Ramat Gan (man and woman, 70s). Tel Aviv Savidor Center station damaged. IRGC declared strike 'revenge for Larijani.' Israeli cumulative death toll reached 17. Sources: NPR, Alma Research Center.",
  },

  {
    id: "mar15-isfahan-15killed",
    codename: "Isfahan Day 16 Strikes",
    date: "Mar 15, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Isfahan Strikes Kill 15 — 10,000+ Homes Damaged",
    description:
      "U.S. and Israeli strikes on Isfahan on March 15 killed at least 15 people, hitting military and dual-use facilities across the province. Brigadier General Abdullah Jalali Nasab was confirmed killed in the strikes — one of the senior IRGC officers still operational in the region. The Tehran governor issued a statement reporting that more than 10,000 residential homes across Tehran and surrounding provinces had been damaged or destroyed since the war began on February 28, reflecting the cumulative toll of 16 days of sustained bombardment on civilian housing stock. Iran's total death toll surpassed 1,400 across all provinces. Sources: Al Jazeera.",
    launchOrigins: [
      { lat: 31.0,  lng: 34.5,  label: "Israeli Air Force" },
      { lat: 20.5,  lng: 63.0,  label: "USS CVN strike group — Arabian Sea" },
    ],
    targets: [
      { lat: 32.65, lng: 51.67, label: "Isfahan — military and dual-use facilities" },
    ],
    munitions: "AGM-158 JASSM-ER, GBU-31 JDAM, Spice-2000 (assessed)",
    outcome:
      "15 killed in Isfahan strikes. Brig-Gen Abdullah Jalali Nasab killed. Tehran governor reported 10,000+ residential homes damaged or destroyed since Feb 28. Iranian cumulative death toll surpassed 1,400. Sources: Al Jazeera.",
  },

  {
    id: "mar14-space-center-isfahan",
    codename: "Space Center & Isfahan Industry Strikes",
    date: "Mar 14, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Iranian Space Research Center & Isfahan Defense Industry Hit",
    description:
      "Strikes on March 14 targeted the Iranian Space Research Center in Tehran — disrupting Iran's space-based communications and the dual-use missile R&D infrastructure that underpins its ballistic missile guidance program — along with the Jey Industrial Zone in Isfahan, a key drone manufacturing complex producing Shahed and Mohajer-series UAVs used throughout the war. Bunker buster bombs were employed against an underground ammunition depot in Isfahan. The Mobarakeh Steel Company was also struck, targeting steel supply chains critical to missile casing and military vehicle production. Air defense production facilities west of Karaj were hit, further degrading Iran's ability to reconstitute air defense coverage. HRANA reported approximately 285 strikes across 18 provinces on this day — among the highest single-day totals of the war. Sources: HRANA, Understanding War (ISW).",
    launchOrigins: [
      { lat: 31.0,  lng: 34.5,  label: "Israeli Air Force" },
      { lat: -7.32, lng: 72.42, label: "Diego Garcia — B-2 Spirit (bunker busters)" },
      { lat: 20.5,  lng: 63.0,  label: "USS CVN strike group — Arabian Sea" },
    ],
    targets: [
      { lat: 35.72, lng: 51.41, label: "Iranian Space Research Center, Tehran" },
      { lat: 32.55, lng: 51.60, label: "Jey Industrial Zone, Isfahan — drone manufacturing" },
      { lat: 32.65, lng: 51.67, label: "Underground ammo depot, Isfahan" },
      { lat: 32.66, lng: 51.77, label: "Mobarakeh Steel Company, Isfahan" },
      { lat: 35.83, lng: 50.87, label: "Air defense production facilities, west of Karaj" },
    ],
    munitions: "GBU-57 MOP (B-2 delivery), GBU-39 SDB, AGM-158 JASSM-ER, Spice-2000",
    outcome:
      "Space Research Center disrupted. Jey Industrial Zone drone production damaged. Underground ammo depot struck with bunker busters. Mobarakeh Steel and Karaj air defense production sites hit. HRANA reported ~285 strikes across 18 provinces — one of highest single-day totals of the war. Sources: HRANA, Understanding War (ISW).",
  },

  {
    id: "mar14-fujairah-baghdad",
    codename: "Fujairah, Kuwait & Baghdad Strikes",
    date: "Mar 14, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Fujairah Hub Fire, Kuwait Base Hit, US Embassy Baghdad Struck",
    description:
      "March 14 saw simultaneous Iranian strikes across the Gulf and Iraq. At Fujairah, the UAE's critical bunkering hub on the Gulf of Oman, a fire broke out following a drone interception that scattered debris onto fuel storage infrastructure. Ahmad al-Jaber Air Base in Kuwait was directly struck, wounding 3 Kuwaiti soldiers. In Baghdad, a missile struck the helipad of the U.S. Embassy compound and destroyed an air defense system protecting the facility — one of the most direct hits on the U.S. diplomatic presence in Iraq during the war. In a separate but related airstrike, Kata'ib Hezbollah commander Abu Ali al-Askari was killed in Baghdad, eliminating one of the most prominent figures in Iran's Iraqi proxy network and the architect of numerous previous attacks on U.S. forces. Sources: Al Jazeera.",
    launchOrigins: [
      { lat: 32.40, lng: 51.38, label: "Central Iran — IRGC Aerospace" },
      { lat: 33.0,  lng: 44.5,  label: "Central Iraq — Kata'ib Hezbollah positions" },
    ],
    targets: [
      { lat: 25.11, lng: 56.35, label: "Fujairah bunkering hub, UAE — fire from drone debris" },
      { lat: 28.93, lng: 47.91, label: "Ahmad al-Jaber Air Base, Kuwait — 3 wounded" },
      { lat: 33.33, lng: 44.40, label: "US Embassy Baghdad — helipad and air defense" },
    ],
    munitions: "Shahed-136/238 drones, Fateh-110 ballistic missiles (assessed); US airstrike on al-Askari",
    outcome:
      "Fujairah fire from drone interception debris. Ahmad al-Jaber AB hit; 3 Kuwaiti soldiers wounded. US Embassy Baghdad helipad struck; air defense system destroyed. Kata'ib Hezbollah commander Abu Ali al-Askari killed in Baghdad airstrike. Sources: Al Jazeera.",
  },

  {
    id: "mar13-kc135-crash",
    codename: "KC-135 Crash — Western Iraq",
    date: "Mar 13, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "US KC-135 Refueling Aircraft Crashes in Western Iraq — 6 Killed",
    description:
      "U.S. CENTCOM announced that all 6 crew members were killed when a KC-135 Stratotanker aerial refueling aircraft crashed in western Iraq while supporting U.S. military operations over Iran. The cause of the crash was not immediately confirmed; CENTCOM stated an investigation was underway. KC-135s had been operating continuous missions out of multiple regional bases to support the sustained air campaign over Iran, refueling strike packages from B-52s, F-15Es, and carrier-based aircraft on extended sorties. The loss was the deadliest single incident for U.S. aircrew in the campaign. Sources: Al Jazeera live tracker, CENTCOM statement.",
    launchOrigins: [],
    targets: [
      { lat: 33.35, lng: 42.50, label: "Crash site — western Iraq (KC-135 support mission)" },
    ],
    munitions: "N/A — support aircraft crash",
    outcome:
      "All 6 US Air Force crew members killed. KC-135 lost while supporting combat operations over Iran. Cause under investigation. Deadliest single loss of US aircrew in the campaign. Sources: Al Jazeera live tracker, CENTCOM statement.",
  },

  {
    id: "mar13-kharg-island-first",
    codename: "Kharg Island — 90 Targets",
    date: "Mar 13, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "US Strikes Kharg Island — 90 Military Targets Destroyed",
    description:
      "U.S. forces struck nearly 100 military sites on Kharg Island, Iran's dominant oil export hub through which approximately 90% of Iranian crude oil exports are loaded onto tankers. Targets included IRGC missile launch sites positioned on the island, the naval base and its fast-attack craft berths, and mine storage facilities used to stage naval mines for deployment in the Strait of Hormuz. Oil export and loading infrastructure on the island was deliberately spared; President Trump publicly cited 'reasons of decency' in refusing to authorize attacks on oil infrastructure at this stage, though analysts noted economic leverage considerations also played a role. The strikes significantly degraded Kharg's defensive posture and Iran's ability to protect its remaining export capacity. Sources: NPR, Al Jazeera.",
    launchOrigins: [
      { lat: 20.5,  lng: 63.0,  label: "USS CVN strike group — Arabian Sea (Tomahawk/F/A-18)" },
      { lat: -7.32, lng: 72.42, label: "Diego Garcia — B-2 Spirit" },
    ],
    targets: [
      { lat: 29.23, lng: 50.32, label: "Kharg Island — IRGC missile sites, naval base, mine storage" },
    ],
    munitions: "Tomahawk Block V cruise missiles, GBU-31 JDAM, AGM-84 Harpoon (naval targets)",
    outcome:
      "~90 military targets destroyed on Kharg Island. IRGC missile sites, naval base, and mine storage struck. Oil export infrastructure deliberately spared — Trump cited 'reasons of decency.' Iran's defensive posture at Kharg severely degraded. Sources: NPR, Al Jazeera.",
  },

  {
    id: "mar12-prima-tanker",
    codename: "Tanker Prima Strike",
    date: "Mar 12, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "IRGC Drones Strike Malta-Flagged Tanker Prima in Hormuz",
    description:
      "The IRGC claimed a drone attack on the Malta-flagged oil tanker Prima after the vessel allegedly 'ignored repeated warnings' about the declared closure of the Strait of Hormuz to vessels transiting without Iranian authorization. The Prima was struck and set ablaze off the UAE coast. A second vessel was damaged off the Qatar coast in a separate attack the same day. The strikes contributed to a near-total halt in commercial shipping through the strait, with Lloyd's of London and other underwriters suspending coverage for Hormuz transits. Sources: ACLED.",
    launchOrigins: [
      { lat: 27.18, lng: 56.27, label: "Bandar Abbas — IRGC naval drone launch" },
    ],
    targets: [
      { lat: 26.20, lng: 56.40, label: "MV Prima (Malta-flagged tanker) — Strait of Hormuz" },
    ],
    munitions: "IRGC Shahed-type naval strike drone",
    outcome:
      "Tanker Prima set ablaze off UAE coast. Second vessel damaged off Qatar. At least 2 fatalities across shipping attacks on this day. Commercial shipping through Hormuz near-halted. Sources: ACLED.",
  },

  {
    id: "mar12-shiraz-ahvaz",
    codename: "Shiraz & Ahvaz Defense Industry Strikes",
    date: "Mar 12, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Shiraz Electronics Industries & 92nd Armored Division Hit",
    description:
      "Strikes targeted Shiraz Electronics Industries — a key Iranian defense-industrial facility involved in precision guidance and drone component production — and the 92nd Armored Division base in Ahvaz, the IRGC's principal ground armor unit in Khuzestan province. A separate strike hit the Hajiabad Industrial Zone in Arak on March 13, targeting additional defense-industrial capacity. U.S. Defense Secretary Hegseth noted in a public statement that Iran's ballistic missile production capacity had been 'functionally defeated,' citing the cumulative effect of the campaign's strikes on missile factories, component suppliers, and storage facilities. Sources: Understanding War (ISW).",
    launchOrigins: [
      { lat: 31.0,  lng: 34.5,  label: "Israeli Air Force" },
      { lat: 20.5,  lng: 63.0,  label: "USS CVN strike group — Arabian Sea" },
    ],
    targets: [
      { lat: 29.59, lng: 52.58, label: "Shiraz Electronics Industries, Shiraz" },
      { lat: 31.32, lng: 48.67, label: "92nd Armored Division base, Ahvaz" },
      { lat: 34.10, lng: 49.69, label: "Hajiabad Industrial Zone, Arak" },
    ],
    munitions: "AGM-158 JASSM-ER, GBU-39 SDB (assessed)",
    outcome:
      "Shiraz Electronics Industries struck — precision guidance/drone component production degraded. 92nd Armored Division base hit. Hajiabad Industrial Zone, Arak struck. Hegseth declared Iran's ballistic missile production capacity 'functionally defeated.' Sources: Understanding War (ISW).",
  },

  {
    id: "mar12-shoham-cluster",
    codename: "Shoham Cluster Munitions",
    date: "Mar 12, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Cluster Munitions Hit Shoham, Rishon Lezion, Mishmar Hashiva",
    description:
      "Seven Iranian missile barrages were reported over the March 12–13 period targeting communities in the Tel Aviv district. Fragments and submunitions from cluster bomb warheads struck buildings in Shoham and caused vehicle damage in Rishon Lezion, while Mishmar Hashiva south of Tel Aviv was also hit. By this point in the war, IRGC forces had struck 28 residential buildings inside Israel since the conflict began on February 28, according to cumulative tracking data. Iran's use of cluster munitions — banned under the Convention on Cluster Munitions, which Iran has not signed — drew condemnation from human rights organizations. Sources: Understanding War (ISW), Alma Research Center.",
    launchOrigins: [
      { lat: 36.45, lng: 55.17, label: "Shahrud — IRGC launch site" },
      { lat: 32.40, lng: 51.38, label: "Isfahan — IRGC Aerospace" },
    ],
    targets: [
      { lat: 31.95, lng: 34.94, label: "Shoham" },
      { lat: 31.97, lng: 34.80, label: "Rishon Lezion" },
      { lat: 31.93, lng: 34.88, label: "Mishmar Hashiva, south of Tel Aviv" },
    ],
    munitions: "Ballistic missiles with cluster munition (submunition-dispensing) warheads",
    outcome:
      "Buildings struck in Shoham; cars damaged in Rishon Lezion; Mishmar Hashiva hit. Casualties not confirmed from this specific salvo. Cumulative 28 Israeli residential buildings struck since war start. Sources: Understanding War (ISW), Alma Research Center.",
  },

  {
    id: "mar12-gharchak-basij",
    codename: "Gharchak & Basij Command Strikes",
    date: "Mar 12, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Law Enforcement & Basij Command Sites Struck in Tehran",
    description:
      "Strikes targeted Law Enforcement Command (LEC) facilities in the Gharchak area of Tehran Province and Basij militia checkpoints and command infrastructure across Tehran. The strikes marked a shift in the target set toward Iran's internal security apparatus — the institutions most responsible for suppressing civil unrest and enforcing regime authority domestically. The LEC and Basij had been significantly mobilized since the opening days of the war to maintain internal order amid civilian displacement, protests in some cities, and the breakdown of normal governance. Degrading these institutions was assessed as part of a strategy to create conditions for regime collapse. Sources: Understanding War (ISW).",
    launchOrigins: [
      { lat: 31.0,  lng: 34.5,  label: "Israeli Air Force" },
    ],
    targets: [
      { lat: 35.44, lng: 51.58, label: "Law Enforcement Command, Gharchak, Tehran Province" },
      { lat: 35.69, lng: 51.39, label: "Basij command checkpoints, Tehran" },
    ],
    munitions: "GBU-39 SDB, Spice-2000 (assessed)",
    outcome:
      "LEC facilities in Gharchak struck. Basij checkpoints and command infrastructure hit across Tehran. Internal security apparatus degraded. Regime domestic control capacity reduced. Sources: Understanding War (ISW).",
  },

  {
    id: "mar10-nato-turkey",
    codename: "NATO Intercept Over Turkey",
    date: "Mar 10, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "NATO Shoots Down Iranian Missile Over Turkey",
    description:
      "NATO air defense systems shot down a ballistic missile in Turkish airspace that had been fired from Iran, marking the first time a NATO member's air defense network had engaged an Iranian ballistic missile in the 2026 conflict. Turkey confirmed the interception through its Ministry of National Defense. The incident triggered immediate consultations among NATO allies and renewed pressure for the alliance to formally characterize Iran's actions. Turkey, which had been balancing its NATO membership against its economic ties to Iran, faced significant diplomatic pressure following the incident. The interception was seen as a significant escalation marker and prompted renewed calls in NATO capitals for a coordinated alliance response. Source: Al Jazeera.",
    launchOrigins: [
      { lat: 38.08, lng: 46.29, label: "Tabriz — IRGC Aerospace" },
    ],
    targets: [
      { lat: 39.93, lng: 32.86, label: "Turkish airspace — missile trajectory (Ankara vicinity)" },
    ],
    munitions: "Iranian ballistic missile (type unconfirmed — trajectory consistent with Zolfaghar or Fateh-110)",
    outcome:
      "Missile intercepted over Turkish airspace. No casualties or damage on Turkish soil. Turkey confirmed the intercept. NATO consultations convened. First Iranian ballistic missile engagement over NATO-member airspace in the conflict. Source: Al Jazeera.",
  },

  {
    id: "mar10-gulf-intercepts",
    codename: "Gulf-Wide Interception Day",
    date: "Mar 10, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Kuwait, UAE, Saudi, Bahrain Intercept Iranian Missiles & Drones",
    description:
      "March 10 saw a coordinated wave of Iranian strikes across Gulf states, with multiple interception events reported in a single day. Saudi Arabia intercepted a drone east of Al-Kharj. Abu Dhabi's Habshan gas processing complex — one of the UAE's largest onshore gas facilities — was struck by a drone, igniting a fire. A key Saudi Aramco pipeline was directly hit by a drone strike, temporarily disrupting flow. Kuwait, the UAE, and Bahrain also reported successful intercepts of incoming missiles and drones during the same operational period. The coordinated nature of the strikes reflected continued IRGC efforts to maintain pressure across all Gulf states simultaneously despite the attrition of its launch capabilities. Sources: Al Jazeera.",
    launchOrigins: [
      { lat: 32.40, lng: 51.38, label: "Central Iran — IRGC Aerospace" },
      { lat: 27.18, lng: 56.27, label: "Bandar Abbas / Hormozgan" },
    ],
    targets: [
      { lat: 24.46, lng: 54.38, label: "Habshan gas complex, Abu Dhabi — fire ignited" },
      { lat: 24.07, lng: 47.58, label: "Saudi Aramco pipeline, Al-Kharj area — directly hit" },
      { lat: 29.35, lng: 47.52, label: "Kuwait — drone intercepted" },
      { lat: 26.24, lng: 50.52, label: "Bahrain — missiles/drones intercepted" },
    ],
    munitions: "Shahed-136/238 kamikaze drones, Quds-1 cruise missiles",
    outcome:
      "Habshan gas complex struck; fire ignited. Saudi Aramco pipeline directly hit; flow disrupted. Saudi intercept east of Al-Kharj. Kuwait, UAE, Bahrain all reported successful intercepts. Sources: Al Jazeera.",
  },

  {
    id: "mar9-mojtaba-rally",
    codename: "Mojtaba Khamenei — New Supreme Leader",
    date: "Mar 9, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Mojtaba Khamenei Named New Supreme Leader",
    description:
      "Thousands of Iranians rallied in Tehran in support of Mojtaba Khamenei, son of Supreme Leader Ali Khamenei killed in the opening strikes of February 28, as Iran's new supreme leader. The Assembly of Experts convened in an emergency session under wartime conditions to formalize the succession. The appointment was a historically significant moment — transferring supreme leadership to the son of the previous leader for the first time in the Islamic Republic's history and potentially marking a dynastic shift in governance. Iran's Foreign Ministry accused the United States of intending to 'partition the country and take its oil,' framing the war as an existential colonial project. The succession rally occurred amid continued daily U.S. and Israeli airstrikes on Tehran. Source: Al Jazeera.",
    launchOrigins: [],
    targets: [
      { lat: 35.69, lng: 51.39, label: "Tehran — rally / Assembly of Experts session" },
    ],
    munitions: "N/A — political event",
    outcome:
      "Mojtaba Khamenei acclaimed as new Supreme Leader at emergency Assembly of Experts session. Mass rally in Tehran. First dynastic succession in Islamic Republic history. Iran FM accused US of intent to 'partition the country and take oil.' Source: Al Jazeera.",
  },

  {
    id: "mar9-ramla-kindergarten",
    codename: "Hezbollah — Ramla Kindergarten Strike",
    date: "Mar 9, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Hezbollah Fateh-110 Missile Hits Kindergarten in Ramla",
    description:
      "Hezbollah launched a long-range Fateh-110 precision missile — with a range of approximately 350 km, sufficient to reach central Israel from Lebanon — at central Israel on March 9, with the impact striking a kindergarten building in Ramla. The strike occurred as part of one of 31 Hezbollah attack waves documented that day, of which approximately 87% consisted of rockets and missiles rather than drones. The Fateh-110, a solid-fueled ballistic missile with a circular error probable of under 10 meters, represented Hezbollah's most sophisticated strike asset and its use against a school building drew significant international attention. Casualties from the kindergarten strike were not immediately confirmed. Source: Alma Research Center.",
    launchOrigins: [
      { lat: 33.27, lng: 35.21, label: "Southern Lebanon — Hezbollah Fateh-110 launch" },
    ],
    targets: [
      { lat: 31.93, lng: 34.86, label: "Kindergarten, Ramla, central Israel" },
    ],
    munitions: "Fateh-110 precision ballistic missile (~350km range, <10m CEP)",
    outcome:
      "Kindergarten building struck in Ramla. Casualties not confirmed. Part of 31 Hezbollah attack waves on the day; 87% rockets/missiles. Fateh-110 use against civilian building drew international condemnation. Source: Alma Research Center.",
  },

  {
    id: "mar9-resalat-tehran",
    codename: "Resalat Highway Strike",
    date: "Mar 9, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Resalat Highway Strike — 40+ Killed in Eastern Tehran",
    description:
      "An airstrike struck residential buildings in the Resalat neighbourhood of eastern Tehran, killing at least 40 people. The strike hit a Basij-affiliated building and three adjacent residential buildings on a densely populated block. A separate strike in Arak on the same day killed 5 people and injured several more, hitting civilian and dual-use infrastructure. The Resalat district is a working- and middle-class residential area along one of Tehran's main eastern arterials, with no known military facilities in the immediate vicinity of the impacted buildings. The high civilian death toll drew condemnation from UN agencies and human rights organizations. Sources: Al Jazeera, HRANA (Human Rights Activists News Agency).",
    launchOrigins: [
      { lat: 31.0,  lng: 34.5,  label: "Israeli Air Force" },
      { lat: 20.5,  lng: 63.0,  label: "USS CVN strike group — Arabian Sea" },
    ],
    targets: [
      { lat: 35.73, lng: 51.47, label: "Resalat neighbourhood, eastern Tehran — residential buildings" },
      { lat: 34.10, lng: 49.69, label: "Arak — civilian/dual-use infrastructure" },
    ],
    munitions: "AGM-158 JASSM-ER or GBU-31 JDAM (assessed)",
    outcome:
      "40+ killed in Resalat, eastern Tehran. Basij-affiliated building and 3 residential buildings destroyed. 5 killed in Arak. UN agencies and human rights organizations condemned civilian toll. Sources: Al Jazeera, HRANA.",
  },

  {
    id: "mar9-yehud-cluster",
    codename: "Yehud Cluster Munition Strike",
    date: "Mar 9, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Cluster Munition Kills 2 Workers in Yehud Near Tel Aviv",
    description:
      "Two construction workers were killed at a building site in Yehud, a city immediately adjacent to Ben Gurion International Airport, when submunitions from an Iranian cluster bomb warhead detonated while they were working outdoors. The workers had not reached shelter in time after sirens sounded. The deaths raised the cumulative Israeli civilian and military death toll from Iranian missile and drone strikes to 11. Iran's continued use of cluster munition warheads — which scatter dozens of submunitions over a wide area and leave unexploded ordnance — was condemned by human rights organizations including Amnesty International and Human Rights Watch. Sources: Al Jazeera, Alma Research Center.",
    launchOrigins: [
      { lat: 35.69, lng: 51.39, label: "Tehran region — IRGC Aerospace" },
    ],
    targets: [
      { lat: 32.03, lng: 34.88, label: "Yehud construction site, near Ben Gurion Airport" },
    ],
    munitions: "Ballistic missile with cluster munition (submunition-dispensing) warhead",
    outcome:
      "2 construction workers killed by submunitions. Israeli cumulative death toll raised to 11. Cluster munition use condemned by Amnesty International and HRW. Sources: Al Jazeera, Alma Research Center.",
  },

  {
    id: "mar8-brent-100",
    codename: "Brent Crude $100 / Hormuz Crisis",
    date: "Mar 8, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Brent Crude Surpasses $100 — Hormuz Shipping Crisis Deepens",
    description:
      "Brent crude oil prices surpassed $100 per barrel for the first time in four years as the effective closure of the Strait of Hormuz — through which approximately 20% of global oil supply transits daily — entered its second week. Shipping insurance rates for vessels attempting Hormuz transit had increased by a factor of 4 to 6 times pre-war rates, effectively making most commercial voyages uneconomical. Iran's government declared it would offer safe passage through the strait only to vessels flagged by countries that formally expelled U.S. and Israeli ambassadors — a coercive diplomatic maneuver that put significant pressure on Gulf Arab states and Asian oil importers. India, China, Japan, and South Korea convened emergency energy security consultations. Sources: PBS, Al Jazeera.",
    launchOrigins: [],
    targets: [
      { lat: 26.57, lng: 56.25, label: "Strait of Hormuz — shipping closure zone" },
    ],
    munitions: "N/A — economic and diplomatic event",
    outcome:
      "Brent crude surpassed $100/barrel — first time in 4 years. Shipping insurance 4–6x pre-war rates. Iran offered safe passage only to countries expelling US/Israeli ambassadors. India, China, Japan, South Korea held emergency energy consultations. Sources: PBS, Al Jazeera.",
  },

  {
    id: "mar8-quds-force-beirut",
    codename: "Beirut Hotel — Quds Force Strike",
    date: "Mar 8, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "IRGC Quds Force Commanders Killed in Beirut Hotel Strikes",
    description:
      "The IDF struck the Ramada Hotel and Raouche Hotel in Beirut, targeting a gathering of senior IRGC Lebanon Corps and Quds Force commanders who had assembled to coordinate Hezbollah's operational response to the 2026 war. Five people were reported killed, including IRGC finance officer Majed Husseini, intelligence representative Ali Baazazar, and the head of the 'Zionist file' — the IRGC officer responsible for coordinating anti-Israeli operations — Hossein Ahmadlou. Following the strikes, over 150 Iranians including diplomats, embassy personnel, and IRGC advisors evacuated Lebanon, effectively ending Iran's direct advisory presence in Beirut. Source: Alma Research Center.",
    launchOrigins: [
      { lat: 31.0,  lng: 34.5,  label: "Israeli Air Force" },
    ],
    targets: [
      { lat: 33.89, lng: 35.50, label: "Ramada Hotel, Beirut" },
      { lat: 33.90, lng: 35.47, label: "Raouche Hotel, Beirut" },
    ],
    munitions: "Precision-guided munitions (GBU-39 SDB or Spice-250, assessed)",
    outcome:
      "5 killed including IRGC finance officer Majed Husseini, intelligence rep Ali Baazazar, and Quds Force 'Zionist file' chief Hossein Ahmadlou. 150+ Iranians including diplomats evacuated Lebanon. Iran's direct advisory presence in Beirut effectively ended. Source: Alma Research Center.",
  },

  {
    id: "mar8-oil-facilities",
    codename: "First Iranian Oil Strikes",
    date: "Mar 8, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "First Strikes on Iranian Oil — Tehran Refineries & Depots Hit",
    description:
      "Israel struck Iranian oil infrastructure for the first time on March 8, targeting four oil storage depots and an oil production transfer center across Tehran and Alborz province. Facilities hit included the Aghdasieh fuel warehouse in northeastern Tehran, the Tehran oil refinery, the Shahran fuel depot in western Tehran, and the Karaj oil depot in Alborz province. Large fires broke out at multiple sites, sending toxic smoke clouds across Tehran and forcing residents to shelter indoors. Four people were confirmed killed. In the same operation, Israel destroyed 16 Quds Force cargo aircraft at Mehrabad Airport — removing a key logistics asset used to supply Hezbollah in Lebanon and proxy forces in Iraq and Syria. Sources: Al Jazeera, Alma Research Center.",
    launchOrigins: [
      { lat: 31.0,  lng: 34.5,  label: "Israeli Air Force" },
    ],
    targets: [
      { lat: 35.76, lng: 51.53, label: "Aghdasieh fuel warehouse, northeastern Tehran" },
      { lat: 35.64, lng: 51.32, label: "Tehran oil refinery" },
      { lat: 35.73, lng: 51.27, label: "Shahran fuel depot, western Tehran" },
      { lat: 35.83, lng: 50.99, label: "Karaj oil depot, Alborz province" },
      { lat: 35.69, lng: 51.31, label: "Mehrabad Airport — 16 Quds Force cargo aircraft" },
    ],
    munitions: "GBU-28 bunker buster, GBU-31 JDAM, Spice-2000",
    outcome:
      "4 killed. Large fires and toxic smoke across Tehran. Tehran refinery, Shahran depot, Aghdasieh warehouse, Karaj depot all struck. 16 IRGC Quds Force cargo aircraft destroyed at Mehrabad Airport. First Israeli strikes on Iranian oil infrastructure in the war. Sources: Al Jazeera, Alma Research Center.",
  },

  {
    id: "mar7-bahrain-desal",
    codename: "Bahrain Desalination Strike",
    date: "Mar 7, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Iranian Drone Damages Bahrain Desalination Plant",
    description:
      "An Iranian drone attack caused material damage to a water desalination plant in Bahrain on March 7, striking critical civilian infrastructure in the island kingdom. Bahrain's water supply is almost entirely dependent on desalination due to its lack of natural freshwater sources, making the plant a high-consequence civilian target. The attack followed Iran's pattern of expanding its target set to include civilian infrastructure across Gulf states in an effort to raise the cost of hosting U.S. military forces and maintaining the coalition against Iran. The damage did not cause a complete shutdown of operations but required repairs and reduced output capacity. Sources: Al Jazeera, Alma Research Center.",
    launchOrigins: [
      { lat: 32.40, lng: 51.38, label: "Central Iran — IRGC Aerospace" },
    ],
    targets: [
      { lat: 26.07, lng: 50.56, label: "Water desalination plant, Bahrain" },
    ],
    munitions: "Shahed-136 kamikaze drone (assessed)",
    outcome:
      "Desalination plant damaged; reduced output capacity. No full shutdown. Attack on critical civilian water infrastructure condemned by Gulf states and UN. Sources: Al Jazeera, Alma Research Center.",
  },

  {
    id: "mar6-tehran-surge",
    codename: "Tehran Surge — Day 7 Bombing",
    date: "Mar 6, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Tehran 'Surge' — Heaviest Bombing of Capital Yet",
    description:
      "U.S. and Israeli forces launched a new declared phase of operations on March 6, conducting the heaviest single night of bombing on Tehran since the war began. Targets included government institutions near Pasteur Street in central Tehran, residential areas in multiple districts, and facilities in the vicinity of Tehran University. Al Jazeera's bureau in Tehran reported feeling sustained shockwaves throughout the night. Separately, the Zibashahr area of Shiraz was struck, killing at least 20 people and injuring 30. The cumulative Iranian death toll from the war surpassed 1,332. UNICEF reported that 181 children had been killed across Iran since February 28, in what it described as one of the worst humanitarian crises resulting from aerial bombardment since the Second World War. Sources: Al Jazeera.",
    launchOrigins: [
      { lat: 31.0,  lng: 34.5,  label: "Israeli Air Force — multiple IAF bases" },
      { lat: -7.32, lng: 72.42, label: "Diego Garcia — B-2 Spirit" },
      { lat: 20.5,  lng: 63.0,  label: "USS CVN strike group — Arabian Sea" },
    ],
    targets: [
      { lat: 35.69, lng: 51.39, label: "Tehran — Pasteur Street government district" },
      { lat: 35.70, lng: 51.39, label: "Tehran University vicinity" },
      { lat: 29.60, lng: 52.49, label: "Zibashahr area, Shiraz — 20 killed" },
    ],
    munitions: "GBU-57 Massive Ordnance Penetrator (B-2), GBU-28, Spice-2000, JASSM-ER",
    outcome:
      "Heaviest bombing of Tehran to date. Government institutions near Pasteur Street and Tehran University vicinity struck. 20 killed and 30 injured in Zibashahr, Shiraz. Cumulative Iranian death toll surpassed 1,332. UNICEF reported 181 children killed across Iran since Feb 28. Sources: Al Jazeera.",
  },

  {
    id: "iran-navy-destroyed",
    codename: "Operation Trident",
    date: "Mar 5, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Iranian Navy Destroyed — Combat Ineffective",
    description:
      "In a 48-hour intensive naval strike campaign, U.S. and Israeli forces sank or destroyed over 30 Iranian naval vessels — including fast-attack craft, missile boats, and mini-submarines used in harassment operations against Gulf shipping. U.S. Navy P-8 Poseidon maritime patrol aircraft and MQ-9 drones coordinated targeting, while carrier-based F/A-18s and shore-based HIMARS systems engaged vessels in port at Bandar Abbas and Chahbahar. U.S. B-2 bombers on the same day struck at least four hardened underground facilities in Iran, including the Imam Ali missile base at Kermanshah, using GBU-57 Massive Ordnance Penetrators. The Iranian navy was declared 'combat ineffective' by CENTCOM, ending Iran's ability to threaten commercial shipping in the Persian Gulf and Strait of Hormuz with surface vessels.",
    launchOrigins: [
      { lat: 20.5, lng: 63.0, label: "USS CVN strike group — Arabian Sea" },
      { lat: -7.32, lng: 72.42, label: "Diego Garcia — B-2 Spirit" },
    ],
    targets: [
      { lat: 27.18, lng: 56.27, label: "Bandar Abbas naval base — IRGC fleet" },
      { lat: 25.30, lng: 60.64, label: "Chahbahar naval base" },
      { lat: 34.35, lng: 46.95, label: "Imam Ali Missile Base, Kermanshah" },
      { lat: 35.56, lng: 53.39, label: "Underground facilities, Semnan" },
    ],
    munitions:
      "GBU-57 Massive Ordnance Penetrator (B-2 delivery), AGM-84 Harpoon, AGM-65 Maverick, HIMARS precision rockets, Mk-54 torpedoes (submarines)",
    outcome:
      "30+ Iranian vessels sunk or destroyed. Iranian navy declared 'combat ineffective.' Iran's ability to threaten Gulf shipping with surface vessels eliminated. Underground missile facility at Kermanshah partially destroyed. 16 Iranian naval mine-laying vessels destroyed, securing Strait of Hormuz shipping lanes.",
  },

  {
    id: "mar5-iris-soleimani",
    codename: "Sinking of IRIS Soleimani",
    date: "Mar 5, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "IRIS Soleimani Sunk in Strait of Hormuz",
    description:
      "The U.S. Navy sank the Iranian corvette IRIS Soleimani in the Strait of Hormuz near Iranian shores, announced as part of Defense Secretary Pete Hegseth's public declaration that Iran's navy was 'combat ineffective, decimated, destroyed, defeated.' The corvette was named after IRGC Quds Force commander Qasem Soleimani, killed in a U.S. drone strike at Baghdad International Airport in January 2020. Its sinking carried significant symbolic weight for both sides. The loss of the Soleimani came alongside the destruction of over 30 other Iranian naval vessels in the same 48-hour campaign that resulted in CENTCOM declaring the Iranian navy combat ineffective. Sources: Fox News (Pentagon briefing), Al Jazeera.",
    launchOrigins: [
      { lat: 20.5, lng: 63.0, label: "USS CVN strike group — Arabian Sea" },
    ],
    targets: [
      { lat: 26.57, lng: 56.25, label: "IRIS Soleimani (corvette) — Strait of Hormuz" },
    ],
    munitions: "AGM-84 Harpoon anti-ship missile or Mk-48 torpedo (assessed)",
    outcome:
      "IRIS Soleimani sunk in Strait of Hormuz. Casualties not confirmed. Announced by Defense Secretary Hegseth alongside declaration of Iranian navy as 'combat ineffective, decimated, destroyed, defeated.' Symbolic significance: ship named after Qasem Soleimani. Sources: Fox News (Pentagon briefing), Al Jazeera.",
  },

  {
    id: "mar4-iris-dena",
    codename: "Sinking of IRIS Dena",
    date: "Mar 4, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "USS Charlotte Sinks IRIS Dena — 87 Killed",
    description:
      "USS Charlotte, a Virginia-class fast-attack submarine operating in the Indian Ocean, torpedoed the Iranian frigate IRIS Dena off the coast of Sri Lanka with a Mark 48 heavyweight torpedo. The Dena was returning to Iran from the Indian Ocean Fleet Review hosted by India when it was targeted. The frigate sank within 20 minutes; 87 bodies were recovered and 32 sailors rescued from a crew of approximately 180. The sinking marked the first successful U.S. submarine torpedo attack on an enemy surface vessel since World War II. Defense Secretary Pete Hegseth commented: 'A quiet death.' Iran's government confirmed the loss two days later after denying initial reports, triggering national mourning.",
    launchOrigins: [
      { lat: 6.03, lng: 80.22, label: "USS Charlotte (SSN-766) — Indian Ocean, off Sri Lanka" },
    ],
    targets: [
      { lat: 6.03, lng: 80.22, label: "IRIS Dena (frigate) — Indian Ocean" },
    ],
    munitions: "Mark 48 ADCAP heavyweight torpedo",
    outcome:
      "IRIS Dena sunk. 87 killed, 32 rescued from ~180 crew. First U.S. submarine torpedo kill since WWII. Iran denied attack for 48 hours before confirming. National mourning declared in Iran. Defense Secretary Hegseth: 'A quiet death.'",
  },

  {
    id: "mar4-hezbollah-telaviv",
    codename: "Hezbollah — Tel Aviv Strike",
    date: "Mar 4, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Hezbollah Long-Range Missile Targets Tel Aviv",
    description:
      "Hezbollah fired a long-range ballistic missile at the Tel Aviv metropolitan area on March 4, marking a significant escalation of Lebanese front activity alongside the ongoing Iran campaign. Israeli air defenses intercepted the missile; no casualties were reported in Israel from this specific strike. Israel responded with a massive 250+ airstrike package across Lebanon, killing over 50 people and injuring 330+. In the strikes, Hezbollah's head of intelligence was killed in the southern suburbs of Beirut (Dahiyeh). The exchange, documented by ACLED, significantly widened the operational scope of the conflict and stretched Israeli air defense and air force resources across two simultaneous fronts.",
    launchOrigins: [
      { lat: 33.27, lng: 35.21, label: "Southern Lebanon — Hezbollah launch sites" },
    ],
    targets: [
      { lat: 32.09, lng: 34.78, label: "Tel Aviv metropolitan area" },
    ],
    munitions: "Long-range ballistic missile (type unconfirmed — assessed Fateh-110 derivative or Zelzal)",
    outcome:
      "Missile intercepted; no Israeli casualties. Israeli response: 250+ airstrikes across Lebanon, 50+ killed, 330+ injured. Hezbollah intelligence chief killed in Dahiyeh. Conflict formally extended to two-front war. Per ACLED reporting.",
  },

  {
    id: "mar4-lebanon-250strikes",
    codename: "Israel — Lebanon Escalation",
    date: "Mar 4, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Israel Launches 250+ Strikes Across Lebanon — 50+ Killed",
    description:
      "Following Hezbollah's long-range missile attack targeting Tel Aviv on March 4, Israel launched a massive retaliatory air campaign across Lebanon involving more than 250 airstrikes in a single operational period. The Israeli military ordered evacuations in border villages in southern Lebanon and deployed forces deeper into southern territories already held since the 2024 war. The strikes targeted Hezbollah weapons depots, launch sites, tunnel infrastructure, and command nodes across southern Lebanon and the Bekaa Valley. At least 50 people were killed and over 330 injured in Lebanon. In the strikes, Hezbollah's head of intelligence was killed in the southern suburbs of Beirut (Dahiyeh). The exchange marked the most intense Israeli air activity in Lebanon since the November 2024 ceasefire and effectively reopened the Lebanese front as a fully active theater of the war. Sources: ACLED, Al Jazeera.",
    launchOrigins: [
      { lat: 31.0, lng: 34.5, label: "Israeli Air Force — multiple IAF bases" },
    ],
    targets: [
      { lat: 33.27, lng: 35.21, label: "Southern Lebanon — Hezbollah positions" },
      { lat: 33.54, lng: 35.68, label: "Bekaa Valley — Hezbollah weapons depots" },
      { lat: 33.74, lng: 35.57, label: "Dahiyeh, Beirut southern suburbs — intelligence HQ" },
    ],
    munitions: "GBU-39 SDB, JDAM, Spice-2000, F-35I and F-15I strike packages",
    outcome:
      "50+ killed in Lebanon, 330+ injured. Hezbollah intelligence chief killed in Dahiyeh. Hezbollah launch sites and tunnel infrastructure extensively damaged. Lebanese front fully reopened as active theater. Israeli forces deployed deeper into southern Lebanon. Sources: ACLED, Al Jazeera.",
  },

  {
    id: "air-defense-collapse",
    codename: "IDF Assessment — Day 4",
    date: "Mar 3, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Iranian Air Defense Network Collapses",
    description:
      "On March 3 (Day 4 of the conflict), the Israel Defense Forces publicly announced the destruction of more than 300 Iranian mobile missile launchers and over 200 surface-to-air missile systems since the opening strikes on February 28. Israeli and U.S. aircraft had exploited the gaps created by Day 1 strikes on Iranian radar networks and command nodes to conduct round-the-clock suppression of enemy air defense (SEAD) sorties. The IDF declared full air superiority over Iranian airspace, enabling unrestricted strike access to any target in Iran. Iranian ballistic missile salvo rates had dropped by approximately 70% compared to the opening 48 hours; drone attack rates were down approximately 83%. Iran's much-vaunted Russian-supplied S-300 systems had been largely neutralized or destroyed.",
    launchOrigins: [
      { lat: 31.0, lng: 34.5, label: "Israeli Air Force — multiple IAF bases" },
    ],
    targets: [
      { lat: 35.69, lng: 51.39, label: "Iranian SAM networks — Tehran region" },
      { lat: 32.40, lng: 51.38, label: "Missile launcher sites — Isfahan" },
      { lat: 38.08, lng: 46.29, label: "Air defense nodes — Tabriz" },
      { lat: 36.30, lng: 59.60, label: "Eastern launch complexes — Khorasan" },
    ],
    munitions:
      "AGM-88 HARM anti-radiation missiles, SDB II, Spice-2000, F-35I and F-15I SEAD strike packages",
    outcome:
      "300+ Iranian mobile launchers destroyed. 200+ SAM systems suppressed or destroyed. ~70% reduction in Iranian ballistic missile salvo rates. ~83% reduction in drone attack rate. Israel declares full air superiority over Iran. Iranian air force effectively grounded since Day 1.",
  },

  {
    id: "mar3-irib-parliament",
    codename: "Strike on IRIB & Parliament",
    date: "Mar 3, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "IRIB State Broadcaster HQ & Parliament Targeted",
    description:
      "Israeli aircraft struck the headquarters of IRIB (Islamic Republic of Iran Broadcasting), Iran's state television and radio broadcaster, in Tehran on March 3. The strike disabled Iran's primary propaganda and emergency communications infrastructure; IRIB went off-air for several hours before partial transmission resumed via backup facilities. The Iranian parliament building in central Tehran was also reportedly targeted by airstrikes, though the extent of damage to the parliament itself was disputed in subsequent reporting. On the same day, U.S. President Trump told reporters at the White House that Iran had 'no navy, no air force, and no radar' remaining, framing the campaign's military objectives as largely accomplished by Day 4.",
    launchOrigins: [
      { lat: 31.0, lng: 34.5, label: "Israeli Air Force — Negev bases" },
    ],
    targets: [
      { lat: 35.70, lng: 51.41, label: "IRIB state broadcaster HQ, Tehran" },
      { lat: 35.68, lng: 51.42, label: "Iranian Parliament, Tehran" },
    ],
    munitions: "AGM-158 JASSM-ER, assessed stand-off cruise missiles",
    outcome:
      "IRIB headquarters struck; state TV/radio off-air for several hours. Parliament building reportedly targeted; damage disputed. Trump declared Iran had 'no navy, no air force, no radar' remaining. No casualties reported at IRIB.",
  },

  {
    id: "mar3-al-udeid",
    codename: "Al Udeid Drone Swarm",
    date: "Mar 3, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Al Udeid Air Base Targeted by ~35 Shahed Drone Swarm",
    description:
      "U.S. forces at Al Udeid Air Base in Qatar — the largest U.S. air base in the Middle East and the forward headquarters of AFCENT — reported being targeted by a swarm of approximately 35 Iranian-designed Shahed-136 variant loitering munitions on March 3. Qatar's Defence Ministry confirmed that its air defense forces had intercepted 10 drones and 2 cruise missiles launched from Iran. Qatar Airways suspended all flight operations temporarily due to the active air defense engagement in Qatari airspace. No damage to the base was confirmed in initial reports, though the swarm attack represented one of the most significant direct Iranian challenges to a major U.S. forward operating base during the war. Sources: TheBoard.world, Al Jazeera.",
    launchOrigins: [
      { lat: 32.40, lng: 51.38, label: "Central Iran — IRGC Aerospace" },
    ],
    targets: [
      { lat: 25.12, lng: 51.32, label: "Al Udeid Air Base, Qatar (AFCENT HQ)" },
    ],
    munitions: "~35 Shahed-136 variant loitering munitions, 2 cruise missiles",
    outcome:
      "Qatar air defenses intercepted 10 drones and 2 cruise missiles. Qatar Airways flight operations suspended. No confirmed damage to Al Udeid base. Sources: TheBoard.world, Al Jazeera.",
  },

  {
    id: "us-embassy-riyadh",
    codename: "Embassy Strike — Riyadh",
    date: "Mar 2, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "US Embassy Riyadh Hit — IRGC Threatens 'American Political Centers'",
    description:
      "Two Iranian Shahed drones struck the United States Embassy compound in Riyadh, Saudi Arabia, causing limited fires and minor material damage. The embassy had been evacuated of non-essential personnel hours earlier following a U.S. State Department security alert; no casualties were reported. The Saudi defense ministry confirmed the strikes and announced that air defense forces had intercepted 8 additional drones approaching Riyadh and the Al-Kharj military base south of the capital. Following the attack, the IRGC issued a formal statement declaring its intent to destroy 'American political centers' across the Middle East region. The U.S. State Department responded by ordering all non-emergency personnel to leave Bahrain, Kuwait, Qatar, Jordan, and Iraq on ordered departure status — the most significant diplomatic evacuation from the Gulf since the 2003 invasion of Iraq.",
    launchOrigins: [
      { lat: 32.40, lng: 51.38, label: "Central Iran — IRGC Aerospace" },
    ],
    targets: [
      { lat: 24.69, lng: 46.69, label: "US Embassy, Riyadh" },
      { lat: 24.07, lng: 47.58, label: "Al-Kharj Air Base vicinity" },
    ],
    munitions: "Shahed-136/238 kamikaze drones",
    outcome:
      "Embassy compound hit; limited fires, minor material damage. No casualties — embassy pre-evacuated. Saudi air defense intercepted 8 additional drones near Riyadh and Al-Kharj. IRGC publicly declared intent to destroy US diplomatic facilities region-wide. US State Dept ordered ordered departure from Bahrain, Kuwait, Qatar, Jordan, and Iraq.",
  },

  {
    id: "us-embassy-kuwait",
    codename: "Embassy Strike — Kuwait City",
    date: "Mar 2, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "US Embassy Kuwait Hit — Friendly Fire Incident Kills F-15E Crews",
    description:
      "An Iranian ballistic missile struck the United States Embassy compound in Kuwait City, prompting Secretary of State Marco Rubio to close the embassy indefinitely. The strike caused significant damage to the chancery building; no American personnel were present following the ordered departure. On the same day, in one of the most jarring friendly fire incidents of the war, a Kuwaiti Air Force F/A-18C Hornet intercepting incoming Iranian missiles shot down three U.S. Air Force F-15E Strike Eagles near the Kuwaiti-Iraqi border. The Kuwaiti pilots had misidentified the F-15Es as Iranian cruise missiles in the dense airspace. All six U.S. crew members ejected and survived, recovered by Kuwaiti search-and-rescue helicopters. The incident prompted an immediate stand-down review of Gulf coalition deconfliction protocols.",
    launchOrigins: [
      { lat: 34.35, lng: 46.95, label: "Kermanshah — western Iran" },
    ],
    targets: [
      { lat: 29.38, lng: 47.99, label: "US Embassy, Kuwait City" },
    ],
    munitions: "Ballistic missile (type unconfirmed)",
    outcome:
      "US Embassy Kuwait struck, closed indefinitely by Secretary Rubio. No American casualties — embassy evacuated. Friendly fire: Kuwaiti F/A-18C shot down 3 U.S. F-15E Strike Eagles; all 6 crew ejected and survived. Coalition air deconfliction protocols suspended for emergency review.",
  },

  {
    id: "mar2-malek-ashtar",
    codename: "Strike on Malek-Ashtar Building",
    date: "Mar 2, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "IRGC Malek-Ashtar Building Destroyed in Tehran",
    description:
      "Iran International footage verified by multiple open-source analysts showed the IRGC Malek-Ashtar building in central Tehran completely destroyed in a joint U.S.-Israeli precision strike on March 2. The building housed IRGC communications and command functions. In conjunction with the strike, IRGC spokesman Brigadier General Ali Mohammad Naini and his deputy were assassinated, severing Iran's primary military public affairs and psychological operations leadership. Basij intelligence chief Brigadier General Ismail Ahmadi was also killed in a separate airstrike in Tehran on the same day, decapitating a key domestic security and intelligence node used by the IRGC to monitor internal dissent during the war.",
    launchOrigins: [
      { lat: 31.0, lng: 34.5, label: "Israeli Air Force" },
      { lat: 20.5, lng: 63.0, label: "USS CVN strike group — Arabian Sea" },
    ],
    targets: [
      { lat: 35.69, lng: 51.39, label: "IRGC Malek-Ashtar Building, Tehran" },
    ],
    munitions: "GBU-39 SDB, JDAM-ER (assessed)",
    outcome:
      "Malek-Ashtar building completely destroyed per Iran International footage. IRGC spokesman Ali Mohammad Naini and deputy killed. Basij intelligence chief Ismail Ahmadi killed. Iran's military communications and domestic intelligence leadership decimated.",
  },

  {
    id: "mar2-hezbollah-enters",
    codename: "Hezbollah Opens Second Front",
    date: "Mar 2, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Hezbollah Enters War — First Strikes on Northern Israel",
    description:
      "Hezbollah launched its first missile and drone attacks on northern Israel on March 2, two days after the opening U.S.-Israeli strikes on Iran began on February 28. The attacks ended the November 2024 ceasefire that had halted Hezbollah hostilities following the 2024 Lebanon war. ACLED confirmed that Hezbollah's entry into the conflict triggered a major Israeli escalation across Lebanon, with Israeli airstrikes expanding significantly across Hezbollah's southern and eastern Lebanon infrastructure. The Lebanese front opened a second axis of pressure on Israel's missile defense networks, which were simultaneously managing incoming fire from Iran itself. The escalation was widely assessed as part of the Iran-aligned 'axis of resistance' coordinated response.",
    launchOrigins: [
      { lat: 33.27, lng: 35.21, label: "Southern Lebanon — Hezbollah positions" },
    ],
    targets: [
      { lat: 33.00, lng: 35.50, label: "Northern Israel — Galilee communities" },
    ],
    munitions: "Ballistic missiles, Katyusha rockets, Shahed-type drones",
    outcome:
      "First Hezbollah strikes since November 2024 ceasefire. Northern Israel communities struck; casualties not fully confirmed. Israel escalated operations across Lebanon. ACLED confirmed this entry triggered major Israeli escalation. Lebanese front opened as simultaneous second axis of attack on Israel.",
  },

  {
    id: "mar1-port-shuaiba",
    codename: "Port Shuaiba Strike",
    date: "Mar 1, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Port Shuaiba Drone Strike — 6 US Soldiers Killed",
    description:
      "An Iranian Shahed drone struck a U.S. tactical operations center at Port Shuaiba, Kuwait, killing 6 Army Reserve soldiers from the 103rd Expeditionary Sustainment Command (Des Moines, Iowa) and wounding 30 or more others. The drone approached at low altitude, evading the air defense coverage that had been oriented toward higher-trajectory ballistic threats. The six soldiers were the first U.S. combat fatalities of the 2026 war. Their deaths prompted a significant escalation in U.S. rules of engagement and triggered an immediate congressional briefing. Sources: AP, CBS News, Washington Post.",
    launchOrigins: [
      { lat: 27.18, lng: 56.27, label: "Bandar Abbas / Hormozgan — IRGC Aerospace" },
    ],
    targets: [
      { lat: 29.04, lng: 48.18, label: "US tactical operations center, Port Shuaiba, Kuwait" },
    ],
    munitions: "Shahed-136 kamikaze drone (low-altitude approach)",
    outcome:
      "6 US Army Reserve soldiers killed (103rd ESC, Des Moines, Iowa) — first US combat fatalities of the 2026 war. 30+ wounded. Drone evaded air defenses at low altitude. US rules of engagement immediately escalated. Emergency congressional briefing convened. Sources: AP, CBS News, Washington Post.",
  },

  {
    id: "mar1-bahrain-manama",
    codename: "Bahrain Strikes",
    date: "Mar 1, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Bahrain Strikes — 5th Fleet HQ & Manama Hit",
    description:
      "Nationwide air-raid sirens sounded across Bahrain on March 1 as Iranian drones and ballistic missiles struck multiple targets. The U.S. Navy 5th Fleet headquarters at NSA Juffair sustained damage, with 3 U.S. Navy personnel wounded. A Shahed drone struck a residential tower block in Manama, setting it ablaze. Bahraini authorities reported that their air defense forces had intercepted a cumulative 74 missiles and 92 drones since hostilities began on February 28. Bahraini F-16s flew continuous combat air patrol sorties throughout the night. Sources: Al Jazeera, ACLED.",
    launchOrigins: [
      { lat: 32.40, lng: 51.38, label: "Central Iran — IRGC Aerospace" },
    ],
    targets: [
      { lat: 26.23, lng: 50.59, label: "NSA Juffair — US 5th Fleet HQ, Bahrain" },
      { lat: 26.22, lng: 50.59, label: "Manama residential tower, Bahrain" },
    ],
    munitions: "Shahed-136/238 kamikaze drones, Fateh-313 ballistic missiles",
    outcome:
      "5th Fleet HQ (NSA Juffair) damaged; 3 US Navy personnel wounded. Residential tower block in Manama struck and ablaze. Bahrain reported intercepting 74 missiles and 92 drones cumulatively since Feb 28. Sources: Al Jazeera, ACLED.",
  },

  {
    id: "mar1-saudi-jubail",
    codename: "Saudi THAAD & Jubail Strike",
    date: "Mar 1, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Saudi THAAD Radars Hit — Jubail Refinery Closed",
    description:
      "Iranian strikes on March 1 targeted Saudi THAAD radar positions, degrading part of the kingdom's long-range ballistic missile defense coverage. The Jubail Industrial City refinery on the Persian Gulf coast was struck and temporarily shut down as a precautionary measure following a fire in an adjacent storage area. The Ras Tanura oil export terminal and refinery — one of the world's largest — was also struck, though Saudi Aramco subsequently reported minimal operational impact. Jordan scrambled F-16s and shot down dozens of Iranian drones transiting Jordanian airspace en route to Gulf targets. Sources: Al Jazeera, Reuters.",
    launchOrigins: [
      { lat: 34.35, lng: 46.95, label: "Kermanshah — western Iran" },
      { lat: 32.40, lng: 51.38, label: "Isfahan — central Iran" },
    ],
    targets: [
      { lat: 27.00, lng: 49.66, label: "Jubail refinery / THAAD radar positions, Saudi Arabia" },
      { lat: 26.69, lng: 50.16, label: "Ras Tanura terminal, Saudi Arabia" },
    ],
    munitions: "Fateh-313 and Zolfaghar ballistic missiles, Quds-1 cruise missiles",
    outcome:
      "Saudi THAAD radar positions hit; ballistic missile defense coverage degraded. Jubail refinery temporarily shut down. Ras Tanura struck; minimal operational impact per Aramco. Jordan intercepted dozens of Iranian drones in transit. Sources: Al Jazeera, Reuters.",
  },

  {
    id: "mar1-raf-akrotiri",
    codename: "RAF Akrotiri Strike",
    date: "Mar 1, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "RAF Akrotiri Drone Strike — First Hit on NATO Territory",
    description:
      "An Iranian drone caused minor damage at RAF Akrotiri, the British Sovereign Base Area on Cyprus, marking the first strike on a NATO-member territory in the 2026 Iran War. The UK government confirmed that two missiles had been fired in the direction of Cyprus; one was intercepted and one caused minor structural damage at the airfield perimeter. No casualties were reported. RAF Akrotiri serves as a key staging base for British reconnaissance and intelligence-gathering missions in the Eastern Mediterranean and Middle East. The attack triggered an immediate Article 4 consultation among NATO allies, though the alliance declined to invoke Article 5. Sources: Al Jazeera, UK House of Commons Library.",
    launchOrigins: [
      { lat: 35.69, lng: 51.39, label: "Western Iran — IRGC Aerospace" },
    ],
    targets: [
      { lat: 34.59, lng: 32.99, label: "RAF Akrotiri, Cyprus (UK Sovereign Base Area)" },
    ],
    munitions: "Iranian drone (type unconfirmed — assessed Shahed-type)",
    outcome:
      "Minor structural damage at RAF Akrotiri perimeter; no casualties. First strike on NATO-member territory in the conflict. UK confirmed 'two missiles fired in direction of Cyprus.' NATO Article 4 consultations triggered; Article 5 not invoked. Sources: Al Jazeera, UK House of Commons Library.",
  },

  {
    id: "mar1-bnei-brak",
    codename: "Bnei Brak & Rosh HaAyin Strike",
    date: "Mar 1, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Iranian Missiles Hit Bnei Brak & Rosh HaAyin — 8 Injured",
    description:
      "Iranian ballistic missile strikes on Day 2 of the conflict hit the cities of Bnei Brak and Rosh HaAyin in the Tel Aviv district, causing 7 civilian injuries. Shrapnel from intercepted or impacting missiles also fell across Tel Aviv, injuring 1 additional person. The strikes formed part of Iran's continued retaliatory barrages on the second day, with the IRGC Aerospace Force maintaining multi-wave salvos against Israeli population centers despite the significant attrition to Iranian launch capability inflicted by U.S. and Israeli strikes in the opening 24 hours. Bnei Brak is one of Israel's most densely populated cities, with a predominantly ultra-Orthodox Jewish population. Sources: ACLED, Times of Israel.",
    launchOrigins: [
      { lat: 32.40, lng: 51.38, label: "Isfahan — central Iran" },
      { lat: 35.69, lng: 51.39, label: "Tehran region — IRGC Aerospace" },
    ],
    targets: [
      { lat: 32.08, lng: 34.84, label: "Bnei Brak, Tel Aviv district" },
      { lat: 32.09, lng: 34.96, label: "Rosh HaAyin" },
    ],
    munitions: "Khorramshahr-4 or Kheibar Shekan ballistic missiles (assessed)",
    outcome:
      "7 civilians injured in Bnei Brak and Rosh HaAyin. 1 additional person injured by shrapnel in Tel Aviv. Residential buildings damaged. Sources: ACLED, Times of Israel.",
  },

  {
    id: "mar1-pmf-strikes",
    codename: "PMF Pre-emptive Strikes",
    date: "Mar 1, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "US/Israel Pre-Emptive Strikes on Iraqi PMF Bases",
    description:
      "U.S. and Israeli forces conducted pre-emptive strikes against Iran-backed Popular Mobilization Forces (PMF / Hashd al-Shaabi) bases in Iraq on March 1, aimed at degrading proxy retaliatory capability before it could be activated. Strikes hit the Jurf al-Sakhr stronghold south of Baghdad — a fortified Kataib Hezbollah base from which foreign fighters had been blocked from transiting since 2019 — as well as bases near Samawah in al-Muthanna province in southern Iraq, and checkpoints near Mosul in the north. Multiple PMF fighters were killed. The strikes were conducted without Iraqi government authorization and triggered a formal diplomatic protest from Baghdad, which condemned the attacks as a violation of Iraqi sovereignty. Sources: Al Jazeera, Reuters.",
    launchOrigins: [
      { lat: 31.0,  lng: 34.5,  label: "Israeli Air Force" },
      { lat: 20.5,  lng: 63.0,  label: "USS CVN strike group — Arabian Sea" },
    ],
    targets: [
      { lat: 32.35, lng: 44.15, label: "Jurf al-Sakhr — Kataib Hezbollah stronghold, Iraq" },
      { lat: 31.32, lng: 45.29, label: "Samawah — PMF bases, al-Muthanna province" },
      { lat: 36.34, lng: 43.13, label: "Mosul area — PMF checkpoints" },
    ],
    munitions: "AGM-158 JASSM-ER, GBU-39 SDB, Spice-2000 (assessed)",
    outcome:
      "Multiple PMF fighters killed. Jurf al-Sakhr, Samawah, and Mosul-area PMF bases struck. Iraqi government issued formal diplomatic protest condemning violation of sovereignty. PMF retaliatory capability degraded. Sources: Al Jazeera, Reuters.",
  },

  {
    id: "feb28-erbil-airport",
    codename: "Erbil Airport & Consulate Strike",
    date: "Feb 28, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Erbil Airport & US Consulate Targeted",
    description:
      "On the opening day of the conflict, Iranian drones and Iran-backed Iraqi militia forces struck Erbil International Airport, forcing its temporary closure to commercial and military traffic. The U.S. Consulate General in Erbil — the largest U.S. diplomatic post in Iraq and a key intelligence hub for the region — was targeted in multiple drone attacks that caused damage to perimeter structures. Air defense systems intercepted several additional drones before they reached the main consulate building. The Islamic Resistance in Iraq — an umbrella organization coordinating Kata'ib Hezbollah and other Iranian-backed factions — claimed the attacks, stating they were acting in solidarity with Iran under pre-arranged contingency plans activated at the outbreak of hostilities. Sources: Al Jazeera, Anadolu Agency, Iraqi News.",
    launchOrigins: [
      { lat: 34.35, lng: 46.95, label: "Kermanshah — IRGC Aerospace" },
      { lat: 33.0,  lng: 44.5,  label: "Central Iraq — Iran-backed militia positions" },
    ],
    targets: [
      { lat: 36.24, lng: 44.01, label: "Erbil International Airport, Iraq" },
      { lat: 36.19, lng: 44.00, label: "US Consulate General, Erbil" },
    ],
    munitions: "Shahed-136 kamikaze drones (IRGC-supplied to Iraqi militias and direct IRGC launches)",
    outcome:
      "Erbil Airport temporarily closed. US Consulate perimeter damaged; consulate operations suspended. Air defenses intercepted multiple additional drones. Islamic Resistance in Iraq claimed attacks. Sources: Al Jazeera, Anadolu Agency, Iraqi News.",
  },

  {
    id: "mar1-baghdad-victory",
    codename: "Baghdad Victory Base Strike",
    date: "Mar 1, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Baghdad Victory Base — 4 US Wounded",
    description:
      "Two armed drones struck U.S. Victory Base — also known as Camp Victory — adjacent to Baghdad International Airport on March 1, wounding 4 U.S. service members. The Islamic Resistance in Iraq claimed the attack as part of its pre-arranged contingency plans activated when the U.S.-Israel war on Iran began on February 28. The Iraqi government formally protested the attacks on its territory. Victory Base houses a significant U.S. logistics and advisory presence and had been targeted in numerous previous militia attacks during the 2019–2024 period. The attack further stretched U.S. force protection requirements across the Iraq theater alongside simultaneous strikes in Kuwait, Bahrain, and the UAE. Sources: Al Jazeera.",
    launchOrigins: [
      { lat: 33.0,  lng: 44.5,  label: "Central Iraq — Iran-backed militia positions" },
    ],
    targets: [
      { lat: 33.29, lng: 44.23, label: "Victory Base (Camp Victory), Baghdad" },
    ],
    munitions: "Armed drones (IRGC-supplied to Iraqi militias)",
    outcome:
      "4 US service members wounded. Iraqi government formally protested Iranian-sponsored attacks on its territory. Islamic Resistance in Iraq claimed the strike as coordinated contingency response. Sources: Al Jazeera.",
  },

  {
    id: "beit-shemesh",
    codename: "Strike on Beit Shemesh",
    date: "Mar 1, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Beit Shemesh — 9 Killed, Synagogue Hit",
    description:
      "On the second day of the 2026 Iran War, an Iranian ballistic missile penetrated Israeli air defenses and struck a residential neighborhood in Beit Shemesh, a city of 130,000 approximately 30 km west of Jerusalem. The missile impacted a densely populated residential street adjacent to a synagogue during morning hours; the synagogue's outer wall was partially destroyed. Nine civilians were killed — including two children — and 65 were wounded. It was the deadliest single Iranian strike on Israeli territory in the war. The impact triggered emergency protocols in Jerusalem. Prime Minister Netanyahu convened an emergency cabinet session within the hour, and the IDF expanded its strike authorization in response.",
    launchOrigins: [
      { lat: 35.69, lng: 51.39, label: "Tehran region" },
      { lat: 32.40, lng: 51.38, label: "Isfahan" },
    ],
    targets: [
      { lat: 31.75, lng: 34.99, label: "Beit Shemesh — residential / synagogue" },
    ],
    munitions:
      "Assessed: Kheibar Shekan or Khorramshahr-4 ballistic missile (HE warhead)",
    outcome:
      "9 civilians killed (including 2 children), 65 wounded. Synagogue outer wall destroyed. Apartment building partially collapsed. Deadliest single Iranian strike on Israeli soil in the war. Cabinet authorized expanded target set including Iranian civilian infrastructure in retaliation.",
  },

  {
    id: "mar1-fujairah-dubai",
    codename: "Fujairah & Dubai Strikes",
    date: "Mar 1, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Iran Strikes Fujairah Oil Zone & US Consulate Dubai",
    description:
      "Iranian forces struck the Fujairah Oil Industry Zone on the UAE's eastern coast on March 1, igniting a debris fire at storage and loading infrastructure. Fujairah is a critical refueling and bunkering hub through which a large share of the Gulf's seaborne energy transits. Simultaneously, the U.S. Consulate General in the Al Seef district of Dubai was struck by multiple Iranian drones, causing fires and significant structural damage; the facility had been partially evacuated the previous day. AWS cloud data centers in the UAE and Bahrain were separately targeted by drone strikes, causing regional service outages. The coordinated attack on UAE — a country maintaining diplomatic relations with Iran through the Abraham Accords framework — represented a significant political escalation.",
    launchOrigins: [
      { lat: 32.40, lng: 51.38, label: "Central Iran — IRGC Aerospace" },
    ],
    targets: [
      { lat: 25.11, lng: 56.35, label: "Fujairah Oil Industry Zone, UAE" },
      { lat: 25.22, lng: 55.33, label: "US Consulate General, Al Seef, Dubai" },
      { lat: 25.10, lng: 55.20, label: "AWS data centers, UAE" },
      { lat: 26.24, lng: 50.52, label: "AWS data center, Bahrain" },
    ],
    munitions: "Shahed-136/238 kamikaze drones, assessed Fateh-110 ballistic missile (Fujairah)",
    outcome:
      "Fujairah Oil Industry Zone: debris fire at storage infrastructure; bunkering operations disrupted. US Consulate Dubai struck; fires, significant structural damage. AWS data centers in UAE and Bahrain hit; regional service outages. Casualties not confirmed.",
  },

  {
    id: "true-promise-4",
    codename: "Operation True Promise IV",
    date: "Feb 28, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "True Promise IV — Multi-Theater Retaliation",
    description:
      "Iran's retaliatory response to the opening U.S.-Israeli strikes, launched within hours of Operation Epic Fury on February 28. For the first time in the conflict, Iran simultaneously targeted Israel and U.S. military installations across the entire Gulf region. Approximately 170 ballistic missiles and drones were launched in coordinated waves. In Israel: a missile hit a building in the Haifa area injuring 27; Tel Aviv sirens sounded; Ben Gurion Airport temporarily closed. Across the Gulf: a Dubai hotel caught fire on Palm Jumeirah; Qatar's Doha saw a residential building struck. Bahrain's air-raid sirens sounded nationwide as the 5th Fleet base was targeted. Kuwait Airport reported explosions; 2 people killed at Erbil airport. Jordan intercepted 2 incoming missiles. Ali Al Salem Air Base in Kuwait, Al Dhafra in the UAE, and Al Udeid in Qatar were all targeted. The coordinated, multi-directional salvo was designed to stress regional missile defense networks simultaneously.",
    launchOrigins: [
      { lat: 38.08, lng: 46.29, label: "Tabriz" },
      { lat: 34.35, lng: 46.95, label: "Kermanshah" },
      { lat: 33.52, lng: 48.40, label: "Khorramabad" },
      { lat: 32.40, lng: 51.38, label: "Isfahan" },
      { lat: 36.45, lng: 55.17, label: "Shahrud" },
    ],
    targets: [
      { lat: 32.07, lng: 34.78, label: "Tel Aviv area" },
      { lat: 32.79, lng: 34.98, label: "Haifa area" },
      { lat: 25.20, lng: 55.27, label: "Dubai — Palm Jumeirah" },
      { lat: 26.24, lng: 50.52, label: "NSA Bahrain (5th Fleet)" },
      { lat: 25.12, lng: 51.32, label: "Al Udeid Air Base, Qatar" },
      { lat: 25.28, lng: 51.53, label: "Doha residential" },
      { lat: 24.25, lng: 54.55, label: "Al Dhafra Air Base, UAE" },
      { lat: 29.35, lng: 47.52, label: "Ali Al Salem AB, Kuwait" },
      { lat: 36.19, lng: 44.01, label: "Erbil Airport, Iraq" },
    ],
    munitions:
      "~170 ballistic missiles (Khorramshahr-4, Emad, Kheibar Shekan) and Shahed drones in multi-wave attack",
    outcome:
      "1 killed and 27 injured in Haifa. Dubai hotel fire on Palm Jumeirah. NSA Bahrain damaged. 2 killed at Erbil Airport. Kuwait Airport explosions. Jordan intercepted 2 missiles. First simultaneous Iranian strikes on Israel and all major U.S. Gulf bases in a single operation. U.S. THAAD, Patriot, Israeli Arrow-3 all engaged.",
  },

  {
    id: "opening-salvo",
    codename: "Operation Epic Fury / Roaring Lion",
    date: "Feb 28, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Opening Strikes — Khamenei Killed, 1,000+ Targets",
    description:
      "The opening strike of the 2026 Iran War — launched at approximately 06:35 UTC on February 28 — was the largest coordinated air campaign since Operation Desert Storm. In a synchronized first wave, U.S. forces fired Tomahawk cruise missiles from submarines and destroyers in the Arabian Sea, while B-2 Spirit, B-1B Lancer, and B-52H bombers launched from Diego Garcia. Simultaneously, approximately 200 Israeli jets — the largest IDF sortie in history — flew through Saudi and Jordanian airspace with tacit governmental approval, escorted by tankers and AWACS. F/A-18s from USS Dwight D. Eisenhower and USS George Washington carrier strike groups struck coastal and southwestern Iranian targets. Over 1,000 targets were hit in the first 24 hours. Decapitation strikes killed Supreme Leader Ali Khamenei in a hardened bunker beneath Tehran. IRGC Aerospace Force commander General Amir Ali Hajizadeh and multiple IRGC senior generals were also confirmed killed. The Natanz centrifuge halls were destroyed by GBU-57 Massive Ordnance Penetrators; Fordow's main access shaft was collapsed. Iran's integrated air defense network was suppressed across all regions within 6 hours.",
    launchOrigins: [
      { lat: 31.0, lng: 34.5, label: "Israeli Air Force — 200 jets, Negev bases" },
      { lat: -7.32, lng: 72.42, label: "Diego Garcia — B-2/B-1/B-52" },
      { lat: 20.5, lng: 63.0, label: "USS CVN strike groups — Arabian Sea" },
    ],
    targets: [
      { lat: 35.69, lng: 51.39, label: "Tehran — Khamenei bunker / IRGC HQ" },
      { lat: 32.65, lng: 51.68, label: "Isfahan — missile production complex" },
      { lat: 33.51, lng: 51.73, label: "Natanz — nuclear enrichment facility" },
      { lat: 34.88, lng: 51.59, label: "Fordow — underground nuclear facility" },
      { lat: 38.08, lng: 46.29, label: "Tabriz — air defense and IRGC nodes" },
      { lat: 34.80, lng: 48.51, label: "Hamadan Air Base" },
      { lat: 35.83, lng: 50.99, label: "Karaj — missile R&D facilities" },
      { lat: 34.65, lng: 50.88, label: "Qom — S-300 sites / IRGC logistics" },
      { lat: 34.35, lng: 46.95, label: "Kermanshah — Imam Ali Missile Base" },
    ],
    munitions:
      "GBU-57 Massive Ordnance Penetrator (B-2); Tomahawk Block V (USN); AGM-158 JASSM-ER; Spice-2000 (Israeli); JDAM-ER; AGM-88 HARM; total >1,000 munitions in first wave",
    outcome:
      "Supreme Leader Khamenei killed. IRGC senior commanders killed. Natanz centrifuge halls destroyed. Fordow main shaft collapsed. ~70% of Iran's known ballistic missile production capacity struck. Iran's air defense network suppressed across all regions. Iranian air force unable to mount organized resistance. Widely described as most consequential single-day air operation in history.",
  },

  {
    id: "feb28-minab-school",
    codename: "Minab Girls' School Strike",
    date: "Feb 28, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Minab Girls' School Strike — 165+ Killed",
    description:
      "A U.S. Tomahawk cruise missile struck Shajareh Tayyebeh girls' elementary school in Minab, Hormozgan province, during school hours on February 28. 165 or more people were killed, the overwhelming majority of them girls aged 7 to 12, in what became the deadliest single civilian casualty event of the war. Investigations by CNN, Amnesty International, Human Rights Watch, and BBC Verify concluded the U.S. was likely responsible, with analysts attributing the strike to outdated DIA targeting data that had misidentified the school compound as a nearby IRGC logistics facility. The school's location in Minab — near Bandar Abbas — placed it within a zone of dense targeting activity on Day 1. The strike drew widespread international condemnation and was raised at an emergency UN Security Council session called by Russia and China. The U.S. Department of Defense declined to confirm or deny responsibility, citing an ongoing investigation.",
    launchOrigins: [
      { lat: 20.5, lng: 63.0, label: "USS CVN strike group — Arabian Sea (Tomahawk)" },
    ],
    targets: [
      { lat: 27.19, lng: 57.09, label: "Shajareh Tayyebeh Girls' School, Minab, Hormozgan" },
    ],
    munitions: "Tomahawk Block V cruise missile (assessed — DIA targeting data cited)",
    outcome:
      "165+ killed, 95 injured — mostly girls aged 7–12. Deadliest single civilian casualty event of the 2026 war. CNN, Amnesty, HRW, BBC Verify investigations concluded US responsible via outdated DIA targeting data. Emergency UNSC session called by Russia and China. US DoD declined to confirm or deny responsibility.",
  },

  {
    id: "feb28-lamerd-sports",
    codename: "Lamerd Sports Hall Strike",
    date: "Feb 28, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Lamerd Sports Hall Strike — 21 Killed Including Children",
    description:
      "A U.S. Precision Strike Missile (PrSM) struck a civilian sports hall in Lamerd, Fars province, while a women's volleyball practice was underway. 21 people were killed including 4 children; 100 others were injured. The strike marked the PrSM's first confirmed combat use — the Army's next-generation artillery rocket system replacing the original ATACMS, capable of ranges exceeding 500 km. BBC Verify and New York Times munitions analysts identified the weapon based on distinctive canard fin fragments recovered at the scene and the airburst detonation pattern visible in drone footage. Lamerd sits roughly 60 km inland from the coast and is near no known military installation, suggesting a targeting error or GPS spoofing of the guidance system. Iranian officials cited the strike in subsequent negotiations as evidence of deliberate targeting of civilians.",
    launchOrigins: [
      { lat: 20.5, lng: 63.0, label: "US Army HIMARS — afloat platform or regional ground unit" },
    ],
    targets: [
      { lat: 27.20, lng: 53.19, label: "Lamerd Sports Hall, Fars Province" },
    ],
    munitions: "Precision Strike Missile (PrSM) — first confirmed combat use",
    outcome:
      "21 killed including 4 children, 100 injured. First confirmed combat use of PrSM. BBC Verify and NYT identified weapon via canard fin fragments and airburst pattern. No known military target in vicinity. Iran cited strike in ceasefire negotiations as evidence of civilian targeting.",
  },

  {
    id: "feb28-kuwait-airport",
    codename: "Kuwait Airport Strike",
    date: "Feb 28, 2026",
    year: 2026,
    campaign: "2026 Iran War",
    title: "Iranian Drone Strikes Kuwait International Airport",
    description:
      "An Iranian drone struck Kuwait International Airport's passenger terminal on the opening day of the 2026 Iran War, injuring several employees and causing material damage to the terminal building. Kuwait's civil aviation authority spokesperson confirmed the strike in a public statement. The attack on Kuwait's primary civilian airport — through which hundreds of thousands of passengers transit monthly — was separate from later strikes on Camp Arifjan and Port Shuaiba and the April 1 drone attack on the airport's fuel facility. It represented one of the earliest Iranian strikes on Kuwaiti civilian infrastructure in the conflict, signaling Iran's intent to target Gulf civilian facilities alongside military installations. Source: Al Jazeera.",
    launchOrigins: [
      { lat: 34.35, lng: 46.95, label: "Kermanshah — IRGC Aerospace" },
    ],
    targets: [
      { lat: 29.23, lng: 47.97, label: "Kuwait International Airport — passenger terminal" },
    ],
    munitions: "Shahed-136 kamikaze drone (assessed)",
    outcome:
      "Several airport employees injured. Passenger terminal sustained material damage. Kuwait civil aviation spokesperson confirmed the strike. Airport operations disrupted. Note: separate incident from the Apr 1, 2026 fuel facility strike at the same airport. Source: Al Jazeera.",
  },

  // ── Pre-2026 Operations (reverse chronological) ───────────────────────────

  {
    id: "true-promise-3",
    codename: "Operation True Promise III",
    date: "Jun 2025",
    year: 2025,
    title: "Operation True Promise III — Twelve-Day War",
    description:
      "The largest Iranian missile offensive against Israel prior to the 2026 war, launched as part of the wider 'Twelve-Day War' following a major Israeli ground and air operation against Hezbollah in Lebanon and strikes on Iranian nuclear facilities in May 2025. The IRGC Aerospace Force fired hundreds of ballistic missiles and over 100 drones in coordinated waves targeting Israeli Air Force bases, intelligence facilities, and military headquarters. Israel's multi-layered air defense was partially overwhelmed; several missiles impacted airfields causing significant damage to infrastructure and aircraft. The conflict ended with a ceasefire brokered by Qatar and Oman.",
    launchOrigins: [
      { lat: 38.08, lng: 46.29, label: "Tabriz" },
      { lat: 34.35, lng: 46.95, label: "Kermanshah" },
      { lat: 32.40, lng: 51.38, label: "Isfahan" },
      { lat: 35.23, lng: 53.92, label: "Semnan" },
    ],
    targets: [
      { lat: 31.21, lng: 34.87, label: "Nevatim Air Base" },
      { lat: 31.84, lng: 34.82, label: "Tel Nof Air Base" },
      { lat: 30.78, lng: 34.67, label: "Ramon Air Base" },
      { lat: 32.16, lng: 34.83, label: "Glilot / Intelligence HQ" },
    ],
    munitions: "300+ ballistic missiles (Fattah-1, Kheibar Shekan, Emad), 100+ Shahed drones",
    outcome:
      "Partial saturation of Israeli air defenses. Confirmed damage at Nevatim and Tel Nof runways. Multiple Arrow-3 and THAAD interceptors expended. Ceasefire after 12 days. Exact casualty figures disputed.",
  },

  {
    id: "true-promise-2",
    codename: "Operation True Promise II",
    date: "Oct 1, 2024",
    year: 2024,
    title: "Operation True Promise II",
    description:
      "Iran's second direct strike on Israel, launched in retaliation for the killing of Hezbollah Secretary-General Hassan Nasrallah on September 27, 2024, and the killing of Hamas political leader Ismail Haniyeh in Tehran in July 2024. The IRGC Aerospace Force fired approximately 200 ballistic missiles directly at Israel — the largest ballistic missile salvo against any country since the Iran-Iraq War. Unlike True Promise I, this attack consisted almost entirely of ballistic missiles with no drone saturation layer. Some Emad and Kheibar Shekan missiles penetrated Israeli defenses and impacted on and near Nevatim Air Base, leaving craters on the runway. U.S. THAAD deployed to Israel fired interceptors for the first time in combat.",
    launchOrigins: [
      { lat: 38.08, lng: 46.29, label: "Tabriz" },
      { lat: 33.98, lng: 51.44, label: "Kashan area" },
      { lat: 35.69, lng: 51.39, label: "Tehran area" },
    ],
    targets: [
      { lat: 31.21, lng: 34.87, label: "Nevatim Air Base" },
      { lat: 32.07, lng: 34.78, label: "Tel Aviv area" },
    ],
    munitions: "~200 ballistic missiles (Emad, Kheibar Shekan, Ghadr-1)",
    outcome:
      "Most intercepted by Arrow-3, Arrow-2, David's Sling, U.S. THAAD, and F-35I. Multiple missiles impacted Nevatim runway. No Israeli military fatalities publicly confirmed. THAAD engaged in combat for the first time.",
  },

  {
    id: "true-promise-1",
    codename: "Operation True Promise I",
    date: "Apr 13–14, 2024",
    year: 2024,
    title: "Operation True Promise I",
    description:
      "Iran's first direct military strike on Israeli territory, launched in retaliation for an Israeli airstrike on the Iranian consulate in Damascus on April 1, 2024 that killed seven IRGC officers including two generals. The IRGC Aerospace Force coordinated a combined attack with over 300 munitions: slow-flying Shahed-136 drones launched hours ahead as a saturation layer, Paveh cruise missiles, and a final wave of Emad and Kheibar Shekan ballistic missiles. The attack was largely defeated by a multinational coalition — Israeli Air Force F-35Is and F-15s, U.S. Navy Arleigh Burke destroyers in the eastern Mediterranean, RAF Typhoons from Cyprus, and Jordanian F-16s. Only a handful of ballistic missiles reached Israeli territory; most impacted open areas at Nevatim Air Base.",
    launchOrigins: [
      { lat: 38.08, lng: 46.29, label: "Tabriz" },
      { lat: 33.98, lng: 51.44, label: "Kashan area" },
      { lat: 35.69, lng: 51.39, label: "Tehran area" },
    ],
    targets: [
      { lat: 31.21, lng: 34.87, label: "Nevatim Air Base" },
      { lat: 30.78, lng: 34.67, label: "Ramon Air Base" },
      { lat: 33.1, lng: 35.8, label: "Golan Heights" },
    ],
    munitions:
      "170+ Shahed-136 drones, ~30 Paveh cruise missiles, 120+ ballistic missiles (Emad, Kheibar Shekan)",
    outcome:
      "~99% of munitions intercepted. Minor damage at Nevatim Air Base. One Israeli girl critically injured by falling shrapnel. No combat deaths. Coalition intercepts included U.S. THAAD and Patriot, Israeli Arrow-3, Arrow-2, and David's Sling.",
  },

  {
    id: "ain-al-asad",
    codename: "Operation Martyr Soleimani",
    date: "Jan 8, 2020",
    year: 2020,
    title: "Ain al-Asad Attack",
    description:
      "Iran launched ~16 Qiam-1 ballistic missiles at two Iraqi air bases hosting U.S. forces — Ain al-Asad in Anbar Province and Erbil in the Kurdistan Region — in direct retaliation for the U.S. drone strike that killed IRGC Quds Force commander Qasem Soleimani on January 3. It was the largest ballistic missile attack on U.S. forces in history. Iran gave advance warning through Iraqi government channels, which notified U.S. forces who sheltered in bunkers. No U.S. service members were killed, though over 100 personnel were later diagnosed with traumatic brain injuries.",
    launchOrigins: [
      { lat: 34.3, lng: 47.1, label: "Kermanshah region" },
    ],
    targets: [
      { lat: 33.786, lng: 42.441, label: "Ain al-Asad Air Base" },
      { lat: 36.19, lng: 44.01, label: "Erbil Air Base" },
    ],
    munitions: "~16 × Qiam-1 short-range ballistic missiles",
    outcome:
      "No U.S. fatalities. 109+ service members diagnosed with traumatic brain injuries. Multiple hardened aircraft shelters destroyed. No U.S. or coalition air defense systems engaged the missiles.",
  },
];

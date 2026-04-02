/**
 * Middle East Ballistic Missile & Military Base Data
 *
 * Sources: FAS (Federation of American Scientists), CSIS Missile Threat,
 * NTI (Nuclear Threat Initiative), Jane's Defence, IISS Military Balance,
 * Arms Control Association, open satellite imagery analysis.
 *
 * All data is from publicly available, open-source intelligence.
 * Ranges reflect maximum publicly reported figures for each system.
 */

export type BaseType = "domestic" | "us_allied";
export type SystemType = "ballistic" | "cruise" | "sam" | "thaad" | "mixed";

export interface MissileSystem {
  name: string;
  type: SystemType;
  /** Maximum publicly reported range in kilometers */
  range_km: number;
}

export interface MiddleEastBase {
  name: string;
  lat: number;
  lon: number;
  country: string;
  type: BaseType;
  systems: MissileSystem[];
  description: string;
}

export const MIDDLE_EAST_BASES: MiddleEastBase[] = [
  // ── IRAN ────────────────────────────────────────────────────────────────────

  {
    name: "Shahrud Missile Test Site",
    lat: 36.45,
    lon: 55.17,
    country: "Iran",
    type: "domestic",
    systems: [
      { name: "Khorramshahr-4", type: "ballistic", range_km: 3000 },
      { name: "Sejjil-2", type: "ballistic", range_km: 2000 },
      { name: "Ghadr-1", type: "ballistic", range_km: 1950 },
      { name: "Emad", type: "ballistic", range_km: 1700 },
    ],
    description:
      "Iran's primary long-range ballistic missile test range, operated by the IRGC Aerospace Force. Located in Semnan Province, used to test Sejjil, Khorramshahr, Ghadr, and Emad series missiles. Satellite imagery has confirmed multiple launch pads and underground storage tunnels. The Khorramshahr-4 (Kheibar), Iran's longest-range operational ballistic missile at ~3,000 km with a lighter warhead, has been tested here.",
  },
  {
    name: "Semnan Space & Missile Launch Complex",
    lat: 35.23,
    lon: 53.92,
    country: "Iran",
    type: "domestic",
    systems: [
      { name: "Sejjil-3 / IRBM variant", type: "ballistic", range_km: 4000 },
      { name: "Sejjil-2", type: "ballistic", range_km: 2000 },
      { name: "Ghadr-1", type: "ballistic", range_km: 1950 },
      { name: "Qased SLV", type: "ballistic", range_km: 2500 },
      { name: "Simorgh SLV", type: "ballistic", range_km: 2500 },
    ],
    description:
      "Home to the Imam Khomeini Space Launch Center in Semnan Province. Iran's dual-use space launch program shares technology with its ballistic missile effort. FAS and IAEA analysts note the site's direct applicability to IRBM/ICBM development. An unknown IRBM variant — likely a Sejjil-3 or derivative with an estimated range of ~4,000 km — was reportedly launched from this complex in March 2026 in a strike on Diego Garcia. Also hosts Sejjil-2 and Ghadr-1 garrison units.",
  },
  {
    name: "Kermanshah Missile Base",
    lat: 34.35,
    lon: 46.95,
    country: "Iran",
    type: "domestic",
    systems: [
      { name: "Kheibar Shekan", type: "ballistic", range_km: 1450 },
      { name: "Qiam-1", type: "ballistic", range_km: 800 },
      { name: "Zolfaghar", type: "ballistic", range_km: 700 },
      { name: "Fateh-313", type: "ballistic", range_km: 500 },
    ],
    description:
      "IRGC Aerospace Force base in western Iran, used as a primary launch site in the January 2020 strikes on Ain al-Asad and Erbil air bases in Iraq following the killing of Qasem Soleimani. Also used in the April 2024 strikes on Israel, which included Kheibar Shekan MRBMs. The Kheibar Shekan is a solid-fuel MRBM with a range of ~1,450 km, capable of reaching all of Israel and U.S. bases across the Gulf.",
  },
  {
    name: "Tabriz Missile Base",
    lat: 38.08,
    lon: 46.30,
    country: "Iran",
    type: "domestic",
    systems: [
      { name: "Sejjil-2", type: "ballistic", range_km: 2000 },
      { name: "Haj Qassem", type: "ballistic", range_km: 1400 },
      { name: "Ghadr-1", type: "ballistic", range_km: 1950 },
      { name: "Shahab-3", type: "ballistic", range_km: 1300 },
      { name: "Fateh-110", type: "ballistic", range_km: 300 },
    ],
    description:
      "IRGC regional missile facility in northwestern Iran's East Azerbaijan Province. Part of Iran's hardened underground missile city network in the northwest. Hosts longer-range MRBMs including Sejjil-2 and Ghadr-1, positioned to cover Turkey, the South Caucasus, U.S. bases across the Levant and Gulf, and all of Israel. The Haj Qassem (named after Soleimani) is a solid-fuel MRBM with ~1,400 km range introduced after 2020.",
  },
  {
    name: "Khorramabad Missile Base",
    lat: 33.52,
    lon: 48.40,
    country: "Iran",
    type: "domestic",
    systems: [
      { name: "Kheibar Shekan", type: "ballistic", range_km: 1450 },
      { name: "Emad", type: "ballistic", range_km: 1700 },
      { name: "Zolfaghar", type: "ballistic", range_km: 700 },
      { name: "Shahab-2", type: "ballistic", range_km: 700 },
    ],
    description:
      "IRGC Aerospace Force facility in Lorestan Province, central-western Iran. Confirmed by Iranian state media and FAS analysis as a missile garrison well-positioned for rapid strikes into Iraq and toward Gulf states. Upgraded to host Kheibar Shekan solid-fuel MRBMs and Emad precision-guided MRBMs, significantly extending its strike reach.",
  },
  {
    name: "Isfahan Defense Industries",
    lat: 32.40,
    lon: 51.38,
    country: "Iran",
    type: "domestic",
    systems: [
      { name: "Khorramshahr-4", type: "ballistic", range_km: 3000 },
      { name: "Fattah-1", type: "ballistic", range_km: 1400 },
      { name: "Shahab-3", type: "ballistic", range_km: 1300 },
      { name: "Fateh-110", type: "ballistic", range_km: 300 },
    ],
    description:
      "Major defense industrial hub south of Isfahan, housing missile production, storage, and operational garrison units. Linked to Iran's Defense Industries Organization (DIO). The Fattah-1 — Iran's claimed 'hypersonic' glide vehicle MRBM with ~1,400 km range — is assessed to be based here. Khorramshahr-4 (Kheibar) storage has been identified by satellite imagery. Targeted in Israeli strike operations in October 2024 using long-range drones and air-launched missiles.",
  },
  {
    name: "Bandar Abbas Coastal Missile Sites",
    lat: 27.15,
    lon: 56.18,
    country: "Iran",
    type: "domestic",
    systems: [
      { name: "Noor (anti-ship cruise)", type: "cruise", range_km: 200 },
      { name: "Khalij Fars (ballistic anti-ship)", type: "ballistic", range_km: 300 },
      { name: "Hormuz-1/2", type: "ballistic", range_km: 300 },
    ],
    description:
      "IRGC Navy coastal defense sites near Bandar Abbas and along the Strait of Hormuz. Equipped with anti-ship ballistic and cruise missiles designed to threaten naval vessels transiting the Strait. Part of Iran's layered A2/AD strategy in the Persian Gulf.",
  },

  // ── ISRAEL ──────────────────────────────────────────────────────────────────

  {
    name: "Palmachim Air Base",
    lat: 31.895,
    lon: 34.690,
    country: "Israel",
    type: "domestic",
    systems: [
      { name: "Jericho II", type: "ballistic", range_km: 1800 },
      { name: "Jericho III", type: "ballistic", range_km: 6500 },
      { name: "Arrow-3 (BMD)", type: "sam", range_km: 2400 },
    ],
    description:
      "Israel's primary ballistic missile launch complex on the Mediterranean coast. Confirmed by FAS and commercial satellite imagery as hosting Jericho II and III silos. Also the launch site for Israeli satellite programs (Shavit SLV), and home to an Arrow-3 exo-atmospheric interceptor battery. Considered one of the most sensitive facilities in the Israeli nuclear deterrent.",
  },
  {
    name: "Sdot Micha Air Base",
    lat: 31.699,
    lon: 34.967,
    country: "Israel",
    type: "domestic",
    systems: [
      { name: "Jericho II", type: "ballistic", range_km: 1800 },
      { name: "Jericho III", type: "ballistic", range_km: 6500 },
    ],
    description:
      "Israel's main nuclear-capable ballistic missile garrison, housing hardened underground silos for the Jericho II and III intermediate/intercontinental-range ballistic missiles. Identified by FAS, NRDC, and commercial satellite analysis. The Jericho III is assessed by Western analysts to be capable of reaching targets across the entire Middle East, Russia, and parts of Asia.",
  },
  {
    name: "Tel Nof Air Base",
    lat: 31.839,
    lon: 34.819,
    country: "Israel",
    type: "domestic",
    systems: [
      { name: "Arrow-2", type: "sam", range_km: 90 },
      { name: "Arrow-3", type: "sam", range_km: 2400 },
    ],
    description:
      "Major IAF base and home of the Israeli Air Defense Command. Hosts Arrow-2 and Arrow-3 ballistic missile defense systems developed jointly with the United States. The Arrow-3 system achieved its first operational intercept in October 2024, shooting down Iranian ballistic missiles in exo-atmospheric space.",
  },
  {
    name: "Hatzor Air Base",
    lat: 31.763,
    lon: 34.727,
    country: "Israel",
    type: "domestic",
    systems: [
      { name: "Iron Dome", type: "sam", range_km: 70 },
      { name: "David's Sling", type: "mixed", range_km: 300 },
    ],
    description:
      "IAF base hosting Iron Dome and David's Sling air defense batteries. David's Sling (jointly developed with Raytheon) is designed to intercept medium- to long-range rockets, cruise missiles, and short-range ballistic missiles — filling the gap between Iron Dome and Arrow-2.",
  },

  // ── SAUDI ARABIA ────────────────────────────────────────────────────────────

  {
    name: "Al-Watah Missile Base",
    lat: 21.53,
    lon: 42.73,
    country: "Saudi Arabia",
    type: "domestic",
    systems: [
      { name: "CSS-2 (DF-3A)", type: "ballistic", range_km: 2800 },
      { name: "CSS-5 (DF-21)", type: "ballistic", range_km: 2150 },
    ],
    description:
      "Remote Saudi missile base in the Hejaz Mountains, confirmed by FAS and commercial satellite imagery as housing Chinese-supplied CSS-2 (DF-3A) intermediate-range ballistic missiles and their successor DF-21 medium-range ballistic missiles. Saudi Arabia purchased DF-3A missiles from China in 1987; they are believed to remain operational. The base has seen infrastructure upgrades consistent with DF-21 integration.",
  },
  {
    name: "Al-Sulayyil Missile Base",
    lat: 20.46,
    lon: 45.57,
    country: "Saudi Arabia",
    type: "domestic",
    systems: [
      { name: "CSS-2 (DF-3A)", type: "ballistic", range_km: 2800 },
      { name: "CSS-5 (DF-21)", type: "ballistic", range_km: 2150 },
    ],
    description:
      "Saudi Arabia's second major ballistic missile garrison, located in the Najd plateau. Confirmed by Washington Post (2019) reporting and commercial satellite analysis showing TEL (transporter-erector-launcher) shelters and missile storage facilities. Assessed to house both DF-3A and DF-21 systems. The DF-21 purchase was confirmed by U.S. intelligence officials in 2019.",
  },

  // ── YEMEN / HOUTHIS ─────────────────────────────────────────────────────────

  {
    name: "Sanaa Region Launch Sites",
    lat: 15.35,
    lon: 44.21,
    country: "Yemen (Houthi)",
    type: "domestic",
    systems: [
      { name: "Burqan-2H (Scud-B derivative)", type: "ballistic", range_km: 900 },
      { name: "Quds-1 (cruise)", type: "cruise", range_km: 900 },
      { name: "Toofan-1", type: "ballistic", range_km: 400 },
    ],
    description:
      "Mobile launch areas used by Houthi forces in and around the Sanaa region. The Houthis have fired Burqan-2H ballistic missiles at Riyadh (2017–2018) and launched cruise missiles and drones at UAE and Saudi infrastructure. Systems are largely derived from Iranian Qiam and Shahab technology transferred via Hezbollah networks.",
  },
  {
    name: "Saada Region Launch Sites",
    lat: 16.94,
    lon: 43.76,
    country: "Yemen (Houthi)",
    type: "domestic",
    systems: [
      { name: "Badr-1P (guided rocket)", type: "ballistic", range_km: 160 },
      { name: "Zelzal-3", type: "ballistic", range_km: 200 },
      { name: "Anti-ship cruise missiles", type: "cruise", range_km: 500 },
    ],
    description:
      "Houthi stronghold near the Saudi border used as a key staging area for cross-border ballistic missile and drone attacks. UNSC Panel of Experts reports document Iranian-origin components recovered from missiles launched from this region. Houthi forces also use the Red Sea coastal areas nearby for anti-ship missile attacks.",
  },

  // ── TURKEY ──────────────────────────────────────────────────────────────────

  {
    name: "Roketsan Missile Development Complex",
    lat: 39.97,
    lon: 32.88,
    country: "Turkey",
    type: "domestic",
    systems: [
      { name: "Bora (J-600T)", type: "ballistic", range_km: 280 },
      { name: "Tayfun", type: "ballistic", range_km: 561 },
      { name: "SOM-J (cruise)", type: "cruise", range_km: 250 },
    ],
    description:
      "Turkey's primary missile design and production facility near Ankara, operated by Roketsan. Develops the Bora short-range ballistic missile (combat-proven in Syria and Nagorno-Karabakh), the Tayfun extended-range ballistic missile (561 km), and SOM-series cruise missiles. The Tayfun, unveiled in 2022, extends Turkey's indigenous strike reach significantly.",
  },

  // ── US / ALLIED BASES ────────────────────────────────────────────────────────

  {
    name: "Al Udeid Air Base",
    lat: 25.117,
    lon: 51.315,
    country: "Qatar",
    type: "us_allied",
    systems: [
      { name: "Patriot PAC-3", type: "sam", range_km: 40 },
      { name: "THAAD (periodic deployment)", type: "thaad", range_km: 200 },
    ],
    description:
      "The largest U.S. air base in the Middle East and home of USAF CENTCOM Forward Headquarters. Hosts approximately 10,000 U.S. personnel, B-52 bombers, F-15Es, KC-135 tankers, and AWACS aircraft. A Patriot PAC-3 battery provides local defense. Periodic THAAD deployments have been documented. The base is the hub of all U.S. air operations across the region.",
  },
  {
    name: "Al Dhafra Air Base",
    lat: 24.248,
    lon: 54.547,
    country: "UAE",
    type: "us_allied",
    systems: [
      { name: "Patriot PAC-3", type: "sam", range_km: 40 },
      { name: "THAAD Battery", type: "thaad", range_km: 200 },
    ],
    description:
      "Major U.S. and UAE air base south of Abu Dhabi, hosting U-2 reconnaissance aircraft, F-22 Raptors (rotational), KC-10 tankers, and RQ-4 Global Hawk UAVs. A THAAD battery was deployed here, confirmed by DoD statements and UAE defense ministry releases. Struck by Houthi drone and cruise missile attacks in January 2022.",
  },
  {
    name: "Muwaffaq Salti Air Base",
    lat: 31.832,
    lon: 37.153,
    country: "Jordan",
    type: "us_allied",
    systems: [
      { name: "Patriot PAC-2", type: "sam", range_km: 70 },
    ],
    description:
      "Jordanian air base in the eastern desert (also called Azraq Air Base area), used by U.S. forces for F-16 and MQ-9 operations. Served as a staging base for operations against ISIS. Jordanian Patriot batteries provide air defense. The base was used in the U.S. retaliatory strikes on Iran-backed militia targets in February 2024 following the Tower 22 attack.",
  },
  {
    name: "Ali Al Salem Air Base",
    lat: 29.344,
    lon: 47.521,
    country: "Kuwait",
    type: "us_allied",
    systems: [
      { name: "Patriot PAC-3", type: "sam", range_km: 40 },
    ],
    description:
      "Primary USAF tactical air base in Kuwait, hosting A-10 Warthogs, F/A-18s (rotational), and C-130 transport aircraft. Patriot PAC-3 provides theater ballistic missile defense. Serves as a key logistics and airlift hub for U.S. Central Command operations.",
  },
  {
    name: "Camp Arifjan",
    lat: 29.081,
    lon: 48.109,
    country: "Kuwait",
    type: "us_allied",
    systems: [
      { name: "Patriot PAC-3", type: "sam", range_km: 40 },
      { name: "THAAD (periodic)", type: "thaad", range_km: 200 },
    ],
    description:
      "Major U.S. Army installation in Kuwait and headquarters of ARCENT (Army Central). Houses prepositioned armor, logistics, and command elements. Patriot PAC-3 batteries are permanently based here. A key staging ground for any large-scale ground operations in the Gulf theater.",
  },
  {
    name: "Incirlik Air Base",
    lat: 37.002,
    lon: 35.426,
    country: "Turkey",
    type: "us_allied",
    systems: [
      { name: "B61 gravity bombs (NATO nuclear share)", type: "ballistic", range_km: 0 },
      { name: "Patriot PAC-3 (Turkish-operated)", type: "sam", range_km: 40 },
    ],
    description:
      "NATO air base in southern Turkey and one of six NATO nuclear sharing sites. Estimated to host approximately 50 B61 nuclear gravity bombs under the NATO nuclear sharing arrangement, confirmed by FAS and Hans Kristensen's analyses. Hosts U.S. 39th Air Base Wing, KC-135 tankers, and periodic fighter deployments. Access was suspended by Turkey briefly during 2016 coup attempt.",
  },
  {
    name: "Kürecik Radar Station (AN/TPY-2)",
    lat: 38.693,
    lon: 38.343,
    country: "Turkey",
    type: "us_allied",
    systems: [
      { name: "AN/TPY-2 Forward-Based Mode Radar", type: "thaad", range_km: 2000 },
    ],
    description:
      "NATO early-warning radar installation near Malatya, housing a U.S. Army AN/TPY-2 X-band radar in forward-based mode. Provides early detection of ballistic missile launches from Iran and feeds targeting data to Aegis BMD ships and European Phased Adaptive Approach systems. Declared operational in 2012. Operated by U.S. personnel under bilateral U.S.-Turkey agreement.",
  },
  {
    name: "Naval Support Activity Bahrain",
    lat: 26.222,
    lon: 50.591,
    country: "Bahrain",
    type: "us_allied",
    systems: [
      { name: "Patriot PAC-3", type: "sam", range_km: 40 },
      { name: "Aegis BMD (5th Fleet vessels)", type: "sam", range_km: 700 },
    ],
    description:
      "Headquarters of U.S. Naval Forces Central Command (NAVCENT) and the U.S. Fifth Fleet. Hosts Arleigh Burke-class destroyers equipped with Aegis Ballistic Missile Defense systems, providing shipborne intercept capability across the Gulf. A key node for maritime security operations, mine countermeasures, and regional naval coordination.",
  },
  {
    name: "Thumrait Air Base",
    lat: 17.666,
    lon: 54.024,
    country: "Oman",
    type: "us_allied",
    systems: [
      { name: "Patriot PAC-2 (RSAF-Oman)", type: "sam", range_km: 70 },
    ],
    description:
      "Major Omani air base in Dhofar Province with longstanding access agreements for U.S. and British forces. Used by RAF and USAF for logistics, maritime patrol, and ISR operations. Located near the Arabian Sea coast, providing strategic access to the Indian Ocean and Gulf of Aden sea lanes.",
  },
  {
    name: "Al Musannah Air Base",
    lat: 23.671,
    lon: 57.551,
    country: "Oman",
    type: "us_allied",
    systems: [
      { name: "Patriot PAC-2 (RSAF-Oman)", type: "sam", range_km: 70 },
    ],
    description:
      "Omani air base on the Gulf of Oman coast used for joint U.S. and coalition training exercises. Hosts the biennial Exercise Magic Carpet with U.S. CENTCOM. Strategically positioned to monitor the Strait of Hormuz and support maritime operations.",
  },
  {
    name: "Prince Sultan Air Base",
    lat: 24.062,
    lon: 47.581,
    country: "Saudi Arabia",
    type: "us_allied",
    systems: [
      { name: "Patriot PAC-3", type: "sam", range_km: 40 },
      { name: "THAAD Battery", type: "thaad", range_km: 200 },
    ],
    description:
      "Large Saudi air base southeast of Riyadh, reactivated for U.S. forces in 2019 following attacks on Saudi oil infrastructure. Hosts U.S. Air Force F-15s, AWACS aircraft, and a THAAD battery. The base previously housed U.S. forces from 1990–2003 during Desert Shield/Storm and Operation Southern Watch before being vacated at Saudi request.",
  },
  {
    name: "Ain al-Asad Air Base",
    lat: 33.786,
    lon: 42.441,
    country: "Iraq",
    type: "us_allied",
    systems: [
      { name: "C-RAM (Counter-Rocket)", type: "sam", range_km: 5 },
      { name: "Patriot PAC-3 (periodic)", type: "sam", range_km: 40 },
    ],
    description:
      "Largest air base in Iraq, in Anbar Province. Struck by at least 15 Iranian Qiam-1 ballistic missiles on January 8, 2020 in retaliation for the killing of IRGC commander Qasem Soleimani — the largest ballistic missile attack on U.S. forces in history. Resulted in over 100 U.S. personnel diagnosed with traumatic brain injuries. Hosts U.S. and coalition forces supporting Iraqi security forces.",
  },
  {
    name: "Erbil Air Base",
    lat: 36.237,
    lon: 43.963,
    country: "Iraq",
    type: "us_allied",
    systems: [
      { name: "C-RAM (Counter-Rocket)", type: "sam", range_km: 5 },
      { name: "Patriot PAC-3 (periodic)", type: "sam", range_km: 40 },
    ],
    description:
      "U.S. and coalition base adjacent to Erbil International Airport in the Kurdistan Region of Iraq. Targeted in the January 2020 Iranian ballistic missile strikes and again in January 2024 by IRGC ballistic missiles. Houses OIR (Operation Inherent Resolve) advisory and training missions. IRGC-claimed strikes on January 15, 2024 were acknowledged to have struck near a CIA-linked facility.",
  },
];

/** Helper: get all bases for a given country */
export function getBasesByCountry(country: string): MiddleEastBase[] {
  return MIDDLE_EAST_BASES.filter((b) => b.country === country);
}

/** Helper: get all domestic missile programs */
export function getDomesticBases(): MiddleEastBase[] {
  return MIDDLE_EAST_BASES.filter((b) => b.type === "domestic");
}

/** Helper: get all US/allied bases */
export function getAlliedBases(): MiddleEastBase[] {
  return MIDDLE_EAST_BASES.filter((b) => b.type === "us_allied");
}

/** All unique countries represented in the dataset */
export const MIDDLE_EAST_COUNTRIES = [
  ...new Set(MIDDLE_EAST_BASES.map((b) => b.country)),
];

/**
 * Iranian Missile Strike History
 *
 * Documented IRGC Aerospace Force ballistic missile operations.
 * Sources: CSIS Missile Defense Project, FAS, open-source imagery,
 * DoD statements, UNSC Panel of Experts reports.
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
}

export const IRAN_STRIKES: IranStrike[] = [
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
      "Most intercepted by Arrow-3, Arrow-2, David's Sling, U.S. THAAD, and F-35I. Multiple missiles impacted Nevatim runway and nearby areas. No Israeli military fatalities publicly confirmed. THAAD engaged in combat for the first time.",
  },
  {
    id: "true-promise-3",
    codename: "Operation True Promise III",
    date: "Jun 2025",
    year: 2025,
    title: "Operation True Promise III — Twelve-Day War",
    description:
      "The largest Iranian missile offensive against Israel, launched as part of the wider 'Twelve-Day War' conflict following a major Israeli ground and air operation against Hezbollah in Lebanon and strikes on Iranian nuclear facilities in May 2025. The IRGC Aerospace Force fired hundreds of ballistic missiles and over 100 drones in coordinated waves targeting Israeli Air Force bases, intelligence facilities, and military headquarters. Israel's multi-layered air defense was partially overwhelmed; several missiles impacted airfields causing significant damage to infrastructure and aircraft. The conflict ended with a ceasefire brokered by Qatar and Oman.",
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
    munitions:
      "300+ ballistic missiles (Fattah-1, Kheibar Shekan, Emad), 100+ Shahed drones",
    outcome:
      "Partial saturation of Israeli air defenses. Confirmed damage at Nevatim and Tel Nof runways. Multiple Arrow-3 and THAAD interceptors expended. Ceasefire declared after 12 days. Exact casualty figures disputed.",
  },
  {
    id: "true-promise-4",
    codename: "Operation True Promise IV",
    date: "Feb 28, 2026",
    year: 2026,
    title: "Operation True Promise IV — Regional Strike",
    description:
      "Iran's most expansive missile offensive to date, launched in direct retaliation for a joint U.S.-Israeli strike campaign in February 2026 that killed Supreme Leader Ali Khamenei and IRGC senior commanders. For the first time, Iran simultaneously targeted both Israel and U.S. military installations across the Gulf and Middle East. Hundreds of ballistic missiles were fired at five U.S. military bases — in Bahrain, Qatar, UAE, Kuwait, and Iraq — as well as at Israeli military sites. The coordinated, multi-directional salvo was designed to stress regional missile defense networks simultaneously.",
    launchOrigins: [
      { lat: 38.08, lng: 46.29, label: "Tabriz" },
      { lat: 34.35, lng: 46.95, label: "Kermanshah" },
      { lat: 33.52, lng: 48.40, label: "Khorramabad" },
      { lat: 32.40, lng: 51.38, label: "Isfahan" },
      { lat: 36.45, lng: 55.17, label: "Shahrud" },
    ],
    targets: [
      { lat: 31.21, lng: 34.87, label: "Nevatim Air Base, Israel" },
      { lat: 32.07, lng: 34.78, label: "Tel Aviv area" },
      { lat: 26.24, lng: 50.52, label: "NSA Bahrain (5th Fleet)" },
      { lat: 25.12, lng: 51.32, label: "Al Udeid Air Base, Qatar" },
      { lat: 24.25, lng: 54.55, label: "Al Dhafra Air Base, UAE" },
      { lat: 29.35, lng: 47.52, label: "Ali Al Salem AB, Kuwait" },
      { lat: 33.786, lng: 42.441, label: "Ain al-Asad AB, Iraq" },
    ],
    munitions:
      "400+ ballistic missiles (Khorramshahr-4, Sejjil-2, Emad, Kheibar Shekan); Shahed drones as saturation layer",
    outcome:
      "Significant damage at Al Udeid and Al Dhafra. Several U.S. and coalition casualties. THAAD batteries at Prince Sultan, Al Udeid, and Al Dhafra engaged. Arrow-3 and Patriot defended Israeli territory. The strike marked the first successful ballistic missile impacts on American military installations in the Gulf.",
  },
  {
    id: "diego-garcia",
    codename: "Operation Distant Thunder",
    date: "Mar 20, 2026",
    year: 2026,
    title: "Diego Garcia Strike Attempt",
    description:
      "Iran attempted the farthest ballistic missile strike in history, firing two IRBM-class missiles (assessed as Sejjil-3 variants or an as-yet-undesignated IRBM) at the joint U.S.-UK military base on Diego Garcia, a coral atoll in the British Indian Ocean Territory ~3,900 km from the Iranian coast. The strike targeted B-2 stealth bombers and B-52s that had been operating from Diego Garcia in support of U.S. strikes on Iranian nuclear and leadership targets. The missiles were tracked from launch at Semnan by U.S. space-based infrared sensors and an AN/TPY-2 radar network. One missile failed in flight approximately 800 km after launch; the second was intercepted by a U.S. Navy SM-3 Block IIA fired from USS Gravely in the Arabian Sea.",
    launchOrigins: [
      { lat: 35.56, lng: 53.39, label: "Semnan Launch Complex" },
    ],
    targets: [
      { lat: -7.32, lng: 72.42, label: "Diego Garcia (BIOT)" },
    ],
    munitions: "2 × Sejjil-3 / IRBM variant (~4,000 km range)",
    outcome:
      "Both missiles failed to reach target — one in-flight failure, one intercepted by USS Gravely SM-3 Block IIA. No damage to Diego Garcia. Marked Iran's longest-range strike attempt and demonstrated IRBM operational capability exceeding previous publicly acknowledged ranges.",
  },
  {
    id: "arad-dimona",
    codename: "Operation Shadow Strike",
    date: "Mar 22, 2026",
    year: 2026,
    title: "Arad / Dimona Strikes",
    description:
      "Two days after the Diego Garcia attempt, Iran launched a precision ballistic missile strike at the Negev Desert region of southern Israel, with missiles impacting in and around the towns of Arad and Dimona — the latter located approximately 13 km from the Shimon Peres Negev Nuclear Research Center (Dimona nuclear reactor). Iranian state media claimed the strike was a deliberate 'warning shot' against Israel's nuclear infrastructure. The missiles used were assessed to carry unitary high-explosive warheads; Israeli emergency responders also found evidence of cluster submunition dispensers in one impact area. 180+ civilians were wounded; Israeli authorities confirmed structural damage in Arad.",
    launchOrigins: [
      { lat: 32.40, lng: 51.38, label: "Isfahan" },
      { lat: 36.45, lng: 55.17, label: "Shahrud" },
    ],
    targets: [
      { lat: 31.26, lng: 35.21, label: "Arad, Negev" },
      { lat: 31.07, lng: 35.04, label: "Dimona / Negev NRC vicinity" },
    ],
    munitions:
      "Ballistic missiles assessed as Emad or Khorramshahr variant; cluster submunition payload confirmed in one warhead",
    outcome:
      "180+ civilians wounded in Arad. Significant structural damage to residential areas. Israel's Iron Dome and David's Sling intercepted additional missiles; 2–3 impacted the target area. International condemnation for use of cluster munitions in populated areas.",
  },
];

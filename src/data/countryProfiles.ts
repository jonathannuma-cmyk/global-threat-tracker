/**
 * Middle East Country Profiles
 *
 * Air defense, air force, and alliance data for key regional actors.
 * Missile/base data is NOT duplicated here — see middleEastMissiles.ts.
 * Sources: IISS Military Balance 2024, SIPRI, open-source defense reporting.
 */

export interface AirDefenseSystem {
  name: string;
  type: string;
  range_km: number;
  status: string;
  notes?: string;
}

export interface Aircraft {
  name: string;
  role: string;
  quantity: string;
  notes?: string;
}

export interface CountryProfile {
  name: string;
  flag: string;
  overview: string;
  airDefense?: {
    systems: AirDefenseSystem[];
  };
  airForce?: {
    aircraft: Aircraft[];
  };
  alliances?: string[];
}

export const COUNTRY_PROFILES: Record<string, CountryProfile> = {
  Iran: {
    name: "Iran",
    flag: "🇮🇷",
    overview:
      "The Islamic Republic of Iran fields the largest ballistic missile arsenal in the Middle East, developed since the Iran-Iraq War as an asymmetric deterrent against U.S. and Israeli air superiority. Iran's defense posture is built around A2/AD: layered air defenses, proxy networks, and a deep missile force capable of ranging targets from the Mediterranean to the Indian Ocean. The IRGC Aerospace Force controls strategic missiles independently of the conventional military. Iran's nuclear program — particularly uranium enrichment above 60% at Fordow and Natanz — has been the central flashpoint of regional tension since the collapse of the JCPOA in 2018.",
    airDefense: {
      systems: [
        {
          name: "S-300PMU-2 (Favorit)",
          type: "Long-range SAM",
          range_km: 200,
          status: "Operational",
          notes: "Delivered 2016 after decade-long embargo; 4+ batteries protecting Tehran, Fordow, Isfahan.",
        },
        {
          name: "Bavar-373",
          type: "Long-range SAM (indigenous)",
          range_km: 200,
          status: "Operational",
          notes: "Iranian S-300 equivalent. Unveiled 2019; claimed to match S-300 performance. Limited production numbers.",
        },
        {
          name: "Khordad-15",
          type: "Medium-range SAM",
          range_km: 120,
          status: "Operational",
          notes: "Shot down U.S. RQ-4A Global Hawk in June 2019. Claimed radar tracks stealth aircraft.",
        },
        {
          name: "Raad (Ra'ad)",
          type: "Medium-range SAM",
          range_km: 50,
          status: "Operational",
          notes: "Indigenous system. Widely deployed; forms backbone of medium-layer defense.",
        },
        {
          name: "Tor-M1 (SA-15)",
          type: "Short-range SAM",
          range_km: 12,
          status: "Operational",
          notes: "29 units acquired from Russia 2007. Tragically shot down Ukraine International Airlines Flight 752 in Jan 2020.",
        },
        {
          name: "Mersad / Shahin",
          type: "Short-range SAM",
          range_km: 40,
          status: "Operational",
          notes: "Domestically upgraded Hawk system. Widely distributed.",
        },
        {
          name: "HQ-2 / SA-2 Guideline",
          type: "Legacy SAM",
          range_km: 45,
          status: "Limited service",
          notes: "Soviet-era; indigenously upgraded. Being phased out.",
        },
      ],
    },
    airForce: {
      aircraft: [
        {
          name: "F-14A Tomcat",
          role: "Air superiority / intercept",
          quantity: "~30–40 airworthy (of 79 received)",
          notes: "U.S.-supplied pre-revolution. Heavily cannibalized for parts; operational numbers disputed.",
        },
        {
          name: "MiG-29A/UB Fulcrum",
          role: "Air superiority",
          quantity: "~20–25",
          notes: "Soviet-supplied during Iran-Iraq War via defection and purchase.",
        },
        {
          name: "F-4D/E Phantom II",
          role: "Multi-role / strike",
          quantity: "~50–60",
          notes: "Pre-revolution U.S. supply. Significantly life-extended; serviceability low.",
        },
        {
          name: "F-5E/F Tiger II",
          role: "Light combat / trainer",
          quantity: "~60",
          notes: "Also used in Kowsar, Iran's indigenous copy.",
        },
        {
          name: "Su-24MK Fencer",
          role: "Strike / interdiction",
          quantity: "~20",
          notes: "Soviet-era; flown to Iran by Iraqi pilots during Gulf War and retained.",
        },
        {
          name: "Su-25K/UBK Frogfoot",
          role: "Close air support",
          quantity: "~10",
          notes: "Iraqi aircraft retained post-1991.",
        },
        {
          name: "Kowsar",
          role: "Light combat",
          quantity: "~25+",
          notes: "Indigenous F-5 copy. In production for IRIAF and IRGC Air Force.",
        },
        {
          name: "Saeqeh",
          role: "Light combat",
          quantity: "~12–15",
          notes: "Twin-tail F-5 derivative. Limited performance; primarily symbolic.",
        },
        {
          name: "Su-35S Flanker-E",
          role: "Air superiority",
          quantity: "~24 ordered",
          notes: "Deal reportedly finalized 2022–2023; deliveries status unclear as of 2025.",
        },
      ],
    },
    alliances: [
      "Axis of Resistance (Hezbollah, Hamas, Houthis, Iraqi PMF)",
      "SCO (observer/member 2023)",
      "Strategic partnership with Russia and China",
      "CSTO observer",
    ],
  },

  Israel: {
    name: "Israel",
    flag: "🇮🇱",
    overview:
      "Israel operates the most sophisticated layered missile defense architecture in the world, built over decades with direct U.S. partnership. The Israeli Air Force fields fourth- and fifth-generation combat aircraft and is the only regional power confirmed to possess nuclear weapons (~90 warheads, undeclared). Israel maintains a policy of nuclear ambiguity. The IDF's offensive capability includes long-range precision strike, electronic warfare, and cyber operations. Israel has conducted hundreds of airstrikes in Syria, Iraq, and Gaza, and has struck Iranian targets in Syria and Iran itself.",
    airDefense: {
      systems: [
        {
          name: "Arrow-3",
          type: "Exo-atmospheric interceptor",
          range_km: 2400,
          status: "Operational",
          notes: "Intercepts ballistic missiles outside the atmosphere. Engaged Iranian missiles in Oct 2024 and Jun 2025.",
        },
        {
          name: "Arrow-2",
          type: "Endo-atmospheric interceptor",
          range_km: 90,
          status: "Operational",
          notes: "Terminal-phase BM defense. Works in conjunction with Arrow-3 for layered BMD.",
        },
        {
          name: "David's Sling (Magic Wand)",
          type: "Medium-to-long range SAM",
          range_km: 300,
          status: "Operational",
          notes: "Targets cruise missiles, large rockets, short-range ballistic missiles. Co-developed with Raytheon.",
        },
        {
          name: "Iron Dome",
          type: "Short-range rocket defense",
          range_km: 70,
          status: "Operational",
          notes: "10 batteries deployed; intercepts rockets, artillery, mortars. ~90% success rate in combat.",
        },
        {
          name: "Patriot PAC-3",
          type: "Medium-range SAM / BMD",
          range_km: 100,
          status: "Operational",
          notes: "Multiple batteries; U.S.-supplied. Provides additional mid-tier intercept capability.",
        },
        {
          name: "U.S. THAAD (deployed)",
          type: "High-altitude BMD",
          range_km: 200,
          status: "Deployed Oct 2024",
          notes: "U.S. Army THAAD battery and ~100 troops deployed to Israel after True Promise II. First THAAD combat firing.",
        },
      ],
    },
    airForce: {
      aircraft: [
        {
          name: "F-35I Adir",
          role: "Stealth multi-role / strike",
          quantity: "~36 (up to 75 ordered)",
          notes: "Israeli-customized F-35A with domestic EW and avionics integration. Used to strike Iranian targets in Syria.",
        },
        {
          name: "F-15I Ra'am",
          role: "Long-range strike",
          quantity: "~25",
          notes: "Most capable strike platform for long-range missions to Iran. Carries SPICE-2000 and Rampage missiles.",
        },
        {
          name: "F-15C/D Baz",
          role: "Air superiority",
          quantity: "~25",
          notes: "Air-to-air dedicated variant. Equipped with Israeli radar and missile upgrades.",
        },
        {
          name: "F-16I Sufa",
          role: "Multi-role strike",
          quantity: "~100",
          notes: "Backbone of the IAF strike fleet. Carries conformal fuel tanks for extended range.",
        },
        {
          name: "F-16C/D Barak",
          role: "Multi-role",
          quantity: "~60",
          notes: "Older F-16 variant. Being partially supplemented by additional F-35Is.",
        },
      ],
    },
    alliances: [
      "U.S. (MOU: $3.8B/year FMF through 2028)",
      "Abraham Accords: UAE, Bahrain, Morocco, Sudan (normalized 2020)",
      "Greece and Cyprus (defense partnership)",
      "India (growing defense-industrial cooperation)",
    ],
  },

  "Saudi Arabia": {
    name: "Saudi Arabia",
    flag: "🇸🇦",
    overview:
      "Saudi Arabia operates one of the largest and best-funded military establishments in the Middle East, anchored by U.S. security guarantees and arms sales. The Royal Saudi Air Defense Forces maintain an extensive SAM network to protect critical oil infrastructure and major cities, which have been targeted repeatedly by Houthi ballistic missiles and drones from Yemen since 2015. Saudi Arabia has been in discussions with the U.S. regarding a formal security treaty and is exploring civilian nuclear cooperation with the U.S. and China. Riyadh is considering its own enrichment capability in response to Iran's program.",
    airDefense: {
      systems: [
        {
          name: "Patriot PAC-2/PAC-3",
          type: "Medium-long range SAM / BMD",
          range_km: 160,
          status: "Operational",
          notes: "Multiple batteries. Has intercepted hundreds of Houthi ballistic missiles since 2015, with mixed results.",
        },
        {
          name: "THAAD",
          type: "High-altitude BMD",
          range_km: 200,
          status: "Operational",
          notes: "Two THAAD batteries acquired. Protect Riyadh and critical oil installations (Abqaiq, Khurais).",
        },
        {
          name: "Hawk PIP",
          type: "Medium-range SAM",
          range_km: 45,
          status: "Operational",
          notes: "Widely deployed legacy system. Being supplemented by newer acquisitions.",
        },
        {
          name: "Shahine",
          type: "Short-range SAM",
          range_km: 12,
          status: "Operational",
          notes: "French-supplied Crotale derivative on tracked vehicle. Protects airfields and mobile formations.",
        },
        {
          name: "VSHORAD (Mistral / Stinger)",
          type: "Very short-range air defense",
          range_km: 6,
          status: "Operational",
          notes: "Point defense of critical installations.",
        },
      ],
    },
    airForce: {
      aircraft: [
        {
          name: "F-15SA Advanced Eagle",
          role: "Multi-role strike",
          quantity: "~84",
          notes: "Most advanced F-15 variant exported. AESA radar, CFTs, dual-role capability.",
        },
        {
          name: "F-15S",
          role: "Multi-role strike",
          quantity: "~70",
          notes: "Earlier variant. Combined fleet gives Saudi Arabia one of the world's largest F-15 fleets.",
        },
        {
          name: "Eurofighter Typhoon",
          role: "Air superiority / multi-role",
          quantity: "~72",
          notes: "72 ordered; UK-supplied under Salam contract. Gaining Meteor BVRAAM capability.",
        },
        {
          name: "Tornado IDS/ADV",
          role: "Strike / intercept",
          quantity: "~75 (declining)",
          notes: "UK-supplied Cold War era. Being phased out as Typhoons and F-15SAs come online.",
        },
        {
          name: "F-5E/F",
          role: "Training / light combat",
          quantity: "~80",
          notes: "Used primarily for training and light missions.",
        },
      ],
    },
    alliances: [
      "GCC (founding member)",
      "U.S. (SOFA, Dhahran Air Base access)",
      "Arab League",
      "China (HuaWei 5G; considering nuclear cooperation)",
      "OPEC+ (strategic energy coordination with Russia)",
    ],
  },

  Turkey: {
    name: "Turkey",
    flag: "🇹🇷",
    overview:
      "Turkey occupies a uniquely complex strategic position: a NATO member hosting U.S. nuclear weapons at Incirlik Air Base (~50 B61 gravity bombs), yet operating Russian-supplied S-400 air defense systems. This S-400 purchase led to Turkey's ejection from the F-35 program in 2019. Turkey maintains the second-largest standing military in NATO and has become a major drone exporter (Bayraktar TB2) while pursuing greater defense-industrial independence. The Turkish Air Force is seeking to acquire F-16V Block 70s and is developing its indigenous KAAN stealth fighter.",
    airDefense: {
      systems: [
        {
          name: "S-400 Triumf",
          type: "Long-range SAM",
          range_km: 400,
          status: "In inventory, not fully activated",
          notes: "4 batteries received 2019–2020. Turkey has not activated due to NATO pressure and risk of CAATSA sanctions.",
        },
        {
          name: "HİSAR-A+",
          type: "Short-range SAM",
          range_km: 15,
          status: "Operational",
          notes: "Indigenous system by Aselsan/Roketsan. Replacing legacy Rapier and Stinger.",
        },
        {
          name: "HİSAR-O+",
          type: "Medium-range SAM",
          range_km: 25,
          status: "Operational",
          notes: "Extended range variant. Part of Turkey's indigenous AD layering program.",
        },
        {
          name: "SİPER Block I",
          type: "Long-range SAM (indigenous)",
          range_km: 100,
          status: "Development / initial IOC",
          notes: "Turkey's S-400 replacement program. Block II targeting 150+ km range.",
        },
        {
          name: "Patriot (not acquired)",
          type: "N/A",
          range_km: 0,
          status: "Negotiations failed",
          notes: "Turkey sought Patriots but U.S. refused technology transfer demands; Turkey then acquired S-400.",
        },
        {
          name: "Rapier / I-HAWK",
          type: "Legacy medium SAM",
          range_km: 45,
          status: "Phasing out",
          notes: "Cold War-era systems being replaced by indigenous HİSAR family.",
        },
      ],
    },
    airForce: {
      aircraft: [
        {
          name: "F-16C/D Block 50/52+",
          role: "Multi-role",
          quantity: "~200+",
          notes: "Backbone of the TurAF. Turkey seeking Block 70 upgrade (Link-16, AESA, JHMCS II).",
        },
        {
          name: "F-4E Phantom (2020 Terminator)",
          role: "Strike / reconnaissance",
          quantity: "~30 (declining)",
          notes: "Heavily upgraded variant. Being phased out.",
        },
        {
          name: "KAAN (TF-X)",
          role: "5th-gen multi-role (in development)",
          quantity: "Prototype flying",
          notes: "First flight Jan 2023. IOC target ~2028. Engine dependency on GE F110 unresolved.",
        },
        {
          name: "Bayraktar Akıncı",
          role: "UCAV / strike",
          quantity: "~30+",
          notes: "High-altitude long-endurance UCAV. Carries SOM cruise missile and MAM-C/L.",
        },
        {
          name: "Bayraktar TB2",
          role: "UCAV / reconnaissance",
          quantity: "~100+",
          notes: "Combat-proven in Libya, Syria, Nagorno-Karabakh, Ukraine.",
        },
      ],
    },
    alliances: [
      "NATO (member since 1952, hosts Incirlik AB with ~50 U.S. B61 nuclear bombs)",
      "Turkic Council / OTS",
      "SCO (dialogue partner)",
      "Russia (TurkStream gas pipeline, S-400 purchase — complicated relationship)",
    ],
  },

  UAE: {
    name: "UAE",
    flag: "🇦🇪",
    overview:
      "The United Arab Emirates fields a compact but highly capable military, heavily armed with U.S., French, and other Western systems. The UAE was the first country in the world to operationally deploy THAAD when batteries were delivered in 2017. The 2020 Abraham Accords normalized UAE-Israel relations, enabling new defense cooperation. The UAE withdrew from the Saudi-led Yemen coalition in 2019 but maintains its own regional posture. Abu Dhabi is developing a civilian nuclear power program (Barakah plant, operational 2021) — the first in the Arab world — using Korean APR-1400 reactors.",
    airDefense: {
      systems: [
        {
          name: "THAAD",
          type: "High-altitude BMD",
          range_km: 200,
          status: "Operational",
          notes: "2 batteries. First country to operationally deploy THAAD outside U.S. Protects Abu Dhabi and Al Dhafra AB.",
        },
        {
          name: "Patriot PAC-3 MSE",
          type: "Medium-range SAM / BMD",
          range_km: 100,
          status: "Operational",
          notes: "Multiple batteries. UAE sought to upgrade to PAC-3 MSE for enhanced BMD capability.",
        },
        {
          name: "Hawk XXI",
          type: "Medium-range SAM",
          range_km: 45,
          status: "Operational",
          notes: "Modernized Hawk variant. Widespread deployment.",
        },
        {
          name: "Mistral SHORAD",
          type: "Very short-range SAM",
          range_km: 6,
          status: "Operational",
          notes: "French-supplied man-portable and vehicle-mounted.",
        },
      ],
    },
    airForce: {
      aircraft: [
        {
          name: "F-16E/F Block 60 Desert Falcon",
          role: "Multi-role strike",
          quantity: "~79",
          notes: "Most advanced F-16 ever built; UAE-specific configuration with conformal tanks, AESA radar, and FLIR.",
        },
        {
          name: "Dassault Mirage 2000-9",
          role: "Multi-role",
          quantity: "~62",
          notes: "French-supplied. Upgraded with RDY-2 radar and MICA missiles.",
        },
        {
          name: "F-35A (pending)",
          role: "Stealth multi-role",
          quantity: "50 ordered",
          notes: "Sale approved 2020 as part of Abraham Accords package. Paused 2022 over Huawei 5G concerns; renegotiating.",
        },
        {
          name: "Dassault Rafale",
          role: "Multi-role",
          quantity: "80 ordered",
          notes: "Contract signed Dec 2021. Deliveries ongoing.",
        },
        {
          name: "MALE UCAVs (Yabhon, Wing Loong)",
          role: "UCAV / ISR",
          quantity: "~30+",
          notes: "UAE-indigenous Yabhon and Chinese-supplied Wing Loong II.",
        },
      ],
    },
    alliances: [
      "GCC (founding member)",
      "U.S. (SOFA; Al Dhafra AB hosts U.S. Air Force)",
      "Abraham Accords (Israel, 2020)",
      "France (defense treaty; Mirage/Rafale supply)",
      "India (Comprehensive Strategic Partnership)",
    ],
  },

  Qatar: {
    name: "Qatar",
    flag: "🇶🇦",
    overview:
      "Qatar hosts the largest U.S. military base in the Middle East — Al Udeid Air Base — housing the USAF Air Operations Center for CENTCOM and approximately 10,000 U.S. personnel. This makes Qatar central to U.S. power projection across the region while simultaneously giving it leverage in diplomacy. Qatar maintains complex relationships, functioning as a mediator between Israel and Hamas and maintaining dialogue with Iran (with whom it shares the world's largest natural gas field). The Qatari Emiri Air Force has modernized rapidly with F-15QA and Rafale purchases.",
    airDefense: {
      systems: [
        {
          name: "Patriot PAC-3",
          type: "Medium-range SAM / BMD",
          range_km: 100,
          status: "Operational",
          notes: "Deployed at Al Udeid and Doha. U.S. batteries also present at Al Udeid as part of CENTCOM posture.",
        },
        {
          name: "NASAMS",
          type: "Medium-range SAM",
          range_km: 25,
          status: "Ordered/integrating",
          notes: "Norwegian/U.S. system ordered to supplement Patriot coverage.",
        },
        {
          name: "Mistral",
          type: "VSHORAD",
          range_km: 6,
          status: "Operational",
          notes: "Point defense of critical infrastructure.",
        },
      ],
    },
    airForce: {
      aircraft: [
        {
          name: "F-15QA Advanced Eagle",
          role: "Multi-role strike / air superiority",
          quantity: "36",
          notes: "Qatar variant of F-15SA. Most modern F-15 export. Deliveries 2021–2023.",
        },
        {
          name: "Dassault Rafale",
          role: "Multi-role",
          quantity: "36 (24+12 option)",
          notes: "Contract signed 2015/2019. Deliveries underway. Replaces Mirage 2000-5.",
        },
        {
          name: "Mirage 2000-5EDA/DDA",
          role: "Air defense / multi-role",
          quantity: "12 (phasing out)",
          notes: "Being replaced by Rafale.",
        },
        {
          name: "Alpha Jet",
          role: "Trainer / light attack",
          quantity: "~12",
          notes: "French-supplied jet trainers.",
        },
      ],
    },
    alliances: [
      "GCC (member, briefly blockaded by neighbors 2017–2021)",
      "U.S. (hosts Al Udeid AB — largest U.S. base in Middle East)",
      "NATO Enhanced Opportunity Partner (2018)",
      "Maintains relations with Iran, Hamas, Taliban (mediator role)",
    ],
  },

  Jordan: {
    name: "Jordan",
    flag: "🇯🇴",
    overview:
      "Jordan has a long-standing peace treaty with Israel (1994) and deep security cooperation with the U.S. and Western allies. The Royal Jordanian Air Force participated in the multinational defense of Israeli airspace during Iran's Operation True Promise I in April 2024, shooting down Iranian drones over Jordanian territory. Jordan faces major geostrategic pressure: Palestinian refugee populations, proximity to Syria and Iraq, and dependence on U.S. military aid (~$500M/year). The country hosts U.S. special operations forces and played a key role in strikes against ISIS.",
    airDefense: {
      systems: [
        {
          name: "Patriot PAC-2",
          type: "Medium-range SAM",
          range_km: 160,
          status: "Operational",
          notes: "U.S.-supplied. Multiple batteries.",
        },
        {
          name: "Hawk MIM-23",
          type: "Medium-range SAM",
          range_km: 45,
          status: "Operational",
          notes: "Legacy system. Still operated alongside Patriot.",
        },
        {
          name: "Skyguard / Aspide",
          type: "Short-range SAM",
          range_km: 15,
          status: "Operational",
          notes: "Italian-supplied short-range point defense.",
        },
        {
          name: "SHORAD (Stinger, ZU-23)",
          type: "Very short-range",
          range_km: 8,
          status: "Operational",
          notes: "Man-portable and gun-based short-range coverage.",
        },
      ],
    },
    airForce: {
      aircraft: [
        {
          name: "F-16C/D Block 40/60",
          role: "Multi-role",
          quantity: "~60",
          notes: "Primary combat aircraft. Mix of Block 40 and newer Block 60 variants.",
        },
        {
          name: "F-16A/B (MLU)",
          role: "Multi-role",
          quantity: "~15",
          notes: "Mid-Life Upgrade. Used for training and secondary missions.",
        },
        {
          name: "Mirage F1",
          role: "Legacy fighter",
          quantity: "~18",
          notes: "French-supplied. Aging fleet; limited operational utility.",
        },
        {
          name: "AH-1F Cobra",
          role: "Attack helicopter",
          quantity: "~24",
          notes: "U.S.-supplied for ground attack and border security.",
        },
      ],
    },
    alliances: [
      "U.S. (Major Non-NATO Ally; ~$500M annual aid)",
      "Israel (Peace Treaty 1994; operational air defense cooperation)",
      "NATO (partnership)",
      "Arab League",
      "GCC (observer; receives Gulf aid)",
    ],
  },

  Kuwait: {
    name: "Kuwait",
    flag: "🇰🇼",
    overview:
      "Kuwait's security calculus is defined by the 1990 Iraqi invasion and the subsequent U.S. liberation — it has since maintained strong U.S. military presence as the core of its security guarantee. Kuwait hosts a major U.S. Army logistics hub, prepositioned armor, and the Ali Al Salem Air Base. The Kuwait Air Force operates F/A-18 Hornets and Eurofighter Typhoons. Kuwait is less militarily active regionally than its Gulf neighbors but contributes to the GCC collective posture and has been a target for Iranian ballistic missiles in Iranian deterrence messaging.",
    airDefense: {
      systems: [
        {
          name: "Patriot PAC-3",
          type: "Medium-range SAM / BMD",
          range_km: 100,
          status: "Operational",
          notes: "Multiple batteries. Complemented by U.S.-operated Patriot at Ali Al Salem.",
        },
        {
          name: "Hawk MIM-23",
          type: "Medium-range SAM",
          range_km: 45,
          status: "Operational",
          notes: "Legacy system, supplementing Patriot.",
        },
        {
          name: "NASAMS",
          type: "Medium-range SAM",
          range_km: 25,
          status: "Ordered",
          notes: "Acquisition announced to fill medium-tier gap.",
        },
        {
          name: "Starburst / Stinger VSHORAD",
          type: "Very short-range",
          range_km: 5,
          status: "Operational",
          notes: "Point defense of critical infrastructure and military installations.",
        },
      ],
    },
    airForce: {
      aircraft: [
        {
          name: "Eurofighter Typhoon",
          role: "Air superiority / multi-role",
          quantity: "28 ordered",
          notes: "Contract signed 2016. Deliveries ongoing. Will be primary air superiority platform.",
        },
        {
          name: "F/A-18C/D Hornet",
          role: "Multi-role strike",
          quantity: "~30",
          notes: "Currently primary combat aircraft. Aging; being supplemented by Typhoon.",
        },
        {
          name: "BAE Hawk 64",
          role: "Trainer / light attack",
          quantity: "~16",
          notes: "British jet trainers used for advanced training.",
        },
      ],
    },
    alliances: [
      "U.S. (Major Non-NATO Ally; hosts Ali Al Salem AB, Camp Arifjan)",
      "GCC (founding member)",
      "Arab League",
      "UK (historical defense relationship)",
    ],
  },

  Bahrain: {
    name: "Bahrain",
    flag: "🇧🇭",
    overview:
      "Bahrain is home to U.S. Naval Forces Central Command (NAVCENT) and the U.S. Navy's Fifth Fleet — the most important U.S. naval installation in the Middle East. The island kingdom has a Shia majority population ruled by a Sunni monarchy, creating persistent internal tension that Iran has sought to exploit. Bahrain normalized relations with Israel under the Abraham Accords in 2020. The country's small geographic footprint makes air defense particularly critical; Bahrain hosts some of the densest missile defense coverage per square kilometer in the world given the co-located U.S. naval assets.",
    airDefense: {
      systems: [
        {
          name: "Patriot PAC-3",
          type: "Medium-range SAM / BMD",
          range_km: 100,
          status: "Operational",
          notes: "U.S. operated at NSA Bahrain. Bahraini Patriot also operational.",
        },
        {
          name: "Hawk MIM-23",
          type: "Medium-range SAM",
          range_km: 45,
          status: "Operational",
          notes: "Legacy system supplementing Patriot.",
        },
        {
          name: "VSHORAD systems",
          type: "Very short-range",
          range_km: 5,
          status: "Operational",
          notes: "Naval and land-based point defense of Fifth Fleet port facilities.",
        },
      ],
    },
    airForce: {
      aircraft: [
        {
          name: "F-16C/D Block 40",
          role: "Multi-role",
          quantity: "~21",
          notes: "Primary combat aircraft. Bahrain sought F-16V upgrade.",
        },
        {
          name: "F/A-18C Hornet",
          role: "Multi-role",
          quantity: "~12",
          notes: "Aging fleet. Partly replacing with F-16 additions.",
        },
        {
          name: "AH-1E/W Cobra/SuperCobra",
          role: "Attack helicopter",
          quantity: "~8",
          notes: "Ground attack support.",
        },
      ],
    },
    alliances: [
      "U.S. (Major Non-NATO Ally; hosts NSA Bahrain / Fifth Fleet HQ)",
      "GCC (founding member)",
      "Abraham Accords (Israel, 2020)",
      "Arab League",
      "UK (historical relationship; Royal Navy ships port here)",
    ],
  },

  Iraq: {
    name: "Iraq",
    flag: "🇮🇶",
    overview:
      "Iraq occupies a deeply contested strategic space — home to U.S. coalition forces and simultaneously hosting Iranian-backed Popular Mobilization Forces (PMF/Hashd al-Shaabi) with significant political power. The Iraqi government has called for U.S. forces to withdraw following the January 2020 killing of Soleimani on Iraqi soil. Iraq has been the site of repeated U.S.-Iran proxy confrontations and Israeli airstrikes on Iranian-linked facilities. Iraq's own military capability remains limited by post-2003 rebuilding and the 2014 ISIS collapse; it depends on U.S. training, equipment, and intelligence.",
    airDefense: {
      systems: [
        {
          name: "Avenger (M1097)",
          type: "Very short-range SAM",
          range_km: 5.5,
          status: "Operational",
          notes: "U.S.-supplied vehicle-mounted Stinger launcher. Limited coverage.",
        },
        {
          name: "HQ-7 (FM-80)",
          type: "Short-range SAM",
          range_km: 12,
          status: "Operational",
          notes: "Chinese-supplied. Limited numbers.",
        },
        {
          name: "Roland II",
          type: "Short-range SAM",
          range_km: 8,
          status: "Limited service",
          notes: "Franco-German Cold War era system. Serviceability low.",
        },
      ],
    },
    airForce: {
      aircraft: [
        {
          name: "F-16IQ Fighting Falcon",
          role: "Multi-role",
          quantity: "~34",
          notes: "U.S.-supplied. Deliveries began 2015. Based at Balad Air Base.",
        },
        {
          name: "Su-25 Frogfoot",
          role: "Close air support",
          quantity: "~12",
          notes: "Supplied by Russia and Iran in 2014 emergency during ISIS advance.",
        },
        {
          name: "L-159 ALCA",
          role: "Light attack",
          quantity: "~8",
          notes: "Czech-supplied. Used for light strike and training.",
        },
        {
          name: "T-6A Texan II",
          role: "Trainer / light COIN",
          quantity: "~16",
          notes: "U.S.-supplied for basic and combat training.",
        },
        {
          name: "CH-4B (Rainbow)",
          role: "UCAV / ISR",
          quantity: "~10+",
          notes: "Chinese-supplied UCAV. Used for reconnaissance and strikes on ISIS.",
        },
      ],
    },
    alliances: [
      "U.S. (coalition forces present under SOFA; Ain al-Asad, Erbil)",
      "Iran (PMF political influence; major arms supplier)",
      "Arab League",
      "Russia and China (growing engagement)",
    ],
  },

  Oman: {
    name: "Oman",
    flag: "🇴🇲",
    overview:
      "Oman maintains a unique foreign policy of deliberate neutrality and quiet diplomacy — it has never broken relations with Iran, hosted back-channel U.S.-Iran talks that led to the JCPOA, and mediated regional disputes under both Sultan Qaboos and his successor Haitham. Oman grants the U.S. access to air bases (Masirah, Thumrait) and ports under a classified agreement. The Royal Air Force of Oman operates modern British Typhoons and American F-16s. Oman's geographic position — bordering Yemen and overlooking the Strait of Hormuz — gives it significant strategic value.",
    airDefense: {
      systems: [
        {
          name: "Patriot PAC-3",
          type: "Medium-range SAM / BMD",
          range_km: 100,
          status: "Operational",
          notes: "Acquired to counter Houthi and Iranian missile threats across the Strait of Hormuz.",
        },
        {
          name: "SHORAD (Rapier, Mistral)",
          type: "Short-range SAM",
          range_km: 8,
          status: "Operational",
          notes: "British Rapier and French Mistral for point defense of airbases and facilities.",
        },
        {
          name: "Martello radar network",
          type: "Surveillance radar",
          range_km: 450,
          status: "Operational",
          notes: "British-supplied L-band 3D air surveillance radar covering Gulf of Oman and Strait of Hormuz.",
        },
      ],
    },
    airForce: {
      aircraft: [
        {
          name: "Eurofighter Typhoon",
          role: "Air superiority / multi-role",
          quantity: "~12 (+ 24 more ordered)",
          notes: "First tranche delivered 2017. Additional 24 ordered 2020.",
        },
        {
          name: "F-16C/D Block 50",
          role: "Multi-role strike",
          quantity: "~18",
          notes: "U.S.-supplied. Based at Thumrait Air Base.",
        },
        {
          name: "Hawk 103/203",
          role: "Trainer / light attack",
          quantity: "~12",
          notes: "British jet trainers used for advanced training and light attack.",
        },
        {
          name: "PC-9M",
          role: "Trainer",
          quantity: "~12",
          notes: "Swiss-supplied basic trainers.",
        },
      ],
    },
    alliances: [
      "UK (historical defense relationship; key arms supplier)",
      "U.S. (basing access: Masirah Island, Thumrait; classified SOFA)",
      "GCC (member, but maintains independent foreign policy)",
      "Iran (open diplomatic channel — unique among GCC states)",
      "Mediation role: U.S.-Iran (JCPOA 2013 backchannel), Hamas-Israel (ceasefire 2025)",
    ],
  },

  Yemen: {
    name: "Yemen",
    flag: "🇾🇪",
    overview:
      "Yemen has been in civil war since 2014–2015, with Iranian-backed Houthi forces (Ansar Allah) controlling the northwest including Sana'a, and the internationally recognized government backed by a Saudi-led coalition controlling the south and east. The Houthis have conducted hundreds of ballistic missile and drone strikes against Saudi Arabia, UAE, and — beginning in late 2023 — commercial shipping in the Red Sea and Bab el-Mandeb Strait in response to Israel's Gaza operations. U.S. and UK forces launched strikes against Houthi targets in 2024. The Houthi arsenal includes Iranian-supplied and domestically reverse-engineered Scud, Burkan, and Quds cruise missile variants.",
    airDefense: {
      systems: [
        {
          name: "2K12 Kub (SA-6)",
          type: "Medium-range SAM (Houthi-operated)",
          range_km: 24,
          status: "Limited operation",
          notes: "Soviet-era. Some remain operational in Houthi-controlled areas. Used against coalition aircraft.",
        },
        {
          name: "S-75 Dvina (SA-2)",
          type: "Legacy SAM",
          range_km: 45,
          status: "Limited service",
          notes: "Some legacy systems operational. Used by Houthis against Saudi and UAE aircraft.",
        },
        {
          name: "MANPADS (QW-1, SA-7, SA-14, SA-16)",
          type: "Very short-range",
          range_km: 5,
          status: "Operational",
          notes: "Widely proliferated. Threat to low-flying aircraft and helicopters.",
        },
      ],
    },
    airForce: {
      aircraft: [
        {
          name: "MiG-21bis",
          role: "Legacy fighter",
          quantity: "~few airworthy",
          notes: "Pre-war Yemeni Air Force. Coalition-aligned forces have limited aviation capability.",
        },
        {
          name: "F-5E Tiger II",
          role: "Light combat",
          quantity: "~few airworthy",
          notes: "Similarly limited. Most Yemeni Air Force equipment destroyed or non-operational.",
        },
        {
          name: "Samad-3 / Qasef UCAVs (Houthi)",
          role: "UCAV / kamikaze drone",
          quantity: "Significant numbers",
          notes: "Iranian-supplied or reverse-engineered drones. Used extensively against Saudi Arabia and Red Sea shipping.",
        },
      ],
    },
    alliances: [
      "Houthis: Iran (weapons, training, IRGC advisors), Axis of Resistance",
      "Recognized government: Saudi-led coalition, Arab League, UN recognition",
      "Houthis designated as terrorists by U.S. (2021 reversed, 2024 re-designated)",
    ],
  },

  Lebanon: {
    name: "Lebanon",
    flag: "🇱🇧",
    overview:
      "Lebanon's formal military (Lebanese Armed Forces) is poorly equipped and politically constrained from confronting Hezbollah, which operates as a state-within-a-state with a missile arsenal estimated at 130,000–150,000 rockets and precision munitions. Hezbollah's arsenal includes Fateh-110, M-600, and Zelzal rockets capable of reaching anywhere in Israel. The Lebanese state effectively has no meaningful air defense or air force. The 2024 Israeli ground campaign and precision strikes against Hezbollah leadership (including the killing of Secretary-General Hassan Nasrallah on September 27, 2024) significantly degraded Hezbollah's upper command structure and much of its precision missile stockpile.",
    airDefense: {
      systems: [
        {
          name: "No functional national air defense",
          type: "N/A",
          range_km: 0,
          status: "Non-operational",
          notes: "Lebanon has no operational SAM coverage. The LAF operates a few legacy radar systems but no missile defense.",
        },
      ],
    },
    airForce: {
      aircraft: [
        {
          name: "Hawker Hunter F.70/T.66",
          role: "Legacy fighter (non-operational)",
          quantity: "~8 (ground display only)",
          notes: "British Cold War era jets. None airworthy. Purely symbolic.",
        },
        {
          name: "Cessna A-37B Dragonfly",
          role: "Light attack / training",
          quantity: "~5",
          notes: "Limited operational status.",
        },
        {
          name: "UH-1H / UH-1N Huey",
          role: "Transport / light utility",
          quantity: "~16",
          notes: "Primary helicopter fleet used by LAF for transport and ISR.",
        },
      ],
    },
    alliances: [
      "Hezbollah: Iran (weapons, funding, training), Axis of Resistance",
      "LAF: Western donors (U.S., France, Italy supply LAF equipment independently of Hezbollah)",
      "Arab League (member)",
      "UN (UNIFIL peacekeeping force deployed in south Lebanon since 1978)",
    ],
  },

  Syria: {
    name: "Syria",
    flag: "🇸🇾",
    overview:
      "Syria under Assad was a key node in the Iranian Axis of Resistance — hosting IRGC Quds Force presence, weapons transfers to Hezbollah, and serving as a land bridge from Iran to Lebanon. Israel conducted hundreds of airstrikes against Syrian territory between 2013 and 2024, targeting Iranian weapons shipments and military infrastructure with near-impunity. Syria's air defenses were substantially degraded by these Israeli strikes and by the civil war. Following the collapse of the Assad regime in December 2024 and the takeover by Hayat Tahrir al-Sham (HTS)-led rebel forces, Syria's military posture has been fundamentally restructured. The post-Assad government's foreign policy alignment remains uncertain.",
    airDefense: {
      systems: [
        {
          name: "S-200VE Vega (SA-5)",
          type: "Long-range SAM",
          range_km: 240,
          status: "Degraded",
          notes: "Repeatedly struck by Israel. Russian-operated Pantsir batteries provided limited supplemental coverage during Assad era.",
        },
        {
          name: "Pantsir-S1 (Russian-operated)",
          type: "Short-medium range SHORAD",
          range_km: 20,
          status: "Withdrawn post-Assad",
          notes: "Russia withdrew its forces and systems following Assad's fall in Dec 2024.",
        },
        {
          name: "Buk-M2E (SA-17)",
          type: "Medium-range SAM",
          range_km: 50,
          status: "Largely non-operational",
          notes: "Multiple batteries struck by Israel over 2018–2024 in retaliatory strikes.",
        },
        {
          name: "S-300PM (Russian-supplied 2018)",
          type: "Long-range SAM",
          range_km: 150,
          status: "Unknown post-Assad",
          notes: "Supplied after Israeli strikes killed 15 Russian personnel. Operational status post-Assad collapse unclear.",
        },
      ],
    },
    airForce: {
      aircraft: [
        {
          name: "MiG-29SM Fulcrum",
          role: "Air superiority",
          quantity: "~15 (pre-collapse)",
          notes: "Russian-upgraded. Status post-December 2024 transition unclear.",
        },
        {
          name: "MiG-23ML/MLA",
          role: "Multi-role",
          quantity: "~50 (pre-collapse, many non-operational)",
          notes: "Much of the Syrian Air Force defected, was destroyed, or grounded during the civil war.",
        },
        {
          name: "Su-22M4/UM3K",
          role: "Strike / ground attack",
          quantity: "~30 (pre-collapse)",
          notes: "Soviet-era strike aircraft. Used extensively against rebel-held areas. Status post-transition unclear.",
        },
        {
          name: "L-39ZA",
          role: "Light attack / trainer",
          quantity: "~60",
          notes: "Czech-supplied jet trainers modified for attack. Widely used in civil war.",
        },
      ],
    },
    alliances: [
      "Russia (military intervention 2015–2024; Hmeimim AB, Tartus naval base — status post-Assad uncertain)",
      "Iran (IRGC presence; Axis of Resistance hub — expelled post-Assad transition)",
      "Hezbollah (fought in Syria for Assad)",
      "Post-Assad (Dec 2024): HTS-led government; Turkey-aligned factions influential; Western/Gulf normalization being explored",
    ],
  },
};

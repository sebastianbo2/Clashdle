import troopData from "@/assets/troops";

interface TroopData {
  troop_name: string;
  category: string;
  preferred_target: string;
  attack_type: string;
  housing_space: number;
  movement_speed: number;
  attack_speed: number;
  range: number;
}

// 🔹 Helper: hash a string into a numeric seed
function stringToSeed(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

// 🔹 Helper: deterministic pseudo-random generator
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 🔹 Main function: get the same troop every day
export default function getDailyTroop(): TroopData {
  const lines: string[] = troopData.trim().split("\n");
  const headers: string[] = lines[0].split(",");

  const parsedTroops: TroopData[] = lines.slice(1).map((line: string) => {
    const values: string[] = line.split(",");

    return {
      troop_name: values[headers.findIndex((h) => h === "troop_name")],
      category: values[headers.findIndex((h) => h === "category")],
      preferred_target: values[headers.findIndex((h) => h === "preferred_target")],
      attack_type: values[headers.findIndex((h) => h === "attack_type")],
      housing_space: Number.parseFloat(values[headers.findIndex((h) => h === "housing_space")]),
      movement_speed: Number.parseFloat(values[headers.findIndex((h) => h === "movement_speed")]),
      attack_speed: Number.parseFloat(values[headers.findIndex((h) => h === "attack_speed")]),
      range: Number.parseFloat(values[headers.findIndex((h) => h === "range")]),
    };
  });

  // 🔹 Generate daily seed
  const today = new Date();
  const seedString = today.toISOString().split("T")[0]; // "YYYY-MM-DD"
  const seed = stringToSeed(seedString);

  // 🔹 Seeded random
  const random = mulberry32(seed);
  const index = Math.floor(random() * parsedTroops.length);

  // 🔹 Return the troop for today
  return parsedTroops[index];
}

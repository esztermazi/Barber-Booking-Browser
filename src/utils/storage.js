import fs from "fs";

export function readJSON(path) {
  if (!fs.existsSync(path)) return [];
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

export function writeJSON(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

import { existsSync, mkdirSync } from "fs";
export default function (dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
}

import { execSync } from "node:child_process";

execSync("npx prisma generate --schema prisma/schema.prisma", {
  stdio: "inherit",
});
await import("./seed");

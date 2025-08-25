import { rmSync, existsSync } from "fs";
import { join } from "path";

const distPath = "dist";

try {
  if (existsSync(distPath)) {
    rmSync(distPath, { recursive: true, force: true });
    console.log("🧹 Cleaned dist directory");
  }
  console.log("✅ Clean completed");
} catch (error) {
  console.error("❌ Clean failed:", error);
  process.exit(1);
}

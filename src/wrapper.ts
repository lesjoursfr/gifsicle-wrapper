import BinWrapper from "@lesjoursfr/bin-wrapper";
import { platform } from "process";
import { fileURLToPath } from "url";

const version = "1.94";
const base = `https://raw.githubusercontent.com/lesjoursfr/gifsicle-wrapper/main/vendor/v${version}`;

export const gifsicleWrapper = new BinWrapper({ strip: 0 });
gifsicleWrapper.addSrc(`${base}/linux/x64/gifsicle.tar.gz`, "linux", "x64");
gifsicleWrapper.setDest(fileURLToPath(new URL("../vendor", import.meta.url)));
gifsicleWrapper.setUse(platform === "win32" ? "gifsicle.exe" : "gifsicle");
gifsicleWrapper.setVersion(`>=${version}`);

export const gifsicleSourcePath = fileURLToPath(
  new URL(`../vendor/v${version}/source/gifsicle.tar.gz`, import.meta.url)
);

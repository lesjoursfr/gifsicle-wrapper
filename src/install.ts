import { execa } from "execa";
import { mkdir, rm } from "fs/promises";
import process from "process";
import { x as extract } from "tar";
import { temporaryFile } from "tempy";
import { gifsicleSourcePath, gifsicleWrapper } from "./wrapper.js";

async function buildFromSource(file: string, cmd: Array<string>): Promise<void> {
  const temporary = temporaryFile();
  console.log(`use the temporary folder : ${temporary}`);
  await mkdir(temporary, { recursive: true });

  await extract({ file: file, cwd: temporary, strip: 1 });

  for (const x of cmd) {
    await execa(x, { cwd: temporary, shell: true });
  }

  await rm(temporary, { recursive: true });
}

(async () => {
  try {
    await gifsicleWrapper.run(["--version"]);
    console.log("gifsicle pre-build test passed successfully");
  } catch (error) {
    if (error instanceof Error) {
      console.warn(error.message);
    }
    console.warn("gifsicle pre-build test failed");
    console.info("compiling from source");

    try {
      const source = gifsicleSourcePath;
      const destination = gifsicleWrapper.dest;
      await buildFromSource(source, [
        "autoreconf -ivf",
        `./configure --disable-gifview --disable-gifdiff --prefix="${destination}" --bindir="${destination}"`,
        "make install",
      ]);

      console.log("gifsicle built successfully");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.stack);
      }

      process.exit(1);
    }
  }
})();

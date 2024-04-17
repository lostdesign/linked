import {BaseDirectory, mkdir, readTextFile, writeTextFile} from "@tauri-apps/plugin-fs";
import {getYearFromDate} from "@/utils/calendar.ts";

function getFilePath(date: string) {
  return `.linked/${getYearFromDate(date)}/${date}.json`
}

async function readContent(date: string) {
  try {
    return JSON.parse(
      await readTextFile(
        getFilePath(date),
        {baseDir: BaseDirectory.Document}
      )
    ).content
  } catch {
    await mkdir('.linked/' + getYearFromDate(date), {baseDir: BaseDirectory.Document, recursive: true})
    return await writeTextFile(
      getFilePath(date),
      '',
      {baseDir: BaseDirectory.Document}
    )
  }
}

async function writeContent(date: string, content: string) {
  await writeTextFile(
    getFilePath(date),
    JSON.stringify({content}),
    {baseDir: BaseDirectory.Document}
  );
}

export {readContent, writeContent}
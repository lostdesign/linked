import {BaseDirectory, createDir, readTextFile, writeTextFile} from "@tauri-apps/api/fs";
import {getYearFromDate} from "@/utils/calendar.ts";

function getFilePath(date: string) {
  return `.linked/${getYearFromDate(date)}/${date}.json`
}

async function fetchContent(date: string) {
  try {
    return await readTextFile(
      getFilePath(date), 
      { dir: BaseDirectory.Document }
    )
  } catch {
    await createDir('.linked/' + getYearFromDate(date), { dir: BaseDirectory.Document, recursive: true })
    return await writeTextFile(
      getFilePath(date),
      '',  
      { dir: BaseDirectory.Document }
    )
  }
}

async function storeContent(date: string, content: string) {
  await createDir('.linked', { dir: BaseDirectory.Document, recursive: true });
  await writeTextFile(getFilePath(date), content, { dir: BaseDirectory.Document });
}

export {fetchContent, storeContent}
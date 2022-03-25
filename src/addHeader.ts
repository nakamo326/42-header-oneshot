import * as vscode from 'vscode';
import * as path from 'path';
import { makeHeader } from './makeHeader';
import * as moment from 'moment';

export async function addHeader(target: vscode.Uri[], user: string, mail: string) {
  const userLen = 9;
  const mailLen = 26;
  const fileNameLen = 41;

  const filledUser = fillString(user, userLen);
  const filledMail = fillString(mail, mailLen, true);

  await Promise.all(
    target.map(async (file) => {
      const t = vscode.workspace.fs.readFile(file);
      const s = vscode.workspace.fs.stat(file);

      const filledFile = fillString(path.basename(file.path), fileNameLen);
      const stats = await s;
      const timeCreated = getFormattedTime(stats.ctime);
      const timeUpdated = getFormattedTime(stats.mtime);

      const text = (await t).toString();
      if (isHeader(text)) {
        // console.log(`${file.path} is skipped!`);
        return;
      }

      const header = makeHeader(filledFile, filledUser, filledMail, timeCreated, timeUpdated);
      const outputBuf = Uint8Array.from(Buffer.from(header + text));
      await vscode.workspace.fs.writeFile(file, outputBuf);
      // console.log(`${path.basename(file.path)} is added header!`);
    }),
  );
}

// if there is header already, return true. if not return false.
function isHeader(text: string): boolean {
  const outsidePattern = new RegExp(/^\/\* \*{74} \*\/$/);
  const innerPattern = new RegExp(/^\/\* .{74} \*\/$/);
  const lines = text.split('\n', 11);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if ((i === 0 || i === 10) && line.match(outsidePattern)) {
      continue;
    } else if ((i > 0 || i < 10) && line.match(innerPattern)) {
      continue;
    }
    return false;
  }
  return true;
}

function fillString(str: string, targetLen: number, isMail = false) {
  if (str.length >= targetLen) {
    return str.substring(0, targetLen);
  }
  if (isMail) {
    str += '>';
  }
  while (str.length < targetLen) {
    str += ' ';
  }
  return str;
}

function getFormattedTime(unixTime: number) {
  return moment(unixTime).format('YYYY/MM/DD HH:mm:ss').toString();
}

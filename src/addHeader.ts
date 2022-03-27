import * as vscode from 'vscode';
import * as path from 'path';
import { makeHeader } from './makeHeader';
import * as moment from 'moment';

export async function addHeader(target: vscode.Uri[], user: string, mail: string) {
  const userLen = 9;
  const mailLen = 25;
  const fileNameLen = 41;

  const filledUser = fillString(user, userLen);
  const filledMail = fillString(mail, mailLen);

  await Promise.all(
    target.map(async (file) => {
      const t = vscode.workspace.fs.readFile(file);
      const s = vscode.workspace.fs.stat(file);

      const filledFile = fillString(path.basename(file.path), fileNameLen);
      const stats = await s;
      const timeCreated = moment(stats.ctime).format('YYYY/MM/DD HH:mm:ss').toString();
      const timeUpdated = moment(stats.mtime).format('YYYY/MM/DD HH:mm:ss').toString();

      const text = (await t).toString();
      if (hasHeader(text)) {
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
function hasHeader(text: string): boolean {
  const outsidePattern = new RegExp(/^\/\* \*{74} \*\/$/);
  const innerPattern = new RegExp(/^\/\* .{74} \*\/$/);
  const lines = text.split('\n', 11);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if ((i === 0 || i === 10) && !line.match(outsidePattern)) {
      return false;
    } else if ((i > 0 || i < 10) && !line.match(innerPattern)) {
      return false;
    }
  }
  return true;
}

function fillString(str: string, targetLen: number) {
  if (str.length > targetLen) {
    return str.substring(0, targetLen);
  }
  return str + ' '.repeat(targetLen - str.length);
}

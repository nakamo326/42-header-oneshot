import * as vscode from 'vscode';
import * as path from 'path';
import { hasHeader } from './hasHeader';
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

function fillString(str: string, targetLen: number) {
  if (str.length > targetLen) {
    return str.substring(0, targetLen);
  }
  return str + ' '.repeat(targetLen - str.length);
}

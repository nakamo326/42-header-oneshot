import * as vscode from 'vscode';
import * as path from 'path';
import { makeHeader } from './makeHeader';
import * as moment from 'moment';

export async function addHeader(target: vscode.Uri[], user: string, mail: string) {
  const userLen = 9;
  const mailLen = 26;
  const fileNameLen = 41;

  for await (const file of target) {
    const text = await isHeader(file);
    if (text === false) {
      // console.log(`${file.path} is skipped!`);
      continue;
    }

    const modFile = modifyLength(path.basename(file.path), fileNameLen);
    const modUser = modifyLength(user, userLen);
    const modMail = modifyLength(mail, mailLen, true);
    const stats = await vscode.workspace.fs.stat(file);
    const timeCreated = getFormattedTime(stats.ctime);
    const timeUpdated = getFormattedTime(stats.mtime);

    const header = makeHeader(modFile, modUser, modMail, timeCreated, timeUpdated);
    const outputBuf = Uint8Array.from(Buffer.from(header + text));
    await vscode.workspace.fs.writeFile(file, outputBuf);
    console.log(`${path.basename(file.path)} is added header!`);
  }
}

// if there is header already, return false. if not return their context.
async function isHeader(file: vscode.Uri): Promise<string | boolean> {
  const outsidePattern = new RegExp(/^\/\* \*{74} \*\/$/);
  const innerPattern = new RegExp(/^\/\* .{74} \*\/$/);
  const content = await vscode.workspace.fs.readFile(file);
  const text = content.toString();
  const lines = text.split('\n', 11);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if ((i === 0 || i === 10) && line.match(outsidePattern)) {
      continue;
    } else if (line.match(innerPattern)) {
      continue;
    }
    return text;
  }
  return false;
}

function modifyLength(str: string, targetLen: number, isMail = false) {
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
  const dateTime = moment(unixTime);
  return dateTime.format('YYYY/MM/DD HH:mm:ss').toString();
}

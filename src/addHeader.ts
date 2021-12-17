import * as vscode from 'vscode';
import * as path from 'path';
import { makeHeader } from './makeHeader';
import * as moment from 'moment';

// prettier-ignore
const headLine = 
`/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */`;

export async function addHeader(target: vscode.Uri[], user: string, mail: string) {
  const userLen = 9;
  const mailLen = 26;
  const fileNameLen = 41;

  for await (const file of target) {
    // check there is header already, then skip
    const text = await isHeader(file);
    if (text === false) {
      console.log(`${file.path} is skipped!`);
      continue;
    }

    const modFile = modifyLength(path.basename(file.path), fileNameLen);
    const modUser = modifyLength(user, userLen);
    const modMail = modifyLength(mail, mailLen, true);
    const stats = await vscode.workspace.fs.stat(file);
    const timeCreated = getFormattedTime(stats.ctime);
    const timeUpdated = getFormattedTime(stats.mtime);

    const header = makeHeader(modFile, modUser, modMail, timeCreated, timeUpdated);
    const outputText = header + text;
    const outputBuf = Uint8Array.from(Buffer.from(outputText));
    await vscode.workspace.fs.writeFile(file, outputBuf);
  }
}

// TODO regular expansion "/^\/\* \*{74} \*\/$/"
async function isHeader(file: vscode.Uri): Promise<string | boolean> {
  const content = await vscode.workspace.fs.readFile(file);
  const text = content.toString();
  if (text.includes(headLine, 0)) {
    return false;
  }
  return text;
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
  console.log(dateTime.format('YYYY/MM/DD HH:MM:SS'));
  return dateTime.format('YYYY/MM/DD HH:MM:SS').toString();
}

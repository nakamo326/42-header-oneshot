import * as vscode from 'vscode';
import * as path from 'path';
import { makeHeader } from './makeHeader';

// prettier-ignore
const headLine = 
`/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */`;

export async function addHeader(target: vscode.Uri[], user: string, mail: string) {
  const userLen = 9;
  const mailLen = 25;
  const fileNameLen = 41;

  for await (const file of target) {
    // check there is header already, then skip
    if (await isHeader(file)) {
      console.log(`${file.path} is skipped!`);
      continue;
    }

    const modFile = modifyLength(path.basename(file.path), fileNameLen);
    const modUser = modifyLength(user, userLen);
    const modMail = modifyLength(mail, mailLen);
    const stats = await vscode.workspace.fs.stat(file);
    const timeCreated = getFormattedTime(stats.ctime);
    const timeUpdated = getFormattedTime(stats.mtime);

    const header = makeHeader(modFile, modUser, modMail, timeCreated, timeUpdated);
  }
}

async function isHeader(file: vscode.Uri): Promise<boolean> {
  const content = await vscode.workspace.fs.readFile(file);
  const text = content.toString();
  return text.includes(headLine, 0);
}

function modifyLength(str: string, targetLen: number) {
  if (str.length >= targetLen) {
    return str.substring(0, targetLen);
  }
  while (str.length < targetLen) {
    str += ' ';
  }
  return str;
}

function getFormattedTime(unixTime: number) {
  const dateTime = new Date(unixTime);
  return (
    dateTime.getFullYear() +
    '/' +
    (dateTime.getMonth() + 1) +
    '/' +
    dateTime.getDay() +
    ' ' +
    dateTime.getHours() +
    ':' +
    dateTime.getMinutes() +
    ':' +
    dateTime.getSeconds()
  );
}

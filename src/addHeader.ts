import * as vscode from 'vscode';

// prettier-ignore
const headLine = 
`/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */`;

export async function addHeader(target: vscode.Uri[], user: string, mail: string) {
  for await (const file of target) {
    // check there is header already, then skip
    if (await isHeader(file)) {
      console.log(`${file.path} is skipped!`);
      continue;
    }

    const stats = await vscode.workspace.fs.stat(file);
    const timeCreated = getFormattedTime(stats.ctime);
    const timeUpdated = getFormattedTime(stats.mtime);
  }
}

async function isHeader(file: vscode.Uri): Promise<boolean> {
  const content = await vscode.workspace.fs.readFile(file);
  const text = content.toString();
  return text.includes(headLine, 0);
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

import * as vscode from 'vscode';

export async function addHeader(target: vscode.Uri[]) {
  for await (const file of target) {
    // check there is header already, then skip
    if (isHeader()) {
      continue;
    }

    const stats = await vscode.workspace.fs.stat(file);
    const timeCreated = getFormattedTime(stats.ctime);
    const timeUpdated = getFormattedTime(stats.mtime);
  }
}

function isHeader(): boolean {
  return true;
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

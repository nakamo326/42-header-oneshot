import * as vscode from 'vscode';
import { getTarget } from './getTarget';
import { deleteHeader } from './deleteHeader';

export async function deleteHeaderHandler() {
  const start = process.hrtime();
  // get file path array
  const target = await getTarget();
  if (!target) {
    return;
  }

  //add header to all target file with async
  await deleteHeader(target);
  vscode.window.showInformationMessage('Deleted header successfully!');
  const end = process.hrtime(start);
  console.info('Execution time (hr): %ds %dms', end[0], end[1] / 1000000);
}

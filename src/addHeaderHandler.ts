import * as vscode from 'vscode';
import { getUser, getMail } from './getConfig';
import { getTarget } from './getTarget';
import { addHeader } from './addHeader';

export async function addHeaderHandler() {
  console.info('start adding 42 header by 42-header-oneshot');
  const start = process.hrtime();
  // get user and mail
  const user = getUser();
  const mail = getMail();
  if (user === undefined || mail === undefined) {
    vscode.window.showErrorMessage(
      `User or Mail doesn't exist in environment variables and configurations.
      Please export "USER" or "MAIL" to your environment or add configurations.`,
    );
    return;
  }
  console.log(`USER is ${user} and MAIL is ${mail}`);

  // get file path array
  const target = await getTarget();
  if (!target) {
    vscode.window.showInformationMessage("Couldn't find target file in workspace.");
    return;
  }

  //add header to all target file with async
  await addHeader(target, user, mail);
  vscode.window.showInformationMessage('Inserted header successfully!');
  const end = process.hrtime(start);
  console.info('Execution time (hr): %ds %dms', end[0], end[1] / 1000000);
}

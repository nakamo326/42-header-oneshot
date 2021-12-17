import * as vscode from 'vscode';
import { getConfig } from './getConfig';
import { getTarget } from './getTarget';
import { addHeader } from './addHeader';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('42-header-oneshot.addHeader', async () => {
    // get user and mail
    const [user, mail] = getConfig();
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
      return;
    }

    //add header to all target file with async
    await addHeader(target, user, mail);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}

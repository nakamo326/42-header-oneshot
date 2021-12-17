import * as vscode from 'vscode';
import { env } from 'process';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "42-header-oneshot" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('42-header-oneshot.addHeader', () => {
    const user = env.USER;
    const mail = env.MAIL;
    vscode.window.showInformationMessage(`USER is ${user} and MAIL is ${mail}`);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}

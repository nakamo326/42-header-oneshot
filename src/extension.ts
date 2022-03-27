import * as vscode from 'vscode';
import { addHeaderHandler } from './addHeaderHandler';
import { deleteHeaderHandler } from './deleteHeaderHandler';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    '42-header-oneshot.addHeader',
    async () => await addHeaderHandler(),
  );

  disposable = vscode.commands.registerCommand(
    '42-header-oneshot.deleteHeader',
    async () => await deleteHeaderHandler(),
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}

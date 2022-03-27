import * as vscode from 'vscode';
import { addHeaderHandler } from './addHeaderHandler';
import { deleteHeaderHandler } from './deleteHeaderHandler';

export function activate(context: vscode.ExtensionContext) {
  let addHeader = vscode.commands.registerCommand(
    '42-header-oneshot.addHeader',
    async () => await addHeaderHandler(),
  );

  let deleteHeader = vscode.commands.registerCommand(
    '42-header-oneshot.deleteHeader',
    async () => await deleteHeaderHandler(),
  );

  context.subscriptions.push(addHeader, deleteHeader);
}

export function deactivate() {}

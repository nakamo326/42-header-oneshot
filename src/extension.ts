import * as vscode from 'vscode';
import { addHeaderHandler } from './addHeaderHandler';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('42-header-oneshot.addHeader', addHeaderHandler);

  context.subscriptions.push(disposable);
}

export function deactivate() {}

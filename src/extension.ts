import * as vscode from 'vscode';
import { env } from 'process';
import * as fs from 'fs';
import * as path from 'path';
import { resolve } from 'path';

const rowLen = 80;
const template = `/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   $file                                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: $user <$mail>                              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/12/15 21:44:53 by $user             #+#    #+#             */
/*   Updated: 2021/12/15 21:44:57 by $user            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

`;

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
    console.log(target);

    //add header to all target file with async
    //stats.birthtime, stats.mtime
    // if there are header already, skip them
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}

function getConfig(): [string | undefined, string | undefined] {
  // if key isn't in env, ret is undefined.
  const userEnv = env.USER;
  const mailEnv = env.MAIL;

  // if there are no input in config, return is empty string.
  const userConfig: string | undefined = vscode.workspace
    .getConfiguration()
    .get('42-header-oneshot.user');
  const mailConfig: string | undefined = vscode.workspace
    .getConfiguration()
    .get('42-header-oneshot.mail');

  const user: string | undefined = userConfig !== '' ? userConfig : userEnv;
  const mail: string | undefined = mailConfig !== '' ? mailConfig : mailEnv;
  return [user, mail];
}

async function getTarget() {
  let workspace;
  await getWorkspace().then((ret) => {
    workspace = ret?.uri.path;
  });
  console.log(workspace);
  if (!workspace) {
    return undefined;
  }
  const pattern = new vscode.RelativePattern(workspace, '**/*.{c,h,cpp,hpp}');
  const uris = await vscode.workspace.findFiles(pattern, null);
  return uris;
}

// if user open multi workspace, choose by showWorkspaceFolderPick method
function getWorkspace(): Thenable<vscode.WorkspaceFolder | undefined> {
  if (!vscode.workspace.workspaceFolders) {
    vscode.window.showInformationMessage('please open workspace.');
    return Promise.reject(undefined);
  } else if (vscode.workspace.workspaceFolders.length === 1) {
    return Promise.resolve(vscode.workspace.workspaceFolders[0]);
  }
  return vscode.window.showWorkspaceFolderPick();
}

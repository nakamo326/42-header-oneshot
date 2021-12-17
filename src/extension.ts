import * as vscode from 'vscode';
import { env } from 'process';

const rowLen = 80;
// prettier-ignore
const template =
`/* ************************************************************************** */
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
    if (!target) {
      return;
    }

    //add header to all target file with async
    await addHeader(target);
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

// if there are header already, skip them
async function addHeader(target: vscode.Uri[]) {
  for await (const file of target) {
    const stats = await vscode.workspace.fs.stat(file);
    const timeCreated = getFormattedTime(stats.ctime);
    const timeUpdated = getFormattedTime(stats.mtime);
  }
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

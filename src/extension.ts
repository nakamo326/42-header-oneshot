import * as vscode from 'vscode';
import { env } from 'process';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('42-header-oneshot.addHeader', () => {
    console.log('Congratulations, your extension "42-header-oneshot" is now active!');

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

    const [user, mail] = getConfig();
    if (user === undefined || mail === undefined) {
      vscode.window.showErrorMessage(
        `User or Mail doesn't exist in environment variables and configurations.
        Please export "USER" or "MAIL" to your environment or add configurations.`,
      );
      return;
    }
    console.log(`USER is ${user} and MAIL is ${mail}`);
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

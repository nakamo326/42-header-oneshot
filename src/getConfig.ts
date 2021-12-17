import * as vscode from 'vscode';
import { env } from 'process';

export function getConfig(): [string | undefined, string | undefined] {
  // if there are no input in config, return is empty string.
  const userConfig: string | undefined = vscode.workspace
    .getConfiguration()
    .get('42-header-oneshot.user');
  const mailConfig: string | undefined = vscode.workspace
    .getConfiguration()
    .get('42-header-oneshot.mail');

  const user: string | undefined = userConfig !== '' ? userConfig : env.USER;
  const mail: string | undefined = mailConfig !== '' ? mailConfig : env.MAIL;
  return [user, mail];
}

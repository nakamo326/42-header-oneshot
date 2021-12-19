import * as vscode from 'vscode';
import { env } from 'process';

export function getUser(): string | undefined {
  const userConfig: string | undefined = vscode.workspace
    .getConfiguration()
    .get('42-header-oneshot.user');

  return userConfig ? userConfig : env.USER;
}

export function getMail(): string | undefined {
  const mailConfig: string | undefined = vscode.workspace
    .getConfiguration()
    .get('42-header-oneshot.mail');

  return mailConfig ? mailConfig : env.MAIL;
}

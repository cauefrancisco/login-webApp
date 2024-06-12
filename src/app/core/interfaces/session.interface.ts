export interface ISession {
  result: string;
  logonid: number,
  logonname: string,
  logondisplay: string,
  logongroup: number,
  timeout: number,
  server: string,
  version: string,
}
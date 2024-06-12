export interface IPasswordEncryption {
  password: string,
  user: string,
  serverNonce: string,
  clientNonce: string,
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import crc32 from 'crc/crc32';
import { sha256 } from 'js-sha256';
import { Observable } from 'rxjs';
import { ILogin } from '../interfaces/login.interface';
import { IPasswordEncryption } from '../interfaces/password-encryption.interface';
import { ISession } from '../interfaces/session.interface';



@Injectable()
export class AuthService {

  public storage: Storage;

  public ID_SESSION!: string;
  public SignatureSession!: string;

  constructor(
    private _httpClient: HttpClient,
  ) {
    this.storage = window.localStorage;
  }

  public getServerNonce(userName: string): Observable<any> {
    const url = `http://test.ficusconsultoria.com.br:11118/retaguarda_prospect/aaaa/auth?UserName=${userName}`;
    return this._httpClient.get(url);
  }

  public getClientNonce(dateHour: string): string {
    return sha256(dateHour);
  }

  public passwordEncryption(payload: IPasswordEncryption): string {
    const salt = `salt${payload.password}`;
    const hashSalt = sha256(salt);
    this.setLocalStorageItem('SALT_HASH', hashSalt);
    const encryptedPassword = sha256(`retaguarda_prospect/${payload.user}${payload.serverNonce}${payload.clientNonce}${payload.user}${hashSalt}`);

    return encryptedPassword;
  }

  public doLogin(payload: ILogin): Observable<any> {
    const url = `http://test.ficusconsultoria.com.br:11118/retaguarda_prospect/aaaa/auth?UserName=${payload.user}&Password=${payload.passwordEncrypted}&ClientNonce=${payload.clientNonce}`;
    return this._httpClient.get(url);
  }

  public setLocalStorageItem(name: string, item: string): any {
    this.storage.setItem(name, JSON.stringify(item));
  }

  public getSignatureSession(serverData: ISession, password: string): string {

    let session = serverData.result;
    const posicao = session.indexOf('+');
    if (posicao >= 0) {
      this.ID_SESSION = session.substring(0, posicao);
    }
    const crc32Session = crc32(session);
    const saltPassword = `salt${password}`;
    const hashSaltPassword = sha256(saltPassword);

    const PRIVATE_KEY = crc32(hashSaltPassword, crc32Session);
    console.log('PRIVATE_KEY', PRIVATE_KEY);

    // “retaguarda_prospect/aaaa/empresaService/PegarEmpresasFavoritas” Path Request


    const date = new Date;
    const timeStamp = date.getTime();
    const timestampToMiliseconds = Number(timeStamp) * 1000;
    const milisecondHex = timestampToMiliseconds.toString(16);
    const eightDigitMiliseconds = milisecondHex.substring(milisecondHex.length - 8, milisecondHex.length);

    this.SignatureSession = crc32('retaguarda_prospect/aaaa/empresaService/PegarEmpresasFavoritas', crc32(eightDigitMiliseconds, Number(PRIVATE_KEY))).toString(16);
    const dataReturn = parseInt(this.ID_SESSION, 10).toString(16) + eightDigitMiliseconds + this.SignatureSession;


    return dataReturn;
  }

  public getCompanyList(signatureSession: string): Observable<any> {
    const url = `http://test.ficusconsultoria.com.br:11118/retaguarda_prospect/aaaa/empresaService/PegarEmpresasFavoritas?session_signature=${signatureSession}`;
    return this._httpClient.get(url);
  }

}

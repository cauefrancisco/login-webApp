import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import crc32 from 'crc/crc32';
import { sha256 } from 'js-sha256';
import * as moment from 'moment';
import { ILogin } from 'src/app/core/interfaces/login.interface';
import { IPasswordEncryption } from 'src/app/core/interfaces/password-encryption.interface';
import { IServerNonce } from 'src/app/core/interfaces/serverNonce.interface';
import { ISession } from 'src/app/core/interfaces/session.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public formError: any;
  public loggedIn!: boolean;
  public hide: boolean = true;
  public systemNonce!: string;
  public clientNonce!: string;
  public encryptedPassword!: string;
  public hash = sha256.create();

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    public dialog: MatDialog,
  ) {
    this.form = this._formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
    moment.locale('pt-br');
  }

  public get F_user(): AbstractControl { return this.form.get('user') as AbstractControl; }
  public get F_password(): AbstractControl { return this.form.get('password') as AbstractControl; }

  ngOnInit() {
    // ("222236024+560408DB9ED93A98253530898CE8FDE83927D3D18864113FA2D035D391DD86F7")
    //18ff43bd0dc
    // “9898410d7f5045bc673db80c1a49b74f088fd7440037d8ce25c7d272a505bce5” hash da senha
    const crc = crc32('222236024+560408DB9ED93A98253530898CE8FDE83927D3D18864113FA2D035D391DD86F7').toString(16);
    const CHAVE_PRIVADA = crc32('9898410d7f5045bc673db80c1a49b74f088fd7440037d8ce25c7d272a505bce5').toString();


    const date = new Date;
    const timeStamp = date.getTime();
    const timestampToMiliseconds = Number(timeStamp) * 1000;
    const milisecondHex = timestampToMiliseconds.toString(16);
    const eightDigitMiliseconds = milisecondHex.substring(milisecondHex.length - 8, milisecondHex.length);




  }

  public hexEncode(hex: string) {
    let i;

    let result = "";
    for (i = 0; i < hex.length; i++) {
      hex = hex.charCodeAt(i).toString(16);
      result += ("000" + hex).slice(-4);
    }

    return result
  }

  public goTo(page: string): void {
    this._router.navigateByUrl(page);
  }

  public requestLogin(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this._authService.getServerNonce(this.F_user.value).subscribe((res: IServerNonce) => {
      this.systemNonce = res.result;
      console.log('systemNonce', this.systemNonce);
      if (this.systemNonce.length > 0) {
        this.doLogin();
      }
    });
  }

  public doLogin(): void {
    this.clientNonce = sha256(moment().toISOString());
    console.log('Client Nonce: ', moment().toISOString() + ' -> ' + this.clientNonce);

    const passwordEncryptionPayload = {
      password: this.F_password.value,
      user: this.F_user.value,
      serverNonce: this.systemNonce,
      clientNonce: this.clientNonce,
    } as IPasswordEncryption

    this.encryptedPassword = this._authService.passwordEncryption(passwordEncryptionPayload);
    const loginPayload = {
      user: this.F_user.value,
      passwordEncrypted: this.encryptedPassword,
      clientNonce: this.clientNonce,
    } as ILogin

    this._authService.doLogin(loginPayload).subscribe((res: ISession) => {
      if (res && res.result.length > 0) {
        this.loggedIn = true;
        console.log('Signature-session', this._authService.getSignatureSession(res, this.F_password.value));
        // this.goTo('home');
        const SIGNATURE_SESSION = this._authService.getSignatureSession(res, this.F_password.value);
        this._authService.getCompanyList(SIGNATURE_SESSION).subscribe((res: any) => {
          console.log('result', res);
        })
      }
    });
  }


  getErrorMessageUser() {
    if (this.F_user.hasError('required')) {
      return 'Usuário é obrigatório';
    }

    return this.F_user.hasError('user') ? 'Usuário inválido' : '';
  }

  getErrorMessagePassword() {
    if (this.F_password.hasError('required')) {
      return 'Senha é obrigatório';
    }

    return this.F_user.hasError('password') ? 'Senh inválida' : '';
  }

}

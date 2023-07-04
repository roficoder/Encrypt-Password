import { Injectable } from '@angular/core';
import * as CryptoJS from "crypto-js";
// import { AesUtil } from '../js/aes.js';
// import { AesUtil } from './aes.util';
declare const AesUtil: any;

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  encrypt(password: string) {
    console.log("Encryption Enabled");
    let iv = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
    let salt = CryptoJS.lib.WordArray.random(128 / 8).toString(
      CryptoJS.enc.Hex
    );
    let aesUtil = new AesUtil(128, 1000, CryptoJS);
    let ciphertext = aesUtil.encrypt(
      salt,
      iv,
      "a$ur5^$&xh#*b!jnbb$zvo9^9(op*(e%",
      password,
      CryptoJS
    );
    let aesPassword = iv + "::" + salt + "::" + ciphertext;
    return aesPassword;
  }


  decrypt(password: string) {
    let res = password.split("::");
    let iv = res[0];
    let salt = res[1];
    let ciphertext = res[2];
    let aesUtil = new AesUtil(128, 1000, CryptoJS);
    let decryptedData = aesUtil.decrypt(
      salt,
      iv,
      "a$ur5^$&xh#*b!jnbb$zvo9^9(op*(e%",
      ciphertext,
      CryptoJS
    );
    decryptedData = decryptedData;
    return decryptedData;
  }

}

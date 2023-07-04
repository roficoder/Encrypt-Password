// let imported = document.createElement('script');
// imported.src = './crypto-js.js';
// document.head.appendChild(imported);
let CryptoJS = null;
let AesUtil = function(keySize, iterationCount, CryptoJS) {
  CryptoJS = CryptoJS;
  this.keySize = keySize / 32;
  this.iterationCount = iterationCount;
};

AesUtil.prototype.generateKey = function(salt, passPhrase, CryptoJS) {
  let key = CryptoJS.PBKDF2(
      passPhrase, 
      CryptoJS.enc.Hex.parse(salt),
      { keySize: this.keySize, iterations: this.iterationCount });
  return key;
};

AesUtil.prototype.encrypt = function(salt, iv, passPhrase, plainText, CryptoJS) {
  let key = this.generateKey(salt, passPhrase, CryptoJS);
  let encrypted = CryptoJS.AES.encrypt(
      plainText,
      key,
      { iv: CryptoJS.enc.Hex.parse(iv) });
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
};

AesUtil.prototype.decrypt = function(salt, iv, passPhrase, cipherText, CryptoJS) {
  let key = this.generateKey(salt, passPhrase, CryptoJS);
  let cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cipherText)
  });
  let decrypted = CryptoJS.AES.decrypt(
      cipherParams,
      key,
      { iv: CryptoJS.enc.Hex.parse(iv) });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
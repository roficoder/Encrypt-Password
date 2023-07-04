import { Component } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Encrypt';
  encryptedPassword: string = '';
  decryptedPassword: string = '';

  constructor(private commonService: CommonService) { }

  encrypt(password: string) {
    this.encryptedPassword = this.commonService
      .encrypt(password)
      .toString()
  }

  decrypt(password: string) {
    this.decryptedPassword = this.commonService
      .encrypt(password)
      .toString()
  }
}

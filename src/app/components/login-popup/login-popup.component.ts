import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit {
  addLoginPopup:boolean = false;
  addRegisterPopup:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  closeLoginBox(): void {
    this.addLoginPopup = !this.addLoginPopup;
  }

  showLoginPopup(): void {
    this.addLoginPopup = true;
    this.addRegisterPopup = false;
  }

  showRegisterPopup(): void {
    this.addLoginPopup = false;
    this.addRegisterPopup = true;
  }

  closeRegisterBox(): void {
    this.addRegisterPopup = !this.addRegisterPopup;
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/AuthService';
import { TokenStorageService } from '../services/TokenStorageService';
import { ModalController, ToastController } from '@ionic/angular';
import { JwtResponse } from '../services/JwtResponse';
import {SignUpInfo} from "../services/SignUpInfo";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  jwtResponse: JwtResponse = new JwtResponse();
  showSpinner = false;
  isSignedUp = false;
  isSignUpFailed = true;
  errorMessage = '';
  isFormValid = false;
  confirmPassword = ''

  constructor(
    private authService: AuthService,
    private storage: TokenStorageService,
    private modalCtrl: ModalController,
    private toastController: ToastController) { }

  ngOnInit() {
    this.authService.getUSerByUsername(this.storage.getUsername()).subscribe(info => {
      this.jwtResponse = info;
      console.log(this.jwtResponse);
    });
  }

  save() {
    this.showSpinner = true;
    let signUpInfo = new SignUpInfo(
      this.jwtResponse.name,
      this.jwtResponse.username,
      this.jwtResponse.password
    );
    this.authService.updateUser(signUpInfo, this.jwtResponse.id).subscribe(
      form => {
        this.jwtResponse = form;
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.presentToast();
        window.location.reload();
      }, error => {
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
        this.showSpinner = false;
      });
  }
  async onSubmit() {
    this.save();
    this.showSpinner = false;
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Info update successfully',
      duration: 2000
    });
    toast.present();
  }
  dismissModal() {
    this.modalCtrl.dismiss();
    this.showSpinner = false;
  }

  validateForm() {
    const { name, username, password } = this.jwtResponse;
    const isNameValid = name && name.length >= 3 && name.length <= 50;
    const isUsernameValid = username && username.length >= 3 && username.length <= 50;
    const isPasswordValid = password && password.length >= 6 && password.length <= 40 &&  password == this.confirmPassword;

    this.isFormValid = isNameValid && isUsernameValid && isPasswordValid;
  }

}

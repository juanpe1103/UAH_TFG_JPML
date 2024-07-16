import { Component, OnInit } from '@angular/core';
import { SignUpInfo } from '../services/SignUpInfo';
import { AuthService } from '../services/AuthService';
import { ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: any = {};
  isSignedUp = false;
  signUpInfo: SignUpInfo;
  showSpinner = false;
  isSignUpFailed = false;
  errorMessage = '';
  isFormValid = false;

  constructor(private authService: AuthService, public toastController: ToastController,
              private router: Router, private modalCarl: ModalController) { }

  ngOnInit(): void {}

  validateForm() {
    const { name, username, password, confirmPassword} = this.form;
    const isNameValid = name && name.length >= 3 && name.length <= 50;
    const isUsernameValid = username && username.length >= 3 && username.length <= 50;
    const isPasswordValid = password && password.length >= 6 && password.length <= 40 &&  password == confirmPassword;

    this.isFormValid = isNameValid && isUsernameValid && isPasswordValid;
  }

  onSubmit() {
    if (!this.isFormValid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }

    this.showSpinner = true;
    this.signUpInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.password
    );

    this.authService.signUp(this.signUpInfo).subscribe(data => {
      this.isSignedUp = true;
      console.log('Register Successfully');
      this.presentToast();
      this.showSpinner = false;
      this.isSignedUp = true;
      this.isSignUpFailed = false;
      this.dismissModal();
    }, error => {
      this.errorMessage = error.error.message;
      this.isSignUpFailed = true;
      this.showSpinner = false;
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Register have been saved successfully.',
      duration: 4000,
      position: 'top',
    });
    toast.present();
  }

  dismissModal(): void {
    this.modalCarl.dismiss();
  }
}

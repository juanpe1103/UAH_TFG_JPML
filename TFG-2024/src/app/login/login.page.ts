import { RegisterPage } from './../register/register.page';
import { Component, OnInit } from '@angular/core';
import { AuthLoginInfo } from '../services/AuthLoginInfo';
import { AuthService } from '../services/AuthService';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../services/TokenStorageService';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  loginInfo: AuthLoginInfo;
  showSpinner = false;

  constructor(private authService: AuthService, private router: Router, private toastController: ToastController,
              private tokenStorageService: TokenStorageService, private modalCtrl: ModalController,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
      if (this.tokenStorageService.getToken()) {
          this.isLoggedIn = true;
      }
  }

  onSubmit() {
    this.showSpinner = true;
    this.loginInfo = new AuthLoginInfo(
        this.form.username,
        this.form.password
    );

    this.authService.attemptAuth(this.loginInfo).subscribe(async data => {
      this.tokenStorageService.saveToken(data.accessToken);
      this.tokenStorageService.saveUsername(data.username);
      this.isLoggedIn = true;
      this.isLoginFailed = false;
      this.presentToast();
      this.router.navigate(['/home/', data.username], {relativeTo: this.route});
      this.showSpinner = false;
    }, error => {
      this.showSpinner = false;
      this.isLoginFailed = true;
    });
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Login successfully',
      duration: 2000
    });
    toast.present();
  }

async register() {
  const modal = await this.modalCtrl.create({
    component: RegisterPage,
    cssClass: 'cart-modal'
  });
  modal.present();
}
}


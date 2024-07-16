import { Component, OnInit, OnDestroy } from '@angular/core';
import { JwtResponse } from '../services/JwtResponse';
import { LocationDto } from '../model/rest';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TokenStorageService } from '../services/TokenStorageService';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/AuthService';
import { RouteService } from '../services/route-service';
import { EditUserPage } from './../edit-user/edit-user.page';
import { SearchRoutesComponent } from "../search-routes/search-routes.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  username: string;
  info: JwtResponse = new JwtResponse();
  showSpinner = false;
  routes: LocationDto[] = []; // Lista de todas las rutas del usuario
  routeLength: number;
  favoriteRoutes: LocationDto[] = []; // Lista de todas las rutas del usuario
  private navigationSubscription: Subscription;

  constructor(
    private modalController: ModalController,
    private tokenStorageService: TokenStorageService,
    private alertController: AlertController,
    private router: Router,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private toastController: ToastController,
    private routeService: RouteService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadData();  // Inicializar datos la primera vez
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  // Este método se llama cada vez que se entra a la vista
  ionViewWillEnter() {
    this.loadData();
  }

  loadData(): void {
    this.authService.getUSerByUsername(this.tokenStorageService.getUsername()).subscribe(info => {
      this.info = info;
      this.routeService.findAllRoutesForUser(info.id).subscribe(routes => {
        this.routes = routes;
        this.routeLength = this.routes.length;
      });
      this.routeService.findUserFavorites(info.id).subscribe(routes => {
        this.favoriteRoutes = routes;
        this.routeLength = this.routes.length;
      });
    });
  }

  async editUSer(username) {
    const modal = await this.modalCtrl.create({
      component: EditUserPage,
      componentProps: {
        username,
      },
      cssClass: 'cart-modal',
    });
    modal.present();
  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('/login');
    this.showSpinner = false;
  }

  async presentAlertConfirmDeleteUser(idUser) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: Cancel delete user');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.authService.deleteUser(idUser).subscribe(async () => {
              const toast = await this.toastController.create({
                message: 'Success',
                duration: 2000
              });
              toast.present();
              this.logout();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async addRoute() {
    this.router.navigate(['/addroute'], { relativeTo: this.activatedRoute });
  }

  async searchRoutes() {
    const modal = await this.modalController.create({
      component: SearchRoutesComponent,
      cssClass: 'full-modal-css',
    });
    await modal.present();
  }

  async goToRoute(idLocation: number) {
    await this.router.navigate(['/addroute'], {
      relativeTo: this.activatedRoute, queryParams: {
        idLocation: idLocation
      }
    });
  }
}

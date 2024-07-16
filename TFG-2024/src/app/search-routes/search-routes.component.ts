import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RouteService } from "../services/route-service";
import { CommentaryDto, LocationDto } from "../model/rest";
import { Geolocation } from '@capacitor/geolocation';
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-search-routes',
  templateUrl: './search-routes.component.html',
  styleUrls: ['./search-routes.component.scss'],
})
export class SearchRoutesComponent implements OnInit {

  routes: LocationDto[] = [];
  routeLength: number;
  sortedRoutes: LocationDto[] = [];
  private lat: any;
  private lng: any;
  selectedSort: string = 'distance';

  constructor(private router: Router,
              private routeService: RouteService,
              private activatedRoute: ActivatedRoute,
              private modalController: ModalController) { }

  ngOnInit(): void {
    this.routeService.findAllRoutes().subscribe(routes => {
      this.routes = routes;
      this.routeLength = this.routes.length;
      this.sortRoutes();
    });
    this.getCurrentPosition();
  }

  async goToRoute(idLocation: number) {
    await this.closeModal();
    await this.router.navigate(['/addroute'], {
      relativeTo: this.activatedRoute, queryParams: {
        idLocation: idLocation
      }
    });
  }

  async closeModal() {
    const modal = await this.modalController.getTop();
    if (modal) {
      await modal.dismiss();
    }
  }

  async sortRoutes() {
    await this.getCurrentPosition();
    this.sortedRoutes = this.routes.map(route => {
      const distance = this.calculateDistance(this.lat, this.lng, route.locations[0]?.lat, route.locations[0]?.lng);
      return { ...route, distance };
    });

    if (this.selectedSort === 'distance') {
      this.sortedRoutes.sort((a, b) => a.distance - b.distance);
    } else if (this.selectedSort === 'rating') {
      this.sortedRoutes.sort((a, b) => this.calculateAverageRating(b.commentaries) - this.calculateAverageRating(a.commentaries));
    }
  }

  async getCurrentPosition() {
    const position = await Geolocation.getCurrentPosition();
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
  }

  calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLng = this.deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  calculateAverageRating(commentaries: CommentaryDto[]): number {
    if (commentaries.length === 0) return 0;
    const totalScore = commentaries.reduce((sum, commentary) => sum + commentary.score, 0);
    return totalScore / commentaries.length;
  }
}

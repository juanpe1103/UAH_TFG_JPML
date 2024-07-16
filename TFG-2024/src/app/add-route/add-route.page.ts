import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {GoogleMap} from '@capacitor/google-maps';
import {environment} from "../../environments/environment";
import {DescModalComponent} from "../modal/desc.modal";
import {ModalController} from "@ionic/angular";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {RouteService} from "../services/route-service";
import {AuthService} from "../services/AuthService";
import {TokenStorageService} from "../services/TokenStorageService";
import {LocationsDto, LocationDto, CommentaryDto, UserDto} from "../model/rest";
import {CommentaryModalComponent} from "../modal/commentary.modal";
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.page.html',
  styleUrls: ['./add-route.page.scss'],
})
export class AddRoutePage  {

  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  @Input() idRoute;
  route: LocationDto = {
    id: 0,
    commentaries: [],
    description: "",
    locations: [],
    lng: 0,
    lat: 0,
    distance: 0
  }
  editMode: boolean = false;
  @Input() isNewRoute: boolean = true;
  markersId: string [] = []
  jwtResponse: UserDto;
  polyline: any[] = [];
  oldLocation: { lng: any; lat: any}
  favoriteRoutes: LocationDto[] = []; // Lista de todas las rutas del usuario
  private newPolyline: google.maps.Polyline;
  private modalOpen: boolean = false; // Flag para controlar el estado de la modal
  constructor(private cd: ChangeDetectorRef, private modalController: ModalController, private router: Router, private activatedRoute: ActivatedRoute, private routeService: RouteService, private authService: AuthService, private storage: TokenStorageService) {
  }

  terminarRuta() {
    this.routeService.saveRoute(this.route, this.jwtResponse.id).subscribe(async data => {
      this.goHome()
    });
  }

  borrarRuta() {
    this.routeService.deleteRoute(this.route.id).subscribe(async data => {
      this.goHome()
    });
  }

  cancelar() {
    this.goHome()
  }

  goHome(){
    this.router.navigate(['/home' + '/' + this.jwtResponse.username])
  }

  addToFavorites() {
    this.routeService.addRouteFavorites(this.jwtResponse.id, this.route.id).subscribe(data => {
      this.goHome();
    });
  }

  removeToFavorites() {
    this.routeService.removeRouteFavorites(this.jwtResponse.id, this.route.id).subscribe(data => {
      this.goHome();
    });
  }

  isFavoriteRoute(): boolean {
    return this.favoriteRoutes?.some(route => route.id === this.route?.id);
  }

  async editarDescripcion() {
    if (this.modalOpen) return; // Evitar abrir múltiples modales
    this.modalOpen = true;

    const modal = await this.modalController.create({
      component: DescModalComponent,
      componentProps: {
        title: 'Editar descripción ruta',
        description: this.route.description
      },
    });

    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    this.modalOpen = false; // Resetear el flag al cerrar la modal

    if (role === 'accept' && data && data.description) {
      this.route.description = data.description;
    } else {
      this.goHome();
    }
  }

  async valorarRuta() {
    const modal = await this.modalController.create({
      component: CommentaryModalComponent ,
      componentProps: {
        title: 'Valorar ruta',
        commentaries: this.route.commentaries
      },
    });

    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role === 'accept' && data && data.description) {
      var commentary: CommentaryDto = {id: null, score: data.score, description: data.description}
      this.routeService.commentRoute(commentary, this.route.id, this.jwtResponse.id).subscribe(data => {
        window.location.reload();
      });
    }
  }

  get valid(): boolean {
    return this.route.locations.length > 2;
  }
  ionViewWillEnter() {
    this.authService.getUSerByUsername(this.storage.getUsername()).subscribe(info => {
      this.jwtResponse = info;
      this.routeService.findUserFavorites(info.id).subscribe(routes => {
        this.favoriteRoutes = routes;
      });
    });
    this.createMap();
  }

  async createMap() {
    try {
      this.activatedRoute.params.subscribe(
        async params => {
          const idLocation = this.activatedRoute.snapshot.queryParams.idLocation;
          if (idLocation) {
            this.isNewRoute = false;
            this.routeService.findRouteById(idLocation).subscribe(async location => {
              this.route = location;
              this.routeService.findAllRoutesForUser(this.jwtResponse.id).subscribe(routes => {
                if (routes.some(route => route.id === this.route.id)) {
                  this.editMode = true;
                }
              });

              const center = {
                lat: location.locations[0]?.lat,
                lng: location.locations[0]?.lng
              };
              await this.generateMap(center, location);
            });
          } else {
            const route = {
              id: 0,
              commentaries: [],
              description: "",
              locations: [],
              lng: 0,
              lat: 0,
              distance: 0
            };
            const center = {
              lat: 40.9941900,
              lng: -3.6353800,
            };
            await this.generateMap(center, route);
            this.editMode = true;
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  async generateMap(center, route) {
    this.polyline = [];
    this.route = route;
    this.newMap = await GoogleMap.create({
      id: 'capacitor-google-maps',
      element: this.mapRef.nativeElement,
      apiKey: environment.keys.googleMaps,
      config: {
        center: center,
        zoom: 13,
      },
    });

    this.newPolyline = new google.maps.Polyline({
      path: [],
      strokeColor: "#FF0000",
      strokeOpacity: 1,
      strokeWeight: 2,
      geodesic: true,
    });

    const symbol = {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: '#FF0000',
      fillOpacity: 1,
      scale: 2,
      strokeColor: 'transparent',
    };

    this.newPolyline.setOptions({
      icons: [{
        icon: symbol,
        offset: '0',
        repeat: '30px',
      }],
    });

    this.polyline.push(this.newPolyline);

    await this.newMap.addPolylines(this.polyline.map(p => ({ id: p.id, path: p.getPath().getArray() }))); //TODO info

    await this.inicializarMarcadores();
    await this.newMap.enableClustering();
    await this.newMap.enableTrafficLayer(true);

    this.addListeners();
    if(this.isNewRoute) this.editarDescripcion();
  }


  async addListeners() {
    // Handle marker click
    await this.newMap.setOnMarkerClickListener((event) => {
      this.editMarker(event.latitude, event.longitude);
    });

    await this.newMap.setOnMapClickListener((event) => {
      this.addMarker(event.latitude, event.longitude);
    });

    await this.newMap.setOnMarkerDragStartListener((event) => {
      this.setOldLocation(event.latitude, event.longitude)
    });

    await this.newMap.setOnMarkerDragEndListener((event) => {
      this.updateLocation(event.latitude, event.longitude)
      this.drawPolyline()
    });

    // Handle polyline click
    await this.newMap.setOnPolylineClickListener((event) => {
    });

  }

  setOldLocation(lat, lng){
    this.oldLocation = {
      lat: lat,
      lng: lng
    }
  }

  updateLocation(lat, lng){
    const index  = this.route.locations.findIndex(item => item.lat === this.oldLocation.lat && item.lng === this.oldLocation.lng)
    this.route.locations[index].lng = lng
    this.route.locations[index].lat = lat
  }

  async addMarkerToMap(lat, lng){
    const nextPos = this.nextPos()
    const markerId = await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng,
      },
      iconUrl: this.generateMarker(nextPos),
      snippet: nextPos.toString(),
      draggable: true,
    });
    this.nextPos
    this.markersId.push(markerId)
    return nextPos
  }
  async addMarker(lat, lng) {
    const nextPos = await this.addMarkerToMap(lat, lng);
    this.addToRouteMark(nextPos, lat, lng, "");
      if (this.route.locations.length == 0) {
        this.route.lat = lat
        this.route.lat = lng
      }
  }

  addToRouteMark(nextPos, lat, lng, description){
    const nuevaLocation: LocationsDto = {
      pos: nextPos,
      lat: lat,
      lng: lng,
      description: description
    };
    this.route.locations.push(nuevaLocation)
    this.drawPolyline()
    this.calculateTotalDistance();
    this.cd.detectChanges();
  }
  async editMarker(lat, long) {
    let location = this.route.locations.find(item => item.lat === lat && item.lng === long)
    let lastIndex = this.route.locations.length - 1;
    let isLastLocation = this.route.locations.indexOf(location) === lastIndex;
    const modal = await this.modalController.create({
      component: DescModalComponent,
      componentProps: {
        title: 'Editar punto',
        editarPunto: true,
        description: location.description,
        isLastLocation: isLastLocation
      },
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role === 'borrar') {
      this.resetMap(this.route.locations.find(item => item.lat === lat && item.lng === long))
    }
    if (role === 'addPoint') {
      this.addPointAfterSelectedMarker(this.route.locations.find(item => item.lat === lat && item.lng === long))
    }
    if (role === 'accept' && data && data.description) {
      const indice = this.route.locations.findIndex(item => item.lat === lat && item.lng === long);
      if (indice !== -1) {
        this.route.locations[indice].description = data.description;
      }
    }
  }

  resetMap(location: LocationsDto){
    /*this.route.locations = this.route.locations.filter(item => item.id !== index);*/
    // Eliminar el marcador del array de marcadores
    // Reajustar los n meros de los marcadores restantes
    this.newMap.removeMarkers(this.markersId)
    this.markersId = []
    this.reajustarPos(location.pos);
    this.inicializarMarcadores()
  }

  reajustarPos(posBorrado) {

    const indiceBorrado = this.route.locations.findIndex(location => location.pos === posBorrado);
    // Actualizamos las posiciones de los objetos posteriores
    for (let i = indiceBorrado + 1; i < this.route.locations.length; i++) {
      this.route.locations[i].pos -= 1;
    }
    // Eliminamos el objeto borrado del array
    this.route.locations.splice(indiceBorrado, 1);
  }

  async inicializarMarcadores() {
    this.route.locations.sort((a, b) => a.pos - b.pos); //Ordenar los puntos por posición
    for (const location of this.route.locations) {
      const markerId = await this.newMap.addMarker({
        coordinate: {
          lat: location.lat,
          lng: location.lng,
        },
        iconUrl: this.generateMarker(location.pos),
        draggable: true,
      });
      this.markersId.push(markerId);
    }
    this.drawPolyline();
  }

  generateMarker(numero: number): string {
    // Crear un nuevo elemento canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Definir el tama o del canvas
    canvas.width = 40;
    canvas.height = 60;

    // Dibujar el n mero en el canvas
    context.font = '20px Arial';
    context.fillStyle = 'red';
    context.fillText(numero.toString(), 10, 30); // Ajusta la posici n del n mero

    // Obtener la URL de la imagen del canvas
    return canvas.toDataURL();
  }


  nextPos(){
    return this.route.locations.length == 0 ? 0 : this.route.locations[this.route.locations.length - 1].pos + 1
  }

  drawPolyline() {
    if (this.route.locations.length > 1) {
      this.polyline[0].setPath(this.route.locations.map(location => ({
        lat: location.lat,
        lng: location.lng
      })));
      this.newMap.addPolylines(this.polyline);
    }
  }

  calculateTotalDistance() {
    var locations = this.route.locations
    let totalDistance = 0;
    for (let i = 0; i < locations.length - 1; i++) {
      const currentLocation = locations[i];
      const nextLocation = locations[i + 1];
      const distance = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(currentLocation.lat, currentLocation.lng),
        new google.maps.LatLng(nextLocation.lat, nextLocation.lng)
      );
      totalDistance += distance;
    }
    this.route.distance = totalDistance;
  }

  async addPointAfterSelectedMarker(location: LocationsDto) {
    const index = this.route.locations.findIndex(item => item === location);

    if (index === -1 || index === this.route.locations.length - 1) {//TODO
      return;
    }
    const nextLocation = this.route.locations[index + 1];

    const midPoint = {
      lat: (location.lat + nextLocation.lat) / 2,
      lng: (location.lng + nextLocation.lng) / 2,
      description: "",
      pos: location.pos + 1,
    };

    // Añadir el punto intermedio a la ruta
    this.route.locations.splice(index + 1, 0, midPoint);

    // Reajustar las posiciones de los marcadores
    for (let i = index + 2; i < this.route.locations.length; i++) {
      this.route.locations[i].pos += 1;
    }

    // Eliminar y volver a dibujar todos los marcadores
    await this.newMap.removeMarkers(this.markersId);
    this.markersId = [];
    this.inicializarMarcadores();
  }

  ngOnDestroy(): void {
    this.editMode = false;
    if (this.newMap) {
      this.newMap.destroy();
    }
  }

}


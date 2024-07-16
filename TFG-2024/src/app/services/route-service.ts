import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentaryDto, LocationDto} from "../model/rest";

const httpOptions = {
  headers: new HttpHeaders({'content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private routeUrl = 'http://localhost:8080/api/route';

  constructor(private http: HttpClient) { }

  findRouteById(idLocation: number): Observable<LocationDto> {
    return this.http.get<LocationDto>(`${this.routeUrl}/findLocationById/${idLocation}`);
  }
  saveRoute(route: LocationDto, idUser: number): Observable<any> {
    return this.http.post<any>(`${this.routeUrl}/${idUser}`, route, httpOptions);
  }
  deleteRoute(idLocation: number): Observable<any> {
    return this.http.delete<any>(`${this.routeUrl}/deleteLocation/${idLocation}`, httpOptions);
  }
  findAllRoutesForUser(idUser: number): Observable<LocationDto[]> {
    return this.http.get<LocationDto[]>(`${this.routeUrl}/findAllLocationForUser/${idUser}`);
  }
  findUserFavorites(idUser: number): Observable<LocationDto[]> {
    return this.http.get<LocationDto[]>(`${this.routeUrl}/findUserFavorites/${idUser}`);
  }
  findAllRoutes(): Observable<LocationDto[]> {
    return this.http.get<LocationDto[]>(`${this.routeUrl}/findAllLocation`);
  }
  commentRoute(commentary: CommentaryDto, idLocation: number, idUser: number): Observable<any> {
    return this.http.put<any>(`${this.routeUrl}/saveCommentary/${idLocation}/${idUser}`, commentary, httpOptions);
  }
  addRouteFavorites(idUser: number, idLocation: number): Observable<any> {
    return this.http.post<any>(`${this.routeUrl}/addFavoriteLocation/${idUser}/${idLocation}`, {});
  }
  removeRouteFavorites(idUser: number, idLocation: number): Observable<any> {
    return this.http.delete<any>(`${this.routeUrl}/removeFavoriteLocation/${idUser}/${idLocation}`, {});
  }
}

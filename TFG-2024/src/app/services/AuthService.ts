import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthLoginInfo} from './AuthLoginInfo';
import {Observable, BehaviorSubject} from 'rxjs';
import {JwtResponse} from './JwtResponse';
import {SignUpInfo} from './SignUpInfo';

const httpOptions = {
  headers: new HttpHeaders({'content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/signin';
  private signUpUrl = 'http://localhost:8080/api/signup';
  private profileUrl = 'http://localhost:8080/api/users';


  private userInfo = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

attemptAuth(creadentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, creadentials, httpOptions);
}

signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signUpUrl, info, httpOptions);
}

signUpAdmin(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signUpUrl, info, httpOptions);
}

getUserBoard(): Observable<any> {
    return this.http.get(this.profileUrl, {responseType: 'text'});
}

getUserById(id: number) {
     this.http.get(`${this.profileUrl}/id/${id}`).subscribe(user => {
        this.userInfo.next(user);
    });
    return this.userInfo.asObservable();
}
getUSerByUsername(username: string): Observable<any> {
   return this.http.get<any>(`${this.profileUrl}/username/${username}`);
}

updateUser(user: SignUpInfo, id: number): Observable<JwtResponse> {
    return this.http.put<JwtResponse>(`${this.profileUrl}/update/${id}`, user, httpOptions);
}

deleteUser(id: number) {
    return this.http.delete(`${this.profileUrl}/delete/${id}`, {responseType: 'text'});
}

findAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.profileUrl}/findAllUsers`);
}

}

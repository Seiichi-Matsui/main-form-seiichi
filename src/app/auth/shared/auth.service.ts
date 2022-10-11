import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import * as moment from 'moment';
import { Router } from '@angular/router';


const jwt = new JwtHelperService();
class DecodedToken {
  userId: string = ''
  username: string = ''
  authority: string = ''
  exp: number = 0
}

@Injectable()
export class AuthService {
  private decodedToken: any

  constructor(
    private http: HttpClient,
    private router: Router
    ) {
    this.decodedToken = new DecodedToken() || localStorage.getItem(JSON.parse(this.decodedToken))
  }

    getToken() {
      return localStorage.getItem('app-auth')
    }

    getUsers(): Observable<any>{
      return this.http.get('/api/v1/users')
  }

    isAuthenticated() {
      return moment().isBefore(moment.unix(this.decodedToken.exp))
    }

    register(userDate: string): Observable<any> {
        return this.http.post('/api/v1/users/register', userDate)
        
    }
    login(userDate: string): Observable<any> {
        return this.http.post('/api/v1/users/login', userDate).pipe(map(
          (token: any) => {
            this.decodedToken= jwt.decodeToken(token)
            localStorage.setItem('app-auth', token)
            localStorage.setItem('app-meta', JSON.stringify(this.decodedToken))

            this.router.navigate(['form/situation'])
            return token
          }
        ))
    }
    logout(){
      localStorage.removeItem('app-auth')
      localStorage.removeItem('app-meta')
      this.decodedToken = new DecodedToken()
      this.router.navigate([''])
    }


    clear(e: any): Observable<any> {
    
      console.log('/api/v1/users/'+ e);
      return this.http.delete('/api/v1/users/'+ e)
      
    }

    update(
      updateUser: string
      ): Observable<any>{
          const user = updateUser
          return this.http.patch('/api/v1/users/update', user)
  }
}
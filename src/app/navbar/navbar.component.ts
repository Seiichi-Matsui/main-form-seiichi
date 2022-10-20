import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  meta:any = ''
  username:any = ''
  auth:any = this.authService
  constructor(
    private authService: AuthService
  ){}
  ngOnInit(): void {
    this.meta =  localStorage.getItem('app-meta')
    this.username = JSON.parse(this.meta).username
  }

  logout() {
    this.auth.logout()
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  meta:any =  localStorage.getItem('app-meta')
  username = JSON.parse(this.meta).username

  constructor(
    public auth: AuthService) { }

  ngOnInit(): void {
  }


}

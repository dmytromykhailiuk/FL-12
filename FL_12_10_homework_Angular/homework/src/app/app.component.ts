import { Component } from '@angular/core';
import { AppUsersService } from './services/app-users-service';

export interface User {
  id: number
  name: string
  email: string
  phone: string
  isChanging: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  search = '';

  constructor( public appUsersService: AppUsersService ) {
  }
  
}

import { Component, OnInit, Input } from '@angular/core';
import { User } from '../app.component';
import { AppUsersService } from '../services/app-users-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  form: FormGroup 

  @Input() user: User

  constructor( public appUsersService: AppUsersService ) { }

  ngOnInit(): void {
    let name = this.user.name;
    let email = this.user.email;
    let phone = this.user.phone;
    this.form = new FormGroup({
      name: new FormControl(name, Validators.required),
      email: new FormControl(email, [Validators.required, Validators.minLength(4), Validators.email]),
      phone: new FormControl(phone, [Validators.required, Validators.pattern('[0-9-,x ()]*')])
    })
  }

}

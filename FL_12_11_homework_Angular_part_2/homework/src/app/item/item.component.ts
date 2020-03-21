import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {fromEvent} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {UsersService, User} from '../servises/users.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() user: User
  @ViewChild('edititembtn', {static: true}) editUserBtn: ElementRef;
  @ViewChild('deluserbtn', {static: true}) delUserBtn: ElementRef;

  constructor(private router: Router, public usersService: UsersService) {}

  ngOnInit(): void {
    this.router.navigate(['/users']);
    fromEvent(this.editUserBtn.nativeElement, 'click')
      .subscribe(() => this.router.navigate([`/users/${this.user.id}`]));

    fromEvent(this.delUserBtn.nativeElement, 'click')
      .pipe(switchMap(() => this.usersService.removeUser(this.user.id)))
      .subscribe(() => {
        this.usersService.users = this.usersService.users
          .filter(u => u.id !== this.user.id)
        })  
  }
}

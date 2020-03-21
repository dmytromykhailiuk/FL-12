import {Component, ViewChild, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {fromEvent} from 'rxjs';
import {map, debounceTime, distinctUntilChanged} from 'rxjs/operators'
import {UsersService} from '../servises/users.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main.page.component.html',
  styleUrls: ['./main.page.component.css']
})
export class MainPageComponent {
  @ViewChild('createnewitem', {static: true}) newUserBtn: ElementRef;
  @ViewChild('serchinginput', {static: true}) serchingInput: ElementRef;
  inputValue: string = '';
  searchingValue: string = '';

  constructor(private router: Router, public usersService: UsersService) {}
  
  ngOnInit(): void {
    this.router.navigate(['/users']);

    fromEvent(this.newUserBtn.nativeElement, 'click')
      .subscribe(() => this.router.navigate(['/users/new']));

    fromEvent(this.serchingInput.nativeElement, 'input')
      .pipe(
        map(() => {
          this.inputValue = event.target['value'];  
          return event.target['value'];
        }),
        debounceTime(700),
        distinctUntilChanged()
      )
      .subscribe(val => this.searchingValue = val);

    this.usersService.fetchUsers()
      .subscribe(users => {
        if (users[0]) {
          this.usersService.newId = users[users.length - 1].id + 1;
        }
        this.usersService.users = users;
      })
  }
};

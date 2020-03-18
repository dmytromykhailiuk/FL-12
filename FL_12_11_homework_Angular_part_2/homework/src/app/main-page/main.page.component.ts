import {Component, ViewChild, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import { fromEvent } from 'rxjs';

export interface User {
  id: number
  name: string
  email: string
  phone: string
  isChanging: boolean
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main.page.component.html',
  styleUrls: ['./main.page.component.css']
})
export class MainPageComponent {
  users: User[] = [
    {id: 1, name: 'Beer', email: 'dsadsa@fdfd.com', phone: '434354', isChanging: false},
    {id: 2, name: 'Bread', email: 'dsadsa@fdfd.com', phone: '54563', isChanging: false},
    {id: 3, name: 'Javascript', email: 'dsadsa@fdfd.com', phone: '3245234', isChanging: false}
  ];
  @ViewChild('createnewitem', {static: true}) newUserBtn: ElementRef;
  createElement$: any;

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    this.router.navigate(['/users']);
    this.createElement$ =  fromEvent(this.newUserBtn.nativeElement, 'click').subscribe(() => this.router.navigate(['/users/new']));  
  }

  ngOnDestroy(): void {
    this.createElement$.unsubscribe();  
  }
};

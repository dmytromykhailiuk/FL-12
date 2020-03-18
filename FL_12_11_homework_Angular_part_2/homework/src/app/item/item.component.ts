import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { User } from "../main-page/main.page.component";
import {Router} from '@angular/router';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() user: User
  @ViewChild('edititembtn', {static: true}) editUserBtn: ElementRef;
  editElement$: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['/users']);
    this.editElement$ =  fromEvent(this.editUserBtn.nativeElement, 'click').subscribe(() => this.router.navigate([`/users/${this.user.id}`]));  
  }

  ngOnDestroy(): void {
    this.editElement$.unsubscribe();
  }
}

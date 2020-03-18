import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit.page.component.html',
  styleUrls: ['./edit.page.component.css']
})
export class EditPageComponent {
  @ViewChild('gobackbtn', {static: true}) goBackBtn: ElementRef;
  @ViewChild('cancelbtn', {static: true}) cancelBtn: ElementRef;
  goBack$: any
  cancelChanges$: any

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    this.goBack$ =  fromEvent(this.goBackBtn.nativeElement, 'click').subscribe(() => this.router.navigate(['/users']));
    this.cancelChanges$ =  fromEvent(this.cancelBtn.nativeElement, 'click').subscribe(() => this.router.navigate(['/users']));
  }

  ngOnDestroy(): void {
    this.goBack$.unsubscribe();
    this.cancelChanges$.unsubscribe();
  }
}

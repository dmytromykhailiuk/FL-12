import {Component, ViewChild, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'app-error-page',
  templateUrl: './error.page.component.html',
  styleUrls: ['./error.page.component.css']
})
export class ErrorPageComponent {
  @ViewChild('gotomainpage', {static: true}) goToMainPage: ElementRef;
  constructor(private router: Router) {}

  ngOnInit(): void {
    fromEvent(this.goToMainPage.nativeElement, 'click')
      .subscribe(() => this.router.navigate(['/users']));
  }
}
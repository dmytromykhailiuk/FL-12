import {Component} from '@angular/core'
import {Router} from '@angular/router'

@Component({
  selector: 'app-error-page',
  templateUrl: './error.page.component.html',
  styleUrls: ['./error.page.component.css']
})
export class ErrorPageComponent {
  constructor(private router: Router) {}

  goToPostsPage() {
    this.router.navigate(['/posts'])
  }
}
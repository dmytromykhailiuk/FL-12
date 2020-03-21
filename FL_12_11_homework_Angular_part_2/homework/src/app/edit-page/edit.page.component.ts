import {Component, ViewChild, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {fromEvent} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {UsersService, User} from '../servises/users.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit.page.component.html',
  styleUrls: ['./edit.page.component.css']
})
export class EditPageComponent {
  form: FormGroup;
  @ViewChild('gobackbtn', {static: true}) goBackBtn: ElementRef;
  @ViewChild('cancelbtn', {static: true}) cancelBtn: ElementRef;
  @ViewChild('savebtn', {static: true}) saveBtn: ElementRef;
  id: string;
  user: User = {
    name: '', phone: '', email: '', id: 0, website: '', address: {city: ''}
  }

  constructor(
    private router: Router, private route: ActivatedRoute, 
    public usersService: UsersService
  ) {}
  
  ngOnInit(): void {
    let name, email, phone, address, website = '';
    this.route.params.subscribe((p) => this.id = p.id);
    
    if (this.id !== 'new') {

      this.usersService.users.find(el => {
        if (el.id === +this.id) {
          name = el.name;
          email = el.email;
          phone = el.phone;
          address = el.address.city;
          website = el.website
        }
      })

      if (!name) {
        this.router.navigate(['/error'])
      }
      
      this.usersService.fetchUser(name)
        .subscribe(user => {
          this.user = {
            ...this.user, ...user
          }
        })
    }
    
    fromEvent(this.goBackBtn.nativeElement, 'click')
      .subscribe(() => this.router.navigate(['/users']));

    fromEvent(this.cancelBtn.nativeElement, 'click')
      .subscribe(() => this.router.navigate(['/users']));

    fromEvent(this.saveBtn.nativeElement, 'click')
      .pipe(
        switchMap(() => {
          if (this.id === 'new') {
            return this.usersService.addUser({
              ...this.form.value, id: this.usersService.newId })
          } else {
            return this.usersService.changeUser(+this.id, {
              ...this.form.value, id: +this.id  })
          }
        }))
      .subscribe(() => this.router.navigate(['/users']))

    this.form = new FormGroup({
      name: new FormControl(
        name, Validators.required),
      email: new FormControl(
        email, [Validators.required, Validators.minLength(4), Validators.email]),
      phone: new FormControl(
        phone, [Validators.required, Validators.pattern('[0-9-,x ()]*')]),
      address: new FormGroup({
        city: new FormControl(address)
      }),
      website: new FormControl(website)
    })
  }
}

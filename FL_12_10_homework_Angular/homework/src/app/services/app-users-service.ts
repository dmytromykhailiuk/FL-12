import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppUsersService {
  users = [
    {id: 1, name: 'Beer', email: 'dsadsa@fdfd.com', phone: '434354', isChanging: false},
    {id: 2, name: 'Bread', email: 'dsadsa@fdfd.com', phone: '54563', isChanging: false},
    {id: 3, name: 'Javascript', email: 'dsadsa@fdfd.com', phone: '3245234', isChanging: false}
  ];
  name: string = '';
  email: string = '';
  phone: string = '';
  nextId: number = 4;
  isAddingNewItem: boolean = false;

  clearFields():void {
    this.name = '';
    this.email = '';
    this.phone = '';
  }
  
  closeEdining():void {
    this.users = this.users.map(el => {
      el.isChanging = false;
      return el;
    });
  };

  onAddNewUser() {
    this.isAddingNewItem = true;
    this.users.unshift({
      id: this.nextId++,
      name: '',
      email: '',
      phone: '',
      isChanging: true
    });
  }

  onChangeField(e, fieldName):void {
    this[fieldName] = e.target.value.trim();
  }

  onEdit(id):void {
    if (this.isAddingNewItem) {
      this.users.shift();
      this.isAddingNewItem = false;
    }
    this.closeEdining();
    this.users = this.users.map(el => {
      if (el.id === id) {
        el.isChanging = true;
      }
      return el;
    });
  };

  onDiscard():void {
    this.closeEdining();
    if (this.isAddingNewItem) {
      this.users.shift();
      this.isAddingNewItem = false;
    }
  };

  onDelete(id) {
    this.closeEdining();
    this.users = this.users.filter(el => el.id !== id);
  }

  onSave(id) {
    if (this.isAddingNewItem) {
      this.isAddingNewItem = false;
    }
    this.users = this.users.map(el => {
      if (el.id === id) {
        el.isChanging = false;
        el.name = this.name ? this.name : el.name;
        el.email = this.email ? this.email : el.email;
        el.phone = this.phone ? this.phone : el.phone;
      }
      return el;
    });
    this.clearFields();
  }



}

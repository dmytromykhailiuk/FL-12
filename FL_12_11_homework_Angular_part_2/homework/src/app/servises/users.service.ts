import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

interface Address {
  city?: string
}

export interface User {
  id: number
  name: string
  email: string
  phone: string
  address?: Address
  website?: string
}

@Injectable({providedIn: 'root'}) 
export class UsersService {
  users: User[] = [];
  newId: number;
  serviceUrl: string = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.serviceUrl, user)
  }

  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.serviceUrl)
  }

  fetchUser(name: string): Observable<User> {
    return this.http.get<User>(`${this.serviceUrl}`, {
      params: new HttpParams().set('name', name)
    })
  }

  removeUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.serviceUrl}/${id}`)
  }

  changeUser(id: number, udatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.serviceUrl}/${id}`, udatedUser);
  }
}

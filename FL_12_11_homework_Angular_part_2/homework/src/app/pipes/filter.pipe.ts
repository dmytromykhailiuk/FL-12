import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../main-page/main.page.component';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(users: User[], search: string = ''): User[] {
    if (!search.trim()) {
      return users
    }

    return users.filter(user => {
      const info = `${user.name} ${user.email} ${user.phone}`;
      return info.toLowerCase().includes(search.toLowerCase());
    })
  }

}

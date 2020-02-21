class Employee {
  constructor(firstName, lastName, birthday, salary, position, department) {
    this.id = `${firstName}${lastName}${birthday}`;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = new Date(birthday);
    this.salary = salary;
    this.position = position;
    this.department = department;
  }
  get age() {
    const now = new Date();
    const age = now.getFullYear() - this.birthday.getFullYear();
    return now.setFullYear(1972) < this.birthday.setFullYear(1972) ? age - 1 : age;
  }

  get fullName() {
    return this.name + ' ' + this.lastName;
  }

  static employees = [];

  quit() {
    let index;
    let isFinded = false;
    Employee.employees.forEach((el, i) => {
      if (el.id === this.id) {
        index = i;
        isFinded = true;
      }
    });
    if (isFinded) {
      Employee.employees = [
        ...Employee.employees.slice(0, index), ...Employee.employees.slice(index + 1)
      ];
    }
  }

  retire() {
    console.log('It was such a pleasure to work with you!');
    this.quit();
  }

  getFired() {
    console.log('Not a big deal!');
    this.quit();
  }

  changeDepartment(newDepartment) {
    this.department = newDepartment;
  }

  changePosition(newPosition) {
    this.position = newPosition;
  }

  changeSalary(newSalary) {
    this.salary = newSalary;
  }

  _helpChangePropsAndGetLog(salary, position, department, message) {
    this.salary = salary;
    this.position = position;
    this.department = department;
    console.log(message);
  }

  getPromoted({
    salary = this.salary, position = this.position, department = this.department
  } = {}) {
    _helpChangePropsAndGetLog(salary, position, department, 'Yoohooo');
  }

  getDemoted ({
    salary = this.salary, position = this.position, department = this.department
  } = {}) {
    _helpChangePropsAndGetLog(salary, position, department, 'Damn!');
  }
}

class Manager extends Employee {
  constructor(...props) {
    super(...props);
    this.position = 'manager';
  }

  get managedEmployees() {
    return Employee.employees.filter(empl => empl.department === this.department);
  }
}

class BlueCollarWorker extends Employee {
  constructor(...props) {
    super(...props);
    this.eyeColor = 'blue';
  }
}

class HRManager extends Manager {
  constructor(...props) {
    super(...props);
    this.position = 'hr';
  }
}

class SalesManager extends Manager {
  constructor(...props) {
    super(...props);
    this.position = 'sales';
  }
}




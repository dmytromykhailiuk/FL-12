class Employee {
  constructor({id, firstName, lastName, birthday, salary, position, department}) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.salary = salary;
    this.position = position;
    this.department = department;
    Employee._EMPLOYEES.push(this);
  }

  get age() {
    const now = new Date();
    const birthday = new Date(this.birthday);
    const age = now.getFullYear() - birthday.getFullYear();
    return now.setFullYear(1972) < birthday.setFullYear(1972) ? age - 1 : age;
  }

  get fullName() {
    return this.name + ' ' + this.lastName;
  }

  static _EMPLOYEES = [];
  
  static get EMPLOYEES() {
      return Employee._EMPLOYEES;
  } 

  quit() {
    let index;
    let isFinded = false;
    Employee._EMPLOYEES.forEach((el, i) => {
      if (el.id === this.id) {
        index = i;
        isFinded = true;
      }
    });
    if (isFinded) {
      Employee._EMPLOYEES = [
        ...Employee._EMPLOYEES.slice(0, index), ...Employee._EMPLOYEES.slice(index + 1)
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
    this._helpChangePropsAndGetLog(salary, position, department, 'Yoohooo');
  }

  getDemoted ({
    salary = this.salary, position = this.position, department = this.department
  } = {}) {
    this._helpChangePropsAndGetLog(salary, position, department, 'Damn!');
  }
}

class Manager extends Employee {
  constructor(props) {
    super(props);
    this.position = 'manager';
  }

  get managedEmployees() {
    return Employee.EMPLOYEES.filter(empl => empl.department === this.department && empl.position !== 'manager');
  }
}

class BlueCollarWorker extends Employee {}

class HRManager extends Manager {
  constructor(props) {
    super(props);
    this.department = 'hr';
  }
}

class SalesManager extends Manager {
  constructor(props) {
    super(props);
    this.department = 'sales';
  }
}

const positionManager = {
  changePosition(emplId, newPosition) {
    const employer = this.managedEmployees.find((empl) => empl.id === emplId);
    if (!employer) return;
    employer.changeSalary(newPosition);
  }
}

const reviewer = {
  changeSalary(emplId, newSalary) {
    const employer = this.managedEmployees.find((empl) => empl.id === emplId);
    if (!employer) return;
    employer.changeSalary(newSalary);
  }
}

const promoter = {
  promote(emplId, options) {
    const employer = this.managedEmployees.find((empl) => empl.id === emplId);
    if (!employer) return;
    employer.getPromoted(options);
  }
}

const releaser = {
  release(emplId) {
    const employer = this.managedEmployees.find(empl => empl.id === emplId);
    if (!employer) return;
    employer.getFired();
  }
}

const demoteManager = {
  demote(emplId, options) {
    const employer = this.managedEmployees.find((empl) => empl.id === emplId);
    if (!employer) return;
    employer.getDemoted(options);
  }
}

function managerPro(manager, ...opportunities) {
  if(manager instanceof Manager) {
    return Object.assign(manager, ...opportunities);
  }
}

// ------ EXAMPLE ------ //

const worker1 = new Employee({
  id: 1,
  firstName: 'Ivan',
  lastName: 'Ivanov',
  birthday: '08/07/1977',
  salary: 700,
  position: 'junior',
  department: 'web'
})

const worker2 = new BlueCollarWorker({
  id: 2,
  firstName: 'Petro',
  lastName: 'Petrov',
  birthday: '09/01/1996',
  salary: 3000,
  position: 'senior',
  department: 'web'
})

const manager1 = new Manager({
  id: 3,
  firstName: 'Stepan',
  lastName: 'Styopochkin',
  birthday: '11/11/1990',
  salary: 1000,
  department: 'web'
})

console.log(Employee.EMPLOYEES);

const manager1Pro = managerPro(
  manager1, positionManager, reviewer, promoter, releaser, demoteManager
);

console.log(worker1);

manager1Pro.promote(worker1.id, {
  salary: 1800,
  position: 'middle'
})

console.log(worker1);

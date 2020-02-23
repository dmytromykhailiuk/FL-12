class Employee {
  constructor({id, firstName, lastName, birthday, salary, position, department}) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.salary = salary;
    this.position = position;
    this.department = department;
    Employee._employees.push(this);
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

  static _employees = [];
  
  static get employees() {
      return this._employees;
  } 

  quit() {
    let index;
    let isFinded = false;
    Employee._employees.forEach((el, i) => {
      if (el.id === this.id) {
        index = i;
        isFinded = true;
      }
    });
    if (isFinded) {
      Employee._employees = [
        ...Employee._employees.slice(0, index), ...Employee._employees.slice(index + 1)
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
  constructor(props) {
    super(props);
    this.position = 'manager';
  }

  get managedEmployees() {
    return Employee.employees.filter(empl => empl.department === this.department && empl.position !== 'manager');
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

function positionManager(manager) {
  function changePosition(emplId, newPosition) {
    const employer = manager.managedEmployees.find((empl) => empl.id === emplId);
    if (!employer) return;
    employer.changeSalary(newPosition);
  }
  return changePosition;
}

function reviewManager(manager) {
  function changeSalary(emplId, newSalary) {
    const employer = manager.managedEmployees.find((empl) => empl.id === emplId);
    if (!employer) return;
    employer.changeSalary(newSalary);
  }
  return changeSalary;
}

function promoteManager(manager) {
  function promote(emplId, options) {
    const employer = manager.managedEmployees.find((empl) => empl.id === emplId);
    if (!employer) return;
    employer.getPromoted(options);
  }
  return promote;
}

function releaseManager(manager) {
  function release(emplId) {
    const employer = manager.managedEmployees.find(empl => empl.id === emplId);
    if (!employer) return;
    employer.getFired();
  }
  return release;
}

function demoteManager(manager) {
  function demote(emplId, options) {
    const employer = manager.managedEmployees.find((empl) => empl.id === emplId);
    if (!employer) return;
    employer.getDemoted(options);
  }
  return demote;
}

function managerPro(manager) {
  if(manager instanceof Manager) {
    return Object.assign(
      manager,
      positionManager(manager),
      reviewManager(manager), 
      promoteManager(manager),
      releaseManager(manager),
      demoteManager(manager)
    );
  }
}
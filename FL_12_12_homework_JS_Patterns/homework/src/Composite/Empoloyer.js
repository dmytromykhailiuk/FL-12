export default class Empoloyer {
	constructor(info) {
    this.id = info.id;
    this.rm_id = info.rm_id;
    this.name = info.name;
    this.performance = info.performance;
    this.last_vacation_date = info.last_vacation_date;
    this.salary = info.salary;
    this.pool_name = info.pool_name;
  }

  filterPerformance(value) {
    if (this.performance === value) {
      return this
    } else {
      return false;
    }
  }

  getSalary() {
    return this.salary;
  }

  getPerformanse() {
    return this.performance;
  }

  getLastVacationDate() {
    return this.last_vacation_date;
  }

  getBigger(obj) {
    if (obj.top > obj.average && obj.top > obj.low) {
      return 'top';
    }
    if (obj.average > obj.top && obj.average > obj.low) {
      return 'average';
    }
    if (obj.low > obj.average && obj.low > obj.average) {
      return 'low';
    } else {
      return 'average';
    }
  }

  parseDate(date) {
    const buff = date.split('.');
    const parser = Date.parse(`${buff[2]} ${buff[1]} ${buff[0]}`);
    return parser;
  }

  dateToString(time) {
    const date = new Date(time);
    const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
    const day = (date.getDay() + 1) < 10 ? `0${date.getDay() + 1}` : date.getDay() + 1;
    return `${date.getFullYear()}.${month}.${day}`
  }
}
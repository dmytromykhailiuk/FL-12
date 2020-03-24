import Empoloyer from './Employees';

export default class Composite extends Empoloyer {
  constructor(info) {
    super(info);
    this.children = [];
  }

  add(employer) {
    this.children.push(employer)
  }

  getInfo() {
    const salarySum = 0;
    const dateSum = 0;
    const performance = {
      'top': 0,
      'average': 0,
      'low': 0
    }
    this.children.forEach((el) => {
      salarySum += el.getSalary();
      dateSum += this.parseDate(el.getLastVacationDate());
      performance[el.getPerformance()]++;
    })
    return {
      salary: salarySum / this.children.length,
      last_vacation_date: this.dateToString(dateSum / this.children.length),
      performance: this.getBigger(performance)
    }
  }

  filterPerf(value) {
    this.children.forEach((el) => {
      const filtered = el.filterPerf(value);
      if (!filtered || filtered.children !== undefined && filtered.children.length === 0) {
        this.removeChild(el)
      }
    });
    return this
  }

  removeChild(element) {
    const idx = this.children.indexOf(element);
    this.children = [
      ...this.children.slice(0, idx),
      ...this.children.slice(idx + 1)
    ];
  }
}
import Empoloyer from './Empoloyer';

export default class Composite extends Empoloyer {
  constructor(info) {
    super(info);
    this.children = [];
  }

  add(employer) {
    this.children.push(employer)
  }

  getInfo() {
    let salarySum = 0;
    let dateSum = 0;
    let performance = {
      top: 0,
      average: 0,
      low: 0
    }
    this.children.forEach((el) => {
      salarySum = salarySum + el.getSalary();
      if (el.getLastVacationDate() !== undefined) {
        dateSum += this.parseDate(el.getLastVacationDate());
      }
      performance[el.getPerformanse()]++;
    })
    return {
      salary: salarySum / this.children.length,
      last_vacation_date: this.dateToString(dateSum / this.children.length),
      performance: this.getBigger(performance)
    }
  }

  filterPerformance(value) {
    this.children.forEach((el) => {
      const filtered = el.filterPerformance(value);
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
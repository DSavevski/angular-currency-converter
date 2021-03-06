import {Component, Input} from '@angular/core';
import Chart from 'chart.js';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';

const apiUrl = 'https://api.exchangeratesapi.io/history';

@Component({
  selector: 'app-currency-chart',
  templateUrl: './currency-chart.component.html',
  styleUrls: ['./currency-chart.component.css']
})
export class CurrencyChartComponent {

  @Input()
  set base(base: string) {
    this._base = base;
    setTimeout(() => this.clickAvatar('5D'));
  }

  get base() {
    return this._base;
  }

  @Input()
  set counter(counter: string) {
    this._counter = counter;
    setTimeout(() => this.clickAvatar('5D'));
  }

  get counter() {
    return this._counter;
  }

  constructor(private http: HttpClient) {
  }

  private _base: string;
  private _counter: string;

  filters = ['5D', '15D', '1M'];
  data = {};
  selectedPeriod = '';

  static buildUrl(base, counter, start, end) {
    return apiUrl + `?start_at=${end}&end_at=${start}&base=${base}&symbols=${counter}`;
  }

  displayLineChart() {
    const currencyChart = document.getElementById('currencyChart');
    const chart = new Chart(currencyChart, {
      type: 'line',
      data: {
        labels: Object.keys(this.data),
        datasets: [{
          label: `Currency rates`,
          data: Object.values(this.data).map(item => item[this.counter])
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });
    console.log('Chart: ', chart);
  }

  clickAvatar(value) {
    let startDate = '';
    let endDate = '';
    switch (value) {
      case '5D': {
        startDate = moment().format('YYYY-MM-DD');
        endDate = moment().subtract(5, 'days').format('YYYY-MM-DD');
        break;
      }
      case '15D': {
        startDate = moment().format('YYYY-MM-DD');
        endDate = moment().subtract(15, 'days').format('YYYY-MM-DD');
        break;
      }
      default: {
        startDate = moment().format('YYYY-MM-DD');
        endDate = moment().subtract(1, 'months').format('YYYY-MM-DD');
        break;
      }
    }
    this.getHistory(CurrencyChartComponent.buildUrl(this.base, this.counter, startDate, endDate));
    this.selectedPeriod = value;
  }

  getHistory(url) {
    const result = this.http.get(url);
    result.subscribe(data => {
      this.data = data['rates'];
      this.displayLineChart();
    });
  }
}

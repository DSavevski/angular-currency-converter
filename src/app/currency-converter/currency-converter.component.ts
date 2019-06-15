import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export const availableCurrencies = [
  'EUR',
  'BGN',
  'NZD',
  'ILS',
  'RUB',
  'CAD',
  'USD',
  'PHP',
  'CHF',
  'ZAR',
  'AUD',
  'JPY',
  'TRY',
  'HKD',
  'MYR',
  'THB',
  'HRK',
  'NOK',
  'IDR',
  'DKK',
  'CZK',
  'HUF',
  'GBP',
  'MXN',
  'KRW',
  'ISK',
  'SGD',
  'BRL',
  'PLN',
  'INR',
  'RON',
  'CNY',
  'SEK',
];


@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {

  selectedBaseCurrency = 'EUR';
  currentBaseAmount = 0;
  selectedCounterCurrency = 'USD';
  counterCurrencyNames = [];
  currentCounterAmount = 0;
  basedConversionRates = {};
  availableBaseCurrencies = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.availableBaseCurrencies = availableCurrencies;
    this.getBasedCurrency(this.selectedBaseCurrency);
    // this.selectedCounterCurrency = this.selectedBaseCurrency === 'EUR' ? 'USD' : 'EUR';
  }

  selectBasedCurrency(value) {
    console.log(value);
    this.selectedCounterCurrency = value === 'EUR' ? 'USD' : 'EUR';
    this.getBasedCurrency(value);
  }

  updateBaseAmount(value) {
    console.log(value);
    this.currentBaseAmount = value;
    this.currentCounterAmount = this.currentBaseAmount * this.basedConversionRates[this.selectedCounterCurrency];
  }

  updateCounterAmount(value) {
    this.currentCounterAmount = value;
    this.currentBaseAmount = this.currentCounterAmount / this.basedConversionRates[this.selectedCounterCurrency];
  }

  getBasedCurrency(base) {
    const url = `https://api.exchangeratesapi.io/latest?base=${base}`;
    const result = this.http.get(url);
    result.subscribe((data: any) => {
      this.basedConversionRates = data['rates'];
      this.counterCurrencyNames = Object.keys(data['rates']);
      this.updateBaseAmount(this.currentBaseAmount);
    });
  }

}

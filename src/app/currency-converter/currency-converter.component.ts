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

  selectedCounterCurrency;
  currentCounterAmount = 0;

  counterCurrencyNames = [];

  basedConversionRates = {};

  availableBaseCurrencies = availableCurrencies;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getBasedCurrency(this.selectedBaseCurrency);
  }

  selectBasedCurrency(value) {
    this.getBasedCurrency(value);
  }

  updateBaseAmount(value) {
    this.currentBaseAmount = value;
    this.currentCounterAmount = this.currentBaseAmount * this.basedConversionRates[this.selectedCounterCurrency];
  }

  updateCounterAmount(value) {
    this.currentCounterAmount = value;
    this.currentBaseAmount = this.currentCounterAmount / this.basedConversionRates[this.selectedCounterCurrency];
  }

  private getBasedCurrency(base) {
    const url = `https://api.exchangeratesapi.io/latest?base=${base}`;
    this.http.get(url).subscribe((data: any) => {
      this.basedConversionRates = data['rates'];
      this.counterCurrencyNames = Object.keys(data['rates']);
      this.updateBaseAmount(this.currentBaseAmount);
      this.selectedCounterCurrency = this.counterCurrencyNames[0];
    });
  }
}

import { TestBed } from '@angular/core/testing';

import { CreditCardService } from './credit-card.service';

describe('CreditCardService', () => {
  let service: CreditCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardService);
  });

  it('should create CreditCardService', async () => {
    expect(service).toBeTruthy();
  });

  it('should be valid and return message "Credit card has a valid format"', async () => {
    expect(service.testCreditCard('4903 0100 0000 0009', 'Switch')).toEqual({
      isValid: true, 
      message: 'Credit card has a valid format'
    })
  });

  it('should be valid and return message "Credit card has a valid format"', async () => {
    expect(service.testCreditCard('6011 0000 0000 0004', 'Discover')).toEqual({
      isValid: true, 
      message: 'Credit card has a valid format'
    })
  });

  it('should be invalid and return message "Unknown card type"', async () => {
    expect(service.testCreditCard('6334 0000 0000 0004', 'Tinkoff')).toEqual({
      isValid: false, 
      message: 'Unknown card type'
    })
  });

  it('should be invalid and return message "Credit card number is invalid"', async () => {
    expect(service.testCreditCard('5500 0000 0000 0000', 'MasterCard')).toEqual({
      isValid: false, 
      message: 'Credit card number is invalid'
    })
  });

  it('should be invalid and return message "Credit card number is in invalid format"', async () => {
    expect(service.testCreditCard('5500_0000_0000_0000', 'MasterCard')).toEqual({
      isValid: false, 
      message: 'Credit card number is in invalid format'
    })
  });

  it('should be invalid and return message "Credit card number has an inappropriate number of digits"', async () => {
    expect(service.testCreditCard('3000 0000 0000 049', 'CarteBlanche')).toEqual({
      isValid: false, 
      message: 'Credit card number has an inappropriate number of digits'
    })
  });

  it('should be invalid and return message "Warning! This credit card number is associated with a scam attempt"', async () => {
    expect(service.testCreditCard('5490 9977 7109 2064', 'MasterCard')).toEqual({
      isValid: false, 
      message: 'Warning! This credit card number is associated with a scam attempt'
    })
  });
});

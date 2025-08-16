import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenCalculator } from './token-calculator';

describe('TokenCalculator', () => {
  let component: TokenCalculator;
  let fixture: ComponentFixture<TokenCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenCalculator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenCalculator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

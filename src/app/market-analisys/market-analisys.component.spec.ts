import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketAnalisysComponent } from './market-analisys.component';

describe('MarketAnalisysComponent', () => {
  let component: MarketAnalisysComponent;
  let fixture: ComponentFixture<MarketAnalisysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketAnalisysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketAnalisysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

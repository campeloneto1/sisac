import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrsosFinanceirosComponent } from './irsos-financeiros.component';

describe('IrsosFinanceirosComponent', () => {
  let component: IrsosFinanceirosComponent;
  let fixture: ComponentFixture<IrsosFinanceirosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrsosFinanceirosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IrsosFinanceirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

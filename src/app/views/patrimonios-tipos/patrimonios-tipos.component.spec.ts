import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimoniosTiposComponent } from './patrimonios-tipos.component';

describe('PatrimoniosTiposComponent', () => {
  let component: PatrimoniosTiposComponent;
  let fixture: ComponentFixture<PatrimoniosTiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatrimoniosTiposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatrimoniosTiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

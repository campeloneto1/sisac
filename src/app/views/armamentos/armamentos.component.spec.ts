import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmamentosComponent } from './armamentos.component';

describe('ArmamentosComponent', () => {
  let component: ArmamentosComponent;
  let fixture: ComponentFixture<ArmamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmamentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

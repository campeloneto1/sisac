import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrsoComponent } from './irso.component';

describe('IrsoComponent', () => {
  let component: IrsoComponent;
  let fixture: ComponentFixture<IrsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrsoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IrsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

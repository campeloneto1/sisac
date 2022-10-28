import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CautelaComponent } from './cautela.component';

describe('CautelaComponent', () => {
  let component: CautelaComponent;
  let fixture: ComponentFixture<CautelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CautelaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CautelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

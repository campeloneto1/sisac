import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfastamentosComponent } from './afastamentos.component';

describe('LtsComponent', () => {
  let component: AfastamentosComponent;
  let fixture: ComponentFixture<AfastamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfastamentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfastamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

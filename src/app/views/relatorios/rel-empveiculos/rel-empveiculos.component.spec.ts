import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelEmpveiculosComponent } from './rel-empveiculos.component';

describe('RelEmpveiculosComponent', () => {
  let component: RelEmpveiculosComponent;
  let fixture: ComponentFixture<RelEmpveiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelEmpveiculosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelEmpveiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

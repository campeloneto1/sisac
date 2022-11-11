import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelEmparmamentosComponent } from './rel-emparmamentos.component';

describe('RelEmparmamentosComponent', () => {
  let component: RelEmparmamentosComponent;
  let fixture: ComponentFixture<RelEmparmamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelEmparmamentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelEmparmamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

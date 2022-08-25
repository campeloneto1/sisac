import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfastamentosTiposComponent } from './afastamentos-tipos.component';

describe('AfastamentosTiposComponent', () => {
  let component: AfastamentosTiposComponent;
  let fixture: ComponentFixture<AfastamentosTiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfastamentosTiposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfastamentosTiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaisEmprestimosComponent } from './materiais-emprestimos.component';

describe('MateriaisEmprestimosComponent', () => {
  let component: MateriaisEmprestimosComponent;
  let fixture: ComponentFixture<MateriaisEmprestimosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriaisEmprestimosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateriaisEmprestimosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

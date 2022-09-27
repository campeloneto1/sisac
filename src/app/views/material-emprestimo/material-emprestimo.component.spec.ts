import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialEmprestimoComponent } from './material-emprestimo.component';

describe('MaterialEmprestimoComponent', () => {
  let component: MaterialEmprestimoComponent;
  let fixture: ComponentFixture<MaterialEmprestimoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialEmprestimoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialEmprestimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

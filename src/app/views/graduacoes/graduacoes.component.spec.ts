import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduacoesComponent } from './graduacoes.component';

describe('GraduacoesComponent', () => {
  let component: GraduacoesComponent;
  let fixture: ComponentFixture<GraduacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraduacoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraduacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

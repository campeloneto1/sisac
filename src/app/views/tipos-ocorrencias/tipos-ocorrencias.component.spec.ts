import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposOcorrenciasComponent } from './tipos-ocorrencias.component';

describe('TiposOcorrenciasComponent', () => {
  let component: TiposOcorrenciasComponent;
  let fixture: ComponentFixture<TiposOcorrenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposOcorrenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposOcorrenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

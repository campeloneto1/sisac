import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposPublicacoesComponent } from './tipos-publicacoes.component';

describe('TiposPublicacoesComponent', () => {
  let component: TiposPublicacoesComponent;
  let fixture: ComponentFixture<TiposPublicacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposPublicacoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposPublicacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

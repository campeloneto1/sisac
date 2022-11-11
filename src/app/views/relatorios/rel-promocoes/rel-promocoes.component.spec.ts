import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelPromocoesComponent } from './rel-promocoes.component';

describe('RelPromocoesComponent', () => {
  let component: RelPromocoesComponent;
  let fixture: ComponentFixture<RelPromocoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelPromocoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelPromocoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

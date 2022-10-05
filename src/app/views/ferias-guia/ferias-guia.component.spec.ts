import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeriasGuiaComponent } from './ferias-guia.component';

describe('FeriasGuiaComponent', () => {
  let component: FeriasGuiaComponent;
  let fixture: ComponentFixture<FeriasGuiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeriasGuiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeriasGuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

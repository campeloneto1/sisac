import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubunidadesComponent } from './subunidades.component';

describe('SubunidadesComponent', () => {
  let component: SubunidadesComponent;
  let fixture: ComponentFixture<SubunidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubunidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubunidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

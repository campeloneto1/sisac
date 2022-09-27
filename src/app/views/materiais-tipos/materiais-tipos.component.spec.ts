import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaisTiposComponent } from './materiais-tipos.component';

describe('MateriaisTiposComponent', () => {
  let component: MateriaisTiposComponent;
  let fixture: ComponentFixture<MateriaisTiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriaisTiposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateriaisTiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelEmpmateriaisComponent } from './rel-empmateriais.component';

describe('RelEmpmateriaisComponent', () => {
  let component: RelEmpmateriaisComponent;
  let fixture: ComponentFixture<RelEmpmateriaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelEmpmateriaisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelEmpmateriaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

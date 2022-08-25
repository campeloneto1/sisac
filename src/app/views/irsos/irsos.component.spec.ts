import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrsosComponent } from './irsos.component';

describe('IrsosComponent', () => {
  let component: IrsosComponent;
  let fixture: ComponentFixture<IrsosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrsosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IrsosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostosComponent } from './postos.component';

describe('PostosComponent', () => {
  let component: PostosComponent;
  let fixture: ComponentFixture<PostosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

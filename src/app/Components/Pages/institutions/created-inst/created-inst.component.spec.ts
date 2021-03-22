import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedInstComponent } from './created-inst.component';

describe('CreatedInstComponent', () => {
  let component: CreatedInstComponent;
  let fixture: ComponentFixture<CreatedInstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedInstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorCreation } from './supervisor-creation';

describe('SupervisorCreation', () => {
  let component: SupervisorCreation;
  let fixture: ComponentFixture<SupervisorCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupervisorCreation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisorCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

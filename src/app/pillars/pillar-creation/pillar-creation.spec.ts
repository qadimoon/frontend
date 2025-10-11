import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PillarCreation } from './pillar-creation';

describe('PillarCreation', () => {
  let component: PillarCreation;
  let fixture: ComponentFixture<PillarCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PillarCreation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PillarCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

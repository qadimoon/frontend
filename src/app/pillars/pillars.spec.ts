import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pillars } from './pillars';

describe('Pillars', () => {
  let component: Pillars;
  let fixture: ComponentFixture<Pillars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pillars]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pillars);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

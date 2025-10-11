import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCreation } from './member-creation';

describe('MemberCreation', () => {
  let component: MemberCreation;
  let fixture: ComponentFixture<MemberCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberCreation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

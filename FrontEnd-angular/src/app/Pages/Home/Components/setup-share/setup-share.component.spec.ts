import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupShareComponent } from './setup-share.component';

describe('SetupShareComponent', () => {
  let component: SetupShareComponent;
  let fixture: ComponentFixture<SetupShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupShareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomInspirationsComponent } from './room-inspirations.component';

describe('RoomInspirationsComponent', () => {
  let component: RoomInspirationsComponent;
  let fixture: ComponentFixture<RoomInspirationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomInspirationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomInspirationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

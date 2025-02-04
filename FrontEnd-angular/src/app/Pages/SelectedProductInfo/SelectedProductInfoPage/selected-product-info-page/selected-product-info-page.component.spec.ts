import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedProductInfoPageComponent } from './selected-product-info-page.component';

describe('SelectedProductInfoPageComponent', () => {
  let component: SelectedProductInfoPageComponent;
  let fixture: ComponentFixture<SelectedProductInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedProductInfoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedProductInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

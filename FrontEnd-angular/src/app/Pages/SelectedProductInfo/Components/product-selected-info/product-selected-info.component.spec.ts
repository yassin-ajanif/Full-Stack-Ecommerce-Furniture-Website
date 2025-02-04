import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSelectedInfoComponent } from './product-selected-info.component';

describe('ProductSelectedInfoComponent', () => {
  let component: ProductSelectedInfoComponent;
  let fixture: ComponentFixture<ProductSelectedInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSelectedInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSelectedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

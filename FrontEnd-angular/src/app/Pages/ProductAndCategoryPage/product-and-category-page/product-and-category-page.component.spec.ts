import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAndCategoryPageComponent } from './product-and-category-page.component';

describe('ProductAndCategoryPageComponent', () => {
  let component: ProductAndCategoryPageComponent;
  let fixture: ComponentFixture<ProductAndCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAndCategoryPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAndCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

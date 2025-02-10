import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCategoryProductComponent } from './update-category-product.component';

describe('UpdateCategoryProductComponent', () => {
  let component: UpdateCategoryProductComponent;
  let fixture: ComponentFixture<UpdateCategoryProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCategoryProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCategoryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

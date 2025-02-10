import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryProductComponent } from './add-category-product.component';

describe('AddCategoryProductComponent', () => {
  let component: AddCategoryProductComponent;
  let fixture: ComponentFixture<AddCategoryProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCategoryProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategoryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

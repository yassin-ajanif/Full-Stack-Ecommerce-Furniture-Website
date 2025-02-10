import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCategoryProductComponent } from './delete-category-product.component';

describe('DeleteCategoryProductComponent', () => {
  let component: DeleteCategoryProductComponent;
  let fixture: ComponentFixture<DeleteCategoryProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCategoryProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCategoryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingProductsParamsComponent } from './showing-products-params.component';

describe('ShowingProductsParamsComponent', () => {
  let component: ShowingProductsParamsComponent;
  let fixture: ComponentFixture<ShowingProductsParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowingProductsParamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowingProductsParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

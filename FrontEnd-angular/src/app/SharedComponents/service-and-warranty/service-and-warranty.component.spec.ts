import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAndWarrantyComponent } from './service-and-warranty.component';

describe('ServiceAndWarrantyComponent', () => {
  let component: ServiceAndWarrantyComponent;
  let fixture: ComponentFixture<ServiceAndWarrantyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceAndWarrantyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceAndWarrantyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

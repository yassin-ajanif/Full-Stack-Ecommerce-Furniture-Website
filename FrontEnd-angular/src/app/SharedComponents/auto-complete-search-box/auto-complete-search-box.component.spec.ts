import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteSearchBoxComponent } from './auto-complete-search-box.component';

describe('AutoCompleteSearchBoxComponent', () => {
  let component: AutoCompleteSearchBoxComponent;
  let fixture: ComponentFixture<AutoCompleteSearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoCompleteSearchBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoCompleteSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

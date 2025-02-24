import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'auto-complete-search-box',
  templateUrl: './auto-complete-search-box.component.html',
  styleUrls: ['./auto-complete-search-box.component.css'],
  imports: [FormsModule, CommonModule]
})
export class AutoCompleteSearchBoxComponent implements OnInit, OnDestroy {
  @Output() itemSelected = new EventEmitter<string>();  
  @Output() onSearch = new EventEmitter<string>();  
  @Input() filteredItems: string[] = [];  
  @Input() searchQuery: string = '';  
  private clickListener!: () => void;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Listen for clicks anywhere on the document
    this.clickListener = this.renderer.listen('document', 'click', (event: Event) => {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.filteredItems = []; // Hide the dropdown
      }
    });
  }

  ngOnDestroy(): void {
    if (this.clickListener) {
      this.clickListener(); // Remove the event listener to prevent memory leaks
    }
  }

  // Emit search input changes
  onSearchInput(query: string): void {  
    this.onSearch.emit(query);
  }

  // Handle item selection
  selectItem(item: string): void {
    this.itemSelected.emit(item);
    this.searchQuery = item;
    this.filteredItems = []; // Clear suggestions
  }
}

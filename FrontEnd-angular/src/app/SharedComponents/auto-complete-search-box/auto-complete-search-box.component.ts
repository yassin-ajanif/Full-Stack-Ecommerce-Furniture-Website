import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auto-complete-search-box',
  templateUrl: './auto-complete-search-box.component.html',
  styleUrls: ['./auto-complete-search-box.component.css'],
  imports: [FormsModule,CommonModule]
})
export class AutoCompleteSearchBoxComponent {
  @Input() items: string[] = ['test1','test2'];  // Input: List of items for suggestions
  @Output() itemSelected = new EventEmitter<string>();  // Output: Emitting the selected item
  filteredItems: string[] = [];  // Filtered list based on user input
  searchQuery: string = '';  // User's input

  // Handle the input change and filter items
  onSearchInput(query: string): void {
    this.searchQuery = query.trim().toLowerCase();
    if (this.searchQuery) {
      this.filteredItems = this.items.filter(item =>
        item.toLowerCase().includes(this.searchQuery)
      );
    } else {
      this.filteredItems = [];
    }
  }

  // Handle item selection
  selectItem(item: string): void {
    this.itemSelected.emit(item);  // Emit the selected item
    this.searchQuery = item;  // Display the selected item in the input box
    this.filteredItems = [];  // Clear suggestions
  }
}

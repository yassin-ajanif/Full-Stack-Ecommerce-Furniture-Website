import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, Renderer2, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'dropdown',
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements AfterViewInit {


  @Input() label: string = 'Select Option';
  @Input() options: string[] = [];  
  @Input() selectedOption: string = '';
  // set default width of the dropdownMenu
  @Input() widthInRem : string = '3rem';
  @Input() labelWidthInRem : string = '1rem';
  @ViewChild('dropdown') dropdownElement!: ElementRef; 
  @ViewChild('dropdownLabel') dropdownLableElement!: ElementRef; 
  
  items = ['Apple', 'Banana', 'Cherry', 'Date'];  
  
  @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();

  isOpen: boolean = false;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Set the width of the dropdown element programmatically using Renderer2
    this.setTheWidthOfDropDown()
    this.setTheFontSizeOfLabel()
  }

  setTheWidthOfDropDown(){ 
    if(this.dropdownElement===undefined) return
    this.renderer.setStyle(this.dropdownElement.nativeElement, 'width', this.widthInRem);
  }

  setTheFontSizeOfLabel(){
    if (this.dropdownLableElement === undefined) return;

    // Dynamically set the font size of the label using Renderer2
    this.renderer.setStyle
    ( this.dropdownLableElement.nativeElement,'font-size',this.labelWidthInRem);
  }
  // Method to toggle dropdown visibility
  toggleDropdown() {
    this.isOpen = !this.isOpen;
    
  }

  // Method to handle option selection
  selectOption(option: string) {
    this.selectedOption = option;
    this.optionSelected.emit(option);
    this.isOpen = false;  // Close the dropdown after selection
  }

  // Optional: Close the dropdown if clicked outside
  closeDropdown() {
    this.isOpen = false;
  }
 
  @HostListener('document:click', ['$event'])
  onBodyClick(event: MouseEvent): void {
    // Check if the click is outside the dropdown (or any other logic you need)
    const clickedInside = (event.target as HTMLElement).closest('.dropdown-header');
    
    // if clickeInside is null it means we are clicking outside the tag that has .dropdown-header
    // which in this case should close the drop down menu
    if (clickedInside===null) {
      // Close the dropdown if the click is outside
     this.closeDropdown()
     
    } 
  }
}

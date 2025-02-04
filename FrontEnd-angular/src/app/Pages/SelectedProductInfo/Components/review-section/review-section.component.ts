import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'review-section',
  imports: [FormsModule,CommonModule],
  templateUrl: './review-section.component.html',
  styleUrl: './review-section.component.css'
})
export class ReviewSectionComponent {
 
  clientReviews = [
    { userName: 'John Doe', rating: 5, comment: 'Amazing product!', date: 'January 15, 2023' },
    { userName: 'Jane Smith', rating: 4, comment: 'Great quality, but shipping was slow.', date: 'February 5, 2023' },
    { userName: 'Mike Johnson', rating: 3, comment: 'Good, but expected better.', date: 'March 10, 2023' }
  ];

 /*clientReviews: 
 { userName: string; rating: number; comment: string; date: string }[] = [];*/


  displayedCount = 1; // Initially show only 2 reviews

  showMoreReviews() {
    this.displayedCount = this.clientReviews.length; // Show all reviews when clicked
  }

  showLessReviews() {
    this.displayedCount = 1; // Go back to showing only 2 reviews
  }

  }


import { CommonModule } from '@angular/common';
import { Component, ViewChild,ElementRef, Renderer2   } from '@angular/core';

@Component({
  selector: 'room-inspirations',
  imports: [CommonModule],
  templateUrl: './room-inspirations.component.html',
  styleUrl: './room-inspirations.component.css'
})
export class RoomInspirationsComponent {
   
  constructor(private renderer: Renderer2) {}
   
   imageSources : string[]= [
    "Assets/RommInspirations/room1.png",
    "Assets/RommInspirations/room2.png",
    "Assets/RommInspirations/room3.png"
  ];

   @ViewChild('imageContainer') imageContainerRef!: ElementRef;

   imageUrlIndex : number = 0
   // this is should be done dynamically but is temporary now
   gapBetweenImages :number = 10
   actualImageUrlToDisplay : string = this.imageSources[0]
   // we removed the first elemtn of image from array so the array is the number of images - 1
   NumberOfImagesMinusOne : number = this.imageSources.length - 1
   UserWantOExpandImage : Boolean = false
  
   scrolleImagesByOneImageToLeft(){

      const container = this.imageContainerRef.nativeElement;
      const imageWidthToScroll = this.gapBetweenImages + (this.imageContainerRef.nativeElement.offsetWidth)/this.NumberOfImagesMinusOne;
       // Use Renderer2 to set styles and avoid direct DOM manipulation
      this.renderer.setStyle(container, 'transform', `translateX(${-imageWidthToScroll}px)`);
      this.renderer.setStyle(container, 'transition', 'transform 0.5s ease'); // Optional: adds smooth scrolling effect
   }

   goToInitialPositionOfImagesContainer(){

   // const imageWidth = (this.imageContainerRef.nativeElement.offsetWidth);
    this.imageContainerRef.nativeElement.style.transform = `translateX(0px)`;
   
   }

   ThereIsNoLeftImagesToScroll = (): boolean => this.imageUrlIndex >= this.NumberOfImagesMinusOne;

   OnscrollImages(){
   
    if(this.ThereIsNoLeftImagesToScroll())  {  

      this.imageUrlIndex = 0
      // get the first image again of the array
      this.actualImageUrlToDisplay = this.imageSources[this.imageUrlIndex]
      this.goToInitialPositionOfImagesContainer()
      return

    }

      this.actualImageUrlToDisplay = this.imageSources[++this.imageUrlIndex]
      this.scrolleImagesByOneImageToLeft()

   
   
    }

    OnExpandImage(){
      this.UserWantOExpandImage = true
      this.disableScrolling() 
    }

    OnCloseExpandedImage(){
      this.UserWantOExpandImage = false
      this.enableScrolling()
    }

    disableScrolling() {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    }
  
    enableScrolling() {
      this.renderer.setStyle(document.body, 'overflow', 'auto');
    }

  }

import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, QueryList, Renderer2, SimpleChanges, ViewChild, viewChild, ViewChildren } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnChanges, OnInit{
  
  @Input() totalProducts : number = 1
  @Input() productsPerPage : number = 12
  @ViewChildren('btnRef') btnPages!: QueryList<ElementRef<HTMLElement>>;
  
  // the slide that contains a group of btns pages
  currentSlideOfBtns: number = 1;
  pageBtnsToDisplayPerSlide: number = 4;  // Display only 4 pages btns at a time for page
  // the number of pages to navigate for example if we have [1,2,3,4,5,6,7,8]
  // in this case teh total page will be 2 , the first page will display [1,2,3,4]
  // and second [5,6,7,8]
  // all that happens if we click to btn > next or previoius <
  totalBtnPagesToNavigate! : number 
  totalSlidesToNavigate! : number 
  pageNumbersArray! : number []
  firtBtnNumberOfActualSlide : number=1
  
  // these elments are the ones (indexes) to send page to parent 
  // to inject them as output to productlist
  // componenet so it can decide how many products will be displaying
  // per actual page
  @Output() OnproductPageIndexesChanges = 
  new EventEmitter<{ startIndex: number, endIndex: number }>();

 constructor(private productService: ProductService,private renderer:Renderer2) {} 
  
 ngOnInit(): void {
  
  this.goToPageNumber(1,this.productsPerPage)
  }
  
 ngOnChanges(): void {
  
    this.loadPaginationElements_When_ProductsNumber_Changes()
    // go to first page as default
    
  }
 

  // this method make the calculation of btn pages to show based on product number
  // so have included this method inside ngonchages because when one of the input
  // values changes like totalProducts changes it get called 
  // it is based on the totalProducts number
  loadPaginationElements_When_ProductsNumber_Changes(){
    this.totalBtnPagesToNavigate = this.getTotalBtnPagesToNavigate()
    this.LoadNewSlideBtnsArray(this.currentSlideOfBtns)
    this.totalSlidesToNavigate = this.gettotalSlidesToNavigate()
  }

  getTotalBtnPagesToNavigate() :number{
    return Math.ceil(this.totalProducts / this.productsPerPage);
  }

  gettotalSlidesToNavigate():number {
       
    return Math.ceil(this.getTotalBtnPagesToNavigate()/this.pageBtnsToDisplayPerSlide)
  }

  getTheFirstBtnNumberPageOfCurrentSlide(currentSlideOfBtns:number):number {

  return (currentSlideOfBtns - 1) * this.pageBtnsToDisplayPerSlide + 1

}

  // Get the pages to display based on the current page
  getNumberOfPagesToDisplayArray(currentslide:number):number[] {
    
    // we used -1 to include because array begins froom 0 index
    const start = this.getTheFirstBtnNumberPageOfCurrentSlide(currentslide)-1;
    const end = start + this.pageBtnsToDisplayPerSlide;
    const  btnpages = Array.from({ length: this.totalBtnPagesToNavigate }, (_, i) => i + 1); // Generate page numbers 1, 2, 3, ...
    return btnpages.slice(start, end); // Slice based on the current page and pageSize
    
  }

  // this function is respoinsibe for displaying the numbers pages included in btns
  // it's an array , we set this function to for each page to show for number only
  // when you click next it wil dipslay the next 4 digits
  LoadNewSlideBtnsArray(currentslide:number){
    this.pageNumbersArray = this.getNumberOfPagesToDisplayArray(currentslide); 
  }
   
  weReachedEndOfBtnsPageSlide():boolean{
  
   //return actualSlideBtnPageNavigated >= this.totalBtnPagesToNavigate
     return this.currentSlideOfBtns == this.totalSlidesToNavigate
  }

  goToSlide_And_Load_Its_First_Page(currentslide:number){
    this.firtBtnNumberOfActualSlide =
    this.getTheFirstBtnNumberPageOfCurrentSlide(currentslide)
    
    this.LoadNewSlideBtnsArray(currentslide)
    this.goToPageNumber(this.firtBtnNumberOfActualSlide,this.productsPerPage) 
   }
   
  // when we click to btn <
  goPreviousSlideOfBtns() {

    if (this.currentSlideOfBtns > 1) {
   
      this.goToSlide_And_Load_Its_First_Page(--this.currentSlideOfBtns)
    }
  }

  // when we click to btn >
  goNextSlideOfBtns() {
    
    if (this.weReachedEndOfBtnsPageSlide()) return;
      
    this.goToSlide_And_Load_Its_First_Page(++this.currentSlideOfBtns)
 }
  

 // when we click to btn <<
 goToFirstSlideOfBtns(){
    
    if(this.currentSlideOfBtns==1) return
   // is going to be the first slide so the first btn page is 1
    this.currentSlideOfBtns =1
    this.goToSlide_And_Load_Its_First_Page(this.currentSlideOfBtns)
 }
// when we click to btn >>
 goToLastSlideOfBtns(){
  
  if (this.weReachedEndOfBtnsPageSlide()) return;

  this.currentSlideOfBtns = this.gettotalSlidesToNavigate()

  this.goToSlide_And_Load_Its_First_Page(this.currentSlideOfBtns)
   
 }

 unselectThePrevioiusClickedBtn(): void {

  this.btnPages.forEach((btn) => {
    const nativeElement = btn.nativeElement;
    if (nativeElement.classList.contains('active')) {
      this.renderer.removeClass(nativeElement, 'active'); return
    }
  });
}

   
changeTheBackgroundColorOfBtnClicked(btnElementClicked:HTMLElement){
   
    this.unselectThePrevioiusClickedBtn()
    // Add the active class to the clicked button
    this.renderer.addClass(btnElementClicked, 'active');

    }
  
goToPageNumber(pageNumber: number,productsNumberPerPage:number) {
     
       this.loadProductsPageNumber(pageNumber,productsNumberPerPage)
    }
    

handleBtnClicked(btnElementClicked: HTMLElement) {
     
      this.changeTheBackgroundColorOfBtnClicked(btnElementClicked);   
      // Extract the page number from the button's inner text
      const getPageNumberFromBtnClicked = Number(btnElementClicked.innerText);
      const productsNumberPerPage = this.productsPerPage
      // Call the method to go to the page
      this.goToPageNumber(getPageNumberFromBtnClicked,productsNumberPerPage);
    }
  
loadProductsPageNumber(PageNumber: number, productsNumberPerPage: number) {
    
      const startIndexProduct = (PageNumber - 1) * productsNumberPerPage;
      const endIndexProduct = startIndexProduct + productsNumberPerPage;
      // Return the sliced array of products for the specified page
     this.OnproductPageIndexesChanges.emit
     ({ startIndex:startIndexProduct, endIndex:endIndexProduct });
    }

 
  }



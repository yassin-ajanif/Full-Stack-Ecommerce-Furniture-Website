import { Component, inject, Inject, OnInit } from '@angular/core';
import { DropdownComponent } from '../../../../SharedComponents/dropdown/dropdown.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { routes } from '../../../../app.routes';

@Component({
  selector: 'showing-products-params',
  imports: [DropdownComponent,RouterLink],
  templateUrl: './showing-products-params.component.html',
  styleUrl: './showing-products-params.component.css'
})
export class ShowingProductsParamsComponent implements OnInit{
 
  searchedProduct: string | null = null;
  activatedRoute : ActivatedRoute = inject(ActivatedRoute)
  router : Router = inject(Router)

  ngOnInit(): void {

  this.searchedProduct = this.activatedRoute.snapshot.queryParams['search'];
  console.log(this.searchedProduct)
  
  }

  searchProduct(searchTerm: string) {

    this.router.navigate(['/Shop'], { queryParams: { search: searchTerm } });

  }

}

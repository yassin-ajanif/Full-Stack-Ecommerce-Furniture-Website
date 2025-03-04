import { displayProductDTO } from '../Dtos/displayProduct.dto';
import { getProductDTO } from '../Dtos/getProduct.dto';
import { inject } from '@angular/core';
import { CategoryProductService } from '../Services/CategoryProductService';

export class productUtilities {

    static convertToDisplayProductDTO(
        product: getProductDTO,
        categoryProductService: CategoryProductService
      ): displayProductDTO {
       
        return new displayProductDTO(
          product.id,
          product.name,
          product.description,
          product.stockQuantity,
          product.price,
          categoryProductService.getCategoryNameFromId(product.categoryID) ?? 'unknown category',
          product.imageUrl ?? null
        );
      }

}
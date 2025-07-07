import { inject, Injectable } from '@angular/core';
import { productToBuy } from '../Dtos/productToBuy.dto';
import { ProductService } from './product.service';


@Injectable({
  providedIn: 'root'
})

export class cartService {

  cartItems: { id: number, name: string, image: string, price: number, quantity: number }[] = [];
  productService = inject(ProductService)
  

createCartInLocalStorage_If_User_Is_VistingWebsite_FirstTime() {
    
    if (!localStorage.getItem('cart')) {
           
        localStorage.setItem('cart', JSON.stringify([]));

        }
 }


 addProductToCart(product: productToBuy) {
    
    // Ensure cart exists
    this.createCartInLocalStorage_If_User_Is_VistingWebsite_FirstTime();

    // Get existing cart data
    /*let cart: productToBuy[] = 
    JSON.parse(localStorage.getItem('cart') || '[]');*/

    let cart: productToBuy[] = this.getCartItemsFromLocalStorageName('cart')

    // Check if the product already exists in the cart
    let existingProduct = cart.find(p => p.id === product.id);
    
    if (existingProduct) {
        // If product exists, increase quantity
        existingProduct.quantity += product.quantity;
    } else {
        // If product does not exist, add to cart
        cart.push(product);
    }

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

}

getCartItemsFromLocalStorageName(localStroageVariableName:string): productToBuy[] {
      
  return JSON.parse(localStorage.getItem(localStroageVariableName) || '[]') as productToBuy[];

}

copyProductsCartsFromLocalStorageToCartItems(){
 
 // Retrieve cart data from localStorage
    const storedCart = this.getCartItemsFromLocalStorageName('cart') as any;
 
    if (storedCart) {
     // If cart exists in localStorage, assign directly to cartItems
     this.cartItems = storedCart;
    }
 
   }
// Function to remove a product and return updated list of productToBuy objects
removeProductAndGetUpdatedList(productToRemoveID: number, cartItems: productToBuy[]): any[] {
    // Find the index of the product to remove by matching the product ID
    const index = cartItems.findIndex((product: productToBuy) => product.id === productToRemoveID);
  
    if (index > -1) {
      // Remove the product from the cartItems array
      cartItems.splice(index, 1);
  
      // Save the updated cart back to localStorage
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  
    // Return the updated array
    return cartItems;
  }
  
  isCartNotEmpty(): boolean {
    // Retrieve the cart from localStorage
    const storedCart = localStorage.getItem('cart');
  
    if (storedCart) {
      // Parse the cart from localStorage
      const cartItems = JSON.parse(storedCart);
  
      // Return true if there is at least one item in the cart
      return cartItems.length > 0;
    }
  
    // Return false if the cart is empty or doesn't exist
    return false;
  }
  
  getCartItemCount(): number {
    // Retrieve the cart from localStorage
    const storedCart = localStorage.getItem('cart');
  
    if (storedCart) {
      // Parse the cart from localStorage
      const cartItems = JSON.parse(storedCart);
  
      // Return the number of items in the cart
      return cartItems.length;
    }
  
    // Return 0 if the cart is empty or doesn't exist
    return 0;
  }
  
  
  loadProductImagesOfCartItemsFromDbByThierIDS(): void {
   
        this.cartItems.forEach(item => {
          // Assuming getProductImageById returns a Blob or URL of the image
          this.productService.getProductImageById(item.id).subscribe(
            imageBlob => {          
              
                const imageUrl = URL.createObjectURL(imageBlob);
                item.image = imageUrl; // Set the image URL to the item
              
            }
          );
        });
      }

   

}
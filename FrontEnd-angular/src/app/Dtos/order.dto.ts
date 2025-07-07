import { OrderedProductDto } from './orderedProduct.dto';

// we are using interfaces here because they are better than class 
// we used previously
export interface OrderDto {
  id: string;
  date: string;
  status: 'Shipped' | 'Delivered' | 'Cancelled';
  total: string;
  products: OrderedProductDto[];
}

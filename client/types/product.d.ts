import type { Product as BaseProduct } from "../../server/src/product/entities/product.entity";

interface Product extends BaseProduct {
  category: Category;
}

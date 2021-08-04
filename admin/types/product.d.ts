import type { Product as BaseProduct } from "../../client/types/product";

import { Category } from "./category";

interface Product extends BaseProduct {
  category: Category;
}

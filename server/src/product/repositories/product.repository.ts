import { EntityRepository } from "@mikro-orm/core";

import { Product } from "../entities/product.entity";

export class ProductRepository extends EntityRepository<Product> {}

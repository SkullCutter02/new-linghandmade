import { EntityRepository } from "@mikro-orm/core";

import { Product } from "../entities/product.entity";

export class ProductRepository extends EntityRepository<Product> {
  async reduceAmount(productId: string, amount: number) {
    const product = await this.findOneOrFail({ id: productId });

    product.amtLeft = Math.abs(product.amtLeft - amount);

    await this.persistAndFlush(product);
    return product;
  }
}

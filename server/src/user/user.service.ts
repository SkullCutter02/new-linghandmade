import { BadRequestException, Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager } from "@mikro-orm/postgresql";

import { UserRepository } from "./repositories/user.repository";
import { ProductRepository } from "../product/repositories/product.repository";
import { UserInCartProducts } from "./entities/userInCartProducts.entity";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly productRepository: ProductRepository,
    @InjectRepository(UserInCartProducts)
    private readonly userInCartProductsRepository: EntityRepository<UserInCartProducts>,
    private readonly em: EntityManager,
  ) {}

  async getCartItems(userId: string) {
    const user = await this.userRepository.findOneOrFail({ id: userId }, [
      "userInCartProducts",
      "userInCartProducts.product",
    ]);
    return user.userInCartProducts;
  }

  async addCartItem(userId: string, productId: string, amount: number) {
    const user = await this.userRepository.findOneOrFail({ id: userId }, [
      "userInCartProducts",
      "userInCartProducts.product",
    ]);
    const product = await this.productRepository.findOneOrFail({ id: productId });

    if (Array.from(user.userInCartProducts).some((e) => e.product.id === productId))
      throw new BadRequestException("Duplicate product in cart");

    const inCartProduct = this.userInCartProductsRepository.create({ user, product, amount });
    await this.userInCartProductsRepository.persistAndFlush(inCartProduct);

    user.userInCartProducts.add(inCartProduct);
    await this.userInCartProductsRepository.persistAndFlush(user);

    return user;
  }

  async updateCartItemAmount(userId: string, productId: string, amount: number) {
    const user = await this.userRepository.findOneOrFail({ id: userId }, [
      "userInCartProducts",
      "userInCartProducts.product",
    ]);

    for (const e of user.userInCartProducts) {
      if (e.product.id === productId) e.amount = amount;
    }

    await this.userRepository.persistAndFlush(user);
    return user;
  }

  async removeCartItem(userId: string, productId: string) {
    await this.em
      .createQueryBuilder(UserInCartProducts, "c")
      .select("*")
      .delete({ "users_in_cart_products.product.id": productId, "users_in_cart_products.user.id": userId })
      .execute("get");

    return { message: "Item removed successfully" };
  }
}

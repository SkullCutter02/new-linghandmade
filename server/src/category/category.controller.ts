import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { CategoryService } from "./category.service";
import { AdminAuthGuard } from "../auth/guards/adminAuth.guard";
import { CreateCategoryDto } from "./dto/createCategory.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  async findOne() {}

  async find() {}

  @Post()
  @UseGuards(AdminAuthGuard)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  async update() {}

  async delete() {}
}

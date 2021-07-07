import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

import { CategoryService } from "./category.service";
import { AdminAuthGuard } from "../auth/guards/adminAuth.guard";
import { CreateCategoryDto } from "./dto/createCategory.dto";
import { Category } from "./entities/category.entity";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  async findOne() {}

  @Get()
  async find() {
    return this.categoryService.find();
  }

  @Post()
  @UseGuards(AdminAuthGuard)
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  async update() {}

  async delete() {}
}

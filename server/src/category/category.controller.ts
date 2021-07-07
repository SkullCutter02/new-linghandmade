import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";

import { CategoryService } from "./category.service";
import { AdminAuthGuard } from "../auth/guards/adminAuth.guard";
import { CreateCategoryDto } from "./dto/createCategory.dto";
import { UpdateCategoryDto } from "./dto/updateCategory.dto";
import { Category } from "./entities/category.entity";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get("/:id")
  async findOne(@Param("id") id: string) {
    return this.categoryService.findOne(id);
  }

  @Get()
  async find() {
    return this.categoryService.find();
  }

  @Post()
  @UseGuards(AdminAuthGuard)
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @Patch("/:id")
  @UseGuards(AdminAuthGuard)
  async update(@Param("id") id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  async delete() {}
}

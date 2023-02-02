import { CategoryModel } from "./category.model";
import { UniqueEntityId } from "@ca/core/@shared/domain/value-object/unique-entity-id.vo";
import { Category } from "@ca/core/category/domain/entity/category.entity";
import { CategoryRepository } from "@ca/core/category/domain/repository/category.repository";
import { CategoryMapper } from "./category.mapper";
import { NotFoundError } from "@ca/core/@shared/errors/not-found.error";
import { Op } from "sequelize";

export class CategorySequelizeRepository
  implements CategoryRepository.Repository
{
  sortableFields: string[] = ["name", "created_at"];

  constructor(protected categoryModel: typeof CategoryModel) {}

  async search(
    props: CategoryRepository.SearchParams
  ): Promise<CategoryRepository.SearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const { rows: models, count } = await this.categoryModel.findAndCountAll({
      ...(props.filter && {
        where: { name: { [Op.like]: `%${props.filter}%` } },
      }),
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? { order: [[props.sort, props.sort_dir]] }
        : { order: [["created_at", "desc"]] }),
      offset,
      limit,
    });

    return new CategoryRepository.SearchResult({
      items: models.map((m) => CategoryMapper.toEntity(m)),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir,
    });
  }

  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(entity.toJSON());
  }

  async findById(id: string | UniqueEntityId): Promise<Category> {
    const _id = `${id}`;
    const model = await this._get(_id);
    return CategoryMapper.toEntity(model);
  }

  async findAll(): Promise<Category[]> {
    const models = await this.categoryModel.findAll();
    return models.map((model) => CategoryMapper.toEntity(model));
  }

  async update(entity: Category): Promise<void> {
    await this._get(entity.id);
    await this.categoryModel.update(entity.toJSON(), {
      where: { id: entity.id },
    });
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`;
    await this._get(_id);
    this.categoryModel.destroy({ where: { id: _id } });
  }

  protected async _get(id: string): Promise<CategoryModel> {
    return await this.categoryModel.findByPk(id, {
      rejectOnEmpty: new NotFoundError(`Entity not found using id ${id}`),
    });
  }
}

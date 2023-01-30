import { GetCategoryUseCase } from "../get-category.use-case";
import { NotFoundError } from "../../../../@shared/errors/not-found.error";
import { Category } from "../../../domain/entity/category.entity";
import { CategoryInMemoryRepository } from "../../../infra/db/repository/category-in-memory.repository";
describe("GetCategoryUseCase Unit Tests", () => {
  let useCase: GetCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new GetCategoryUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity not found using id fake id`)
    );
  });

  it("should returns a category", async () => {
    const items = [new Category({ name: "Movie" })];
    repository.items = items as any;
    const spyFindById = jest.spyOn(repository, "findById");
    const output = await useCase.execute({ id: items[0].id });
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: items[0].id,
      name: "Movie",
      description: null,
      is_active: true,
      created_at: items[0].created_at,
    });
  });
});
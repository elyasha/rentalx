import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { AppError } from "@shared/errors/AppError";


let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
    })

    it("should be able to create a new category", async () => {
        const category = {
            name: "Category Test",
            description: "Category description Test"
        }
        await createCategoryUseCase.execute(category);
        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)
        // console.log(categoryCreated)
        expect(categoryCreated).toHaveProperty("id")
    })

    it("should not be able to create a new category with existing name", async () => {
        expect(async ( ) => {
        const category = {
            name: "Category Test",
            description: "Category description Test"
        }
        await createCategoryUseCase.execute(category);
        await createCategoryUseCase.execute(category);
        }).rejects.toBeInstanceOf(AppError)
    })

})
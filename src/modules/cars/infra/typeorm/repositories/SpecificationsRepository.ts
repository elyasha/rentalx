import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";



class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>

    constructor() {
        this.repository = getRepository(Specification)

    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({
            name,
        })
        return specification;
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            description,
            name
        })

        await this.repository.save(specification)
    }

}

export { SpecificationsRepository }

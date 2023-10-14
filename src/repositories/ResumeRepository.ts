import { Repository } from "typeorm";
import Resume from "../entities/Resume";
import ResumeDTO from "../dtos/ResumeDTO";
import IResumeRepository from "./IResumeRepository";
import { dataSource } from "../App";

class ResumeRepository implements IResumeRepository {
  private readonly _repository: Repository<Resume>;

  constructor() {
    this._repository = dataSource.getRepository(Resume);
  }

  public async createResume(resumeDTO: ResumeDTO): Promise<Resume> {
    const resume = Resume.fromDTO(resumeDTO);

    return await this._repository.save(resume);
  }

  public async findById(id: number): Promise<Resume | undefined> {
    return await this._repository.findOne({
      where: { id },
      relations: ["experiences", "languages"]
    });
  }

  public async updateResume(id: number, resumeDTO: ResumeDTO): Promise<Resume | undefined> {
    const existingResume = await this._repository.findOne({
      where: { id },
      relations: ["experiences", "languages"]
    });

    if (!existingResume) {
      return undefined;
    }

    const updatedResume = Resume.fromDTO(resumeDTO);
    updatedResume.id = id;

    return await this._repository.save(updatedResume);
  }

  public async deleteResume(id: number): Promise<void> {
    await this._repository.delete(id);
  }

  public async findAll(): Promise<Array<Resume> | any> {
    return await this._repository.find({ relations: ["experiences", "languages"] });
  }
}

export default ResumeRepository;

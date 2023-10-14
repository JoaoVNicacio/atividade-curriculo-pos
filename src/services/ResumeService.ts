import ResumeDTO from "../dtos/ResumeDTO";
import Resume from "../entities/Resume";
import IResumeRepository from "../repositories/IResumeRepository";
import ResumeRepository from "../repositories/ResumeRepository";
import IResumeService from "./IResumeService";


class ResumeService implements IResumeService {
  private readonly _resumeRepository: IResumeRepository;

  constructor() {
    this._resumeRepository = new ResumeRepository();
  }

  async createResume(resumeDTO: ResumeDTO): Promise<Resume> {
    return await this._resumeRepository.createResume(resumeDTO);
  }

  async findById(id: number): Promise<Resume | undefined> {
    return await this._resumeRepository.findById(id);
  }

  async updateResume(id: number, resumeDTO: ResumeDTO): Promise<Resume | undefined> {
    return await this._resumeRepository.updateResume(id, resumeDTO);
  }

  async deleteResume(id: number): Promise<void> {
    await this._resumeRepository.deleteResume(id);
  }

  async findAll(): Promise<Resume[] | any> {
    return await this._resumeRepository.findAll();
  }
}

export default ResumeService;

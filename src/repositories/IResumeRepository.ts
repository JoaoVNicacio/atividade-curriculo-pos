import ResumeDTO from "../dtos/ResumeDTO";
import Resume from "../entities/Resume";

interface IResumeRepository {
  createResume(resumeDTO: ResumeDTO): Promise<Resume>;
  findAll() : Promise<Array<Resume> | any>
  findById(id: number): Promise<Resume | undefined>;
  updateResume(id: number, resumeDTO: ResumeDTO): Promise<Resume | undefined>;
  deleteResume(id: number): Promise<void>;
}

export default IResumeRepository;
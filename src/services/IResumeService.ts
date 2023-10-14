import ResumeDTO from "../dtos/ResumeDTO";
import Resume from "../entities/Resume";

interface IResumeService {
  createResume(resumeDTO: ResumeDTO): Promise<Resume>;
  findById(id: number): Promise<Resume | undefined>;
  updateResume(id: number, resumeDTO: ResumeDTO): Promise<Resume | undefined>;
  deleteResume(id: number): Promise<void>;
  findAll(): Promise<Array<Resume> | any>;
}

export default IResumeService;

import { Router, Request, Response, NextFunction } from "express";
import IResumeService from "../services/IResumeService";
import ResumeService from "../services/ResumeService";
import ResumeDTO from "../dtos/ResumeDTO";
import Resume from "../entities/Resume";

class ResumeController {
  private readonly _resumeService: IResumeService;

  constructor() {
    this._resumeService = new ResumeService();
  }

  public async createResume(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const resumeDTO = req.body as ResumeDTO;
      const resume = await this._resumeService.createResume(resumeDTO);

      res.status(201).json(resume);
    }
    catch (error) {
      next(error);
    }
  }

  public async getResumeById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const resume = await this._resumeService.findById(id);

      if (resume) {
        res.status(200).json(resume.toDTO());
      }
      else {
        res.status(404).json({ error: "Resume not found" });
      }
    }
    catch (error) {
      next(error);
    }
  }

  public async updateResume(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const resumeDTO = req.body as ResumeDTO;

      const updatedResume = await this._resumeService.updateResume(id, resumeDTO);

      if (updatedResume) {
        res.status(200).json(updatedResume);
      }
      else {
        res.status(404).json({ error: "Resume not found" });
      }
    }
    catch (error) {
      next(error);
    }
  }

  public async deleteResume(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);

      await this._resumeService.deleteResume(id);

      res.status(204).end();
    }
    catch (error) {
      next(error);
    }
  }

  public async getAllResumes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const resumes = await this._resumeService.findAll();

      const resumesDTOs = resumes.map((resume: Resume) => resume.toDTO());

      res.status(200).json(resumesDTOs);
    }
    catch (error) {
      next(error);
    }
  }

  public routes(): Router {
    const router = Router();

    router.post("/", this.createResume.bind(this));
    router.get("/:id", this.getResumeById.bind(this));
    router.put("/:id", this.updateResume.bind(this));
    router.delete("/:id", this.deleteResume.bind(this));
    router.get("/", this.getAllResumes.bind(this));

    return router;
  }
}

export default ResumeController;

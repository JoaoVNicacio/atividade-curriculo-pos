import { Router, Request, Response, NextFunction } from "express";

class HealthController {
  public getMessage(req: Request, res: Response, next: NextFunction): string | any {
    res.status(200).json({ health: "Ok" });
  }

  public routes(): Router {
    const router = Router();

    router.get("/health", this.getMessage.bind(this));

    return router;
  }
}

export default HealthController;
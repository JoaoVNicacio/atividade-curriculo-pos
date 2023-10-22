import { Router, Request, Response, NextFunction } from "express";
import { isAuthenticated, isUserAdmin, loginAdmin, loginDefaultUser } from "../auth/FirebaseAuth";

class HealthController {
  public getMessage(req: Request, res: Response, next: NextFunction): string | any {
    res.status(200).json({ health: "Ok" });
  }

  public getAuthTest(req: Request, res: Response, next: NextFunction): string | any {
    res.status(200).json({ authTest: "Ok" });
  }

  public getAdminAuthTest(req: Request, res: Response, next: NextFunction): string | any {
    res.status(200).json({ adminAuthTest: "Ok" });
  }

  public async adminLoginTest(req: Request, res: Response, next: NextFunction): Promise<string | any> {

    res.status(200).json({ token: await loginAdmin() });
  }

  public async regularLoginTest(req: Request, res: Response, next: NextFunction): Promise<string | any> {
    res.status(200).json({
      token: await loginDefaultUser()
    });
  }

  public routes(): Router {
    const router = Router();

    router.get("/health", this.getMessage.bind(this));
    router.get("/test-auth", isAuthenticated, this.getAuthTest.bind(this));
    router.get("/test-admin-auth", isAuthenticated, isUserAdmin, this.getAdminAuthTest.bind(this));
    router.get("/test-admin-login", this.adminLoginTest.bind(this));
    router.get("/test-regular-login", this.regularLoginTest.bind(this));

    return router;
  }
}

export default HealthController;
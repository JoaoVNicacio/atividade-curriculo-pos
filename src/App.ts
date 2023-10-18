import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import HealthController from './controllers/HealthController';
import { DataSource } from 'typeorm';
import ResumeController from './controllers/ResumeController';
import Experience from './entities/Experience';
import Language from './entities/Language';
import Resume from './entities/Resume';

const app = express()
dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [Resume ,Experience, Language],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
});

dataSource.initialize().then(() => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  // Controllers:
  app.use(new HealthController().routes());
  app.use("/resumes", new ResumeController().routes());

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
  })
})
  .catch((error) => console.error("Erro ao conectar ao banco de dados:", error));
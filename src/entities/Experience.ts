import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import Resume from "./Resume";
import ExperienceDTO from "../dtos/ExperienceDTO";

@Entity()
class Experience {
  @PrimaryGeneratedColumn()
  public id!: number;
  @Column('text')
  public title: string;
  @Column('text')
  public institution: string;
  @Column('text')
  public experienceType: string;
  @Column('text', { nullable: true })
  public extraInfo: string | null;
  @Column('boolean')
  public isCurrent: boolean;
  @Column('date')
  public startedIn: Date;
  @Column('date', { nullable: true })
  public endedIn: Date | null;
  @ManyToOne(() => Resume, (resume) => resume.experiences, { onDelete: "CASCADE" })
  public resume: Resume;

  public toDTO(): ExperienceDTO {
    const experienceDTO = new ExperienceDTO();
    experienceDTO.title = this.title;
    experienceDTO.institution = this.institution;
    experienceDTO.experienceType = this.experienceType;
    experienceDTO.extraInfo = this.extraInfo;
    experienceDTO.isCurrent = this.isCurrent;
    experienceDTO.startedIn = this.startedIn;
    experienceDTO.endedIn = this.endedIn;
    return experienceDTO;
  }

  public static fromDTO(dto: ExperienceDTO): Experience {
    const experience = new Experience();
    experience.title = dto.title;
    experience.institution = dto.institution;
    experience.experienceType = dto.experienceType;
    experience.extraInfo = dto.extraInfo;
    experience.isCurrent = dto.isCurrent;
    experience.startedIn = dto.startedIn;
    experience.endedIn = dto.endedIn;
    return experience;
  }
}

export default Experience;
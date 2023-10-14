import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import Experience from "./Experience";
import Language from "./Language";
import ResumeDTO from "../dtos/ResumeDTO";

@Entity()
class Resume {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column('text')
  public name: string;
  @Column('text')
  public shortDescription: string;
  @Column('text')
  public city: string;
  @Column('text')
  public phoneNumber: string;
  @Column('simple-array', { nullable: true })
  public skills: Array<string>;
  @OneToMany(() => Experience, (experience) => experience.resume, { cascade: true })
  public experiences: Array<Experience>;
  @OneToMany(() => Language, (language) => language.resume, { cascade: true })
  public languages: Array<Language>;

  public toDTO(): ResumeDTO {
    const resumeDTO = new ResumeDTO();
    resumeDTO.name = this.name;
    resumeDTO.shortDescription = this.shortDescription;
    resumeDTO.city = this.city;
    resumeDTO.phoneNumber = this.phoneNumber;
    resumeDTO.skills = this.skills;
    resumeDTO.experiences = this.experiences.map((experience) => experience.toDTO());
    resumeDTO.languages = this.languages.map((language) => language.toDTO());
    return resumeDTO;
  }

  public static fromDTO(dto: ResumeDTO): Resume {
    const resume = new Resume();
    resume.name = dto.name;
    resume.shortDescription = dto.shortDescription;
    resume.city = dto.city;
    resume.phoneNumber = dto.phoneNumber;
    resume.skills = dto.skills;
    resume.experiences = dto.experiences.map((experienceDTO) => Experience.fromDTO(experienceDTO));
    resume.languages = dto.languages.map((languageDTO) => Language.fromDTO(languageDTO));
    return resume;
  }
}

export default Resume
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import Resume from "./Resume";
import LanguageDTO from "../dtos/LanguageDTO";

@Entity()
class Language {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column('text')
  public title: string;
  @Column('text')
  public habilityLevel: string;
  @ManyToOne(() => Resume, (resume) => resume.languages, { onDelete: 'CASCADE'})
  public resume: Resume;

  public toDTO(): LanguageDTO {
    const languageDTO = new LanguageDTO();
    languageDTO.title = this.title;
    languageDTO.habilityLevel = this.habilityLevel;
    return languageDTO;
  }

  public static fromDTO(dto: LanguageDTO): Language {
    const language = new Language();
    language.title = dto.title;
    language.habilityLevel = dto.habilityLevel;
    return language;
  }
}

export default Language;
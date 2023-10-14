import ExperienceDTO from "./ExperienceDTO";
import LanguageDTO from "./LanguageDTO";

class ResumeDTO {
  public name: string;
  public shortDescription: string;
  public city: string;
  public phoneNumber: string;
  public skills: Array<string>;
  public experiences: Array<ExperienceDTO>;
  public languages: Array<LanguageDTO>;
}

export default ResumeDTO
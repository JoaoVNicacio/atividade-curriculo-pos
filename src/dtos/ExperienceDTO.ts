class ExperienceDTO {
  public title: string;
  public institution: string;
  public experienceType: string;
  public extraInfo: string | null;
  public isCurrent: boolean;
  public startedIn: Date;
  public endedIn: Date | null;
}

export default ExperienceDTO;

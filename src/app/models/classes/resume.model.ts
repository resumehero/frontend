import { Exclude, Expose, Transform } from 'class-transformer';
import { AbstractModel } from '@models/classes/_base.model';
import { transformToModel } from '@misc/helpers/model-conversion/transform-helpers/transform-to-model.function';
import { ResumeType } from '@models/enums/resume-type.enum';
import { ResumeStatus } from '@models/enums/resume-status.enum';

export enum ResumeFileType {
  DOC = 'docx',
  PDF = 'pdf'
}

export const ResumeFileIconMap = new Map<ResumeFileType, string>([
  [ResumeFileType.DOC, 'file-doc'],
  [ResumeFileType.PDF, 'file-pdf']
]);

@Exclude()
export class ResumeFile extends AbstractModel {
  @Expose()
  file: string;
  @Expose()
  file_type: ResumeFileType;
}

@Exclude()
export class Resume extends AbstractModel {
  @Expose()
  name: string;
  @Expose()
  resume_type: ResumeType;
  @Expose()
  generated: string;
  @Expose()
  resume_status: ResumeStatus;
  @Expose()
  @Transform(transformToModel(ResumeFile))
  resume_file: ResumeFile;
}

@Exclude()
export class ResumeCreate {
  @Expose()
  resume_type: ResumeType;
  @Expose()
  resume_file_type: ResumeFileType;
  @Expose()
  resume_template_id: number;
  @Expose()
  vacancy_text: string;
  @Expose()
  job_title: string;
}

import { Exclude, Expose } from 'class-transformer';
import { AbstractModel } from '@models/classes/_base.model';

export enum ResumeFileType {
  DOC = 'doc',
  PDF = 'pdf'
}

export const ResumeFileIconMap = new Map<ResumeFileType, string>([
  [ResumeFileType.DOC, 'file-doc'],
  [ResumeFileType.PDF, 'file-pdf']
]);

@Exclude()
export class Resume extends AbstractModel {
  @Expose()
  name: string;
  @Expose()
  type: ResumeFileType;
  @Expose()
  created: string;
}

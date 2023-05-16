import { Resume, ResumeFileType } from '@models/classes/resume.model';
import { getRandomIdentifier } from '@misc/helpers/get-random-identifier.function';

export const resumeList: Resume[] = [
  {
    id: getRandomIdentifier(),
    name: 'Name resume file.pdf',
    type: ResumeFileType.PDF,
    createdAt: new Date().toISOString()
  },
  {
    id: getRandomIdentifier(),
    name: 'Name resume file.docx',
    type: ResumeFileType.DOC,
    createdAt: new Date().toISOString()
  },
  {
    id: getRandomIdentifier(),
    name: 'Name resume file.pdf',
    type: ResumeFileType.PDF,
    createdAt: new Date().toISOString()
  },
  {
    id: getRandomIdentifier(),
    name: 'Name resume file.docx',
    type: ResumeFileType.DOC,
    createdAt: new Date().toISOString()
  },
  {
    id: getRandomIdentifier(),
    name: 'Name resume file.pdf',
    type: ResumeFileType.PDF,
    createdAt: new Date().toISOString()
  },
  {
    id: getRandomIdentifier(),
    name: 'Name resume file.docx',
    type: ResumeFileType.DOC,
    createdAt: new Date().toISOString()
  },
  {
    id: getRandomIdentifier(),
    name: 'Name resume file.pdf',
    type: ResumeFileType.PDF,
    createdAt: new Date().toISOString()
  },
  {
    id: getRandomIdentifier(),
    name: 'Name resume file.docx',
    type: ResumeFileType.DOC,
    createdAt: new Date().toISOString()
  },
  {
    id: getRandomIdentifier(),
    name: 'Name resume file.pdf',
    type: ResumeFileType.PDF,
    createdAt: new Date().toISOString()
  },
  {
    id: getRandomIdentifier(),
    name: 'Name resume file.docx',
    type: ResumeFileType.DOC,
    createdAt: new Date().toISOString()
  },
  {
    id: getRandomIdentifier(),
    name: 'Name resume file.pdf',
    type: ResumeFileType.PDF,
    createdAt: new Date().toISOString()
  },
  {
    id: getRandomIdentifier(),
    name: 'Name resume file.docx',
    type: ResumeFileType.DOC,
    createdAt: new Date().toISOString()
  },
  {
    id: getRandomIdentifier(),
    name: 'Name resume file.pdf',
    type: ResumeFileType.PDF,
    createdAt: new Date().toISOString()
  },
  {
    id: getRandomIdentifier(),
    name: 'Name resume file.docx',
    type: ResumeFileType.DOC,
    createdAt: new Date().toISOString()
  }
];

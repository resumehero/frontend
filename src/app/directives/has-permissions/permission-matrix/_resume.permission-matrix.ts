import { IPermissionMatrix } from '@directives/has-permissions/permission-matrix/index';
import { UserRole } from '@models/enums/user-role.enum';

export type resumePermissionType = 'resume_view';

export const resumePermissionMatrix: IPermissionMatrix<resumePermissionType> = {
  resume_view: [UserRole.client, UserRole.admin]
};

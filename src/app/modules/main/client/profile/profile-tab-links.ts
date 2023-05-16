import { INavLink } from '@models/interfaces/nav-link.interface';

export const profileTabLinks: INavLink[] = [
  {
    title: 'My data',
    path: '/profile'
  },
  {
    title: 'Change password',
    path: '/profile/change-password'
  }
];

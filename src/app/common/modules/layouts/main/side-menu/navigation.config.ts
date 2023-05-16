import { INavLink } from '@models/interfaces/nav-link.interface';

export const navItems: INavLink[] = [
  {
    icon: 'user',
    title: 'My profile',
    permissions: ['profile_view'],
    path: '/profile'
  },
  {
    icon: 'document',
    title: 'My resumes',
    permissions: ['resume_view'],
    path: '/resumes'
  }
];

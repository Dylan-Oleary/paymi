import type { User } from '~/supabase';

export type ClientUser = {
  id: User['id'];
  avatarUrl?: string;
  email?: User['email'];
  fullName: string;
  name: string;
};

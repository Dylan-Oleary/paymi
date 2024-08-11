import { Form } from '@remix-run/react';
import type { ReactNode } from 'react';

import { Button } from '~/components';

export default function ProfilePage(): ReactNode {
  return (
    <Form action='/logout' method='POST'>
      <Button type='submit'>Sign Out</Button>
    </Form>
  );
}

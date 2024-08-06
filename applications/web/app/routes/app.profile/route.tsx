import { Form } from '@remix-run/react';
import type { ReactNode } from 'react';

export default function ProfilePage(): ReactNode {
  return (
    <div>
      <Form action='/logout' method='POST'>
        <button type='submit'>Sign out</button>
      </Form>
    </div>
  );
}

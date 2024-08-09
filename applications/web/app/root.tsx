import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type MetaFunction,
} from '@remix-run/react';
import './global.css';

export const meta: MetaFunction = () => {
  return [
    { title: 'paymi' },
    { name: 'description', content: "Yeah, it's a stupid name" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className='h-full bg-white' lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='h-full'>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

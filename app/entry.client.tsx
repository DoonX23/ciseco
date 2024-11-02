import {RemixBrowser} from '@remix-run/react';
import { startTransition, StrictMode } from 'react';
// @ts-ignore
import {hydrateRoot} from 'react-dom/client';

if (!window.location.origin.includes('webcache.googleusercontent.com')) {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>,
    );
  });
}
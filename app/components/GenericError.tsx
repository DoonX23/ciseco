import {HomeIcon} from '@heroicons/react/24/outline';
import ButtonPrimary from './Button/ButtonPrimary';

export function GenericError({
  error,
  heading = "Something's wrong here.",
  description = 'We found an error while loading this page.',
}: {
  error?: {message: string; stack?: string};
  heading?: string;
  description?: string;
}) {
  // TODO hide error in prod?
  if (error) {
    description += `\n${error.message}`;
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return (
    <>
      <div className="container py-12 sm:py-16">
        <div className="max-w-screen-md flex flex-col items-start gap-8">
          <h1 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold capitalize">
            {heading}
          </h1>

          <p dangerouslySetInnerHTML={{__html: description}}></p>
          {error?.stack && (
            <pre
              style={{
                padding: '2rem',
                background: 'hsla(10, 50%, 50%, 0.1)',
                color: 'red',
                overflow: 'auto',
                maxWidth: '100%',
              }}
              dangerouslySetInnerHTML={{
                __html: addLinksToStackTrace(error.stack),
              }}
            />
          )}
          <ButtonPrimary href={'/'}>
            <HomeIcon className="h-5 w-5 mr-2" />
            Take me to the home page
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
}

function addLinksToStackTrace(stackTrace: string) {
  return stackTrace?.replace(
    /^\s*at\s?.*?[(\s]((\/|\w\:).+)\)\n/gim,
    (all, m1) =>
      all.replace(
        m1,
        `<a href="vscode://file${m1}" class="hover:underline">${m1}</a>`,
      ),
  );
}

import {HomeIcon} from '@heroicons/react/24/outline';
import ButtonPrimary from './Button/ButtonPrimary';
import {FeaturedSection} from './FeaturedSection';
import Heading from './Heading/Heading';

export function NotFound({type = 'page'}: {type?: string}) {
  const heading = `We’ve lost this ${type}`;
  const description = `We couldn’t find the ${type} you’re looking for. Try checking the URL or heading back to the home page.`;

  return (
    <div className="py-10 lg:py-20">
      <div className="container">
        <Heading as="h1" desc={description}>
          {heading}
        </Heading>
        <ButtonPrimary href={'/'}>
          <HomeIcon className="w-5 h-5 me-2" />
          <span>Take me to the home page</span>
        </ButtonPrimary>
        <hr className="mt-20" />
      </div>
      <FeaturedSection className="space-y-20 mt-20" />
    </div>
  );
}

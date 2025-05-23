import React, { useEffect, Suspense } from 'react';

const Elementary = React.lazy(() => import('../components/Elementary'));
const Statistics = React.lazy(() => import('../components/Statistics'));
const Biographia = React.lazy(() => import('../components/Biographia'));
const Years = React.lazy(() => import('../components/Years'));

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className='max-lg:px-4'>
      <Suspense fallback={<div className="fixed top-[50%] left-[50%] translate-x-[-50%]"></div>}>
        <Elementary />
        <Statistics />
        <Biographia />
        <Years />
      </Suspense>
    </div>
  );
};

export default About;
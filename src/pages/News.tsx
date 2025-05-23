import { useEffect, Suspense, lazy } from 'react';

const Elementary = lazy(() => import('../components/Elementary'));
const Cards = lazy(() => import('../components/NewsCards'));

const News = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Suspense fallback={<div className="fixed top-[50%] left-[50%] translate-x-[-50%]"></div>}>
      <div className='max-lg:px-4'>
        <Elementary />
        <Cards />
      </div>
    </Suspense>
  );
};

export default News;
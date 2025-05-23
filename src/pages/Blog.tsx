import React, { useEffect, Suspense } from 'react';

const Elementary = React.lazy(() => import('../components/Elementary'));
const BlogCards = React.lazy(() => import('../components/BlogCards'));

const Blog = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className='max-lg:px-4'>
      <Suspense fallback={<div className="fixed top-[50%] left-[50%] translate-x-[-50%]"></div>}>
        <Elementary />
        <BlogCards />
      </Suspense>
    </div>
  );
};

export default Blog;
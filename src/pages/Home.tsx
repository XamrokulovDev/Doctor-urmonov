import { Suspense, lazy } from 'react';

const About = lazy(() => import('../components/About'));
const Biographia = lazy(() => import('../components/Biographia'));
const HomeCards = lazy(() => import('../components/HomeCards'));
const Videos = lazy(() => import('../components/Videos'));
const Patients = lazy(() => import('../components/Patients'));
const Information = lazy(() => import('../components/Information'));

const Home = () => {
  return (
    <Suspense fallback={<div className="fixed top-[50%] left-[50%] translate-x-[-50%]"></div>}>
      <div>
        <About />
        <Biographia />
        <HomeCards />
        <Patients />
        <Videos />
        <Information />
      </div>
    </Suspense>
  );
};

export default Home;
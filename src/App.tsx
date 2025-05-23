import { Suspense, lazy, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import RouterLayout from "./layout/RouterLayout";
import Loader from "./components/Loading";

const Home = lazy(() => import("./pages/Home"));
const Blog = lazy(() => import("./pages/Blog"));
const News = lazy(() => import("./pages/News"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const CardDetails = lazy(() => import("./pages/CardDetails"));

// Async function to preload all lazy components
const preloadComponents = () => {
  return Promise.all([
    import("./pages/Home"),
    import("./pages/Blog"),
    import("./pages/News"),
    import("./pages/About"),
    import("./pages/Services"),
    import("./pages/BlogDetails"),
    import("./pages/CardDetails"),
  ]);
};

const App = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // 1. 1500ms timeout
    const timer = new Promise((resolve) => setTimeout(resolve, 1500));

    // 2. barcha lazy komponentlarni oldindan yuklash
    const componentsLoaded = preloadComponents();

    // Agar backenddan ma'lumot kerak bo'lsa, shu yerga qo'shsa bo'ladi, masalan:
    // const dataLoaded = fetch('/api/init').then(res => res.json());

    // 3. Barchasi bajarilishini kutamiz
    Promise.all([timer, componentsLoaded])
      .then(() => {
        setShowLoader(false);
      })
      .catch(() => {
        // Xato bo'lsa ham loader o'chadi, xatoni keyin ko'rish mumkin
        setShowLoader(false);
      });

    return () => {};
  }, []);

  if (showLoader) return <Loader />;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RouterLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "blogs", element: <Blog /> },
        { path: "news", element: <News /> },
        { path: "services", element: <Services /> },
        { path: "/new/:id", element: <CardDetails /> },
        { path: "/blog/:id", element: <BlogDetails /> },
      ],
    },
  ]);

  return (
    <AppProvider>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </AppProvider>
  );
};

export default App;
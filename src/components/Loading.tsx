
const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-md bg-white flex items-center justify-center z-50">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
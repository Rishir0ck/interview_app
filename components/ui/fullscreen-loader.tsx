// components/ui/fullscreen-loader.tsx

const FullScreenLoader = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
  
  export default FullScreenLoader;
  
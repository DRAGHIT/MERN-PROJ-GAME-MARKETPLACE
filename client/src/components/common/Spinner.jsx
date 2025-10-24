import { Loader2 } from 'lucide-react';

const Spinner = ({ size = 24, fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 size={48} className="animate-spin text-blue-500" />
      </div>
    );
  }

  return <Loader2 size={size} className="animate-spin text-blue-500" />;
};

export default Spinner;

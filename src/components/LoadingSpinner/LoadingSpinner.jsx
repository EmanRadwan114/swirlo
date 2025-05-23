import { CircleLoader } from 'react-spinners';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <CircleLoader color="#ab795a" size={80} />
    </div>
  );
}
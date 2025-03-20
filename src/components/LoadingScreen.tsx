import { useEffect } from 'react';
import LumonLogo from '../assets/LumonLogo.svg?react';
import './LoadingScreen.scss';

type LoadingScreenProps = {
  onFinish: () => void;
}

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  useEffect(
    () => {
      const timer = setTimeout(() => {
        onFinish();
      }, 6500);

      return () => clearTimeout(timer);
    },
    [onFinish]
  );

  return (
    <div className="loading-screen">
      <LumonLogo />
    </div>
  )
}
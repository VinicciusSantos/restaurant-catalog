/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';

interface IUseComponentVisible {
    initialIsVisible: boolean;
    callback: () => boolean;
}

export const useComponentVisible = ({
  initialIsVisible,
  callback,
}: IUseComponentVisible) => {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !(ref.current as any).contains(event.target)) {
      setIsComponentVisible(false);
      setIsComponentVisible(callback());
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
};

import { useEffect, useState, type RefObject } from 'react';

export default function useFocusMarker<T extends HTMLElement>(ref: RefObject<T | null>): boolean {
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    const handleFocus = () => setIsFocus(true);
    const handleBlur = () => setIsFocus(false);

    ref.current?.addEventListener('focus', handleFocus);
    ref.current?.addEventListener('blur', handleBlur);

    return () => {
      ref.current?.removeEventListener('focus', handleFocus);
      ref.current?.removeEventListener('blur', handleBlur);
    };
  }, []);

  return isFocus;
}

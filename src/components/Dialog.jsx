import { useEffect, useRef } from 'react';

export default function Dialog({ children, onClose, labelledBy, className = '', onKeyDown }) {
  const dialog = useRef(null);
  const callback = useRef(onClose);
  useEffect(() => { callback.current = onClose; }, [onClose]);
  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);
  return <dialog ref={dialog} className={`modal ${className}`} aria-labelledby={labelledBy} onCancel={(event) => { event.preventDefault(); callback.current(); }} onClick={(event) => { if (event.target === event.currentTarget) callback.current(); }} onKeyDown={onKeyDown}>{children}</dialog>;
}

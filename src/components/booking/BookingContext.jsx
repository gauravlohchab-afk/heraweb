import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import BookingModal from './BookingModal.jsx';

const BookingContext = createContext({ open: () => {} });

/** Provides one shared booking popup; any component can call useBooking().open(). */
export function BookingProvider({ children }) {
  const [state, setState] = useState({ isOpen: false, treatment: '', mode: 'booking' });

  // open({ treatment: 'HydraFacial', mode: 'call' | 'booking' })
  const open = useCallback(({ treatment = '', mode = 'booking' } = {}) => setState({ isOpen: true, treatment, mode }), []);
  const close = useCallback(() => setState((s) => ({ ...s, isOpen: false })), []);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal {...state} onClose={close} />
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);

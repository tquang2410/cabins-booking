"use client";
import {createContext, useContext, useState} from 'react';
const ReservationContext = createContext ();
const initialState = { from: undefined, to: undefined };
function ReservationProvider({children}) {
    const [range, setRange] = useState(initialState);
    const resetRange = () => setRange(initialState);
    
    // Đảm bảo range luôn là object, không bao giờ undefined
    const safeSetRange = (newRange) => {
        setRange(newRange || initialState);
    };
    
    return (<ReservationContext.Provider value={{ range, setRange: safeSetRange, resetRange }}>
        {children}
    </ReservationContext.Provider>
    );
}
function useReservation() {
    const context = useContext(ReservationContext)
    if(context === undefined)
        throw new Error("Context was used outside of ReservationProvider");
        return context;

}
export { ReservationProvider, useReservation };

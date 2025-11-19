import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookings: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push({
        ...action.payload,
        status: 'pending', // Default status
      });
    },
    removeBooking: (state, action) => {
      state.bookings = state.bookings.filter(
        booking => booking.id !== action.payload
      );
    },
    updateBookingStatus: (state, action) => {
      const booking = state.bookings.find(
        b => b.id === action.payload.id
      );
      if (booking) {
        booking.status = action.payload.status;
      }
    },
    confirmBooking: (state, action) => {
      const booking = state.bookings.find(
        b => b.id === action.payload
      );
      if (booking) {
        booking.status = 'confirmed';
      }
    },
    cancelBooking: (state, action) => {
      const booking = state.bookings.find(
        b => b.id === action.payload
      );
      if (booking) {
        booking.status = 'cancelled';
      }
    },
  },
});

export const { 
  addBooking, 
  removeBooking, 
  updateBookingStatus, 
  confirmBooking, 
  cancelBooking 
} = bookingSlice.actions;
export default bookingSlice.reducer;

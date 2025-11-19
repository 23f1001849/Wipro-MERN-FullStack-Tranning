import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBooking } from '../store/bookingSlice';

// Custom hook for form submission logic
const useFormSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dispatch to Redux store
      dispatch(addBooking({
        ...values,
        id: Date.now(),
        bookingDate: new Date().toISOString(),
      }));

      setSubmitStatus('success');
      return true;
    } catch (error) {
      setSubmitStatus('error');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting,
    submitStatus,
    setSubmitStatus,
  };
};

export default useFormSubmit;

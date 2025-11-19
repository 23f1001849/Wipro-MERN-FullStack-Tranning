import React from 'react';

const CourseDetails = () => {
  return (
    <div className="module-card shadow-sm">
      <h3 className="h5 mb-3">Module · Course Details</h3>
      <p className="text-muted">
        Deep dive into BookVerse curriculum design. Explore pacing guides, recommended reading order, and built-in
        assessments to keep learners engaged.
      </p>
      <ul className="ps-3">
        <li>8 interactive lessons with checkpoints</li>
        <li>Downloadable facilitator handbook</li>
        <li>Capstone project rubric + exemplars</li>
      </ul>
    </div>
  );
};

export default CourseDetails;

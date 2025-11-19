import React from 'react';

const InstructorProfile = () => {
  return (
    <div className="module-card shadow-sm">
      <h3 className="h5 mb-3">Module · Instructor Profile</h3>
      <div className="d-flex align-items-center gap-3 mb-3">
        <img
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=cover"
          alt="Instructor"
          className="rounded-circle"
          width="72"
          height="72"
        />
        <div>
          <p className="fw-semibold mb-0">Dr. Amani Rhodes</p>
          <small className="text-muted">Lead Instructor · Learning Science</small>
        </div>
      </div>
      <p>
        Amani specializes in equitable curriculum design and leads the cohort mentorship program. Learners can schedule
        1:1 studio sessions or attend weekly office hours streamed inside BookVerse Live.
      </p>
      <div className="badge bg-primary-subtle text-primary-emphasis">Office Hours · Thursdays · 7pm EST</div>
    </div>
  );
};

export default InstructorProfile;

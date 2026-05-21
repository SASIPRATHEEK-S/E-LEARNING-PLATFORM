import React from "react";

// CourseCard - displays a single course as a card with view/enroll/delete buttons
// userRole: 'student' | 'instructor' | 'admin'
// progress: number (0-100, only for enrolled students)
export default function CourseCard({
  course,
  onView,
  onDelete,
  onEdit,
  onEnroll,
  isEnrolled = false,
  userRole = "student",
  progress = null,
  onViewQuizzes,
}) {
  return (
    <div className="card h-100 shadow-sm border-0">
      <div
        className="bg-light d-flex align-items-center justify-content-center"
        style={{ height: "160px" }}
      >
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="card-img-top h-100"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <i className="bi bi-play-btn-fill display-1 text-secondary"></i>
        )}
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold text-dark">{course.title}</h5>
        <p className="text-muted small mb-2">By {course.instructorName}</p>

        <p className="card-text text-secondary small flex-grow-1">
          {course.description?.substring(0, 80)}...
        </p>

        <div className="d-flex flex-column gap-2 mt-3">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <span className="badge bg-info-subtle text-info-emphasis px-2 py-1 text-nowrap">
              <i className="bi bi-clock me-1"></i>
              {course.duration || "N/A"}
            </span>
            <div className="d-flex gap-2 align-items-stretch">
              {onEdit && (
                <button
                  className="btn btn-secondary btn-sm d-inline-flex align-items-center justify-content-center"
                  style={{ minWidth: "38px" }}
                  title="Edit course"
                  onClick={() => onEdit(course)}
                >
                  <i className="bi bi-pencil"></i>
                </button>
              )}
              <button
                className="btn btn-primary btn-sm px-3 text-nowrap"
                onClick={() => onView(course)}
              >
                View Course
              </button>
              {onDelete && (
                <button
                  className="btn btn-danger btn-sm d-inline-flex align-items-center justify-content-center"
                  style={{ minWidth: "38px" }}
                  title="Delete course"
                  onClick={() => onDelete(course.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              )}
            </div>
          </div>

          {/* Student: Not enrolled */}
          {userRole === "student" && !isEnrolled && onEnroll && (
            <div className="mt-2">
              <div
                className="alert alert-info py-2 mb-2"
                style={{ fontSize: "0.95rem" }}
              >
                Please enroll to track progress.
              </div>
              <button
                className="btn btn-primary w-100"
                onClick={() => onEnroll(course.id)}
              >
                <i className="bi bi-person-plus me-2"></i>Enroll Now
              </button>
            </div>
          )}

          {/* Student: Enrolled */}
          {userRole === "student" && isEnrolled && (
            <div className="d-flex flex-column gap-2 mt-3">
              {progress !== null && (
                <span
                  className="fw-bold px-3 py-2 rounded text-center"
                  style={{
                    backgroundColor:
                      progress >= 80
                        ? "#d1e7dd"
                        : progress >= 50
                          ? "#fff3cd"
                          : "#f8d7da",
                    color:
                      progress >= 80
                        ? "#198754"
                        : progress >= 50
                          ? "#856404"
                          : "#842029",
                    fontSize: "1rem",
                  }}
                >
                  {progress}% Complete
                </span>
              )}
              <button 
                className="btn btn-primary w-100"
                onClick={() => onView(course)}
              >
                Continue Learning
              </button>
              <button 
                className="btn btn-outline-primary w-100"
                onClick={() => onViewQuizzes && onViewQuizzes(course)}
              >
                View Quizzes
              </button>
            </div>
          )}

          {/* Instructor/Admin: Only view */}
          {(userRole === "instructor" || userRole === "admin") && (
            <div className="mt-2 text-muted small text-center">
              Course preview only
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

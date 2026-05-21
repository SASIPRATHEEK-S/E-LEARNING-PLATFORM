import React from "react";
import CoursePlayer from "./CoursePlayer";

// CoursePreview - reuses CoursePlayer to show the course exactly as students will
// see it, with action buttons to edit further or confirm publish.
export default function CoursePreview({
  course,
  onEdit,
  onPublish,
  onCancel,
  onEditTopic,
  onDeleteTopic,
  isUpdate = false,
}) {
  return (
    <div>
      <div className="alert alert-warning d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <div>
          <i className="bi bi-eye me-2"></i>
          <strong>Preview Mode</strong> &mdash; this is how students will see
          your course. It is not published yet.
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={onEdit}
          >
            <i className="bi bi-pencil me-1"></i>Edit Course
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={onPublish}
          >
            <i className="bi bi-cloud-upload me-1"></i>
            {isUpdate ? "Publish Update" : "Publish Course"}
          </button>
          <button
            type="button"
            className="btn btn-light btn-sm"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>

      <CoursePlayer
        course={course}
        onBack={onEdit}
        previewMode
        onEditTopic={onEditTopic}
        onDeleteTopic={onDeleteTopic}
      />

      <div className="d-flex gap-2 flex-wrap mt-4">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onEdit}
        >
          <i className="bi bi-pencil me-2"></i>Edit Course
        </button>
        <button
          type="button"
          className="btn btn-primary flex-grow-1"
          onClick={onPublish}
        >
          <i className="bi bi-cloud-upload me-2"></i>
          {isUpdate ? "Publish Update" : "Publish Course"}
        </button>
        <button type="button" className="btn btn-light" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

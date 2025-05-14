function StudentList({ students }) {
  return (
    <div className="student-list">
      {students.map((student) => (
        <div className="student-item" key={student.id}>
          <div className="student-details">
            <span className="student-name">{student.name}</span>
            <span className="student-email">{student.email}</span>
            <span className="student-course">Course: {student.course}</span>
          </div>
          <div className="student-actions">
            {/* Add delete/edit buttons here if needed */}
            <button>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudentList;
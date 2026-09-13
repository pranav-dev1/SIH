const {
  seedUsers,
  seedCourses,
  seedAssessments,
  seedEnrollments,
  seedCertificates,
  seedFeedback,
  seedNotifications
} = require('../seed/seedData');

class MemoryStore {
  constructor() {
    this.users = JSON.parse(JSON.stringify(seedUsers));
    this.courses = JSON.parse(JSON.stringify(seedCourses));
    this.assessments = JSON.parse(JSON.stringify(seedAssessments));
    this.enrollments = JSON.parse(JSON.stringify(seedEnrollments));
    this.certificates = JSON.parse(JSON.stringify(seedCertificates));
    this.feedback = JSON.parse(JSON.stringify(seedFeedback));
    this.notifications = JSON.parse(JSON.stringify(seedNotifications));
  }

  // Users
  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.users.find(u => u._id === id || u.id === id);
  }

  createUser(userData) {
    const newUser = {
      _id: 'u_' + Date.now(),
      ...userData,
      createdAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id, updateData) {
    const index = this.users.findIndex(u => u._id === id || u.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updateData };
      return this.users[index];
    }
    return null;
  }

  getAllUsers() {
    return this.users;
  }

  // Courses
  getAllCourses() {
    return this.courses;
  }

  getCourseById(id) {
    return this.courses.find(c => c._id === id || c.id === id);
  }

  createCourse(courseData) {
    const newCourse = {
      _id: 'c_' + Date.now(),
      ...courseData,
      published: true,
      createdAt: new Date()
    };
    this.courses.push(newCourse);
    return newCourse;
  }

  updateCourse(id, updateData) {
    const index = this.courses.findIndex(c => c._id === id || c.id === id);
    if (index !== -1) {
      this.courses[index] = { ...this.courses[index], ...updateData };
      return this.courses[index];
    }
    return null;
  }

  deleteCourse(id) {
    const initialLen = this.courses.length;
    this.courses = this.courses.filter(c => c._id !== id && c.id !== id);
    return this.courses.length < initialLen;
  }

  // Enrollments
  getEnrollmentsByTrainee(traineeId) {
    return this.enrollments.filter(e => e.traineeId === traineeId);
  }

  getEnrollment(traineeId, courseId) {
    return this.enrollments.find(e => e.traineeId === traineeId && e.courseId === courseId);
  }

  getAllEnrollments() {
    return this.enrollments;
  }

  createEnrollment(traineeId, courseId) {
    let existing = this.getEnrollment(traineeId, courseId);
    if (existing) return existing;

    const newEnrollment = {
      _id: 'e_' + Date.now(),
      traineeId,
      courseId,
      progressPercentage: 0,
      completedModuleIds: [],
      status: 'enrolled',
      enrolledAt: new Date(),
      completedAt: null
    };
    this.enrollments.push(newEnrollment);
    return newEnrollment;
  }

  updateEnrollmentProgress(traineeId, courseId, completedModuleIds, progressPercentage, status) {
    let enrollment = this.getEnrollment(traineeId, courseId);
    if (!enrollment) {
      enrollment = this.createEnrollment(traineeId, courseId);
    }
    enrollment.completedModuleIds = completedModuleIds;
    enrollment.progressPercentage = progressPercentage;
    if (status) {
      enrollment.status = status;
      if (status === 'completed' && !enrollment.completedAt) {
        enrollment.completedAt = new Date();
      }
    }
    return enrollment;
  }

  // Assessments
  getAssessmentByCourse(courseId) {
    return this.assessments.find(a => a.courseId === courseId);
  }

  saveAssessment(courseId, assessmentData) {
    const index = this.assessments.findIndex(a => a.courseId === courseId);
    if (index !== -1) {
      this.assessments[index] = { ...this.assessments[index], ...assessmentData };
      return this.assessments[index];
    } else {
      const newAssessment = {
        _id: 'a_' + Date.now(),
        courseId,
        ...assessmentData
      };
      this.assessments.push(newAssessment);
      return newAssessment;
    }
  }

  // Certificates
  getCertificatesByTrainee(traineeId) {
    return this.certificates.filter(c => c.traineeId === traineeId);
  }

  getCertificateById(id) {
    return this.certificates.find(c => c._id === id || c.certificateId === id);
  }

  getAllCertificates() {
    return this.certificates;
  }

  createCertificate({ traineeId, traineeName, courseId, courseName }) {
    let existing = this.certificates.find(c => c.traineeId === traineeId && c.courseId === courseId);
    if (existing) return existing;

    const newCert = {
      _id: 'cert_' + Date.now(),
      certificateId: 'CAP-2026-' + Math.floor(10000 + Math.random() * 90000),
      traineeId,
      traineeName,
      courseId,
      courseName,
      issueDate: new Date(),
      verificationCode: 'VER-' + Math.random().toString(36).substring(2, 8).toUpperCase()
    };
    this.certificates.push(newCert);
    return newCert;
  }

  // Feedback
  getFeedbackByCourse(courseId) {
    return this.feedback.filter(f => f.courseId === courseId);
  }

  getAllFeedback() {
    return this.feedback;
  }

  createFeedback(feedbackData) {
    const newFeedback = {
      _id: 'f_' + Date.now(),
      ...feedbackData,
      createdAt: new Date()
    };
    this.feedback.push(newFeedback);
    return newFeedback;
  }

  // Notifications
  getNotificationsByUser(userId) {
    return this.notifications.filter(n => n.userId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  markNotificationRead(id) {
    const notif = this.notifications.find(n => n._id === id);
    if (notif) notif.read = true;
    return notif;
  }

  addNotification(userId, title, message, type = 'info') {
    const notif = {
      _id: 'n_' + Date.now(),
      userId,
      title,
      message,
      type,
      read: false,
      createdAt: new Date()
    };
    this.notifications.push(notif);
    return notif;
  }
}

const memoryStore = new MemoryStore();
module.exports = memoryStore;

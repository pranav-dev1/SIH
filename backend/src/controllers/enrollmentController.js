const memoryStore = require('../config/memoryStore');

const enrollInCourse = (req, res) => {
  try {
    const { courseId } = req.body;
    const traineeId = req.user.id;

    if (!courseId) {
      return res.status(400).json({ success: false, message: 'Course ID is required' });
    }

    const course = memoryStore.getCourseById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const enrollment = memoryStore.createEnrollment(traineeId, courseId);

    // Send notification
    memoryStore.addNotification(
      traineeId,
      'Enrollment Successful',
      `You have successfully enrolled in "${course.title}". Start learning today!`,
      'enrollment'
    );

    res.status(201).json({
      success: true,
      message: 'Successfully enrolled in course',
      enrollment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to enroll in course', error: error.message });
  }
};

const getMyEnrollments = (req, res) => {
  try {
    const traineeId = req.user.id;
    const enrollments = memoryStore.getEnrollmentsByTrainee(traineeId);
    const courses = memoryStore.getAllCourses();

    const result = enrollments.map(enr => {
      const course = courses.find(c => (c._id || c.id) === enr.courseId);
      return {
        ...enr,
        course: course || { title: 'Unknown Course', description: '', duration: '' }
      };
    });

    res.json({ success: true, count: result.length, enrollments: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch enrollments', error: error.message });
  }
};

const updateProgress = (req, res) => {
  try {
    const { courseId, moduleId } = req.body;
    const traineeId = req.user.id;

    const course = memoryStore.getCourseById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    let enrollment = memoryStore.getEnrollment(traineeId, courseId);
    if (!enrollment) {
      enrollment = memoryStore.createEnrollment(traineeId, courseId);
    }

    let completedModuleIds = enrollment.completedModuleIds || [];
    if (moduleId && !completedModuleIds.includes(moduleId)) {
      completedModuleIds.push(moduleId);
    }

    const totalModules = course.modules ? course.modules.length : 1;
    const progressPercentage = Math.min(100, Math.round((completedModuleIds.length / totalModules) * 100));

    let status = enrollment.status;
    if (progressPercentage >= 100) {
      status = 'completed';
    }

    const updated = memoryStore.updateEnrollmentProgress(
      traineeId,
      courseId,
      completedModuleIds,
      progressPercentage,
      status
    );

    if (status === 'completed' && enrollment.status !== 'completed') {
      memoryStore.addNotification(
        traineeId,
        'Course Completed!',
        `Congratulations on completing all modules of "${course.title}". Take the assessment to earn your certificate!`,
        'assessment'
      );
    }

    res.json({
      success: true,
      message: 'Module progress updated',
      enrollment: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update progress', error: error.message });
  }
};

module.exports = {
  enrollInCourse,
  getMyEnrollments,
  updateProgress
};

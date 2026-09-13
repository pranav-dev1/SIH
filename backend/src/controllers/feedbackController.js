const memoryStore = require('../config/memoryStore');

const submitFeedback = (req, res) => {
  try {
    const { courseId, rating, courseQuality, trainerQuality, difficultyRating, comments } = req.body;
    const traineeId = req.user.id;
    const traineeName = req.user.name;

    if (!courseId || !rating) {
      return res.status(400).json({ success: false, message: 'Course ID and overall rating are required' });
    }

    const feedback = memoryStore.createFeedback({
      courseId,
      traineeId,
      traineeName,
      rating: Number(rating),
      courseQuality: Number(courseQuality || rating),
      trainerQuality: Number(trainerQuality || rating),
      difficultyRating: Number(difficultyRating || 3),
      comments: comments || ''
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for helping us improve. Feedback submitted successfully!',
      feedback
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to submit feedback', error: error.message });
  }
};

const getFeedbackForCourse = (req, res) => {
  try {
    const { courseId } = req.params;
    const feedbackList = memoryStore.getFeedbackByCourse(courseId);
    
    const avgRating = feedbackList.length 
      ? (feedbackList.reduce((acc, f) => acc + f.rating, 0) / feedbackList.length).toFixed(1)
      : '0.0';

    res.json({
      success: true,
      count: feedbackList.length,
      averageRating: Number(avgRating),
      feedback: feedbackList
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch course feedback', error: error.message });
  }
};

const getAllFeedback = (req, res) => {
  try {
    const feedbackList = memoryStore.getAllFeedback();
    const courses = memoryStore.getAllCourses();

    const result = feedbackList.map(f => {
      const course = courses.find(c => (c._id || c.id) === f.courseId);
      return {
        ...f,
        courseTitle: course ? course.title : 'Course'
      };
    });

    res.json({ success: true, count: result.length, feedback: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch feedback', error: error.message });
  }
};

module.exports = {
  submitFeedback,
  getFeedbackForCourse,
  getAllFeedback
};

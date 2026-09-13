const memoryStore = require('../config/memoryStore');

const getCourses = (req, res) => {
  try {
    const { search, category, difficulty } = req.query;
    let courses = memoryStore.getAllCourses();

    if (search) {
      const q = search.toLowerCase();
      courses = courses.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }

    if (category && category !== 'All') {
      courses = courses.filter(c => c.category === category);
    }

    if (difficulty && difficulty !== 'All') {
      courses = courses.filter(c => c.difficulty === difficulty);
    }

    // Attach enrollment progress if user is logged in
    if (req.user && req.user.role === 'trainee') {
      const enrollments = memoryStore.getEnrollmentsByTrainee(req.user.id);
      courses = courses.map(course => {
        const enr = enrollments.find(e => e.courseId === (course._id || course.id));
        return {
          ...course,
          isEnrolled: !!enr,
          progressPercentage: enr ? enr.progressPercentage : 0,
          enrollmentStatus: enr ? enr.status : null
        };
      });
    }

    res.json({ success: true, count: courses.length, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch courses', error: error.message });
  }
};

const getCourseById = (req, res) => {
  try {
    const { id } = req.params;
    const course = memoryStore.getCourseById(id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    let enrollment = null;
    if (req.user && req.user.role === 'trainee') {
      enrollment = memoryStore.getEnrollment(req.user.id, id);
    }

    res.json({
      success: true,
      course,
      enrollment: enrollment || null
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch course details', error: error.message });
  }
};

const createCourse = (req, res) => {
  try {
    const { title, description, category, difficulty, duration, learningObjectives, modules } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ success: false, message: 'Title, description, and category are required' });
    }

    const newCourse = memoryStore.createCourse({
      title,
      description,
      category,
      difficulty: difficulty || 'Beginner',
      duration: duration || '2 Weeks',
      trainerId: req.user.id,
      trainerName: req.user.name,
      learningObjectives: learningObjectives || [],
      modules: modules || []
    });

    res.status(201).json({ success: true, message: 'Course created successfully', course: newCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create course', error: error.message });
  }
};

const updateCourse = (req, res) => {
  try {
    const { id } = req.params;
    const course = memoryStore.getCourseById(id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (req.user.role !== 'admin' && course.trainerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized to update this course' });
    }

    const updated = memoryStore.updateCourse(id, req.body);
    res.json({ success: true, message: 'Course updated successfully', course: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update course', error: error.message });
  }
};

const deleteCourse = (req, res) => {
  try {
    const { id } = req.params;
    const course = memoryStore.getCourseById(id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (req.user.role !== 'admin' && course.trainerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this course' });
    }

    memoryStore.deleteCourse(id);
    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete course', error: error.message });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};

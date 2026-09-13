const memoryStore = require('../config/memoryStore');

const getTraineeDashboard = (req, res) => {
  try {
    const traineeId = req.user.id;
    const enrollments = memoryStore.getEnrollmentsByTrainee(traineeId);
    const certificates = memoryStore.getCertificatesByTrainee(traineeId);
    const allCourses = memoryStore.getAllCourses();

    const enrolledCoursesCount = enrollments.length;
    const completedCoursesCount = enrollments.filter(e => e.status === 'completed').length;
    
    const avgProgress = enrollments.length 
      ? Math.round(enrollments.reduce((acc, e) => acc + e.progressPercentage, 0) / enrollments.length)
      : 0;

    const certificatesCount = certificates.length;

    const continueLearning = enrollments
      .filter(e => e.status !== 'completed')
      .map(e => {
        const course = allCourses.find(c => (c._id || c.id) === e.courseId);
        return {
          enrollmentId: e._id,
          courseId: e.courseId,
          title: course ? course.title : 'Course',
          category: course ? course.category : 'General',
          progressPercentage: e.progressPercentage,
          completedModuleIds: e.completedModuleIds || [],
          totalModules: course && course.modules ? course.modules.length : 4
        };
      });

    const enrolledIds = enrollments.map(e => e.courseId);
    const recommendedCourses = allCourses
      .filter(c => !enrolledIds.includes(c._id || c.id))
      .slice(0, 3);

    const recentActivity = [
      { id: 'act1', type: 'progress', message: 'Completed Module 3 of Disaster Preparedness & Response', time: '2 hours ago' },
      { id: 'act2', type: 'certificate', message: 'Earned Certificate for Weather & Climate Awareness', time: '3 days ago' },
      { id: 'act3', type: 'enrollment', message: 'Enrolled in Data Literacy for Public Governance', time: '1 week ago' }
    ];

    const upcomingAssessments = [
      { id: 'ass1', courseId: 'c_disaster_101', title: 'Disaster Preparedness Certification Exam', duration: '20 Mins', passingScore: '70%' },
      { id: 'ass2', courseId: 'c_data_103', title: 'Data Literacy Evaluation', duration: '15 Mins', passingScore: '70%' }
    ];

    res.json({
      success: true,
      stats: {
        enrolledCourses: enrolledCoursesCount,
        completedCourses: completedCoursesCount,
        learningProgress: avgProgress,
        certificatesEarned: certificatesCount
      },
      continueLearning,
      recommendedCourses,
      recentActivity,
      upcomingAssessments
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch trainee dashboard data', error: error.message });
  }
};

const getTrainerDashboard = (req, res) => {
  try {
    const trainerId = req.user.id;
    const allCourses = memoryStore.getAllCourses();
    const trainerCourses = allCourses.filter(c => c.trainerId === trainerId);

    const trainerCourseIds = trainerCourses.map(c => c._id || c.id);
    const allEnrollments = memoryStore.getAllEnrollments();
    const trainerEnrollments = allEnrollments.filter(e => trainerCourseIds.includes(e.courseId));

    const totalTrainees = new Set(trainerEnrollments.map(e => e.traineeId)).size;
    const completedCount = trainerEnrollments.filter(e => e.status === 'completed').length;
    const avgCompletionRate = trainerEnrollments.length
      ? Math.round((completedCount / trainerEnrollments.length) * 100)
      : 85;

    const allFeedback = memoryStore.getAllFeedback();
    const trainerFeedback = allFeedback.filter(f => trainerCourseIds.includes(f.courseId));
    const avgRating = trainerFeedback.length
      ? (trainerFeedback.reduce((acc, f) => acc + f.rating, 0) / trainerFeedback.length).toFixed(1)
      : '4.8';

    const courseChartData = trainerCourses.map(c => {
      const cEnrollments = allEnrollments.filter(e => e.courseId === (c._id || c.id));
      const cCompleted = cEnrollments.filter(e => e.status === 'completed').length;
      return {
        name: c.title.length > 18 ? c.title.substring(0, 18) + '...' : c.title,
        enrolled: cEnrollments.length || Math.floor(Math.random() * 20 + 10),
        completed: cCompleted || Math.floor(Math.random() * 10 + 5)
      };
    });

    const enrolledTrainees = memoryStore.getAllUsers().filter(u => u.role === 'trainee').slice(0, 5);

    res.json({
      success: true,
      stats: {
        totalCourses: trainerCourses.length,
        totalTrainees: totalTrainees || 28,
        avgCompletionRate: avgCompletionRate || 82,
        avgRating: Number(avgRating)
      },
      courses: trainerCourses,
      chartData: courseChartData,
      enrolledTrainees,
      feedback: trainerFeedback
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch trainer dashboard data', error: error.message });
  }
};

const getAdminDashboard = (req, res) => {
  try {
    const users = memoryStore.getAllUsers();
    const courses = memoryStore.getAllCourses();
    const enrollments = memoryStore.getAllEnrollments();
    const feedback = memoryStore.getAllFeedback();

    const totalUsers = users.length;
    const totalTrainees = users.filter(u => u.role === 'trainee').length;
    const totalTrainers = users.filter(u => u.role === 'trainer').length;
    const totalCourses = courses.length;
    const totalEnrollments = enrollments.length;

    const completedCount = enrollments.filter(e => e.status === 'completed').length;
    const completionRate = totalEnrollments ? Math.round((completedCount / totalEnrollments) * 100) : 75;

    const monthlyEnrollments = [
      { month: 'Sep', enrollments: 45, completions: 32 },
      { month: 'Oct', enrollments: 68, completions: 50 },
      { month: 'Nov', enrollments: 85, completions: 65 },
      { month: 'Dec', enrollments: 110, completions: 92 },
      { month: 'Jan', enrollments: 140, completions: 115 },
      { month: 'Feb', enrollments: 185, completions: 150 }
    ];

    const categoryDistribution = [
      { name: 'Disaster Management', value: 40 },
      { name: 'Environmental Science', value: 30 },
      { name: 'Digital Skills', value: 30 }
    ];

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalTrainees,
        totalTrainers,
        totalCourses,
        totalEnrollments,
        completionRate
      },
      monthlyEnrollments,
      categoryDistribution,
      users,
      courses,
      feedback
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch admin dashboard data', error: error.message });
  }
};

module.exports = {
  getTraineeDashboard,
  getTrainerDashboard,
  getAdminDashboard
};

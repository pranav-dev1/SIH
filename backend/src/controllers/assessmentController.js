const memoryStore = require('../config/memoryStore');

const getAssessment = (req, res) => {
  try {
    const { courseId } = req.params;
    const assessment = memoryStore.getAssessmentByCourse(courseId);

    if (!assessment) {
      // Generate default assessment if not pre-seeded
      const course = memoryStore.getCourseById(courseId);
      if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found' });
      }

      const defaultAssessment = {
        _id: 'a_' + courseId,
        courseId,
        title: `${course.title} Final Knowledge Assessment`,
        passingScorePercentage: 70,
        questions: [
          {
            id: 'q1',
            question: `What is the key practical objective of ${course.title}?`,
            options: [
              'Theoretical study with no field application',
              'Capacity building, risk reduction, and structured operational execution',
              'Memorizing regulations only',
              'Ignoring standard operating procedures'
            ],
            correctAnswer: 1,
            explanation: 'Capacity building prioritizes practical execution and risk reduction.'
          },
          {
            id: 'q2',
            question: 'Which stakeholder benefit is most emphasized in this framework?',
            options: ['Individual isolation', 'Community resilience & institutional capability', 'Purely commercial gain', 'Delaying emergency responses'],
            correctAnswer: 1,
            explanation: 'Community resilience and institutional capability are central pillars.'
          },
          {
            id: 'q3',
            question: 'What is the recommended approach during an emergency deployment?',
            options: ['Uncoordinated action', 'Standardized Incident Response Protocol & clear team communication', 'Waiting for full perfect information', 'Relying solely on intuition'],
            correctAnswer: 1,
            explanation: 'Standardized protocols ensure coordinated and efficient response.'
          }
        ]
      };

      return res.json({ success: true, assessment: defaultAssessment });
    }

    // Hide correct answers from client during active quiz taking if needed, but return full objects for evaluation review
    res.json({ success: true, assessment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch assessment', error: error.message });
  }
};

const submitAssessment = (req, res) => {
  try {
    const { courseId } = req.params;
    const { answers } = req.body; // Map: { q1: 1, q2: 0, ... } or Array
    const traineeId = req.user.id;

    const course = memoryStore.getCourseById(courseId);
    let assessment = memoryStore.getAssessmentByCourse(courseId);

    if (!assessment) {
      // Fallback evaluation
      assessment = {
        courseId,
        passingScorePercentage: 70,
        questions: [
          { id: 'q1', correctAnswer: 1 },
          { id: 'q2', correctAnswer: 1 },
          { id: 'q3', correctAnswer: 1 }
        ]
      };
    }

    const totalQuestions = assessment.questions.length;
    let correctCount = 0;

    const questionResults = assessment.questions.map(q => {
      const selectedOption = answers ? answers[q.id] : undefined;
      const isCorrect = selectedOption !== undefined && Number(selectedOption) === q.correctAnswer;
      if (isCorrect) correctCount++;
      return {
        id: q.id,
        question: q.question,
        options: q.options,
        selectedOption,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation
      };
    });

    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= (assessment.passingScorePercentage || 70);

    let certificate = null;
    if (passed) {
      // Update enrollment to completed
      const courseTitle = course ? course.title : 'Capacity Building Course';
      memoryStore.updateEnrollmentProgress(traineeId, courseId, ['m1', 'm2', 'm3', 'm4'], 100, 'completed');

      // Issue certificate automatically
      certificate = memoryStore.createCertificate({
        traineeId,
        traineeName: req.user.name,
        courseId,
        courseName: courseTitle
      });

      // Send notification
      memoryStore.addNotification(
        traineeId,
        'Congratulations! Certificate Available',
        `You passed the assessment for "${courseTitle}" with ${percentage}%. Your digital certificate is ready!`,
        'certificate'
      );
    }

    res.json({
      success: true,
      result: {
        scorePercentage: percentage,
        totalQuestions,
        correctCount,
        incorrectCount: totalQuestions - correctCount,
        passed,
        passingScore: assessment.passingScorePercentage || 70,
        questionResults,
        certificate
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to submit assessment', error: error.message });
  }
};

const saveAssessment = (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, passingScorePercentage, questions } = req.body;

    const assessment = memoryStore.saveAssessment(courseId, {
      title,
      passingScorePercentage: passingScorePercentage || 70,
      questions
    });

    res.json({ success: true, message: 'Assessment saved successfully', assessment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to save assessment', error: error.message });
  }
};

module.exports = {
  getAssessment,
  submitAssessment,
  saveAssessment
};

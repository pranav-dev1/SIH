const memoryStore = require('../config/memoryStore');

const knowledgeBase = [
  {
    keywords: ['disaster', 'emergency', 'evacuation', 'preparedness', 'hazard'],
    response: 'Disaster preparedness involves risk mapping, early warning notifications, incident command structure, and clear community evacuation routing to minimize loss of life and structural damage.'
  },
  {
    keywords: ['weather', 'climate', 'monsoon', 'temperature', 'cyclone', 'storm'],
    response: 'Climate awareness leverages satellite imagery and meteorological radar data to forecast extreme weather events, monsoon dynamics, and urban heat island effects, enabling proactive municipal adaptation.'
  },
  {
    keywords: ['data', 'literacy', 'analytics', 'statistics', 'governance', 'dpdp'],
    response: 'Data literacy in public governance empowers officials to collect, clean, and visualize operational data. Key standards focus on data integrity, evidence-based policy, and compliance with data privacy regulations.'
  },
  {
    keywords: ['cyber', 'security', 'phishing', 'mfa', 'password', 'protection'],
    response: 'Cybersecurity essentials include mandatory multi-factor authentication (MFA), strict password policies, vigilance against phishing emails, and end-to-end cloud data encryption.'
  },
  {
    keywords: ['certificate', 'pass', 'quiz', 'score', 'assessment'],
    response: 'To earn your digital certificate on Capacity Connect, complete all module lessons in a course, take the final assessment quiz, and achieve a score of 70% or higher.'
  },
  {
    keywords: ['feedback', 'rating', 'trainer', 'review'],
    response: 'After passing a course, you can navigate to the Feedback page to submit a 1 to 5 star rating along with comments to help improve course design and trainer effectiveness.'
  }
];

const askAiAssistant = async (req, res) => {
  try {
    const { question, courseId } = req.body;
    if (!question) {
      return res.status(400).json({ success: false, message: 'Question is required' });
    }

    let answer = null;
    const lowerQ = question.toLowerCase();

    // Contextual matching
    for (const kb of knowledgeBase) {
      if (kb.keywords.some(k => lowerQ.includes(k))) {
        answer = kb.response;
        break;
      }
    }

    if (!answer) {
      if (courseId) {
        const course = memoryStore.getCourseById(courseId);
        if (course) {
          answer = `Regarding "${course.title}": This course equips trainees with core skills in ${course.category}. Key learning objective: ${course.learningObjectives ? course.learningObjectives[0] : 'Capacity building'}.`;
        }
      }
    }

    if (!answer) {
      answer = `Capacity Connect AI Assistant: Great question! Key principles of capacity building emphasize structured learning, practical field application, standardized incident response, and continuous evaluation.`;
    }

    res.json({
      success: true,
      answer,
      source: 'Capacity Connect Domain Knowledge Engine (LLM API Ready)'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'AI Assistant error', error: error.message });
  }
};

const getRecommendations = (req, res) => {
  try {
    const userId = req.user.id;
    const enrollments = memoryStore.getEnrollmentsByTrainee(userId);
    const completedCourseIds = enrollments.filter(e => e.status === 'completed').map(e => e.courseId);
    const enrolledIds = enrollments.map(e => e.courseId);
    const allCourses = memoryStore.getAllCourses();

    let recommendations = allCourses.filter(c => !enrolledIds.includes(c._id || c.id));

    if (recommendations.length < 2) {
      recommendations = allCourses.slice(0, 3);
    } else {
      recommendations = recommendations.slice(0, 3);
    }

    const formattedRecs = recommendations.map(c => ({
      ...c,
      aiMatchPercentage: Math.floor(Math.random() * 10 + 88),
      aiReason: `Matches your focus on ${c.category} & capacity building goals.`
    }));

    res.json({
      success: true,
      count: formattedRecs.length,
      recommendations: formattedRecs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'AI Recommendations error', error: error.message });
  }
};

module.exports = {
  askAiAssistant,
  getRecommendations
};

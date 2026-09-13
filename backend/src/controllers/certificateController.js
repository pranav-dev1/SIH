const memoryStore = require('../config/memoryStore');

const getMyCertificates = (req, res) => {
  try {
    const traineeId = req.user.id;
    const certificates = memoryStore.getCertificatesByTrainee(traineeId);
    res.json({ success: true, count: certificates.length, certificates });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch certificates', error: error.message });
  }
};

const getCertificateById = (req, res) => {
  try {
    const { id } = req.params;
    const cert = memoryStore.getCertificateById(id);

    if (!cert) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    res.json({ success: true, certificate: cert });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch certificate', error: error.message });
  }
};

const generateCertificate = (req, res) => {
  try {
    const { courseId } = req.body;
    const traineeId = req.user.id;

    const course = memoryStore.getCourseById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const cert = memoryStore.createCertificate({
      traineeId,
      traineeName: req.user.name,
      courseId,
      courseName: course.title
    });

    res.status(201).json({ success: true, message: 'Certificate generated', certificate: cert });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to generate certificate', error: error.message });
  }
};

module.exports = {
  getMyCertificates,
  getCertificateById,
  generateCertificate
};

const memoryStore = require('../config/memoryStore');

const getNotifications = (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = memoryStore.getNotificationsByUser(userId);
    res.json({ success: true, count: notifications.length, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch notifications', error: error.message });
  }
};

const markRead = (req, res) => {
  try {
    const { id } = req.params;
    const notif = memoryStore.markNotificationRead(id);
    res.json({ success: true, notification: notif });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update notification', error: error.message });
  }
};

module.exports = {
  getNotifications,
  markRead
};

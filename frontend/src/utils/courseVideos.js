export const PLAYABLE_VIDEOS = [
  { url: 'https://media.w3.org/2010/05/sintel/trailer.mp4', title: 'Hazard Risk Reduction Briefing' },
  { url: 'https://media.w3.org/2010/05/bunny/trailer.mp4', title: 'Early Warning Systems Walkthrough' },
  { url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', title: 'Evacuation Routing Demonstration' },
  { url: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Shelter and Relief Logistics' },
  { url: 'https://filesamples.com/samples/video/mp4/sample_640x360.mp4', title: 'Post-Disaster Damage Audit' },
  { url: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4', title: 'Public Health in Relief Camps' },
  { url: 'https://media.w3.org/2010/05/bunny/movie.mp4', title: 'Certification Review Session' },
  { url: 'https://media.w3.org/2010/05/video/movie_300.mp4', title: 'Meteorology Fundamentals' },
  { url: 'https://filesamples.com/samples/video/mp4/sample_960x540.mp4', title: 'Monsoon and Cyclone Tracking' },
  { url: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', title: 'Urban Climate Action Plans' },
  { url: 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4', title: 'Climate Adaptation Recap' },
  { url: 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4', title: 'Data-Driven Decision Making' },
  { url: 'https://samplelib.com/lib/preview/mp4/sample-20s.mp4', title: 'Data Privacy and DPDP Basics' },
  { url: 'https://samplelib.com/lib/preview/mp4/sample-30s.mp4', title: 'Governance Data Evaluation' },
  { url: 'https://filesamples.com/samples/video/mp4/sample_1280x720.mp4', title: 'Cybersecurity Threat Landscape' },
  { url: 'https://filesamples.com/samples/video/mp4/sample_1920x1080.mp4', title: 'Secure Cloud Collaboration' },
  { url: 'https://filesamples.com/samples/video/mp4/sample_960x400_ocean_with_audio.mp4', title: 'Phishing Prevention Drill' },
  { url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4', title: 'Circular Economy Principles' }
];

const LESSON_VIDEO_INDEX = {
  'c_disaster_101:l1': 0,
  'c_disaster_101:l2': 1,
  'c_disaster_101:l3': 2,
  'c_disaster_101:l3b': 3,
  'c_disaster_101:l4': 4,
  'c_disaster_101:l4b': 5,
  'c_disaster_101:l5': 6,
  'c_weather_102:l1': 7,
  'c_weather_102:l1b': 8,
  'c_weather_102:l2': 9,
  'c_weather_102:l3': 10,
  'c_data_103:l1': 11,
  'c_data_103:l1b': 12,
  'c_data_103:l2': 13,
  'c_digital_104:l1': 14,
  'c_digital_104:l1b': 15,
  'c_digital_104:l2': 16,
  'c_env_105:l1': 17,
  'c_env_105:l1b': 8,
  'c_env_105:l2': 9
};

export const resolveLessonVideo = (course, lesson, moduleIndex = 0, lessonIndex = 0) => {
  const courseId = course?._id || course?.id || '';
  const lessonId = lesson?.id || '';
  const mappedIndex = LESSON_VIDEO_INDEX[`${courseId}:${lessonId}`];
  const fallbackIndex = (moduleIndex * 3 + lessonIndex) % PLAYABLE_VIDEOS.length;
  const video = PLAYABLE_VIDEOS[Number.isInteger(mappedIndex) ? mappedIndex : fallbackIndex];

  return {
    url: video.url,
    title: lesson?.videoTitle || lesson?.title || video.title
  };
};

export const videoForTrainerModule = (category, moduleIndex) => {
  const start = category === 'Digital Skills' ? 14 : category === 'Environmental Science' ? 17 : 0;
  return PLAYABLE_VIDEOS[(start + moduleIndex) % PLAYABLE_VIDEOS.length];
};

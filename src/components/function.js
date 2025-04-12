export const formatTime = (value) => {
  return value < 10 ? `0${value}` : value;
};

export const vibrate = (pattern) => {
  if (navigator.vibrate) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {
      console.error('Vibration failed:', e);
    }
  } else {
    console.log('Vibration API is not supported on your device');
  }
};

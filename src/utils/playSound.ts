const playAppleStyleRewardSound = () => {
  const context = new AudioContext();

  const playTone = (
    freq: number,
    start: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume = 0.15,
  ) => {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, context.currentTime + start);

    gainNode.gain.setValueAtTime(volume, context.currentTime + start);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      context.currentTime + start + duration,
    ); // 渐弱回音

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start(context.currentTime + start);
    oscillator.stop(context.currentTime + start + duration);
  };

  // Apple风格三音上扬，尾音稍长带渐弱
  playTone(880, 0, 0.12, 'triangle'); // A5
  playTone(1047, 0.15, 0.12, 'triangle'); // C6
  playTone(1318, 0.3, 0.4, 'triangle'); // E6，尾音稍长有回音感
};

export default playAppleStyleRewardSound;

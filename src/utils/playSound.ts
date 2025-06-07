const playAppleStyleRewardSound = (times = 3, interval = 500) => {
  let count = 0;

  const playOnce = () => {
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
      );

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.start(context.currentTime + start);
      oscillator.stop(context.currentTime + start + duration);
    };

    playTone(880, 0, 0.12, 'triangle');
    playTone(1047, 0.15, 0.12, 'triangle');
    playTone(1318, 0.3, 0.4, 'triangle');
  };

  const playLoop = () => {
    if (count < times) {
      playOnce();
      count++;
      setTimeout(playLoop, interval);
    }
  };

  playLoop();
};

export default playAppleStyleRewardSound;

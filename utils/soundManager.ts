// Sound Manager Utility
// Handles all sound effects throughout the application

interface SoundOptions {
  volume?: number;
  duration?: number;
  type?: OscillatorType;
}

class SoundManager {
  private audioContext: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  private playTone(frequency: number, options: SoundOptions = {}) {
    if (this.isMuted || !this.audioContext) return;

    const {
      volume = 0.15,
      duration = 0.2,
      type = 'sine'
    } = options;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (error) {
      console.log('Audio playback error:', error);
    }
  }

  // Magical sparkle sound (for cursor trail, confetti)
  playSparkle() {
    if (this.isMuted || !this.audioContext) return;

    const frequencies = [800, 1200, 1600];
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        this.playTone(freq, { volume: 0.08, duration: 0.15, type: 'sine' });
      }, index * 40);
    });
  }

  // Success/unlock sound (for password unlock)
  playSuccess() {
    if (this.isMuted || !this.audioContext) return;

    const melody = [
      { freq: 523.25, delay: 0 },     // C5
      { freq: 659.25, delay: 100 },   // E5
      { freq: 783.99, delay: 200 },   // G5
      { freq: 1046.50, delay: 300 },  // C6
    ];

    melody.forEach(({ freq, delay }) => {
      setTimeout(() => {
        this.playTone(freq, { volume: 0.2, duration: 0.3, type: 'sine' });
      }, delay);
    });
  }

  // Button hover sound
  playHover() {
    this.playTone(600, { volume: 0.1, duration: 0.1, type: 'sine' });
  }

  // Button click sound
  playClick() {
    this.playTone(800, { volume: 0.15, duration: 0.15, type: 'sine' });
  }

  // Romantic whoosh sound (for page transitions)
  playWhoosh() {
    if (this.isMuted || !this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();

      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.type = 'sawtooth';
      filter.type = 'lowpass';

      const now = this.audioContext.currentTime;

      oscillator.frequency.setValueAtTime(200, now);
      oscillator.frequency.exponentialRampToValueAtTime(50, now + 0.5);

      filter.frequency.setValueAtTime(2000, now);
      filter.frequency.exponentialRampToValueAtTime(100, now + 0.5);

      gainNode.gain.setValueAtTime(0.15, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

      oscillator.start(now);
      oscillator.stop(now + 0.5);
    } catch (error) {
      console.log('Whoosh sound error:', error);
    }
  }

  // Heart beat sound
  playHeartbeat() {
    if (this.isMuted || !this.audioContext) return;

    const beat = () => {
      this.playTone(100, { volume: 0.2, duration: 0.1, type: 'sine' });
      setTimeout(() => {
        this.playTone(80, { volume: 0.15, duration: 0.1, type: 'sine' });
      }, 100);
    };

    beat();
  }

  // Confetti pop sound
  playPop() {
    if (this.isMuted || !this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(100, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1000, this.audioContext.currentTime + 0.05);

      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.15);
    } catch (error) {
      console.log('Pop sound error:', error);
    }
  }

  // Gentle chime (for card flip, navigation)
  playChime() {
    if (this.isMuted || !this.audioContext) return;

    const notes = [523.25, 659.25, 783.99]; // C, E, G
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, { volume: 0.12, duration: 0.4, type: 'sine' });
      }, i * 80);
    });
  }

  // Romantic shimmer (for love letter appearance)
  playShimmer() {
    if (this.isMuted || !this.audioContext) return;

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const freq = 1000 + Math.random() * 1000;
        this.playTone(freq, { volume: 0.08, duration: 0.2, type: 'triangle' });
      }, i * 100);
    }
  }

  // Soft ding (for memory navigation)
  playDing() {
    this.playTone(1200, { volume: 0.15, duration: 0.3, type: 'sine' });
  }

  // Error/wrong password sound
  playError() {
    this.playTone(200, { volume: 0.2, duration: 0.3, type: 'square' });
  }

  // Ambient background music note
  playAmbientNote() {
    if (this.isMuted || !this.audioContext) return;

    const frequencies = [261.63, 329.63, 392.00, 523.25]; // C, E, G, C
    const randomFreq = frequencies[Math.floor(Math.random() * frequencies.length)];
    
    this.playTone(randomFreq, { volume: 0.05, duration: 2, type: 'sine' });
  }
}

export const soundManager = new SoundManager();
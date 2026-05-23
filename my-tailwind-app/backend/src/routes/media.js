import express from 'express';

const router = express.Router();

// Generate a 1-second 440Hz sine WAV on the fly for demo audio
router.get('/demo/audio-sample', (req, res) => {
  const sampleRate = 44100;
  const durationSec = 1;
  const freq = 440;
  const numSamples = sampleRate * durationSec;
  const amplitude = 0.25 * 32767; // 25% volume

  const buffer = Buffer.alloc(44 + numSamples * 2);

  // WAV header
  buffer.write('RIFF', 0); // ChunkID
  buffer.writeUInt32LE(36 + numSamples * 2, 4); // ChunkSize
  buffer.write('WAVE', 8); // Format
  buffer.write('fmt ', 12); // Subchunk1ID
  buffer.writeUInt32LE(16, 16); // Subchunk1Size
  buffer.writeUInt16LE(1, 20); // AudioFormat (PCM)
  buffer.writeUInt16LE(1, 22); // NumChannels
  buffer.writeUInt32LE(sampleRate, 24); // SampleRate
  buffer.writeUInt32LE(sampleRate * 2, 28); // ByteRate
  buffer.writeUInt16LE(2, 32); // BlockAlign
  buffer.writeUInt16LE(16, 34); // BitsPerSample
  buffer.write('data', 36); // Subchunk2ID
  buffer.writeUInt32LE(numSamples * 2, 40); // Subchunk2Size

  // PCM samples
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const sample = Math.round(amplitude * Math.sin(2 * Math.PI * freq * t));
    buffer.writeInt16LE(sample, 44 + i * 2);
  }

  res.set('Content-Type', 'audio/wav');
  res.set('Cache-Control', 'public, max-age=31536000');
  res.send(buffer);
});

export default router;

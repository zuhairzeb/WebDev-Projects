import { useEffect } from "react";
import { useWorld, getWorld, setWorld } from "../../world/store";
let audio: AudioContext | null = null;
function tone(frequency: number, duration = 0.14, volume = 0.12) {
  if (
    !audio ||
    audio.state !== "running" ||
    document.hidden ||
    getWorld().paused
  )
    return;
  const ctx = audio,
    osc = ctx.createOscillator(),
    gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration + 0.02);
  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
  };
}
export async function toggleWorldSound() {
  if (getWorld().sound) {
    setWorld({ sound: false });
    await audio?.suspend();
    return;
  }
  try {
    audio ??= new AudioContext();
    await audio.resume();
    setWorld({ sound: audio.state === "running" });
    tone(660, 0.2, 0.16);
  } catch {
    setWorld({ sound: false });
  }
}
export function WorldAudio() {
  const s = useWorld();
  useEffect(() => {
    if (!s.sound) return;
    tone(s.isMoving ? 440 : 660, 0.12, 0.09);
    const interval = setInterval(() => {
      if (getWorld().isMoving) tone(180, 0.11, 0.14);
    }, 330);
    return () => clearInterval(interval);
  }, [s.sound, s.isMoving, s.targetZone]);
  useEffect(
    () => () => {
      void audio?.close();
      audio = null;
    },
    [],
  );
  return null;
}

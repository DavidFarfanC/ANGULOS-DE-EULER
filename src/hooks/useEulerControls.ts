import { useEffect, useMemo, useRef, useState } from 'react';

type Angles = { pitch: number; roll: number; yaw: number };

const clampDeg = (value: number) => Math.max(-180, Math.min(180, value));
const wrapDeg = (value: number) => {
  if (value > 180) return value - 360;
  if (value < -180) return value + 360;
  return value;
};

export const useEulerControls = (initial: Angles = { pitch: 0, roll: 0, yaw: 0 }) => {
  const [angles, setAngles] = useState<Angles>(initial);
  const [auto, setAuto] = useState(false);
  const rafRef = useRef<number>();

  const radians = useMemo(
    () => ({
      pitch: (angles.pitch * Math.PI) / 180,
      roll: (angles.roll * Math.PI) / 180,
      yaw: (angles.yaw * Math.PI) / 180,
    }),
    [angles],
  );

  const updateAngle = (key: keyof Angles, value: number) => {
    setAngles((prev) => ({ ...prev, [key]: clampDeg(value) }));
  };

  const reset = () => setAngles(initial);

  // Set all angles at once (used by presets). Stops auto-animation.
  const setAll = (a: Angles) => {
    setAuto(false);
    setAngles({
      pitch: clampDeg(a.pitch),
      roll: clampDeg(a.roll),
      yaw: clampDeg(a.yaw),
    });
  };

  // Whether pitch is close to ±90° (gimbal lock risk zone)
  const isGimbalLock = Math.abs(angles.pitch) >= 85;

  useEffect(() => {
    if (!auto) return;
    const tick = () => {
      setAngles((prev) => ({
        pitch: wrapDeg(prev.pitch + 0.3),
        roll: wrapDeg(prev.roll + 0.22),
        yaw: wrapDeg(prev.yaw + 0.38),
      }));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [auto]);

  return {
    angles,
    radians,
    isGimbalLock,
    setPitch: (v: number) => updateAngle('pitch', v),
    setRoll: (v: number) => updateAngle('roll', v),
    setYaw: (v: number) => updateAngle('yaw', v),
    setAll,
    reset,
    auto,
    toggleAuto: () => setAuto((v) => !v),
  };
};

export type EulerControlState = ReturnType<typeof useEulerControls>;

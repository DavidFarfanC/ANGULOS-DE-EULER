export interface EulerPreset {
  id: string;
  label: string;
  pitch: number;
  roll: number;
  yaw: number;
  description: string;
  color: string;
  warning?: string;
}

export const PRESETS: EulerPreset[] = [
  {
    id: 'neutral',
    label: 'Neutro',
    pitch: 0,
    roll: 0,
    yaw: 0,
    color: '#94a3b8',
    description: 'Posición de referencia — ejes alineados',
  },
  {
    id: 'climb',
    label: 'Ascenso',
    pitch: 25,
    roll: 0,
    yaw: 0,
    color: '#ef4444',
    description: 'Pitch +25° — nariz hacia arriba',
  },
  {
    id: 'coordinated',
    label: 'Viraje',
    pitch: 5,
    roll: 30,
    yaw: 20,
    color: '#3b82f6',
    description: 'Viraje coordinado estándar',
  },
  {
    id: 'aggressive',
    label: 'Maniobra',
    pitch: -35,
    roll: 70,
    yaw: -40,
    color: '#a78bfa',
    description: 'Alta carga G — actitud extrema',
  },
  {
    id: 'gimbal',
    label: 'Gimbal Lock',
    pitch: 90,
    roll: 0,
    yaw: 0,
    color: '#f97316',
    description: 'Pitch = 90° → los ejes yaw y roll se alinean',
    warning: '⚠ Gimbal lock activo — perdido un grado de libertad',
  },
];

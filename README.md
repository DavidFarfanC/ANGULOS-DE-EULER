# Ángulos de Euler — Experiencia Web Interactiva

Una single-page experience de nivel premium construida con **React + Tailwind CSS** que convierte una presentación académica sobre ángulos de Euler en una experiencia narrativa, visual e interactiva de alto impacto.

---

## Stack

| Herramienta | Versión | Rol |
|---|---|---|
| React | 18 | Framework UI |
| Vite | 5 | Bundler / dev server |
| TypeScript | 5 | Tipado estático |
| Tailwind CSS | 3 | Diseño utilitario |
| Framer Motion | 11 | Animaciones de scroll y microinteracciones |
| Three.js | 0.164 | Motor 3D |
| @react-three/fiber | 8 | React → Three.js (pinado a v8 por compatibilidad React 18) |
| @react-three/drei | 9 | OrbitControls, Grid, Html helpers |

---

## Correr el proyecto

```bash
npm install
npm run dev      # → http://localhost:5173
npm run build    # build de producción
npm run preview  # servir el build
```

> Node.js ≥ 18 requerido.

---

## Arquitectura

```
src/
│
├── lib/
│   └── presets.ts              # Configuraciones de ángulos predefinidas (Neutro, Ascenso, Viraje, Gimbal Lock...)
│
├── hooks/
│   └── useEulerControls.ts     # Estado global: angles, radians, isGimbalLock, setAll, toggleAuto
│
├── components/
│   ├── AircraftModel.tsx        # Avión 3D geométrico + interpolación slerp
│   ├── AxesHelper.tsx           # Flechas 3D para ejes X/Y/Z con labels Html
│   ├── ControlsPanel.tsx        # Sliders pitch/roll/yaw + preset buttons + warning gimbal lock
│   ├── EulerVisualizer.tsx      # Canvas R3F (cámara, luces, grid, modelo)
│   │
│   ├── RotationComparison.tsx   # ★ Comparador interactivo: dos cubos CSS 3D, paso a paso
│   ├── GimbalDemo.tsx           # ★ Demo SVG animado: 3 vectores → 2 vectores al bloquearse
│   ├── MatrixDisplay.tsx        # ★ Matrices de rotación con tabs y brackets CSS elegantes
│   │
│   ├── GlassCard.tsx            # Card glassmorphism reutilizable
│   ├── SectionHeading.tsx       # Encabezado de sección con eyebrow + animación viewport
│   ├── EquationBlock.tsx        # Bloque monoespaciado (legacy, reemplazado por MatrixDisplay)
│   ├── AnimatedDivider.tsx      # Divisor gradiente animado
│   ├── NavDots.tsx              # Navegación lateral con tooltips (desktop)
│   ├── ScrollProgress.tsx       # Barra de progreso de lectura en la parte superior
│   └── ParticlesBackground.tsx  # Canvas 2D: partículas con repulsión al mouse (optimizado)
│
└── sections/
    ├── Hero.tsx          # Apertura con anillos de cardán CSS 3D + partículas
    ├── Intro.tsx         # ¿Qué son los ángulos de Euler?
    ├── RollPitchYaw.tsx  # Cards: definición de cada eje de rotación
    ├── Visualizer.tsx    # Visualizador 3D + ControlsPanel con presets
    ├── Orden.tsx         # Comparación interactiva de secuencias de rotación
    ├── Aplicaciones.tsx  # Drones / Satélites / Robótica / IMU con datos técnicos
    ├── Matematicas.tsx   # Matrices de rotación con tabs interactivos
    ├── Gimbal.tsx        # Demo de gimbal lock con SVG animado
    └── Cierre.tsx        # Síntesis: intuitivos · poderosos · limitados
```

---

## Experiencias interactivas clave

### Visualizador 3D (`EulerVisualizer` + `ControlsPanel`)
- Avión geométrico 3D con materiales metálicos y suavizado via `quaternion.slerp()`
- Sliders para Pitch (X), Roll (Z), Yaw (Y) en rango −180° → +180°
- **Preset buttons**: Neutro, Ascenso, Viraje coordinado, Maniobra agresiva, Gimbal Lock
- **Warning automático** cuando Pitch ≈ ±90° (gimbal lock activo)
- **Animación automática**: los tres ejes rotan continuamente via RAF
- OrbitControls para navegar la cámara; drag/pinch en mobile

### Comparación de orden de rotación (`RotationComparison`)
- Dos cubos CSS 3D lado a lado: **Secuencia A** (Yaw→Pitch→Roll) vs **Secuencia B** (Roll→Pitch→Yaw)
- Paso a paso (0 → 3) con botones "Reproducir / Pausar / Anterior / Siguiente"
- Las caras del cubo están coloreadas por eje (azul=FRONT, verde=UP, rojo=RIGHT) para seguir visualmente la rotación
- Al completar los 3 pasos, aparece un banner comparativo: **"Orientación A ≠ Orientación B"**
- Demuestra sin texto la no conmutatividad de las rotaciones 3D

### Demo de Gimbal Lock (`GimbalDemo`)
- Tres vectores de eje (Yaw/Verde, Pitch/Rojo, Roll/Azul) en un diagrama SVG
- Botón **"Aplicar Gimbal Lock"**: el vector Roll se anima y se alinea con el vector Yaw via Framer Motion
- Contador de DoF: "3 DoF → 2 DoF efectivos" en tiempo real
- Estado restaurable con "Restaurar 3 DoF"
- Cierre con teaser a cuaterniones

### Matrices de rotación (`MatrixDisplay`)
- Tabs para Pitch (Rₓ), Yaw (Rᵧ), Roll (R_z), y Combinada
- Matrices renderizadas en CSS con brackets tipográficos elegantes
- Código de colores por eje; badges de propiedades (Ortogonal, det=1, Rᵀ=R⁻¹)
- Explicación contextual por eje

---

## Cómo funciona el sistema de rotación

### `useEulerControls` — hook central
```ts
const { angles, radians, isGimbalLock, setPitch, setRoll, setYaw, setAll, reset, auto, toggleAuto } = useEulerControls();
```
- `angles`: grados (−180 → +180), con `clampDeg`
- `radians`: memoizado para Three.js
- `isGimbalLock`: true cuando `|pitch| ≥ 85°`
- `setAll(angles)`: recibe un preset completo y detiene la auto-animación
- `toggleAuto`: animación RAF continua usando `wrapDeg`

### Avión 3D — `AircraftModel`
El avión apunta hacia **+Z** (convenio aeroespacial):
```ts
const euler = new Euler(radians.pitch, radians.yaw, radians.roll, 'XYZ');
targetQuat.setFromEuler(euler);
// en useFrame:
groupRef.current.quaternion.slerp(targetQuat, 0.12);
```

### CSS 3D en `RotationComparison`
Los cubos usan `transform-style: preserve-3d` con rotaciones intrínsecas CSS:
- Seq A: `rotateY(60deg) rotateX(45deg) rotateZ(30deg)` — YXZ
- Seq B: `rotateZ(30deg) rotateX(45deg) rotateY(60deg)` — ZXY
- CSS aplica de izquierda a derecha = rotaciones intrínsecas acumuladas ✓

---

## Performance

- **Partículas**: throttle de 80ms en mousemove; `IntersectionObserver` pausa el RAF cuando la sección hero no es visible; count reducido en dispositivos con ≤4 núcleos
- **Canvas R3F**: `dpr=[1, 1.8]`, fog activo, damping en OrbitControls
- **Framer Motion**: todas las animaciones usan `viewport: { once: true }` — no re-disparan
- **prefers-reduced-motion**: CSS rule deshabilita animaciones en usuarios con accesibilidad configurada

---

## Mejoras futuras

- Lazy-load del Canvas R3F con `React.lazy` para mejorar LCP
- Modo HUD: mostrar la matriz de rotación actual en tiempo real en el visualizador
- Modo gimbal lock visual en el propio canvas 3D (tres anillos concéntricos)
- Comparador lado a lado en el visualizador (dos instancias del avión con distintos órdenes)
- KaTeX para las matrices si se requiere compatibilidad con pantallas de impresión
- Exportar orientación como cuaternión o JSON
- Tests E2E con Playwright para las interacciones principales

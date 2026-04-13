# Changelog

---

## [2.0.0] — 2026-04-13 — Iteración Premium

### Added — Nuevos componentes

- **`RotationComparison`**: comparador interactivo de orden de rotación. Dos cubos CSS 3D (Secuencia A: Yaw→Pitch→Roll vs Secuencia B: Roll→Pitch→Yaw) con animación paso a paso, controles Reproducir/Pausar/Anterior/Siguiente, y banner final que muestra "Orientación A ≠ Orientación B". Demuestra la no conmutatividad sin necesidad de texto explicativo.

- **`GimbalDemo`**: visualización SVG animada del gimbal lock. Tres vectores de eje coloreados por eje; al pulsar "Aplicar Gimbal Lock" el vector Roll se anima via Framer Motion hasta alinearse con Yaw. Contador de DoF en tiempo real (3 → 2). Restaurable. Incluye teaser a cuaterniones.

- **`MatrixDisplay`**: matrices de rotación con tabs (Rₓ Pitch / Rᵧ Yaw / R_z Roll / Combinada). Brackets CSS tipográficos elegantes, código de color por eje, badges de propiedades ortogonales, explicación contextual. Sin dependencia de KaTeX.

- **`ScrollProgress`**: barra de progreso de lectura fija en el top, gradiente teal→indigo→naranja.

- **`src/lib/presets.ts`**: configuraciones de ángulos predefinidas (Neutro, Ascenso, Viraje, Maniobra agresiva, Gimbal Lock) con metadatos de color, descripción y warning.

### Added — Nuevas funcionalidades

- **Preset buttons** en `ControlsPanel`: cinco botones de acceso rápido que aplican orientaciones predefinidas con una sola pulsación. El preset activo se resalta con el color del eje.

- **Gimbal lock warning** en `ControlsPanel`: banner animado (Framer Motion AnimatePresence) que aparece automáticamente cuando `|pitch| ≥ 85°`.

- **`isGimbalLock`** en `useEulerControls`: flag calculado en el hook; accesible en cualquier componente sin lógica duplicada.

- **`setAll(angles)`** en `useEulerControls`: método para establecer los tres ángulos en una sola llamada y detener la auto-animación (usado por presets).

- **NavDots con tooltips**: cada punto de navegación muestra el nombre de la sección al hacer hover.

- **Scroll indicator** en Hero: flecha pulsante con gradiente que invita a hacer scroll.

- **Axis color chips** en Hero: tres badges (Pitch/Rojo, Roll/Azul, Yaw/Verde) que presentan el mapa de colores antes de llegar al visualizador.

### Improved — Secciones

- **Hero**: la visual central ahora muestra tres anillos de cardán CSS 3D animados (un anillo por eje de rotación: verde/yaw, rojo/pitch, azul/roll). Los anillos rotan en sentidos opuestos a distintas velocidades. Conecta visualmente con el tema desde la primera impresión. Añadidos labels de eje, footer informativo y CTA directo al visualizador.

- **Orden**: reemplazadas las cards de texto estático por el componente `RotationComparison` interactivo.

- **Gimbal**: reemplazado texto + caja decorativa por el componente `GimbalDemo` con visualización interactiva real.

- **Matemáticas**: reemplazados los bloques `<pre>` por `MatrixDisplay` con tabs, brackets CSS y contexto matemático.

- **Aplicaciones**: cards enriquecidas con iconos SVG inline, tags de caso de uso, animación `whileHover` de elevación, glow radial en hover, y dato técnico específico por aplicación (frecuencia de FC, precisión de satélite, stack ROS, precisión IMU).

- **Cierre**: tres pilares (Intuitivos / Poderosos / Limitados), cita editorial, CTAs mejorados.

- **NavDots**: tooltips de label de sección en hover; orden actualizado para reflejar nuevo flujo pedagógico (RollPitchYaw antes del Visualizador).

### Improved — Componentes técnicos

- **`ControlsPanel`**: añadidos preset buttons, warning de gimbal lock animado con AnimatePresence, legend chips de eje, mejor jerarquía visual.

- **`ParticlesBackground`**: throttle de 80ms en mousemove (evita saturar el main thread); `IntersectionObserver` que pausa el RAF cuando el hero no es visible; `ResizeObserver` reemplaza listener de resize window; partículas reducidas dinámicamente en dispositivos con ≤4 núcleos de CPU; velocidad máxima clampeada a 1.2 px/frame para evitar jitter.

- **`index.css`**: touch target ampliado (padding trick en slider, 22×22px para el thumb); regla `@prefers-reduced-motion` añadida; sección padding reducida en mobile (72px en lugar de 120px).

### Fixed

- `App.tsx`: orden de secciones ajustado a flujo pedagógico óptimo: Intro → RollPitchYaw → Visualizador → Orden → Aplicaciones → Matemáticas → Gimbal → Cierre.

---

## [1.2.0] — 2026-04-13 — Infraestructura 3D

### Fixed
- Instaladas dependencias faltantes: `three`, `@react-three/fiber` (v8), `@react-three/drei`.
- `@react-three/fiber` pinado a v8 (v9 requiere React 19; el proyecto usa React 18).
- Añadido `src/r3f.d.ts` para registrar tipos JSX de R3F (`group`, `mesh`, geometrías, etc.).
- `tsconfig.json` extendido con `"three"` en la lista de types.
- `AircraftModel` reescrito: fuselaje alineado en Z, nariz correctamente orientada y rotada, motor nacelles añadidos.
- `EulerVisualizer`: altura explícita en wrapper para que el Canvas renderice.

### Added
- `ControlsPanel`: progress bar por slider, auto-animación toggle mejorado.
- `AxesHelper`: flechas 3D (cilindro + cono) reemplazando `<Line>` primitivas.

---

## [1.0.0] — Base inicial

### Added
- Landing page completa: Hero, Intro, RollPitchYaw, Orden, Aplicaciones, Matemáticas, Gimbal, Cierre.
- Fondo de partículas interactivo con repulsión al mouse.
- Glassmorphism cards, divisores animados, NavDots.
- Sección de matemáticas con matrices de rotación.
- Responsive design mobile-first.

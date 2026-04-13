import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import EulerVisualizer from '../components/EulerVisualizer';
import ControlsPanel from '../components/ControlsPanel';
import { useEulerControls } from '../hooks/useEulerControls';

const Visualizer = () => {
  const controls = useEulerControls();

  return (
    <section id="visualizador" className="section">
      <div className="section-narrow flex flex-col gap-10">
        <SectionHeading
          eyebrow="Interactivo"
          title="Visualizador 3D — controla roll, pitch y yaw"
          subtitle="Mueve los sliders y observa cómo la orientación del avión cambia en tiempo real. Prueba distintas combinaciones para ver que el orden de rotaciones sí importa."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-6 lg:grid lg:grid-cols-[1.5fr_1fr] lg:items-stretch"
        >
          {/* 3-D canvas — explicit height so the Canvas fills its parent */}
          <div className="h-[420px] lg:h-[540px]">
            <EulerVisualizer controls={controls} />
          </div>

          {/* Controls */}
          <ControlsPanel controls={controls} />
        </motion.div>
      </div>
    </section>
  );
};

export default Visualizer;

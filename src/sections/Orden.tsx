import SectionHeading from '../components/SectionHeading';
import RotationComparison from '../components/RotationComparison';

const Orden = () => (
  <section id="orden" className="section">
    <div className="section-narrow flex flex-col gap-10">
      <SectionHeading
        eyebrow="No conmutativo"
        title="En 3D, el orden lo cambia todo"
        subtitle="Los mismos tres ángulos — Yaw 60°, Pitch 45°, Roll 30° — aplicados en distinto orden producen orientaciones finales completamente diferentes. Observa la demostración paso a paso."
      />
      <RotationComparison />
    </div>
  </section>
);

export default Orden;

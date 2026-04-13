import SectionHeading from '../components/SectionHeading';
import GimbalDemo from '../components/GimbalDemo';

const Gimbal = () => (
  <section id="gimbal" className="section">
    <div className="section-narrow flex flex-col gap-10">
      <SectionHeading
        eyebrow="Limitación fundamental"
        title="Gimbal lock — cuando el sistema pierde libertad"
        subtitle="Existe una configuración donde los ángulos de Euler fallan: cuando dos ejes de rotación se alinean, el sistema pierde un grado de libertad y no puede representar ciertas orientaciones de forma única."
      />
      <GimbalDemo />
    </div>
  </section>
);

export default Gimbal;

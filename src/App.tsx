import Hero from './sections/Hero';
import TeamInfoSection from './sections/TeamInfoSection';
import Intro from './sections/Intro';
import EulerBiographySection from './sections/EulerBiographySection';
import RollPitchYaw from './sections/RollPitchYaw';
import Visualizer from './sections/Visualizer';
import Orden from './sections/Orden';
import Aplicaciones from './sections/Aplicaciones';
import Matematicas from './sections/Matematicas';
import Gimbal from './sections/Gimbal';
import Cierre from './sections/Cierre';
import NavDots from './components/NavDots';
import ScrollProgress from './components/ScrollProgress';
import FloatingQR from './components/FloatingQR';

const App = () => (
  <div className="relative min-h-screen bg-ink text-mist">
    <ScrollProgress />
    <NavDots />
    <FloatingQR />
    <Hero />
    <TeamInfoSection />
    <Intro />
    <EulerBiographySection />
    <RollPitchYaw />
    <Visualizer />
    <Orden />
    <Aplicaciones />
    <Matematicas />
    <Gimbal />
    <Cierre />
  </div>
);

export default App;

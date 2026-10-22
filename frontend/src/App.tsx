import './App.css';
import { Title } from './components/Title';
import { Navigation } from './components/Navigation';
import { Content } from './components/Content';
import { GameOfLife } from './components/GameOfLife';
import { RetroNotepad } from './components/RetroNotePad';


function App() {
  return (
      <div className="relative h-screen w-screen overflow-hidden bg-black text-white flex flex-col items-center justify-center gap-12 py-6 px-6 select-none">
      <GameOfLife cellSize={20} speedMs={100} cellColor="#ffffff" />
      <div className="flex flex-col items-center justify-center gap-4 z-10">
        <Title />
        <Navigation />
      </div>
      <RetroNotepad/>
      <Content />
    </div>
  );
}

export default App;
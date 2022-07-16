import Game from './components/Game/Game.js';
import Home from './Home.js';
import TShirt from './components/TShirt/TShirt.js';
import Console from './components/Console/Console.js';
function App() {
  return (
    <main className="container">
      <Game />
      <br /><br /><br />      
      <Console />
      <br /><br /><br />
      <TShirt />
       {/* <br /><br /><br />
       <br /><br /><br />
      <Home /> */}
    </main>
  );
}

export default App;

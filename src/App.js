import Game from './Game.js';
import Home from './Home.js';
import TShirt from './TShirt.js';
import Console from './Console.js';
import Invoice from './Invoice.js';
function App() {
  return (
    <main className="container">
       <Home />
      <div><Game /></div>
      <div><Console /></div>
      <div><TShirt /></div>
      <div><Invoice /></div>
       {/* <br /><br /><br />
       <br /><br /><br />
      <Home /> */}
    </main>
  );
}

export default App;

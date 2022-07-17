import Game from './Game.js';
import Home from './Home.js';
import TShirt from './TShirt.js';
import Console from './Console.js';
import Invoice from './Invoice.js';
function App() {
  return (
    <main className="container">
      <div><Invoice /></div>
      <div><Game /></div>
      <br /><br /><br />      
      <div><Console /></div>
      <br /><br /><br />
      <div><TShirt /></div>
       {/* <br /><br /><br />
       <br /><br /><br />
      <Home /> */}
    </main>
  );
}

export default App;

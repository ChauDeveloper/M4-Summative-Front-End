import Game from './components/Game/Game.js';
import Home from './Home.js';
import TShirt from './components/TShirt/TShirt.js';
import Console from './components/Console/Console.js';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";


function App() {
  return (
    <Router>
    <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/game" component={Game} />
    <Route exact path="/console" component={Console} />
    <Route exact path="/tshirt" component={TShirt} />
</Switch>
</Router>
  );
}

export default App;

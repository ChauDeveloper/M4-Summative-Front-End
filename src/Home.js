

const Home = () => {
    return (
      <div>
        <h1 className="text-center">Welcome to DPC's M4-Summative-Project</h1>
        <h2 className="text-center">Check out our inventories:</h2>
        <div className="text-center">
                    <select>
                    <option>Choose inventories</option>
                    <option href="/games">Game</option>
                    <option href="/console">Console</option>
                    <option href="/tshirt">Tshirt</option>
                </select>
                
                </div>
      </div>
    );
  };
  
  export default Home;
function App() {
  return (
    <div className="App">
      <Header/>
      <Footer/>
    </div>
  );
}

function Header() {
  return (
    <div className="container">
      <h1>Hello World!</h1>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, eveniet modi iure maxime quidem laboriosam ratione tenetur neque fuga, esse quis voluptatum? Aliquid reiciendis quasi ipsa temporibus aut. Nesciunt, inventore.</p>
    </div>
  );
}

function Footer () {
  return (
    <div className="footer">
      <p>&copy; TongTong {new Date().getFullYear()}</p>
    </div>
  );
}

export default App;

import algo_logo from "../../assets/images/algorithmia_logo.png";

function Navbar() {
  return (
    <header className="bg-slate-50 p-1">
      <div>
        <img src={algo_logo} alt="algorithma's logo" className="w-12" />
      </div>
      <div>{/* hamburger */}</div>
    </header>
  );
}

export default Navbar;

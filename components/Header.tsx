import { ToggleMode } from "./ToggleMode";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm border-b">
      {/* Logo */}
      <div className="flex justify-between items-center m-4">
        <h1 className="text-4xl font-bold">
          Ash<span className="text-primary">Notes</span>
        </h1>
        <ToggleMode />
      </div>
    </header>
  );
}

export default Header;

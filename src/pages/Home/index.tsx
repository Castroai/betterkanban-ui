import { useNavigate } from "react-router-dom";
import { Button } from "../../components/UI/Button";

export const HomePage = () => {
  const nav = useNavigate();
  return (
    <div>
      <header className="bg-light-secondary text-light-text p-1">
        <div className="container mx-auto py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Better Kanban</h1>
          <Button
            variant="PRIMARY"
            onClick={() => {
              nav("/login");
            }}
          >
            Sign In
          </Button>
        </div>
      </header>
      <section className="bg-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            AI Powered Kanban Board
          </h1>
          <p className="text-lg mb-12">A Smarter way to project manage</p>
          <Button variant="PRIMARY">Get Started</Button>
        </div>
      </section>
    </div>
  );
};

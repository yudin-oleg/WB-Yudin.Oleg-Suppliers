import Navbar from "./Navbar.tsx";
import AddSupplyForm from "./AddSupplyForm.tsx";
import SuppliesList from "./SuppliesList.tsx";
import "./App.css";

function App() {
	return (
		<div className="App">
			<Navbar />
			<div className="main-part">
				<AddSupplyForm />
				<SuppliesList />
			</div>
		</div>
	);
}

export default App;

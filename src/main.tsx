import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store.ts";
// import reportWebVitals from './reportWebVitals';//why

ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement).render(
	// <p>Hello</p>
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

// reportWebVitals();

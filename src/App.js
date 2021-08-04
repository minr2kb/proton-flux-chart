import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import UserChart from "./UserChart";

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [response, setResponse] = useState({});
	const [date1, setDate1] = useState("");
	const [date2, setDate2] = useState("");
	const [date3, setDate3] = useState("");

	useEffect(() => {
		const loadData = async () => {
			const request = await axios.get("http://127.0.0.1:5000");
			setDate1(Object.keys(request.data)[0]);
			setDate2(Object.keys(request.data)[1]);
			setDate3(Object.keys(request.data)[2]);
			setIsLoading(false);
			setResponse(request);
		};
		loadData();
	}, []);

	return (
		<>
			{isLoading ? (
				<div className="loading">Loading...</div>
			) : (
				<div>
					<h1>{date1}</h1>
					<div className="chartWrapper">
						<div className="chartAreaWrapper">
							<UserChart
								data1={response.data.date1["flux10"]}
								data2={response.data.date1["flux30"]}
							/>
						</div>
					</div>
					<h1>{date2}</h1>
					<div className="chartWrapper">
						<div className="chartAreaWrapper">
							<UserChart
								data1={response.data.date2["flux10"]}
								data2={response.data.date2["flux30"]}
							/>
						</div>
					</div>
					<h1>{date3}</h1>
					<div className="chartWrapper">
						<div className="chartAreaWrapper">
							<UserChart
								data1={response.data.date3["flux10"]}
								data2={response.data.date3["flux30"]}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default App;

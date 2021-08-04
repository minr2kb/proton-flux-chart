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
			try {
				const request = await axios.get(
					"https://proton-flux-chart.herokuapp.com/api"
					// "http://10.12.48.132:5000/api"
				);
				console.log(request.data);
				const keys = Object.keys(request.data);

				setDate1(keys[0]);
				setDate2(keys[1]);
				setDate3(keys[2]);
				setResponse(request);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
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
								data1={response.data[date1]["flux10"]}
								data2={response.data[date1]["flux30"]}
							/>
						</div>
					</div>
					<h1>{date2}</h1>
					<div className="chartWrapper">
						<div className="chartAreaWrapper">
							<UserChart
								data1={response.data[date2]["flux10"]}
								data2={response.data[date2]["flux30"]}
							/>
						</div>
					</div>
					<h1>{date3}</h1>
					<div className="chartWrapper">
						<div className="chartAreaWrapper">
							<UserChart
								data1={response.data[date3]["flux10"]}
								data2={response.data[date3]["flux30"]}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default App;

import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import UserChart from "./UserChart";
import timeLabel from "./timeLabel";
import BeatLoader from "react-spinners/BeatLoader";

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [response, setResponse] = useState({});
	const [time, setTime] = useState("");
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
				setDate1(keys[1]);
				setDate2(keys[2]);
				setDate3(keys[3]);
				setTime(request.data["UCTtime"]);
				setResponse(request.data);
				setIsLoading(false);
				setTimeout(async () => await loadData(), 60000);
			} catch (error) {
				console.log(error);
			}
		};
		loadData();
	}, []);

	return (
		<>
			{isLoading ? (
				// <div className="loading">Loading...</div>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100vh",
					}}
				>
					<BeatLoader color={"#36D7B7"} size={18} />
				</div>
			) : (
				<div>
					<h1>
						Real-time Integral Flux of High-energy Solar Protons
					</h1>
					<h2>Last update: {time}(UCT)</h2>
					<h4>
						Provided by the U.S. Dept. of Commerce, NOAA, Space
						Weather Prediction Center
					</h4>
					<h4>Source: ACE Satellite - Solar Isotope Spectrometer</h4>
					<h4>Units: proton flux p/cs2-sec-ster</h4>
					<h4>
						Period: {date1} - {date3}
					</h4>

					<UserChart
						date={date1}
						label={timeLabel}
						data1={response[date1]["flux10"]}
						data2={response[date1]["flux30"]}
					/>
					<UserChart
						date={date2}
						label={timeLabel}
						data1={response[date2]["flux10"]}
						data2={response[date2]["flux30"]}
					/>
					<UserChart
						date={date3}
						label={timeLabel}
						data1={response[date3]["flux10"]}
						data2={response[date3]["flux30"]}
					/>
					<footer
						style={{
							display: "flex",
							justifyContent: "center",
							marginBottom: "2rem",
						}}
					>
						<h4>
							Copyright &copy; 2021 Kyungbae Min. All Rights
							Reserved.
						</h4>
					</footer>
				</div>
			)}
		</>
	);
}

export default App;

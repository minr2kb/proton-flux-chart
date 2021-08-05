import React from "react";
import { Line } from "react-chartjs-2";
import "./App.css";

const UserChart = ({ date, label, data1, data2 }) => {
	return (
		<div style={{ marginTop: "3rem" }}>
			<h2 style={{ marginLeft: "2rem" }}>{date}</h2>
			<div className="chartWrapper">
				<div className="chartAreaWrapper">
					<Line
						data={{
							labels: label,
							datasets: [
								{
									label: "> 10 MeV",
									data: data1,
									fill: false,
									borderColor: "rgb(75, 192, 192)",
									tension: 0,
								},
								{
									label: "> 30 MeV",
									data: data2,
									fill: false,
									borderColor: "rgb(75, 192, 50)",
									tension: 0,
								},
							],
						}}
						width={200}
						height={500}
						options={{ maintainAspectRatio: false }}
						legend={{}}
					/>
				</div>
			</div>
		</div>
	);
};

export default UserChart;

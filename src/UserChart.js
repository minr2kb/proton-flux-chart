import React from "react";
import { Line } from "react-chartjs-2";

const UserChart = ({ data1, data2 }) => {
	const label = [
		0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 100, 105, 110, 115, 120,
		125, 130, 135, 140, 145, 150, 155, 200, 205, 210, 215, 220, 225, 230,
		235, 240, 245, 250, 255, 300, 305, 310, 315, 320, 325, 330, 335, 340,
		345, 350, 355, 400, 405, 410, 415, 420, 425, 430, 435, 440, 445, 450,
		455, 500, 505, 510, 515, 520, 525, 530, 535, 540, 545, 550, 555, 600,
		605, 610, 615, 620, 625, 630, 635, 640, 645, 650, 655, 700, 705, 710,
		715, 720, 725, 730, 735, 740, 745, 750, 755, 800, 805, 810, 815, 820,
		825, 830, 835, 840, 845, 850, 855, 900, 905, 910, 915, 920, 925, 930,
		935, 940, 945, 950, 955, 1000, 1005, 1010, 1015, 1020, 1025, 1030, 1035,
		1040, 1045, 1050, 1055, 1100, 1105, 1110, 1115, 1120, 1125, 1130, 1135,
		1140, 1145, 1150, 1155, 1200, 1205, 1210, 1215, 1220, 1225, 1230, 1235,
		1240, 1245, 1250, 1255, 1300, 1305, 1310, 1315, 1320, 1325, 1330, 1335,
		1340, 1345, 1350, 1355, 1400, 1405, 1410, 1415, 1420, 1425, 1430, 1435,
		1440, 1445, 1450, 1455, 1500, 1505, 1510, 1515, 1520, 1525, 1530, 1535,
		1540, 1545, 1550, 1555, 1600, 1605, 1610, 1615, 1620, 1625, 1630, 1635,
		1640, 1645, 1650, 1655, 1700, 1705, 1710, 1715, 1720, 1725, 1730, 1735,
		1740, 1745, 1750, 1755, 1800, 1805, 1810, 1815, 1820, 1825, 1830, 1835,
		1840, 1845, 1850, 1855, 1900, 1905, 1910, 1915, 1920, 1925, 1930, 1935,
		1940, 1945, 1950, 1955, 2000, 2005, 2010, 2015, 2020, 2025, 2030, 2035,
		2040, 2045, 2050, 2055, 2100, 2105, 2110, 2115, 2120, 2125, 2130, 2135,
		2140, 2145, 2150, 2155, 2200, 2205, 2210, 2215, 2220, 2225, 2230, 2235,
		2240, 2245, 2250, 2255, 2300, 2305, 2310, 2315, 2320, 2325, 2330, 2335,
		2340, 2345, 2350, 2355,
	];
	return (
		<Line
			data={{
				labels: label,
				datasets: [
					{
						label: "> 10 MeV",
						data: data1,
						fill: false,
						borderColor: "rgb(75, 192, 192)",
						// tension: 0,
					},
					{
						label: "> 30 MeV",
						data: data2,
						fill: false,
						borderColor: "rgb(75, 192, 50)",
						// tension: 0,
					},
				],
			}}
			width={200}
			height={500}
			options={{ maintainAspectRatio: false }}
			legend={{}}
		/>
	);
};

export default UserChart;
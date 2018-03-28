import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types"

const weatherCondition = {
	Rain: {
		colors: ["#00C6FB", "#005BEA"],
		title: "Raining",
		subtitle: "Take an umbrella",
		icon: "weather-pouring"
	},
	Clear: {
		colors: ["#FEF253", "#FF7300"],
		title: "Sunny",
		subtitle: "Good day to tanning",
		icon: "weather-sunny"
	},
	Thunderstorm: {
		colors: ["#00ECBC", "#007ADF"],
		title: "Stormy",
		subtitle: "Prepare a lightning rod",
		icon: "weather-lightning"
	},
	Clouds: {
		colors: ["#D7D2CC", "#304352"],
		title: "Cloudy",
		subtitle: "Gloomy day",
		icon: "weather-cloudy"
	},
	Snow: {
		colors: ["#7DE2FC", "#B9B6E5"],
		title: "Snowing",
		subtitle: "Will be Eskimos",
		icon: "weather-snowy"
	},
	Drizzle: {
		colors: ["#89F7FE", "#66A6FF"],
		title: "Drizzle",
		subtitle: "In gentle rain",
		icon: "weather-rainy"
	},
	Haze: {
		colors: ["#D7D2CC", "#304352"],
		title: "Foggy",
		subtitle: "You can't see me",
		icon: "weather-fog"
	},
	Mist: {
		colors: ["#D7D2CC", "#304352"],
		title: "Misty",
		subtitle: "It's a foggy",
		icon: "weather-partlycloudy"
	}
}

function  Weather({weatherName, temp})  {
	return (
		<LinearGradient colors={weatherCondition[weatherName].colors} style={styles.container}>
			<View style={styles.upper}>
				<MaterialCommunityIcons color="white" size={144} name={weatherCondition[weatherName].icon} />
				<Text style={styles.temp}>{temp}º</Text>
			</View>
			<View style={styles.lower}>
				<Text style={styles.title}>{weatherCondition[weatherName].title}</Text>
				<Text style={styles.subtitle}>{weatherCondition[weatherName].subtitle}</Text>
			</View>
		</LinearGradient>
	);
}

Weather.propTypes = {
	temp: PropTypes.number.isRequired,
  weatherName: PropTypes.string.isRequired
};

export default Weather;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	upper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	temp: {
		fontSize: 48,
		backgroundColor: "transparent",
		color: "white",
		marginTop: 10
	},
	lower: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "flex-end",
		paddingLeft: 25
	},
	title: {
		fontSize: 38,
		fontWeight: "300",
		backgroundColor: "transparent",
		color: "white",
		marginBottom: 10
	},
	subtitle: {
		fontSize: 24,
		backgroundColor: "transparent",
		color: "white",
		marginBottom: 24
	}
});

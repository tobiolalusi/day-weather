import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
	temperaturesContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	temperatureRange: {
		color: '#fff',
		fontSize: 24,
		fontFamily: 'ubuntu',
		textAlign: 'center',
	},
	currentTemperature: {
		color: '#fff',
		fontSize: 52,
		fontFamily: 'ubuntu-medium',
		textAlign: 'center',
	},
});

class Temperature extends Component {
	convertTemperature = (temp, unit, showunit = false) => {
		if (unit === 'C') {
			return `${Math.ceil(temp - 273.15)}${showunit ? '°C' : '°'}`;
		} else if (unit === 'F') {
			return `${Math.ceil(1.8 * (temp - 273) + 32)}${showunit ? '°F' : '°'}`;
		}
		return `${Math.ceil(temp)}K`;
	};

	render() {
		const { tempUnit, api, changeTempUnit } = this.props;
		return (
			<View style={styles.temperaturesContainer}>
				{/* Minimum temperature */}
				<Text style={styles.temperatureRange}>
					{this.convertTemperature(api.main.temp_min, tempUnit)}
				</Text>
				{/* Current temperature */}
				<Text
					style={styles.currentTemperature}
					onPress={() => changeTempUnit(tempUnit)}
				>
					{this.convertTemperature(api.main.temp, tempUnit, true)}
				</Text>
				{/* Maximum temperature */}
				<Text style={styles.temperatureRange}>
					{this.convertTemperature(api.main.temp_max, tempUnit)}
				</Text>
			</View>
		);
	}
}

Temperature.propTypes = {
	tempUnit: PropTypes.string,
	api: PropTypes.object,
	changeTempUnit: PropTypes.func,
};

Temperature.defaultProps = {
	tempUnit: 'C',
	api: null,
	changeTempUnit: null,
};

export default Temperature;

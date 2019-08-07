import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Image from 'react-native-scalable-image';

const styles = StyleSheet.create({
	weatherImageContainer: {
		alignItems: 'center',
	},
	weatherCondition: {
		color: '#fff',
		fontSize: 32,
		fontFamily: 'ubuntu-medium',
		textAlign: 'center',
	},
});

const ICON01d = require('../assets/icons/01d.png');
const ICON01n = require('../assets/icons/01n.png');
const ICON02d = require('../assets/icons/02d.png');
const ICON02n = require('../assets/icons/02n.png');
const ICON034 = require('../assets/icons/034.png');
const ICON09 = require('../assets/icons/09.png');
const ICON10d = require('../assets/icons/10d.png');
const ICON10n = require('../assets/icons/10n.png');
const ICON11 = require('../assets/icons/11.png');
const ICON13 = require('../assets/icons/13.png');
const ICON50 = require('../assets/icons/50.png');

class Weather extends Component {
	getWeatherImage = icon => {
		if (icon === '01d') {
			return ICON01d;
		} else if (icon === '01n') {
			return ICON01n;
		} else if (icon === '02d') {
			return ICON02d;
		} else if (icon === '02n') {
			return ICON02n;
		} else if (
			icon === '03d' ||
			icon === '03n' ||
			icon === '04d' ||
			icon === '04n'
		) {
			return ICON034;
		} else if (icon === '09d' || icon === '09n') {
			return ICON09;
		} else if (icon === '10d') {
			return ICON10d;
		} else if (icon === '10n') {
			return ICON10n;
		} else if (icon === '11d' || icon === '11n') {
			return ICON11;
		} else if (icon === '13d' || icon === '13n') {
			return ICON13;
		} else if (icon === '50d' || icon === '50n') {
			return ICON50;
		}
		return ICON01d;
	};

	render() {
		const { weather } = this.props;
		return (
			<View>
				<View style={styles.weatherImageContainer}>
					<Image
						source={this.getWeatherImage(weather.icon)}
						height={220}
					/>
				</View>
				<View style={{ marginTop: 20 }}>
					<Text style={styles.weatherCondition}>{weather.main}</Text>
				</View>
			</View>
		);
	}
}

Weather.propTypes = {
	weather: PropTypes.object,
};

Weather.defaultProps = {
	weather: null,
};

export default Weather;

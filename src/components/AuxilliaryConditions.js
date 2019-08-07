import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Image from 'react-native-scalable-image';
import PropTypes from 'prop-types';

const WIND_SPEED_ICON = require('../assets/icons/wind-speed.png');
const ATMOSPHERIC_PRESSURE_ICON = require('../assets/icons/pressure.png');
const HUMIDITY_ICON = require('../assets/icons/humidity.png');

const styles = StyleSheet.create({
	auxConditionsContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	auxConditionContainer: {
		alignItems: 'center',
	},
	auxConditionText: {
		color: '#fff',
		fontSize: 21,
		fontFamily: 'ubuntu-medium',
		textAlign: 'center',
		marginTop: 10,
	},
});

class AuxilliaryConditions extends PureComponent {
	render() {
		const { api } = this.props;
		return (
			<View style={styles.auxConditionsContainer}>
				{/* Wind speed */}
				<View style={styles.auxConditionContainer}>
					<Image
						source={WIND_SPEED_ICON}
						style={styles.auxConditionIcon}
						height={50}
					/>
					<Text style={styles.auxConditionText}>{api.wind.speed} mps</Text>
				</View>
				{/* Atmospheric pressure */}
				<View style={styles.auxConditionContainer}>
					<Image
						source={ATMOSPHERIC_PRESSURE_ICON}
						style={styles.auxConditionIcon}
						height={50}
					/>
					<Text style={styles.auxConditionText}>
						{api.main.pressure} hPa
					</Text>
				</View>
				{/* Humidity */}
				<View style={styles.auxConditionContainer}>
					<Image
						source={HUMIDITY_ICON}
						style={styles.auxConditionIcon}
						height={50}
					/>
					<Text style={styles.auxConditionText}>{api.main.humidity}%</Text>
				</View>
			</View>
		);
	}
}

AuxilliaryConditions.propTypes = {
	api: PropTypes.object,
};

AuxilliaryConditions.defaultProps = {
	api: null,
};

export default AuxilliaryConditions;

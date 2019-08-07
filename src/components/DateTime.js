import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
	date: {
		color: '#fff',
		fontSize: 21,
		fontFamily: 'ubuntu-medium',
	},
	time: {
		color: '#fff',
		fontSize: 24,
		fontFamily: 'ubuntu-bold',
	},
});

class DateTime extends Component {
	fetchDate = dt => {
		const dateObj = new Date(dt * 1000);
		// Day
		const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
		const dayIndex = dateObj.getDay();
		const day = days[dayIndex];
		// Date
		const date = dateObj.getDate();
		// Month
		const months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];
		const monthIndex = dateObj.getMonth();
		const month = months[monthIndex];

		return `${day} ${date} ${month}`;
	};

	fetchTime = dt => {
		const dateObj = new Date(dt * 1000);
		let hour = dateObj.getHours();
		let minute = dateObj.getMinutes();
		hour = hour < 10 ? `0${hour}` : hour;
		minute = minute < 10 ? `0${minute}` : minute;

		return `${hour}:${minute}`;
	};

	render() {
		const { dt } = this.props;
		return (
			<View>
				<Text style={styles.date}>{this.fetchDate(dt)}</Text>
				<Text style={styles.time}>{this.fetchTime(dt)}</Text>
			</View>
		);
	}
}

DateTime.propTypes = {
	dt: PropTypes.number,
};

DateTime.defaultProps = {
	dt: null,
};

export default DateTime;

import React, { Component } from 'react';
import * as Font from 'expo-font';
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';
import Image from 'react-native-scalable-image';

import DateTime from './src/components/DateTime';
import SearchModal from './src/components/SearchModal';
import Temperature from './src/components/Temperature';
import Weather from './src/components/Weather';
import AuxilliaryConditions from './src/components/AuxilliaryConditions';

import COUNTRIES from './src/assets/countries.json';
// import MOCK_WEATHER_DATA from './src/assets/mock/weather_data.json';
// import MOCK_COORDINATE_DATA from './src/assets/mock/coordinate_data.json';

const APPID = 'c353f14ce91365116261c5ef52ffe7eb';

const UBUNTU_REGULAR_FONT = require('./src/assets/fonts/Ubuntu-Regular.ttf');
const UBUNTU_BOLD_FONT = require('./src/assets/fonts/Ubuntu-Bold.ttf');
const UBUNTU_MEDIUM_FONT = require('./src/assets/fonts/Ubuntu-Medium.ttf');

const SEARCH_ICON = require('./src/assets/icons/search.png');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 45,
		paddingHorizontal: 15,
		paddingBottom: 10,
	},
	infoContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	connectionError: {
		fontSize: 32,
		fontFamily: 'ubuntu-bold',
	},
	tryAgainButton: {
		marginTop: 10,
		padding: 10,
		borderRadius: 5,
		backgroundColor: '#000',
	},
	tryAgainButtonText: {
		fontSize: 24,
		color: '#fff',
		fontFamily: 'ubuntu-bold',
	},
	locationAndSearchContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	cityText: {
		color: '#fff',
		fontSize: 24,
		fontFamily: 'ubuntu-bold',
	},
	countryText: {
		color: '#fff',
		fontSize: 18,
		fontFamily: 'ubuntu-medium',
	},
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			animating: true,
			search: false,
			searchedCity: '',
			api: null,
			tempUnit: 'C',
			error: null,
		};
		this.toggleSearchModal = this.toggleSearchModal.bind(this);
		this.updateSearchedCity = this.updateSearchedCity.bind(this);
		this.fetchCityCoord = this.fetchCityCoord.bind(this);
		this.fetchUserLocWeather = this.fetchUserLocWeather.bind(this);
		this.changeTempUnit = this.changeTempUnit.bind(this);
		this.fetchBackgroundColor = this.fetchBackgroundColor.bind(this);
	}

	componentDidMount = () => {
		this.loadAssetAsync();
		this.fetchUserLocWeather();
	};

	fetchUserLocWeather = (anim = true) => {
		if (!anim) this.setState({ animating: true });
		navigator.geolocation.getCurrentPosition(
			position => {
				const lon = position.coords.longitude;
				const lat = position.coords.latitude;
				this.fetchWeatherData(lon, lat);
			},
			error => this.setState({ animating: false, error }),
			{ enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
		);
	};

	fetchWeatherData = async (lon, lat) => {
		this.setState({ animating: true });
		const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APPID}`;
		try {
			const response = await fetch(url);
			const jsonResponse = await response.json();
			// const jsonResponse = MOCK_WEATHER_DATA;
			this.setState({ animating: false, api: jsonResponse });
		} catch (e) {
			this.setState({ error: e });
		}
	};

	loadAssetAsync = async () => {
		await Font.loadAsync({
			ubuntu: UBUNTU_REGULAR_FONT,
			'ubuntu-bold': UBUNTU_BOLD_FONT,
			'ubuntu-medium': UBUNTU_MEDIUM_FONT,
		});
	};

	toggleSearchModal = visibility => this.setState({ search: visibility });

	updateSearchedCity = e => this.setState({ searchedCity: e });

	fetchCityCoord = async url => {
		this.setState({ animating: true, search: false });
		try {
			if (url !== 'current-location') {
				const response = await fetch(url);
				const jsonResponse = await response.json();
				// const jsonResponse = MOCK_COORDINATE_DATA;
				const lon = jsonResponse.location.latlon.longitude;
				const lat = jsonResponse.location.latlon.latitude;
				this.fetchWeatherData(lon, lat);
			} else {
				this.fetchUserLocWeather(false);
			}
		} catch (e) {
			this.setState({ error: e });
		}
	};

	changeTempUnit = unit => {
		if (unit === 'K') {
			this.setState({ tempUnit: 'C' });
		} else if (unit === 'C') {
			this.setState({ tempUnit: 'F' });
		} else if (unit === 'F') {
			this.setState({ tempUnit: 'K' });
		}
	};

	fetchBackgroundColor = icon => {
		if (
			icon === '01d' ||
			icon === '02d' ||
			icon === '03d' ||
			icon === '10d'
		) {
			return '#f4a321';
		} else if (
			icon === '01n' ||
			icon === '02n' ||
			icon === '03n' ||
			icon === '10n'
		) {
			return '#082c44';
		} else if (
			icon === '04d' ||
			icon === '04n' ||
			icon === '09d' ||
			icon === '09n'
		) {
			return '#414042';
		} else if (icon === '11d' || icon === '11n') {
			return '#2b2b2b';
		} else if (icon === '13d' || icon === '13n') {
			return '#3eafce';
		} else if (icon === '50d' || icon === '50n') {
			return '#d1d3d4';
		}
		return '#082c44';
	};

	render() {
		const {
			animating,
			search,
			searchedCity,
			error,
			tempUnit,
			api,
		} = this.state;

		if (error) {
			return (
				<View style={styles.infoContainer}>
					<Text style={styles.connectionError}>Connection Error!</Text>
					<TouchableOpacity
						onPress={() => this.fetchUserLocWeather()}
						style={styles.tryAgainButton}
					>
						<Text style={styles.tryAgainButtonText}>Try again</Text>
					</TouchableOpacity>
				</View>
			);
		} else if (animating) {
			return (
				<View style={styles.infoContainer}>
					<ActivityIndicator
						animating={animating}
						size="large"
						color="#082c44"
					/>
				</View>
			);
		}

		return (
			api && (
				<View
					style={[
						styles.container,
						{
							backgroundColor: this.fetchBackgroundColor(
								api.weather[0].icon
							),
						},
					]}
				>
					{search && (
						<SearchModal
							search={search}
							toggleSearchModal={this.toggleSearchModal}
							searchedCity={searchedCity}
							updateSearchedCity={this.updateSearchedCity}
							fetchCityCoord={this.fetchCityCoord}
						/>
					)}

					{/* Location info and search button */}
					<View style={styles.locationAndSearchContainer}>
						{/* Location info */}
						<View>
							<Text style={styles.cityText}>{api.name}</Text>
							<Text style={styles.countryText}>
								{COUNTRIES[api.sys.country]}
							</Text>
						</View>
						{/* Search button */}
						<TouchableOpacity
							onPress={() => {
								this.toggleSearchModal(true);
							}}
						>
							<Image
								source={SEARCH_ICON}
								style={styles.searchIcon}
								height={30}
							/>
						</TouchableOpacity>
					</View>

					{/* Date and Time display */}
					<View style={{ marginTop: 20 }}>
						<DateTime dt={api.dt} />
					</View>

					{/* Weather condition */}
					<View style={{ marginTop: 20 }}>
						<Weather weather={api.weather[0]} />
					</View>

					{/* Temperatures */}
					<View style={{ marginTop: 20 }}>
						<Temperature
							tempUnit={tempUnit}
							api={api}
							changeTempUnit={this.changeTempUnit}
						/>
					</View>

					{/* Auxilliary conditions */}
					<View style={{ marginTop: 20 }}>
						<AuxilliaryConditions api={api} />
					</View>
				</View>
			)
		);
	}
}

export default App;

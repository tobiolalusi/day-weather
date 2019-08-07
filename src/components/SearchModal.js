import React, { Component } from 'react';
import {
	ActivityIndicator,
	View,
	Text,
	Modal,
	TouchableOpacity,
	TextInput,
	ScrollView,
	StyleSheet,
} from 'react-native';
import Image from 'react-native-scalable-image';
import PropTypes from 'prop-types';

// import MOCK_CITIES_DATA from '../assets/mock/cities_data.json';

const CLOSE_ICON = require('../assets/icons/close.png');

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(0, 0, 0, .7)',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	closeButton: {
		position: 'absolute',
		right: -10,
		top: -10,
		zIndex: 1,
	},
	modal: {
		backgroundColor: '#e6e7e8',
		borderRadius: 10,
		paddingBottom: 20,
	},
	searchInput: {
		paddingHorizontal: 15,
		paddingVertical: 12,
		fontFamily: 'ubuntu',
		fontSize: 16,
	},
	cityListButton: {
		marginVertical: 1,
		marginHorizontal: 3,
		backgroundColor: '#fff',
		padding: 10,
	},
	city: {
		fontFamily: 'ubuntu',
		fontSize: 15,
	},
	infoContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	connectionError: {
		fontSize: 24,
		fontFamily: 'ubuntu-medium',
		textAlign: 'center',
	},
	tryAgainButton: {
		marginTop: 10,
		padding: 10,
		borderRadius: 5,
		backgroundColor: '#000',
	},
	tryAgainButtonText: {
		fontSize: 18,
		color: '#fff',
		fontFamily: 'ubuntu-bold',
	},
});

const isSearched = searchedCity => city =>
	city['matching_full_name']
		.toLowerCase()
		.includes(searchedCity.toLowerCase());

class SearchModal extends Component {
	state = {
		animating: true,
		cities: [],
		error: null,
	};

	componentDidMount = () => this.fetchCities();

	componentWillReceiveProps = () => this.fetchCities();

	fetchCities = async () => {
		this.setState({ animating: true });
		const { searchedCity } = this.props;
		const url = `https://api.teleport.org/api/cities/?search=${searchedCity}`;
		try {
			const response = await fetch(url);
			const jsonResponse = await response.json();
			// const jsonResponse = MOCK_CITIES_DATA;
			this.setState({
				animating: false,
				cities: jsonResponse['_embedded']['city:search-results'],
			});
		} catch (e) {
			this.setState({ error: e });
		}
	};

	render() {
		const {
			search,
			toggleSearchModal,
			searchedCity,
			updateSearchedCity,
			fetchCityCoord,
		} = this.props;
		const { animating, cities, error } = this.state;
		return (
			<Modal
				animationType="slide"
				transparent
				visible={search}
				onRequestClose={() => null}
			>
				<View style={styles.container}>
					<View style={{ width: '85%' }}>
						<TouchableOpacity
							onPress={() => {
								toggleSearchModal(false);
							}}
							style={styles.closeButton}
						>
							<Image source={CLOSE_ICON} height={40} />
						</TouchableOpacity>
						<View style={styles.modal}>
							<View>
								<TextInput
									underlineColorAndroid="transparent"
									placeholder="Search city"
									placeholderTextColor="grey"
									style={styles.searchInput}
									onChangeText={updateSearchedCity}
								>
									{searchedCity}
								</TextInput>
							</View>
							<View style={{ height: 250 }}>
								{error ? (
									<View style={styles.infoContainer}>
										<Text style={styles.connectionError}>
											Connection Error!
										</Text>
										<TouchableOpacity
											onPress={() => this.fetchCities()}
											style={styles.tryAgainButton}
										>
											<Text style={styles.tryAgainButtonText}>
												Try again
											</Text>
										</TouchableOpacity>
									</View>
								) : animating ? (
									<View style={styles.infoContainer}>
										<ActivityIndicator
											animating={animating}
											size="large"
											color="#082c44"
										/>
									</View>
								) : (
									<ScrollView>
										<TouchableOpacity
											key="current-location"
											style={styles.cityListButton}
											onPress={() =>
												fetchCityCoord('current-location')
											}
										>
											<Text style={styles.city}>
												Current Location
											</Text>
										</TouchableOpacity>
										{cities
											.filter(isSearched(searchedCity))
											.map(city => (
												<TouchableOpacity
													key={city.matching_full_name}
													style={styles.cityListButton}
													onPress={() =>
														fetchCityCoord(
															city['_links']['city:item']['href']
														)
													}
												>
													<Text style={styles.city}>
														{city.matching_full_name}
													</Text>
												</TouchableOpacity>
											))}
									</ScrollView>
								)}
							</View>
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}

SearchModal.propTypes = {
	search: PropTypes.bool,
	toggleSearchModal: PropTypes.func,
	searchedCity: PropTypes.string,
	updateSearchedCity: PropTypes.func,
	fetchCityCoord: PropTypes.func,
};

SearchModal.defaultProps = {
	search: false,
	toggleSearchModal: null,
	searchedCity: null,
	updateSearchedCity: null,
	fetchCityCoord: null,
};

export default SearchModal;

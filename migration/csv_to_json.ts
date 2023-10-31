import fs from "fs";
import parse from "csv-parse";

const ENCODING = "utf8";

interface ICountry {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    continentId: number;
}

interface IContinentResponse {
    asia: ICountry[];
    northAmerica: ICountry[];
    southAmerica: ICountry[];
    europe: ICountry[];
    africa: ICountry[];
    australia: ICountry[];
}

interface ICity {
    countryId: number;
    name: string;
    latitude: number;
    longitude: number;
}

interface IState {
    countryId: number;
    name: string;
    latitude: number;
    longitude: number;
}

const readCountriesCSV = (): Promise<IContinentResponse> => {
	return new Promise((resolve, reject) => {
		const parser = parse({
			delimiter: ",",
			quote: "\"",
			ltrim: true,
			rtrim: true,
		});

		const csvRegions = new Set<string>();
		const asiaCountries:ICountry[] = [];
		const northAmericaCountries:ICountry[] = [];
		const southAmericaCountries:ICountry[] = [];
		const europeCountries:ICountry[] = [];
		const africaCountries:ICountry[] = [];
		const australiaCountries:ICountry[] = [];
		const EXISTING_DATA_CSV_PATH = "./migration/data/countries.csv";

		fs.createReadStream(EXISTING_DATA_CSV_PATH, { encoding: ENCODING })
			.pipe(parser)
			.on("data", (row: any[]) => {
				const INDEX_COUNTRY_ID = 0;
				const INDEX_COUNTRY = 1;
				const INDEX_REGION = 11;
				const INDEX_LATITUDE = 13;
				const INDEX_LONGITUDE = 14;
				const ASIA = ["Southern Asia", "Western Asia", "South-Eastern Asia", "Eastern Asia", "Central Asia"];
				const NORTH_AMERICA = ["Caribbean", "Northern America", "Central America"];
				const SOUTH_AMERICA = ["South America"];
				const EUROPE = ["Northern Europe", "Southern Europe", "Western Europe", "Eastern Europe"];
				const AFRICA = ["Northern Africa", "Middle Africa", "Western Africa", "Southern Africa", "Eastern Africa"];
				const AUSTRALIA = ["Polynesia", "Australia and New Zealand", "Melanesia", "Micronesia"];

				const region = row[INDEX_REGION];
				const name = row[INDEX_COUNTRY];
				const id = row[INDEX_COUNTRY_ID];
				const latitude = row[INDEX_LATITUDE];
				const longitude = row[INDEX_LONGITUDE];

				if (ASIA.includes(region)) {
					csvRegions.add("Asia");
					asiaCountries.push({ id, name, latitude, longitude, continentId: 1 });
				} else if (NORTH_AMERICA.includes(region)) {
					csvRegions.add("North America");
					northAmericaCountries.push({ id, name, latitude, longitude, continentId: 5 });
				} else if (SOUTH_AMERICA.includes(region)) {
					csvRegions.add("South America");
					southAmericaCountries.push({ id, name, latitude, longitude, continentId: 6 });
				} else if (EUROPE.includes(region)) {
					csvRegions.add("Europe");
					europeCountries.push({ id, name, latitude, longitude, continentId: 2 });
				} else if (AFRICA.includes(region)) {
					csvRegions.add("Africa");
					africaCountries.push({ id, name, latitude, longitude, continentId: 3 });
				} else if (AUSTRALIA.includes(region)) {
					csvRegions.add("Australia and New Zealand");
					australiaCountries.push({ id, name, latitude, longitude, continentId: 4 });
				} else {
					console.info("NOWHERE: ", name);
				}
			})
			.on("error", (err: any) => {
				reject(err);
			})
			.on("end", () => {
				console.info("Reading Countries finished");
				resolve({
					asia: asiaCountries,
					northAmerica: northAmericaCountries,
					southAmerica: southAmericaCountries,
					europe: europeCountries,
					africa: africaCountries,
					australia: australiaCountries,
				});
			});
	});
};

const readStatesCSV = (): Promise<IState[]> => {
	return new Promise((resolve, reject) => {
		const INDEX_CITY_NAME = 1;
		const INDEX_COUNTRY_ID = 2;
		const INDEX_LATITUDE = 3;
		const INDEX_LONGITUDE = 4;

		const parser = parse({
			delimiter: ",",
			quote: "\"",
			ltrim: true,
			rtrim: true,
		});

		const states: IState[] = [];
		const EXISTING_STATES_CSV_PATH = "./migration/data/states.csv";

		fs.createReadStream(EXISTING_STATES_CSV_PATH, { encoding: ENCODING })
			.pipe(parser)
			.on("data", (row: any[]) => {
				const name = row[INDEX_CITY_NAME];
				const countryId = row[INDEX_COUNTRY_ID];
				const latitude = row[INDEX_LATITUDE];
				const longitude = row[INDEX_LONGITUDE];
				if (name !== "name") {
					states.push({
						name,
						countryId,
						latitude,
						longitude,
					});
				}
			})
			.on("error", (err: any) => {
				reject(err);
			})
			.on("end", () => {
				console.info("Cities finished");
				resolve(states);
			});
	});
};

const readCitiesCSV = (): Promise<ICity[]> => {
	return new Promise((resolve, reject) => {
		const INDEX_CITY_NAME = 1;
		const INDEX_COUNTRY_ID = 2;
		const INDEX_LATITUDE = 3;
		const INDEX_LONGITUDE = 4;

		const parser = parse({
			delimiter: ",",
			quote: "\"",
			ltrim: true,
			rtrim: true,
		});

		const cities: ICity[] = [];
		const EXISTING_CITIES_CSV_PATH = "./migration/data/cities.csv";

		fs.createReadStream(EXISTING_CITIES_CSV_PATH, { encoding: ENCODING })
			.pipe(parser)
			.on("data", (row: any[]) => {
				const name = row[INDEX_CITY_NAME];
				const countryId = row[INDEX_COUNTRY_ID];
				const latitude = row[INDEX_LATITUDE];
				const longitude = row[INDEX_LONGITUDE];
				if (name !== "name") {
					cities.push({
						name,
						countryId,
						latitude,
						longitude,
					});
				}
			})
			.on("error", (err: any) => {
				reject(err);
			})
			.on("end", () => {
				console.info("Cities finished");
				resolve(cities);
			});
	});
};

const saveContriesToJSON = (countries: ICountry[]): Promise<void> => {
	return new Promise(resolve => {
		const DATA_JSON_PATH = "./migration/data/countries.json";
		fs.writeFile(DATA_JSON_PATH, JSON.stringify(countries), { encoding: ENCODING }, () => {
			console.info("Countries saved.");
			resolve();
		});
	});
};

const saveStatesToJSON = (states: IState[]): Promise<void> => {
	return new Promise(resolve => {
		const DATA_JSON_PATH = "./migration/data/states.json";
		fs.writeFile(DATA_JSON_PATH, JSON.stringify(states), { encoding: ENCODING }, () => {
			console.info("States saved.");
			resolve();
		});
	});
};

const saveCitiesToJSON = (cities: ICity[]): Promise<void> => {
	return new Promise(resolve => {
		const DATA_JSON_PATH = "./migration/data/cities.json";
		fs.writeFile(DATA_JSON_PATH, JSON.stringify(cities), { encoding: ENCODING }, () => {
			console.info("Cities saved.");
			resolve();
		});
	});
};

const startMigration = async (): Promise<void> => {
	const regions = await readCountriesCSV();
	const countries = [...regions.africa, ...regions.asia, ...regions.australia, ...regions.europe, ...regions.northAmerica, ...regions.southAmerica];
	await saveContriesToJSON(countries);
	const states = await readStatesCSV();
	await saveStatesToJSON(states);
	const cities = await readCitiesCSV();
	await saveCitiesToJSON(cities);
};

export {
	startMigration,
};
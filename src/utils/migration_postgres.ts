import fs from "fs";
import {
	CountryCreationAttributes,
	StateCreationAttributes,
	CityCreationAttributes,
	ArchitectCreationAttributes,
	ArchitectureStyleCreationAttributes,
	ArchitectureTypeCreationAttributes,
} from "../models/postgres/interfaces";
import {
	Age,
	SubAge,
	Continent,
	Country,
	State,
	City,
	Architect,
	ArchitectureStyle,
	ArchitectureType,
} from "../models/postgres";

const startMigration = async (): Promise<void> => {
	console.info("Migration started.");
	await migrateAges();
	await migrateSubAges();
	await migrateContinents();
	await migrateCountries();
	await migrateStates();
	await migrateCities();
	await migrateArchitects();
	await migrateArchitectureStyles();
	await migrateArchitectureTypes();
	console.info("Migration finished.");
};

const migrateAges = async (): Promise<void> => {
	const count = await Age.count();
	console.log("Count", count);
	if (count === 0) {
		await Age.bulkCreate([
			{ name: "Neolithic" },
			{ name: "Antique" },
			{ name: "Early Middle Ages" },
			{ name: "Middle Ages" },
			{ name: "Late Middle Ages" },
			{ name: "Early Modernism" },
			{ name: "Modernism" },
			{ name: "Postmodernism" },
		]);
	}
};

const migrateSubAges = async (): Promise<void> => {
	const count = await SubAge.count();
	if (count === 0) {
		await SubAge.bulkCreate([
			{ name: "Varna culture 4400-4100 BC (Bulgaria)", ageId: 1 },
			{ name: "Gumelnița–Karanovo culture 4700-3950BC (Romania)", ageId: 1 },
			{ name: "Herodian 37-4 BC (Judea)", ageId: 2 },
			{ name: "Early Christian 100-500", ageId: 2 },
			{ name: "Illyrians 7th BC – 9 AD", ageId: 2 },
			{ name: "Etruscan 800C – 100 BC", ageId: 2 },
			{ name: "Celts 800 BC -", ageId: 2 },
			{ name: "Visigothic 418 -711AD centuries (Spain and Portugal)", ageId: 3 },
			{ name: "Asturian 711-910 (North Spain, North Portugal)", ageId: 3 },
			{ name: "Repoblación (Mozarabic arhitecture)711s-11th century (Spain)", ageId: 3 },
			{ name: "Moorish architecture", ageId: 3 },
			{ name: "Romanesque 1000-1300", ageId: 4 },
			{ name: "Lombard Romanesque/First Romanesque 10.st (Italy(Lombardy), France, Spain)", ageId: 4 },
			{ name: "Norman 1074-1250 (Normandy, UK, Ireland, Italy, Malta)", ageId: 4 },
			{ name: "Cistercian monasteries", ageId: 4 },
			{ name: "Gothic", ageId: 5 },
			{ name: "Early English Period c. 1190—c. 1250", ageId: 5 },
			{ name: "Decorated Period c. 1290–c. 1350", ageId: 5 },
			{ name: "Perpendicular Period c. 1350–c. 1550", ageId: 5 },
			{ name: "Rayonnant Gothic 1240-c. 1350 (France, Germany, Central Europe)", ageId: 5 },
			{ name: "Venetian Gothic 14th-15th centuries (Venice in Italy)", ageId: 5 },
			{ name: "Spanish Gothic", ageId: 5 },
			{ name: "Mudéjar Style c. 1200-1700", ageId: 5 },
			{ name: "Baroque c. 1600-1750", ageId: 6 },
			{ name: "Neoclassical c. 1715-1820", ageId: 6 },
			{ name: "Beaux-Arts 1670+ (France) and 1880 (US)", ageId: 6 },
			{ name: "Georgian 1720-1840s (UK, US)", ageId: 6 },
			{ name: "Jamaican Georgian architecture c. 1750 - c. 1850 (Jamaica)", ageId: 6 },
			{ name: "American Colonial", ageId: 6 },
			{ name: "Art Nouveau", ageId: 7 },
			{ name: "Beaux arts", ageId: 7 },
			{ name: "Jugendstil 1885–1910", ageId: 7 },
			{ name: "Modernisme 1888-1911 (Catalan Art Nouveau)", ageId: 7 },
			{ name: "Glasgow Style 1890-1910 (Glasgow, Scotland)", ageId: 7 },
			{ name: "Post-Modernism 1945+ (US, UK)", ageId: 7 },
			{ name: "Shed Style 1960s-1980s US", ageId: 7 },
			{ name: "Arcology 1970s+ (Europe)", ageId: 7 },
			{ name: "Deconstructivism 1982+ (Europe, US, Far East)", ageId: 7 },
			{ name: "Critical regionalism 1983+", ageId: 7 },
			{ name: "Blobitecture 2003+", ageId: 7 },
			{ name: "Interactive architecture 2000+", ageId: 7 },
			{ name: "Sustainable architecture 2000+", ageId: 7 },
			{ name: "Earthship 1980+ (Started in US, now global)", ageId: 7 },
			{ name: "Green building 2000+", ageId: 7 },
			{ name: "Natural building 2000+", ageId: 7 },
			{ name: "New Classical Architecture 1980+", ageId: 7 },
			{ name: "Post-Modernism 1945+ (US, UK)", ageId: 8 },
			{ name: "Shed Style 1960s-1980s US", ageId: 8 },
			{ name: "Arcology 1970s+ (Europe)", ageId: 8 },
			{ name: "Deconstructivism 1982+ (Europe, US, Far East)", ageId: 8 },
			{ name: "Critical regionalism 1983+", ageId: 8 },
			{ name: "Blobitecture 2003+", ageId: 8 },
			{ name: "Interactive architecture 2000+", ageId: 8 },
			{ name: "Sustainable architecture 2000+", ageId: 8 },
			{ name: "Earthship 1980+ (Started in US, now global)", ageId: 8 },
			{ name: "Green building 2000+", ageId: 8 },
			{ name: "Natural building 2000+", ageId: 8 },
			{ name: "New Classical Architecture 1980", ageId: 8 },
		]);
	}
};

const migrateContinents = async (): Promise<void> => {
	const count = await Continent.count();
	console.log("Count", count);
	if (count === 0) {
		await Continent.bulkCreate([
			{ name: "Asia" },
			{ name: "Europe" },
			{ name: "Africa" },
			{ name: "Australia and New Zealand" },
			{ name: "North America" },
			{ name: "South America" },
		]);
	}
};

const migrateCountries = async (): Promise<void> => {
	const count = await Country.count();
	console.log("Count", count);
	if (count === 0) {
		const DATA_JSON_PATH = "./migration/data/countries.json";
		fs.readFile(DATA_JSON_PATH, { encoding: "utf8" }, async (err, data) => {
			await Country.bulkCreate(JSON.parse(data) as CountryCreationAttributes[]);
		});
	}
};

const migrateStates = async (): Promise<void> => {
	const count = await State.count();
	console.log("Count", count);
	if (count === 0) {
		const DATA_JSON_PATH = "./migration/data/states.json";
		fs.readFile(DATA_JSON_PATH, { encoding: "utf8" }, async (err, data) => {
			await State.bulkCreate(JSON.parse(data) as StateCreationAttributes[]);
			console.log("data done");
		});
	}
};

const migrateCities = async (): Promise<void> => {
	const count = await City.count();
	console.log("Count", count);
	if (count === 0) {
		const DATA_JSON_PATH = "./migration/data/cities.json";
		fs.readFile(DATA_JSON_PATH, { encoding: "utf8" }, async (err, data) => {
			await City.bulkCreate(JSON.parse(data) as CityCreationAttributes[]);
			console.log("data done");
		});
	}
};

const migrateArchitects = async (): Promise<void> => {
	const count = await Architect.count();
	console.log("Count", count);
	if (count === 0) {
		const DATA_JSON_PATH = "./migration/data/architects.json";
		fs.readFile(DATA_JSON_PATH, { encoding: "utf8" }, async (err, data) => {
			await Architect.bulkCreate(JSON.parse(data) as ArchitectCreationAttributes[]);
			console.log("data done");
		});
	}
};

const migrateArchitectureStyles = async (): Promise<void> => {
	const count = await ArchitectureStyle.count();
	console.log("Count", count);
	if (count === 0) {
		const DATA_JSON_PATH = "./migration/data/architectureStyle.json";
		fs.readFile(DATA_JSON_PATH, { encoding: "utf8" }, async (err, data) => {
			await ArchitectureStyle.bulkCreate(JSON.parse(data) as ArchitectureStyleCreationAttributes[]);
			console.log("data done");
		});
	}
};

const migrateArchitectureTypes = async (): Promise<void> => {
	const count = await ArchitectureType.count();
	console.log("Count", count);
	if (count === 0) {
		const DATA_JSON_PATH = "./migration/data/architectureType.json";
		fs.readFile(DATA_JSON_PATH, { encoding: "utf8" }, async (err, data) => {
			await ArchitectureType.bulkCreate(JSON.parse(data) as ArchitectureTypeCreationAttributes[]);
			console.log("data done");
		});
	}
};

export {
	startMigration,
};
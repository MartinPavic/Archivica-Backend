// import { model, Document, Schema, Model } from "mongoose";
// import Age from "./age.model";

// export interface ISubAge extends Document {
//     name: string;
//     ageFrom: {
//         year: number;
//         unit: string;
//     };
//     ageTo: {
//         year: number;
//         unit: string;
//     };
//     ageId: Schema.Types.ObjectId
// }

// const SubAgeSchema: Schema = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     ageFrom: {
//         year: { type: Number },
//         unit: { type: String }
//     },
//     ageTo: {
//         year: { type: Number },
//         unit: { type: String }
//     },
//     ageId: {
//         type: Schema.Types.ObjectId
//     }
// });

// SubAgeSchema.statics.migrateSubAges = async function() {
//     const count = await this.count();
//     const ages = await Age.find();

//     if (count === 0) {
//         const subAges = [
//             { name: "Varna culture 4400-4100 BC (Bulgaria)", ageFrom: { year: 4400, unit: "BC" }, ageTo: { year: 4100, unit: "BC" }, ageId: ages[0]._id },
//             { name: "Gumelnița–Karanovo culture 4700-3950BC (Romania)", ageFrom: { year: 4700, unit: "BC" }, ageTo: { year: 3950, unit: "BC" }, ageId: ages[0]._id },
//             { name: "Herodian 37-4 BC (Judea)", ageFrom: { year: 37, unit: "BC" }, ageTo: { year: 4, unit: "BC" }, ageId: ages[1]._id },
//             { name: "Early Christian 100-500", ageFrom: { year: 100, unit: "AD" }, ageTo: { year: 500, unit: "AD" }, ageId: ages[1]._id },
//             { name: "Illyrians 7th BC – 9 AD", ageFrom: { year: 7, unit: "BC" }, ageTo: { year: 9, unit: "AD" }, ageId: ages[1]._id },
//             { name: "Etruscan 800C – 100 BC", ageFrom: { year: 800, unit: "BC" }, ageTo: { year: 100, unit: "BC" }, ageId: ages[1]._id },
//             { name: "Celts 800 BC -", ageFrom: { year: 800, unit: "BC" }, ageTo: { year: null, unit: null }, ageId: ages[1]._id },
//             { name: "Visigothic 418 -711AD centuries (Spain and Portugal)", ageFrom: { year: 418, unit: "AD" }, ageTo: { year: 711, unit: "AD" }, ageId: ages[2]._id },
//             { name: "Asturian 711-910 (North Spain, North Portugal)", ageFrom: { year: 711, unit: "AD" }, ageTo: { year: 910, unit: "AD" }, ageId: ages[2]._id },
//             { name: "Repoblación (Mozarabic arhitecture)711s-11th century (Spain)", ageFrom: { year: 711, unit: "AD" }, ageTo: { year: 11, unit: "AD" }, ageId: ages[2]._id },
//             { name: "Moorish architecture", ageFrom: { year: null, unit: null }, ageTo: { year: null, unit: null }, ageId: ages[2]._id },
//             { name: "Romanesque 1000-1300", ageFrom: { year: 1000, unit: "AD" }, ageTo: { year: 1300, unit: "AD" }, ageId: ages[3]._id },
//             { name: "Lombard Romanesque/First Romanesque 10.st (Italy(Lombardy), France, Spain)", ageFrom: { year: null, unit: null }, ageTo: { year: null, unit: null }, ageId: ages[3]._id },
//             { name: "Norman 1074-1250 (Normandy, UK, Ireland, Italy, Malta)", ageFrom: { year: 1074, unit: "AD" }, ageTo: { year: 1250, unit: "AD" }, ageId: ages[3]._id },
//             { name: "Cistercian monasteries", ageFrom: { year: null, unit: null }, ageTo: { year: null, unit: null }, ageId: ages[3]._id },
//             { name: "Gothic", ageFrom: { year: null, unit: null }, ageTo: { year: null, unit: null }, ageId: ages[4]._id },
//             { name: "Early English Period c. 1190—c. 1250", ageFrom: { year: 1190, unit: "AD" }, ageTo: { year: 1250, unit: "AD" }, ageId: ages[4]._id },
//             { name: "Decorated Period c. 1290–c. 1350", ageFrom: { year: 1290, unit: "AD" }, ageTo: { year: 1350, unit: "AD" }, ageId: ages[4]._id },
//             { name: "Perpendicular Period c. 1350–c. 1550", ageFrom: { year: 1350, unit: "AD" }, ageTo: { year: 1550, unit: "AD" }, ageId: ages[4]._id },
//             { name: "Rayonnant Gothic 1240-c. 1350 (France, Germany, Central Europe)", ageFrom: { year: 1240, unit: "AD" }, ageTo: { year: 1350, unit: "AD" }, ageId: ages[4]._id },
//             { name: "Venetian Gothic 14th-15th centuries (Venice in Italy)", ageFrom: { year: 1301, unit: "AD" }, ageTo: { year: 1401, unit: "AD" }, ageId: ages[4]._id },
//             { name: "Spanish Gothic", ageFrom: { year: null, unit: null }, ageTo: { year: null, unit: null }, ageId: ages[4]._id },
//             { name: "Mudéjar Style c. 1200-1700", ageFrom: { year: 1200, unit: "AD" }, ageTo: { year: 1700, unit: "AD" }, ageId: ages[4]._id },
//             { name: "Baroque c. 1600-1750", ageFrom: { year: 1600, unit: "AD" }, ageTo: { year: 1750, unit: "AD" }, ageId: ages[5]._id },
//             { name: "Neoclassical c. 1715-1820", ageFrom: { year: 1715, unit: "AD" }, ageTo: { year: 1820, unit: "AD" }, ageId: ages[5]._id },
//             { name: "Beaux-Arts 1670+ (France) and 1880 (US)", ageFrom: { year: 1672, unit: "AD" }, ageTo: { year: 1880, unit: "AD" }, ageId: ages[5]._id },
//             { name: "Georgian 1720-1840s (UK, US)", ageFrom: { year: 1720, unit: "AD" }, ageTo: { year: 1840, unit: "AD" }, ageId: ages[5]._id },
//             { name: "Jamaican Georgian architecture c. 1750 - c. 1850 (Jamaica)", ageFrom: { year: 1750, unit: "AD" }, ageTo: { year: 1850, unit: "AD" }, ageId: ages[5]._id },
//             { name: "American Colonial", ageFrom: { year: null, unit: null }, ageTo: { year: null, unit: null }, ageId: ages[5]._id },
//             { name: "Art Nouveau", ageFrom: { year: null, unit: null }, ageTo: { year: null, unit: null }, ageId: ages[6]._id },
//             { name: "Beaux arts", ageFrom: { year: null, unit: null }, ageTo: { year: null, unit: null }, ageId: ages[6]._id },
//             { name: "Jugendstil 1885–1910", ageFrom: { year: 1885, unit: "AD" }, ageTo: { year: 1910, unit: "AD" }, ageId: ages[6]._id },
//             { name: "Modernisme 1888-1911 (Catalan Art Nouveau)", ageFrom: { year: 1888, unit: "AD" }, ageTo: { year: 1911, unit: "AD" }, ageId: ages[6]._id },
//             { name: "Glasgow Style 1890-1910 (Glasgow, Scotland)", ageFrom: { year: 1890, unit: "AD" }, ageTo: { year: 1910, unit: "AD" }, ageId: ages[6]._id },
//             { name: "Post-Modernism 1945+ (US, UK)", ageFrom: { year: 1945, unit: "AD" }, ageTo: { year: null, unit: null }, ageId: ages[6]._id },
//             { name: "Shed Style 1960s-1980s US", ageFrom: { year: 1960, unit: "AD" }, ageTo: { year: 1980, unit: "AD" }, ageId: ages[6]._id },
//             { name: "Arcology 1970s+ (Europe)", ageFrom: { year: 1970, unit: "AD" }, ageTo: { year: null, unit: null }, ageId: ages[6]._id },
//             { name: "Deconstructivism 1982+ (Europe, US, Far East)", ageFrom: { year: 1982, unit: "AD" }, ageTo: { year: null, unit: null }, ageId: ages[6]._id },
//             { name: "Critical regionalism 1983+", ageFrom: { year: 1983, unit: "AD" }, ageTo: { year: null, unit: null }, ageId: ages[6]._id },
//             { name: "Blobitecture 2003+", ageFrom: { year: 2003, unit: "AD" }, ageTo: { year: null, unit: null }, ageId: ages[6]._id },
//             { name: "Interactive architecture 2000+", ageFrom: { year: 2000, unit: "AD" }, ageTo: { year: null, unit: null }, ageId: ages[6]._id },
//             { name: "Sustainable architecture 2000+", ageFrom: { year: 2000, unit: "AD" }, ageTo: { year: null, unit: null }, ageId: ages[6]._id },
//             { name: "Earthship 1980+ (Started in US, now global)", ageFrom: { year: 1980, unit: "AD" }, ageTo: { year: null, unit: null }, ageId: ages[6]._id },
//             { name: "Green building 2000+", ageFrom: { year: 2000, unit: "AD" }, ageTo: { year: null, unit: null }, ageId: ages[6]._id },
//             { name: "Natural building 2000+", ageFrom: { year: 2000, unit: "AD" }, ageTo: { year: null, unit: null }, ageId: ages[6]._id },
//             { name: "New Classical Architecture 1980+", ageFrom: { year: 1980, unit: "AD" }, ageTo: { year: null, unit: null }, ageId: ages[6]._id },
//             { name: "Post-Modernism 1945+ (US, UK)", ageFrom: { year: 1945, unit: "AD" }, ageTo: { year: null, unit: null }, ageId: ages[7]._id },
//             { name: "Shed Style 1960s-1980s US", ageFrom: { year: 1960, unit: "AD" }, ageTo: { year: 1980, unit: "AD" }, ageId: ages[7]._id },
//             { name: "Arcology 1970s+ (Europe)", ageFrom: { year: 1970, unit: "AD" }, ageTo: { year: null, unit: null }, ageId: ages[7]._id },
//             { name: "Deconstructivism 1982+ (Europe, US, Far East)", ageFrom: { year: 1982, unit: "AD" }, ageTo: { year: null, unit: null }, ageId: ages[7]._id },
//             { name: "Critical regionalism 1983+", ageFrom: { year: 1983, unit: "AD" }, ageTo: { year: null, unit: null }, ageId: ages[7]._id },
//             { name: "Blobitecture 2003+", ageFrom: { year: 2003, unit: "AD" }, ageTo: { year: null, unit: null }, ageId: ages[7]._id },
//             { name: "Interactive architecture 2000+", ageFrom: { year: 2000, unit: "AD" }, ageTo: { year: null, unit: null }, ageId: ages[7]._id },
//             { name: "Sustainable architecture 2000+", ageFrom: { year: 2000, unit: "AD" }, ageTo: { year: null, unit: null }, ageId: ages[7]._id },
//             { name: "Earthship 1980+ (Started in US, now global)", ageFrom: { year: 1980, unit: "AD" }, ageTo: { year: null, unit: null }, ageId: ages[7]._id },
//             { name: "Green building 2000+", ageFrom: { year: 2000, unit: "AD" }, ageTo: { year: null, unit: null }, ageId: ages[7]._id },
//             { name: "Natural building 2000+", ageFrom: { year: 2000, unit: "AD" }, ageTo: { year: null, unit: null }, ageId: ages[7]._id },
//             { name: "New Classical Architecture 1980", ageFrom: { year: 1980, unit: "AD" }, ageTo: { year: null, unit: null }, ageId: ages[7]._id }
//         ];

//         await this.insertMany(subAges);
//     }

// };

// export interface SubAgeModel extends Model<ISubAge> {
//     migrateSubAges(): Promise<any>
// }

// export default model<ISubAge, SubAgeModel>("SubAge", SubAgeSchema);
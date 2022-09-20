import { Optional } from 'sequelize';

export interface IAgeAttributes {
    id?: number;
    name: string;
}

export type AgeCreationAttributes = Optional<IAgeAttributes, 'id'>

export interface IArchitectAttributes {
    id?: number;
    firstName: string;
    lastName: string;
}

export type ArchitectCreationAttributes = Optional<IArchitectAttributes, 'id'>

export interface IArchitectureStyleAttributes {
    id?: number;
    name: string;
}

export type ArchitectureStyleCreationAttributes = Optional<IArchitectureStyleAttributes, 'id'>

export interface IArchitectureTypeAttributes {
    id?: number;
    name: string;
}

export type ArchitectureTypeCreationAttributes = Optional<IArchitectureTypeAttributes, 'id'>

export interface IContinentAttributes {
    id?: number;
    name: string;
}

export type ContinentCreationAttributes = Optional<IContinentAttributes, 'id'>

export interface ICountryAttributes {
    id?: number;
    name: string;
    continentId: number;
}

export type CountryCreationAttributes = Optional<ICountryAttributes, 'id'>

export interface ISubAgeAttributes {
    id?: number;
    name: string;
    ageId: number;
}

export type SubAgeCreationAttributes = Optional<ISubAgeAttributes, 'id'>

export interface IStateAttributes {
    id?: number;
    name: string;
    countryId: number;
    latitude: number;
    longitude: number;
}

export type StateCreationAttributes = Optional<IStateAttributes, 'id'>

export interface ICityAttributes {
    id?: number;
    name: string;
    countryId: number;
    latitude: number;
    longitude: number;
}

export type CityCreationAttributes = Optional<ICityAttributes, 'id'>

export interface IUserAttributes {
    id?: number;
    name: string;
    lastname: string;
    email: string;
    password?: string;
}

export type UserCreationAttributes = Optional<IUserAttributes, 'id'>

export interface IImageAttributes {
    id?: number;
    path: string;
    width?: number;
    height?: number;
    name?: string;
    ownerId: number;
}

export type ImageCreationAttributes = Optional<IImageAttributes, 'id'>

export interface IPostGalleryAttributes {
    id?: number;
    path: string;
    width?: number;
    height?: number;
    name?: string;
    postId: number;
}

export type PostGalleryCreationAttributes = Optional<IPostGalleryAttributes, 'id'>

export interface IPostAttributes {
    id?: number;
    name: string;
    date: Date;
    photoPath: number;
    description: string;
    architectId: number;
    cityId: number;
    subAgeId: number;
    ownerId: number;
}

export type PostCreationAttributes = Optional<IPostAttributes, 'id'>

export interface IPostCommentsAttributes {
    id?: number;
    comment: string;
    userId: number;
    postId: number;
}

export type PostCommentsCreationAttributes = Optional<IPostCommentsAttributes, 'id'>

export interface IJWTUser {
    _id: number;
}
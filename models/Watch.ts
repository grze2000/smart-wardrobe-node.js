import { Schema, model, Document, Model } from "mongoose";

export interface IWeatherLog extends Document {
  externalData: {
    temperature: number;
  };
  internalData: {
    temperature: number;
    humidity: number;
  };
  location: {
    lat: number;
    lng: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const weatherLogSchema = new Schema<IWeatherLog>(
  {
    externalData: {
      temperature: { type: Number, required: true },
    },
    internalData: {
      temperature: { type: Number, required: true },
      humidity: { type: Number, required: true },
    },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const WeatherLog: Model<IWeatherLog> = model<IWeatherLog>(
  "WeatherLog",
  weatherLogSchema
);

export default WeatherLog;

import { Request, Response } from "express";
import WeatherLog, { IWeatherLog } from "../models/Watch";

export const addWeatherLog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { externalData, internalData, location } = req.body;

    if (!externalData || !internalData || !location) {
      res.status(400).json({ message: "Missing required weather log data" });
      return;
    }

    const newLog: IWeatherLog = new WeatherLog({
      externalData,
      internalData,
      location,
    });

    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (error) {
    res.status(500).json({ message: "Error saving weather log", error });
  }
};

export const getWeatherLogs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit;

    const logsPromise = WeatherLog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const countPromise = WeatherLog.countDocuments();

    const [logs, totalLogs] = await Promise.all([logsPromise, countPromise]);

    res.status(200).json({
      page,
      limit,
      totalLogs,
      totalPages: Math.ceil(totalLogs / limit),
      data: logs,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving weather logs", error });
  }
};

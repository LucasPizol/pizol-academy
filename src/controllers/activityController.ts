import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import { ActivityService } from "../services/activityService";
import { ReactPdfService } from "../services/reactPdfService";
import { RandomString } from "../helpers/randomString";
import { ClassHasUserService } from "../services/classHasUserService";
import fs from "fs";
import path from "path";


export abstract class ActivityController {
  static async create(req: AuthRequest, res: Response) {
    const { id } = req.user!;
    const {
      title,
      resume,
      objectives,
      total_time,
      recurses,
      guide,
      abilities,
      classId,
    } = req.body;

    const newData = {
      title,
      resume,
      objectives,
      total_time,
      recurses,
      guide,
      abilities,
      classId,
      isActive: true,
    };

    try {
      const pdfFileName = RandomString.generateRandomString(9);

      const newActivity = await ActivityService.create({
        ...newData,
        pdf_file_url: pdfFileName,
        userId: id,
      });

      await ReactPdfService.saveData(pdfFileName, {
        ...newActivity,
        isActive: true,
        userId: id,
      });

      return res.status(200).json(newActivity);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }

  static async update(req: AuthRequest, res: Response) {
    const { id } = req.user!;
    const { activityId } = req.params;

    const {
      title,
      resume,
      objectives,
      total_time,
      recurses,
      guide,
      abilities,
      classId,
    } = req.body;

    const getActivity = await ActivityService.getById(Number(activityId));

    if (getActivity?.userId !== id) {
      return res.status(401).json({
        error: "Você não tem permissão para atualizar esta atividade.",
      });
    }

    if (!getActivity) {
      return res.status(404).json({ error: "Atividade não encontrada." });
    }

    const pdfFileName = getActivity.pdf_file_url;

    const newData = {
      title,
      resume,
      objectives,
      total_time,
      recurses,
      guide,
      abilities,
      isActive: true,
      classId,
    };

    try {
      const activity = await ActivityService.update({
        ...newData,
        pdf_file_url: getActivity.pdf_file_url,
        userId: id,
        id: Number(activityId),
      });

      await ReactPdfService.saveData(pdfFileName, {
        ...activity,
        isActive: true,
      });

      return res.status(200).json(activity);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  static async deactivate(req: AuthRequest, res: Response) {
    const { id } = req.user!;
    const { activityId } = req.params;

    const getActivity = await ActivityService.getById(Number(activityId));

    if (getActivity?.userId !== id) {
      return res.status(401).json({
        error: "Você não tem permissão para desativar esta atividade.",
      });
    }

    if (!getActivity) {
      return res.status(404).json({ error: "Atividade não encontrada." });
    }

    try {
      const activity = await ActivityService.deactivate(Number(activityId));

      await ReactPdfService.saveData(getActivity.pdf_file_url, {
        ...activity,
        isActive: false,
      });

      return res.status(200).json(activity);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  static async activate(req: AuthRequest, res: Response) {
    const { id } = req.user!;
    const { activityId } = req.params;

    const getActivity = await ActivityService.getById(Number(activityId));

    if (getActivity?.userId !== id) {
      return res.status(401).json({
        error: "Você não tem permissão para ativar esta atividade.",
      });
    }

    if (!getActivity) {
      return res.status(404).json({ error: "Atividade não encontrada." });
    }

    const pdfFileName = getActivity.pdf_file_url.split("/")[1];

    try {
      const activity = await ActivityService.activate(Number(activityId));

      await ReactPdfService.saveData(pdfFileName, {
        ...activity,
        isActive: true,
      });

      return res.status(200).json(activity);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }

  static async getById(req: AuthRequest, res: Response) {
    const { id } = req.params;

    try {
      const activity = await ActivityService.getById(Number(id));

      return res.status(200).json(activity);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}

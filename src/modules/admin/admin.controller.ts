import { Response, Request } from "express";
import * as path from "path";

import { CreateAdminDto, UpdateAdminDto } from "./dto";
import { adminService } from ".";
import { HttpException } from "../../infra/validation";

export async function getAll(req: Request, res: Response) {
  try {
    const data = await adminService.getAll();
    res.send(data);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await adminService.getById(id);
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function getByFilialId(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await adminService.getByFilialId(id);
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function create(req, res: Response) {
  try {
    let objectiveName = String(Date.now()) + req.files?.objective?.name;
    let objectiveUrl =
      req.protocol + "://" + req.hostname + "/" + objectiveName;
    const objectivePath = process.cwd() + "/uploads/" + objectiveName;
    let mehnatName = String(Date.now()) + req.files?.mehnat?.name;
    let mehnatUrl = req.protocol + "://" + req.hostname + "/" + mehnatName;
    const mehnatPath = process.cwd() + "/uploads/" + mehnatName;
    req.files?.objective?.mv(objectivePath);
    req.files?.mehnat?.mv(mehnatPath);

    const createData: CreateAdminDto = req.body;

    const response = await adminService.create({
      ...createData,
      objectivePath,
      objectiveUrl,
      mehnatPath,
      mehnatUrl,
    });
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function deleteData(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await adminService.remove(id);
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function update(req, res: Response) {
  try {
    const { id } = req.params;
    let objectiveUrl = null,
      objectivePath = null,
      mehnatUrl = null,
      mehnatPath = null;
    if (req?.files) {
      if (req.files?.objective) {
        objectiveUrl = String(Date.now()) + req.files?.objective?.name;
        objectivePath = process.cwd() + "/uploads/" + objectiveUrl;
        req.files?.objective?.mv(objectivePath);
      }
      if (req.files?.mehnat) {
        mehnatUrl = String(Date.now()) + req.files?.mehnat?.name;
        mehnatPath = process.cwd() + "/uploads/" + mehnatUrl;
        req.files?.mehnat?.mv(mehnatPath);
      }
    }

    const updateData: UpdateAdminDto = req.body;
    const response = await adminService.update(
      { ...updateData, objectivePath, objectiveUrl, mehnatPath, mehnatUrl },
      id,
    );
    res.send(response);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

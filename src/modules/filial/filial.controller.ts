import { Request, Response } from "express";
import { CreateFilialDto, UpdateFilialDto } from "./dto";

import { filialService } from ".";
import { HttpException } from "../../infra/validation";

export async function getAll(req: Request, res: Response) {
  try {
    const positions = await filialService.getAll();
    res.send(positions);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = await filialService.getById(id);
    res.send(data);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function getByLoginANdPassword(req: Request, res: Response) {
  try {
    const { login, password } = req.body;
    const data = await filialService.getByLoginAndPassword(login, password);
    res.send(data);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function create(req: Request, res: Response) {
  try {
    const createData: CreateFilialDto = req.body;
    const position = await filialService.create(createData);
    res.send(position);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updateData: UpdateFilialDto = req.body;
    const position = await filialService.update(updateData, id);
    res.send(position);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const position = await filialService.remove(id);
    res.send(position);
  } catch (err) {
    res.status(500).send(new HttpException(true, 500, err.message));
  }
}

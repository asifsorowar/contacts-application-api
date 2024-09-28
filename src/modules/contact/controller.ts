import { Request, Response } from "express";
import { ContactService } from "./service";
import { REQ_GETS_QUERIES } from "@root/global";
import { Contact } from "./types";

export class ContactController {
  private contactService = new ContactService();

  gets = async (
    req: Request<any, any, any, REQ_GETS_QUERIES>,
    res: Response
  ): Promise<Response> => {
    let { limit, offset } = req.query;

    limit = Number(limit) ? parseInt(limit as string) : 20;
    offset = Number(offset) ? parseInt(offset as string) : 0;

    const totalCrises = await this.contactService.getTotalContactsByUserId(
      req.auth?.id as number
    );

    const crises = await this.contactService.getContactsByUserId({
      userId: req.auth?.id as number,
      limit,
      offset,
    });

    const result = {
      data: crises,
      totalCounts: totalCrises,
      nextOffset: crises.length === limit ? limit + offset + 1 : NaN,
    };

    return res.status(200).send(result);
  };

  get = async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<Response> => {
    const contactId = parseInt(req.params.id);

    const contact = await this.contactService.getUserContactById(
      req.auth?.id as number,
      contactId
    );
    if (!contact) return res.status(404).send("contact not found!");

    return res.status(201).send(contact);
  };

  create = async (
    req: Request<any, any, Contact>,
    res: Response
  ): Promise<Response> => {
    const payload = req.body;

    let contact = await this.contactService.createContact({
      ...payload,
      createdById: req.auth?.id as number,
    });

    return res.status(201).send(contact);
  };

  update = async (
    req: Request<{ id: string }, any, any, Partial<Contact>>,
    res: Response
  ): Promise<Response> => {
    const contactId = parseInt(req.params.id);
    const payload = req.body;

    let contact = await this.contactService.getUserContactById(
      req.auth?.id as number,
      contactId
    );
    if (!contact) return res.status(400).send("invalid contact id!");

    contact = await this.contactService.updateContact(contact.id, payload);

    return res.status(200).send(contact);
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<Response> => {
    const contactId = parseInt(req.params.id);

    let contact = await this.contactService.getUserContactById(
      req.auth?.id as number,
      contactId
    );
    if (!contact) return res.status(404).send("already deleted!");

    contact = await this.contactService.deleteContact(contact.id);

    return res.status(200).send(contact);
  };
}

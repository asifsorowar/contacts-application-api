import { prisma } from "@database";
import { Contact } from "./types";

export class ContactService {
  public async createContact(data: Contact) {
    return await prisma.contacts.create({ data });
  }

  public async updateContact(id: number, data: Partial<Contact>) {
    return await prisma.contacts.update({
      data,
      where: {
        id: id,
      },
    });
  }

  public async deleteContact(id: number) {
    return await prisma.contacts.delete({
      where: {
        id: id,
      },
    });
  }

  public async getTotalContactsByUserId(userId: number) {
    return await prisma.contacts.count({
      where: {
        createdById: userId,
      },
    });
  }

  public async getContactsByUserId({
    userId,
    limit,
    offset,
  }: {
    userId: number;
    limit: number;
    offset: number;
  }) {
    return await prisma.contacts.findMany({
      take: limit,
      skip: offset,
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
      },
      where: {
        createdById: userId,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  }

  public async getUserContactById(userId: number, contactId: number) {
    return await prisma.contacts.findFirst({
      where: {
        id: contactId,
        createdById: userId,
      },
    });
  }
}

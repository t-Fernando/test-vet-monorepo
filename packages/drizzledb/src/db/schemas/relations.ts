import { relations } from 'drizzle-orm';
import {
  creditAccount,
  client,
  taxInformation,
  petDeworming,
  pet,
  petVaccination,
  petToClient,
} from './tables';

export const creditAccountRelations = relations(creditAccount, ({ one }) => {
  return {
    client: one(client, {
      fields: [creditAccount.clientId],
      references: [client.id],
    }),
  };
});

export const clientRelations = relations(client, ({ one, many }) => {
  return {
    creditAccount: one(creditAccount, {
      fields: [client.id],
      references: [creditAccount.clientId],
    }),
    taxInformation: one(taxInformation, {
      fields: [client.id],
      references: [taxInformation.clientId],
    }),
    petToClient: many(petToClient),
  };
});

export const taxInformationRelations = relations(taxInformation, ({ one }) => {
  return {
    client: one(client, {
      fields: [taxInformation.clientId],
      references: [client.id],
    }),
  };
});

export const petDewormingRelations = relations(petDeworming, ({ one }) => {
  return {
    pet: one(pet, {
      fields: [petDeworming.idPet],
      references: [pet.id],
    }),
  };
});

export const petRelations = relations(pet, ({ many }) => {
  return {
    petDeworming: many(petDeworming),
    petVaccination: many(petVaccination),
    petToClient: many(petToClient),
  };
});

export const petVaccinationRelations = relations(petVaccination, ({ one }) => {
  return {
    pet: one(pet, {
      fields: [petVaccination.petId],
      references: [pet.id],
    }),
  };
});

export const petToClientRelations = relations(petToClient, ({ one }) => {
  return {
    pet: one(pet, {
      fields: [petToClient.petId],
      references: [pet.id],
    }),
    client: one(client, {
      fields: [petToClient.clientId],
      references: [client.id],
    }),
  };
});

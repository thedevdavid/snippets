// REPLACE THIS FILE BY GENERATING THE AUTH SCHEMA USING https://www.better-auth.com/docs/installation#create-database-tables

export const schema = {
  users: {
    id: "id",
    email: "email",
    password: "password",
  },
  sessions: {
    id: "id",
    userId: "userId",
    expiresAt: "expiresAt",
    token: "token",
  },
};

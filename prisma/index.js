//Para usar Prisma en el resto de la aplicación

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports.get = async (request, response, next) => {
  const detalle_usuarioTipo = await prisma.detalle_UsuarioTipo.findMany({
   
  });
  response.json(detalle_usuarioTipo);
};




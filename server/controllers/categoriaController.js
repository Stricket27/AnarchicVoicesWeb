const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports.get = async (request, response, next) => {
  const categoria = await prisma.categoria.findMany({
    orderBy:{
      descripcion: 'asc'
    },
  });
  response.json(categoria);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let id=parseInt(request.params.id);
    const categoria=await prisma.categoria.findUnique({
        where: { id_categoria: id }
    })
    response.json(categoria);
};


const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports.get = async (request, response, next) => {
  const fotografia = await prisma.fotografia.findMany({
    orderBy: {
      id_fotografia: "asc",
    },
  });
  response.json(fotografia);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const fotografia = await prisma.fotografia.findUnique({
    where: { id_fotografia: id },
    include: {
      producto: true,
    },
  });
  response.json(fotografia);
};

//Crear
module.exports.create = async (request, response, next) => {
  let fotografia = request.body;
  const newFotografia = await prisma.fotografia.create({
    data: {
      fotografia: fotografia.fotografia,
      estado_actual: fotografia.estado_actual,
      producto: {
        connect: fotografia.producto,
      },
    },
  });
  response.json(newFotografia);
};

module.exports.update = async (request, response, next) => {
  let fotografia = request.body;
  let idFotografia = parseInt(request.params.id);
  const fotografiaViejo = await prisma.fotografia.findUnique({
    where: { id_fotografia: idFotografia },
    include: {
      producto: {
        select: {
          id_producto: true,
        },
      },
    },
  });

  const newFotografia = await prisma.fotografia.update({
    where: {
      id_fotografia: idFotografia,
    },
    data: {
      fotografia: fotografia.fotografia,
      estado_actual: fotografia.estado_actual,
      producto: {
        disconnect: fotografiaViejo.producto,
        connect: fotografia.producto,
      },
    },
  });
  response.json(newFotografia);
};

module.exports.EliminarFotografias = async (request, response, next) => {
  try {
    let id = parseInt(request.params.id);
    console.log(id);
    await prisma.fotografia.update({
      where: {
        id_fotografia: id,
      },

      data: {
        estado_actual: "Inactivo",
      },
    });
    console.log(response.json(id))
  } catch (error) {
    console.log(error);
  }
};

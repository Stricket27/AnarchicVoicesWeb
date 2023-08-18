const { PrismaClient } = require("@prisma/client");
const { response } = require("express");
const { request } = require("http");
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const direccion = await prisma.direccion.findMany({
    orderBy: {
      id_direccion: "asc",
    },
    include:{
      usuario: true
    },
  }); 
  response.json(direccion); 
};  
 
module.exports.getById = async (request, response,  next) => {
  let id = parseInt(request.params.id);
  const direccion = await prisma.direccion.findUnique({
    where: { id_direccion: id },
    include: {
      usuario: {
        select: {
          id_usuario: true,
        },
      },
    },
  });
  response.json(direccion);
};

module.exports.create = async (request, response, next) => {
  let direccion = request.body;

  const newDireccion = await prisma.direccion.create({
    data: { 
      provincia: direccion.provincia,
      canton: direccion.canton,
      distrito: direccion.distrito,
      direccion_exacta: direccion.direccion_exacta,
      codigo_postal: direccion.codigo_postal,
      telefono: direccion.telefono, 
      estado_actual: direccion.estado_actual,
      usuario: { connect: { id_usuario: direccion.usuario } }, 
    },
  });
  response.json(newDireccion);
};

module.exports.update = async (request, response, next) => {
  let direccion = request.body;
  const { id_direccion } = request.body;
  console.log(request.body);

  const newDireccion = await prisma.direccion.update({
    where: {
      id_direccion: id_direccion,
    },
    provincia: direccion.provincia,
    canton: direccion.canton,
    distrito: direccion.distrito,
    direccion_exacta: direccion.direccion_exacta,
    codigo_postal: direccion.codigo_postal,
    telefono: direccion.telefono,
    estado_actual: direccion.estado_actual,
    usuario: { connect: { id_usuario: direccion.usuario } },
  });
  response.json(newDireccion);
};

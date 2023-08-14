const { PrismaClient } = require("@prisma/client");
const { response } = require("express");
const { request } = require("http");

const prisma = new PrismaClient();
module.exports.get = async (request, response, next) => {
  const metodoPago = await prisma.metodoPago.findMany({
    orderBy: {
      numeroCuenta: "asc",
    },
  });
  response.json(metodoPago);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const metodoPago = await prisma.metodoPago.findUnique({
    where: { id_metodoPago: id },
    include: {
      usuario: {
        select: {
          id_usuario: true,
        },
      },
      tipoPago: {
        select: {
          id_tipoPago: true,
        },
      },
    },
  });
  response.json(metodoPago);
};

module.exports.create = async (request, response, next) => {
  let metodoPago = request.body;

  const newMetodoPago = await prisma.metodoPago.create({
    data: {
      numeroCuenta: metodoPago.numeroCuenta,
      mesVencimiento: metodoPago.mesVencimiento,
      annoVencimiento: metodoPago.annoVencimiento,
      codigoSeguridad: metodoPago.codigoSeguridad,
      estado_actual: metodoPago.estado_actual,
      usuario: { connect: { id_usuario: metodoPago.usuario } },
      tipoPago: { connect: { id_tipoPago: metodoPago.tipoPago } },
    },
  });
  response.json(newMetodoPago);
};

module.exports.update = async (request, response, next) => {
  let metodoPago = request.body;
  const { id_metodoPago } = request.body;
  console.log(request.body);

  const newMetodoPago = await prisma.metodoPago.update({
    where: {
      id_metodoPago: id_metodoPago,
    },
    numeroCuenta: metodoPago.numeroCuenta,
    mesVencimiento: metodoPago.mesVencimiento,
    annoVencimiento: metodoPago.annoVencimiento,
    codigoSeguridad: metodoPago.codigoSeguridad,
    estado_actual: metodoPago.estado_actual,
    usuario: { connect: { id_usuario: metodoPago.usuario } },
    tipoPago: { connect: { id_tipoPago: metodoPago.id_tipoPago } },
  });
  response.json(newMetodoPago);
};

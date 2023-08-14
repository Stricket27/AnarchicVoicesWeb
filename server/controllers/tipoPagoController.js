const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports.get = async (request, response, next) => {
  const tipoPago = await prisma.tipoPago.findMany({
    orderBy:{
      descripcion: 'asc'
    },
  });
  response.json(tipoPago);
};
//locahost:3000/tipoUsuario/2
module.exports.getById = async (request, response, next) => {
    let id=parseInt(request.params.id);
    const tipoPago=await prisma.tipoPago.findUnique({
        where: { id_tipoPago: id }
    })
    response.json(tipoPago);
};

// module.exports.create = async (request, response, next) => {
//   let tipousuario = request.body;
//   const newTipoUsuario = await prisma.tipousuario.create({
//     data: {
//       descripcion: tipousuario.descripcion,
//       estado_actual: tipousuario.estado_actual
//     },
//   });
//   response.json(newTipoUsuario);
// };

// module.exports.update = async (request, response, next) => {
//   let tipoUsuario = request.body;
//   let idtipoUsuario = parseInt(request.params.id);

//   const newtipoUsuario = await prisma.tipoUsuario.update({
//     where: {
//       id: idtipoUsuario,
//     },
//     data: {
//         descripcion: tipoUsuario.descripcion,
//         estado_actual: tipoUsuario.estado_actual
//     },
//   });
//   response.json(newtipoUsuario);
// };

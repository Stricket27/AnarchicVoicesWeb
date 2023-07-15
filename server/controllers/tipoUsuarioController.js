const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports.get = async (request, response, next) => {
  const tipousuario = await prisma.tipoUsuario.findMany({
    orderBy:{
      descripcion: 'asc'
    },
  });
  response.json(tipousuario);
};

//Obtener listado
// module.exports.get = async (request, response, next) => {
//   const tipousuario = await prisma.tipousuario.findMany({
//     orderBy: {
//       descripcion: 'asc',
//     },
//    /*  select: {
//       id: true,
//       nombre: true,
//     }, */
//   });
//   response.json(tipousuario);
// };
//Obtener por Id
//locahost:3000/tipoUsuario/2
module.exports.getById = async (request, response, next) => {
    let id=parseInt(request.params.id);
    const tipoUsuario=await prisma.tipousuario.findUnique({
        where: { id: id }
    })
    response.json(tipoUsuario);
};
//Crear un tipoUsuario
module.exports.create = async (request, response, next) => {
  let tipousuario = request.body;
  const newTipoUsuario = await prisma.tipousuario.create({
    data: {
      descripcion: tipousuario.descripcion,
      estado_actual: tipousuario.estado_actual
    },
  });
  response.json(newTipoUsuario);
};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
  let tipoUsuario = request.body;
  let idtipoUsuario = parseInt(request.params.id);
  //Obtener usuario viejo
//    const tipoUsuarioViejo = await prisma.tipoUsuario.findUnique({
//      where: { id: idtipoUsuario }
//    });

  const newtipoUsuario = await prisma.tipoUsuario.update({
    where: {
      id: idtipoUsuario,
    },
    data: {
        descripcion: tipoUsuario.descripcion,
        estado_actual: tipoUsuario.estado_actual
    },
  });
  response.json(newtipoUsuario);
};

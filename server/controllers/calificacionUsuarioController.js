const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports.get = async (request, response, next) => {
  const calificacionUsuario = await prisma.calificacionUsuario.findMany({
    orderBy:{
      vendedor_cliente: 'asc'
    },
  });
  response.json(calificacionUsuario);
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
    const calificacionUsuario=await prisma.calificacionUsuario.findUnique({
        where: { id: id }
    })
    response.json(calificacionUsuario);
};
//Crear un tipoUsuario
module.exports.create = async (request, response, next) => {
  let calificacionUsuario = request.body;
  const newCalificacionUsuario = await prisma.calificacionUsuario.create({
    data: {
        vendedor_cliente: calificacionUsuario.vendedor_cliente,
        calificacion: calificacionUsuario.calificacion,
        // calificacion_promedio: calificacionUsuario.calificacion_promedio
        id_usuario: calificacionUsuario.id_usuario
    },
  });
  response.json(newCalificacionUsuario);
};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
  let calificacionUsuario = request.body;
  let idCalificacionUsuario = parseInt(request.params.id);
  //Obtener usuario viejo
//    const tipoUsuarioViejo = await prisma.tipoUsuario.findUnique({
//      where: { id: idtipoUsuario }
//    });

  const newCalificacionUsuario = await prisma.calificacionUsuario.update({
    where: {
      id: idCalificacionUsuario,
    },
    data: {
        vendedor_cliente: calificacionUsuario.vendedor_cliente,
        calificacion: calificacionUsuario.calificacion,
        // calificacion_promedio: calificacionUsuario.calificacion_promedio
        id_usuario: calificacionUsuario.id_usuario
    },
  });
  response.json(newCalificacionUsuario);
};

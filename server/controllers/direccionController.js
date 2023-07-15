const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports.get = async (request, response, next) => {
  const direccion = await prisma.direccion.findMany({
    orderBy:{
      provincia: 'asc'
    },
  });
  response.json(direccion);
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
    const direccion=await prisma.direccion.findUnique({
        where: { id: id }
    })
    response.json(direccion);
};
//Crear un tipoUsuario
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
        id_usuario: direccion.id_usuario
    },
  });
  response.json(newDireccion);
};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
  let direccion = request.body;
  let idDireccion = parseInt(request.params.id);
  //Obtener usuario viejo
//    const tipoUsuarioViejo = await prisma.tipoUsuario.findUnique({
//      where: { id: idtipoUsuario }
//    });

  const newDireccion = await prisma.calidireccionficacionUsuario.update({
    where: {
      id: idDireccion,
    },
    data: {
        provincia: direccion.provincia,
        canton: direccion.canton,
        distrito: direccion.distrito,
        direccion_exacta: direccion.direccion_exacta,
        codigo_postal: direccion.codigo_postal,
        telefono: direccion.telefono,
        estado_actual: direccion.estado_actual,
        id_usuario: direccion.id_usuario
    },
  });
  response.json(newDireccion);
};

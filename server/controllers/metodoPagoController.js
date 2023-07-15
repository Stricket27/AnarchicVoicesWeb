const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const mp = await prisma.metodoPago.findMany({
   
  
  });
  response.json(mp);
};
//Obtener por Id
//locahost:3000/usuario/2
module.exports.getById = async (request, response, next) => {
    let id=parseInt(request.params.id);
    const mp = await prisma.metodoPago.findUnique({
      where: { id_metodoPago: id },
      include: {
        usuario: {
          include: {
            tipoPago: true
          }
        }
      }
    });
    response.json(mp);
};
//Crear 
module.exports.create = async (request, response, next) => {
  let metodoP = request.body;
  const newMetodoP = await prisma.metodoPago.create({
    data: {
      numeroCuenta: metodoP.numeroCuenta,
      fechaExpiracion: metodoP.fechaExpiracion,
      estado_actual: "Activo",
      id_usuario: metodoP.id_usuario,
      id_tipoPago: metodoP.id_tipoPago,
    },
  });
  response.json(newMetodoP);
};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
  let metodoP = request.body;
  let idMp = parseInt(request.params.id);
  //Obtener usuario viejo
  // const usuarioViejo = await prisma.usuario.findUnique({
  //   where: { id: idUsuario }
  // });

  const newMetodoP = await prisma.metodoPago.update({
    where: {
      id: idMp,
    },
    data: {
      numeroCuenta: metodoP.numeroCuenta,
      fechaExpiracion: metodoP.fechaExpiracion,
      estado_actual: "Activo",
      id_usuario: metodoP.id_usuario,
      id_tipoPago: metodoP.id_tipoPago,
    },
  });
  response.json(newMetodoP);
};

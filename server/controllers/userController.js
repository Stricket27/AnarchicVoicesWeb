const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const usuario = await prisma.usuario.findMany({
    orderBy: {
      nombre: 'asc',
    },
   /*  select: {
      id: true,
      nombre: true,
    }, */
  });
  response.json(usuario);
};
//Obtener por Id
//locahost:3000/usuario/2
module.exports.getById = async (request, response, next) => {
    let id=parseInt(request.params.id);
    const usuario=await prisma.usuario.findUnique({
        where: { id_usuario: id }
        // include:{
        //     generos:true
        // }
    })
    response.json(usuario);
};
//Crear un usuario
module.exports.create = async (request, response, next) => {
  let usuario = request.body;
  const newUsuario = await prisma.usuario.create({
    data: {
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      numero_telefono: usuario.numero_telefono,
      correo_electronico: usuario.correo_electronico,
      contrasenna: usuario.contrasenna,
      estado_actual: "Activo"
    },
  });
  response.json(newVideojuego);
};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
  let usuario = request.body;
  let idUsuario = parseInt(request.params.id);
  //Obtener usuario viejo
  // const usuarioViejo = await prisma.usuario.findUnique({
  //   where: { id: idUsuario }
  // });

  const newUsuario = await prisma.usuario.update({
    where: {
      id: idUsuario,
    },
    data: {
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      numero_telefono: usuario.numero_telefono,
      correo_electronico: usuario.correo_electronico,
      contrasenna: usuario.contrasenna,
      estado_actual: "Activo"
    },
  });
  response.json(newUsuario);
};

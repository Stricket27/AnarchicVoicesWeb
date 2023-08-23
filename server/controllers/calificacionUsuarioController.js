const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports.get = async (request, response, next) => {
  const calificacionUsuario = await prisma.calificacionUsuario.findMany({
    orderBy:{
      vendedor_cliente: 'asc'
    },
  });
  response.json(calificacionUsuario);
};

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

//DASHBOARD
module.exports.getCalificacionUsuarioTop3 = async (request, response, next) => {
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT nombre, apellidos, AVG(c.calificacion) AS promedio_calificaciones
    FROM Usuario u
    INNER JOIN calificacionusuario c ON u.id_usuario = c.id_usuario
    GROUP BY u.id_usuario, u.nombre, u.apellidos
    ORDER BY promedio_calificaciones
    LIMIT 3`
  )
  response.json(result);
};


module.exports.getCalificacionUsuarioTop5 = async (request, response, next) => {
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT nombre, apellidos, AVG(c.calificacion) AS promedio_calificaciones
    FROM Usuario u
    LEFT JOIN calificacionusuario c ON u.id_usuario = c.id_usuario
    GROUP BY u.id_usuario, u.nombre, u.apellidos
    ORDER BY promedio_calificaciones DESC
    LIMIT 5`
  )
  response.json (result)
}



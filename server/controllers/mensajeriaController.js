const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports.get = async (request, response, next) => {
  const mensajeria = await prisma.mensajeria.findMany({
    orderBy:{
      asunto: 'asc'
    }
  });
  response.json(mensajeria)
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let id=parseInt(request.params.id);
    const mensajeria=await prisma.mensajeria.findUnique({
        where: { id_mensajeria: id },
        include: {
          producto:{
            select:{
                nombre: true,
                descripcion: true
            }
          },
          usuario: {
            select:{
              nombre: true,
              apellidos: true
            }
          }
        }
    })
    response.json(mensajeria);
};
//Crear 
module.exports.create = async (request, response, next) => {
  let mensajeria = request.body;
  const newMensaje = await prisma.mensajeria.create({
    data: {
        asunto: mensajeria.asunto,
        mensaje: mensajeria.mensaje,
        respuesta: mensajeria.respuesta,
        estado_actual: mensajeria.estado_actual,
        usuario: { connect: { id_usuario: mensajeria.usuario } },
        producto: { connect: { id_producto: mensajeria.producto } }
    },
  });
  response.json(newMensaje);
};
//Actualizar 
module.exports.update = async (request, response, next) => {
  let mensajeria = request.body;
  let idMensajeria = parseInt(request.params.id);
  //Obtener producto viejo
    const mensajeViejo = await prisma.mensajeria.findUnique({
      where: { id_mensajeria: idMensajeria },
      include:{
        producto:{
          select:{
            id_producto: true
          }
        },
        usuario:{
          select:{
            id_usuario:true
          }
        }
      }
    });

 


  const newMensajeria = await prisma.mensajeria.update({
    where: {
      id_mensajeria: idMensajeria,
    },
    data: {
        asunto: mensajeria.asunto,
        mensaje: mensajeria.mensaje,
        respuesta: mensajeria.respuesta,
        estado_actual: mensajeria.estado_actual,
        usuario: { connect: { id_usuario: mensajeria.usuario } },
        producto: { connect: { id_producto: mensajeria.producto } }
    },
  });
  response.json(newMensajeria);
};

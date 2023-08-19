const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { Role } = require("@prisma/client");
const jwt = require("jsonwebtoken");
//--npm install bcrypt
const bcrypt = require("bcrypt");
//Obtener listado
module.exports.get = async (request, response, next) => {
  const usuario = await prisma.usuario.findMany({
    orderBy: {
      nombre: "asc",
    },
    include: {
      detalle_usuarioTipo: true,
    },
  });
  response.json(usuario);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const usuario = await prisma.usuario.findUnique({
    where: { id_usuario: id },
  });
  response.json(usuario);
};

//Actualizar un usuario
module.exports.update = async (request, response, next) => {
  let usuario = request.body;
  const { id_usuario } = request.body;
  console.log(request.body);
  // let usuario = request.body;
  // let IDUsuario = parseInt(request.params.id);

  // const usuarioViejo = await prisma.usuario.findUnique({
  //   where: { id_usuario: IDUsuario},
  //     nombre: true,
  //     apellidos: true,
  //     numero_telefono: true,
  //     correo_electronico: true,
  //     contrasenna: true,
  //     estado_actual: true
  // });

  // console.log(usuarioViejo);

  const newUsuario = await prisma.usuario.update({
    where: {
      id_usuario: id_usuario,
    },
    data: {
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      numero_telefono: usuario.numero_telefono,
      correo_electronico: usuario.correo_electronico,
      contrasenna: usuario.contrasenna,
      estado_actual: usuario.estado_actual,
    },
  });
  response.json(newUsuario);
};

//Crear nuevo usuario
module.exports.register = async (request, response, next) => {
  const userData = request.body;
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(userData.contrasenna, salt);

  const user = await prisma.usuario.create({
    data: {
      nombre: userData.nombre,
      apellidos: userData.apellidos,
      numero_telefono: userData.numero_telefono,
      correo_electronico: userData.correo_electronico,
      contrasenna: hash,
      estado_actual: userData.estado_actual,
    },
  });
  await prisma.detalle_UsuarioTipo.createMany({
    data: userData.tipoUsuario.map((id_tipoUsuario) => ({
      id_usuario: user.id_usuario,
      id_tipoUsuario: id_tipoUsuario,
    })),
  });
  // const tipoUsuariosPermitidos = ["Vendedor", "Cliente"];
  // const tipoUsuariosValidos = userData.tipoUsuario.filter((tipo) =>
  //   tipoUsuariosPermitidos.includes(tipo)
  // );

  // for (const tipo of tipoUsuariosValidos) {
  //   await prisma.detalle_UsuarioTipo.create({
  //     data: {
  //       id_usuario: user.id_usuario,
  //       id_tipoUsuario: tipo,
  //     },
  //   });
  // }

  response.status(200).json({
    status: true,
    message: "Usuario creado",
    data: user,
  });
};

module.exports.login = async (request, response, next) => {
  let userReq = request.body;
  const user = await prisma.usuario.findUnique({
    where: {
      correo_electronico: userReq.correo_electronico,
    },

    include: { detalle_usuarioTipo: true },
  });
  if (!user) {
    response.status(401).send({
      success: false,
      message: "Usuario no registrado",
    });
  } else if (user.estado_actual !== "Activo") {
    response.status(401).send({
      success: false,
      message: "Usuario no está activo",
    });
    return;
  } else {
    const checkPassword = await bcrypt.compare(
      userReq.contrasenna,
      user.contrasenna
    );
    if (checkPassword === false) {
      response.status(401).send({
        success: false,
        message: "Credenciales no valido",
      });
    } else {
      const payload = {
        correo_electronico: user.correo_electronico,
        detalle_usuarioTipo: user.detalle_usuarioTipo,
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      response.json({
        success: true,
        message: "Usuario registrado",
        data: {
          user,
          token,
        },
      });
    }
  }
};

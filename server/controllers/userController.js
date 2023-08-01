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
      nombre: 'asc',
    },
  });
  response.json(usuario);
};
//Obtener por Id
//locahost:3000/usuario/2
module.exports.getById = async (request, response, next) => {
    let id=parseInt(request.params.id);
    const usuario=await prisma.usuario.findUnique({
        where: { id_usuario: id }
    })
    response.json(usuario);
};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
  let usuario = request.body;
  let idUsuario = parseInt(request.params.id);

  const newUsuario = await prisma.usuario.update({
    where: {
      id_usuario: idUsuario,
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
//Crear nuevo usuario
module.exports.register = async (request, response, next) => {
  const userData = request.body;

  //Salt es una cadena aleatoria.
  //"salt round" factor de costo controla cuánto tiempo se necesita para calcular un solo hash de BCrypt
  // salt es un valor aleatorio y debe ser diferente para cada cálculo, por lo que el resultado casi nunca debe ser el mismo, incluso para contraseñas iguales
  let salt = bcrypt.genSaltSync(10);
  // Hash password
  let hash = bcrypt.hashSync(userData.contrasenna, salt);

  const user = await prisma.usuario.create({
    data: {
      nombre: userData.nombre,
      apellidos: userData.apellidos,
      numero_telefono: userData.numero_telefono,
      correo_electronico: userData.correo_electronico, 
      contrasenna: hash,
      estado_actual: userData.estado_actual,
    }
  });
  await prisma.detalle_UsuarioTipo.createMany({
    data: userData.tipoUsuario.map((id_tipoUsuario) => ({
      id_usuario: user.id_usuario,
      id_tipoUsuario: id_tipoUsuario,
    })),
  });


  response.status(200).json({
    status: true,
    message: "Usuario creado",
    data: user,
  });
};

module.exports.login = async (request, response, next) => {
  let userReq = request.body;
  //Buscar el usuario según el email dado
  const user = await prisma.usuario.findUnique({
    where: {
      correo_electronico: userReq.correo_electronico,
    },
  });
  //Sino lo encuentra según su email
  if (!user) {
    response.status(401).send({
      success: false,
      message: "Usuario no registrado",
    });
  }
  //Verifica la contraseña
  const checkPassword = await bcrypt.compare(userReq.contrasenna, user.contrasenna);
  if(checkPassword===false){
    response.status(401).send({
      success: false,
      message: "Credenciales no valido",
    });
  }
  else{
    //Si el usuario es correcto: email y password
    //Payload
    //Guarda y lo verifica en el API
    const payload={
      correo_electronico: user.correo_electronico,
      // role: user.role,
    }
    //Crear el token
    const token= jwt.sign(payload, process.env.SECRET_KEY,
      {expiresIn: process.env.JWT_EXPIRE})
      response.json({
        success: true,
        message: "Usuario registrado",
        data:{
          user,
          token
        }
  })
}
};

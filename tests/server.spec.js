const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  //     Testea que la ruta GET /cafes devuelve un status
  //code 200 y el tipo de dato recibido
  // es un arreglo con por lo menos 1 objeto

  it("/get status 200 retorna arreglo 1 objeto", async () => {
    const response = await request(server).get("/cafes");
    //Verificar el código de estado
    expect(response.status).toBe(200);
    //Verificar que el cuerpo de la respuesta sea un arreglo
    expect(Array.isArray(response.body)).toBe(true);
    //Verificar que el arreglo tenga al menos un objeto
    expect(response.body.length).toBeGreaterThan(0);
  });

  //Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que
  //no existe
  it("Debería obtener un código 404 al intentar eliminar un café inexistente", async () => {
    const response = await request(server).delete("/productos/999");
    //Verificar el código de estado
    expect(response.status).toBe(404);
    //Verificar la respuesta
    expect(response.body).toHaveProperty(
      "message",
      "La ruta que intenta consultar no existe"
    );
  });

  //Prueba que la ruta POST /cafes agrega un nuevo café y
  //devuelve un código 201.
  it("/post/cafes/ agrega productos y devuelve código 201", async () => {
    //Ingresar un nuevo cafe
    const nuevoCafe = {
      id: 5,
      nombre: "Latte",
    };
    const response = await request(server).post("/cafes").send(nuevoCafe);

    const body = response.body;
    //Verificar estado de la solicitud
    expect(response.status).toBe(201);
    expect(body).toContainEqual(nuevoCafe);
  });

  //Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un
  //café enviando un id en los parámetros que sea diferente al id dentro del payload.

  it("debería devolver un código de estado 400 si el ID en los parámetros es diferente al ID en el payload", async () => {
    // Crea un café existente en tu archivo cafes.json
    const cafeExistente = {
      id: 1,
      nombre: "Cortado",
    };

    // Intenta actualizar el café con un ID diferente en el payload
    const cafeActualizado = {
      id: 2,
      nombre: "Nuevo Nombre de Café",
    };

    // Realiza una solicitud PUT a la ruta /cafes con el café actualizado
    const response = await request(server)
      .put("/cafes/1") // Usar el ID existente en los parámetros
      .send(cafeActualizado);

    // Debe devolver un código de estado 400
    expect(response.status).toBe(400);
  });
});

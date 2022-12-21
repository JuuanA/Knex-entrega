import knex from "knex";

class Contenedor {
  constructor(databaseConfig, tableName) {
    this.database = knex(databaseConfig);
    this.table = tableName;
  }

  // NUEVO PRODUCTO

  async save(document) {
    try {
      const newProduct = await this.database(this.table).insert(document);

      return newProduct;
    } catch (err) {
      console.log(err)
    }
  }
//REEMPLAZAR PRODUCTO 
  async replace(id, producto) {
    try {
      const response = await this.database(this.table).where({ id }).update(producto);
      return response;
    } catch (err) {
      console.log(err)
    }
  }
// BUSCAR POR ID 
  async getById(id) {
    try {
      const response = await this.database.from(this.table).select("*").where({ id });

      return response;
    } catch (err) {
      console.log(err)
    }
  }
// BUSCAR TODOS 
  async getAll() {
    try {
      const response = await this.database.from(this.table).select("*");
      return response;
    } catch {
      return { error: "producto no encontrado" };
    }
  }
// BORRAR POR ID 
  async deleteById(id) {
    try {
      await this.database(this.table).del().where({ id });

      return true;
    } catch (err) {
      console.log(err)
    }
  }
//BORRAR TODO 

  async deleteAll() {
    try {
      await this.database(this.table).del();
    } catch (err) {
      console.log(err)
    }
  }
}

export default Contenedor;

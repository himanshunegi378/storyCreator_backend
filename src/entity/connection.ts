import { createConnection } from "typeorm";

const init = function () {
  return createConnection({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "3rdMAY1998@",
    database: "storycreator",
    entities: [__dirname + "/*.{ts,js}"],
    synchronize: true,
    logging: true,
  });
};

export default init;

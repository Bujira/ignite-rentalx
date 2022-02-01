import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuid();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, drivers_license, "isAdmin", avatar, created_at)
      values('${id}', 'admin', 'admin@rentalx.com', '${password}', '0123456789', true, '', 'now()')
    `
  );

  await connection.close();
}

create().then(() => console.log("User admin created!"));

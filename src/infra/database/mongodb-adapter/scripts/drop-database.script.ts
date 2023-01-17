import DatabasePort from '../../database.port';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

async function execute() {
  const databaseInstance = await DatabasePort.connectToDatabase();

  await databaseInstance?.connection.db.dropDatabase();
  console.log('Drop database finished');
  process.exit(0);
}

execute();

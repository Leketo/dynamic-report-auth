import { App } from './App';
import Datasource from './Datasource';

(async () => {
  try {
    await new Datasource().start();
    new App().start();
  } catch (e: any) {
    console.log('Start Error::', e);
    process.exit(1);
  }

  process.on('uncaughtException', (err) => {
    console.log('uncaughtException', err);
    process.exit(1);
  });
})();

import path from 'path';
import fse from 'fs-extra';
import * as execa from 'execa';

const exampleDir = path.resolve(__dirname, '../example/quick-learning');
const defaultExecaOpts = {
  cwd: exampleDir,
  stdout: process.stdout,
  stdin: process.stdin,
  stderr: process.stderr
};

async function prepareE2E() {
  await fse.ensureDir(exampleDir);

  // ensure after build
  if (!fse.existsSync(path.resolve(__dirname, '../dist'))) {
    // exec build command
    execa.execaCommandSync('npm run build', {
      cwd: path.resolve(__dirname, '../')
    });
  }

  // console.log('custom log: ', exampleDir, process.cwd());
  // console.log('custom log: ', fse.emptyDirSync(exampleDir));
  // execa.execaCommandSync('tree -I "node_modules"', {
  //   cwd: path.resolve(__dirname, '../'),
  //   stdout: process.stdout,
  //   stdin: process.stdin,
  //   stderr: process.stderr
  // });

  // process.exit(0);

  execa.execaCommandSync('tree -I "node_modules"', defaultExecaOpts);

  // exec dev command
  execa.execaCommandSync('npm run dev', defaultExecaOpts);
}

prepareE2E();

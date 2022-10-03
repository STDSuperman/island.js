import path from 'path';
import fse from 'fs-extra';
import * as execa from 'execa';

const tempDir = path.resolve(__dirname, '../playground/quick-learning');
const defaultExecaOpts = {
  cwd: tempDir,
  stdout: process.stdout,
  stdin: process.stdin,
  stderr: process.stderr
};

async function prepareE2E() {
  // await fse.ensureDir(tempDir);

  // ensure after build
  if (!fse.existsSync(path.resolve(__dirname, '../dist'))) {
    // exec build command
    execa.execaCommandSync('npm run build', {
      cwd: path.resolve(__dirname, '../')
    });
  }

  console.log('custom log: ', tempDir, process.cwd());
  console.log('custom log: ', fse.emptyDirSync(tempDir));
  execa.execaCommandSync('ls ./playground', {
    cwd: process.cwd(),
    stdout: process.stdout,
    stdin: process.stdin,
    stderr: process.stderr
  });
  console.log('****1')
  execa.execaCommandSync('ls ./playground/quick-learning', {
    cwd: process.cwd(),
    stdout: process.stdout,
  stdin: process.stdin,
  stderr: process.stderr
  })
  console.log('***2')
  execa.execaCommandSync('ls ./',  {
    cwd: process.cwd(),
    stdout: process.stdout,
  stdin: process.stdin,
  stderr: process.stderr
  })

  process.exit(0);

  // exec dev command
  // execa.execaCommandSync('npm run dev', defaultExecaOpts);
}

prepareE2E();

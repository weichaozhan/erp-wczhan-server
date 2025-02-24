import * as fs from 'node:fs';
import * as path from 'node:path';

const isProd = process.env.NODE_ENV === 'production';

function parseEnv() {
  const localEnv = path.resolve('.env.development.local');
  const prodEnv = path.resolve('.env.production.local');

  if (!fs.existsSync(localEnv) && !fs.existsSync(prodEnv))
    throw new Error('缺少环境配置文件');

  const filePath = isProd && fs.existsSync(prodEnv) ? prodEnv : localEnv;
  return { path: filePath };
}

export default parseEnv();

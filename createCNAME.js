import fs from 'fs';

if (fs.existsSync('./dist') && !fs.existsSync('./dist/CNAME')) {
  fs.writeFileSync('./dist/CNAME', 'lumon-os.michal.dev');
}

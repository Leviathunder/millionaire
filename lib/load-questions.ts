import { promises as fs } from 'fs';

export async function loadQuestions() {
  const path = `${process.cwd()}/config/config.json`;
  const file = await fs.readFile(path, 'utf8');
  const data = JSON.parse(file);

  return data;
}
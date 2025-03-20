const ids = new Set<string>();

export default function generateRandomId(): string {
  let id = '';

  do {
    id = Math.random().toString(36).substr(2, 9);
  } while (ids.has(id));

  ids.add(id);

  return id;
}
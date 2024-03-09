import { Request, Response } from 'express';

const todos = [
  { id: 1, name: 'loli' },
  { id: 2, name: 'koli' },
];
export function getTodos(_req: Request, res: Response) {
  res.status(200).json(todos);
}

export function postTodo(req: Request, res: Response) {
  const body = req.body as { name: string };
  console.log(body);

  const pos = todos.length;
  todos[pos] = { id: pos + 1, name: body.name };
  console.log('todos updated:', todos);

  res.status(200).end();
}

export function getTodo(req: Request, res: Response) {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id === Number(id));
  res.json(todo);
  res.end();
}

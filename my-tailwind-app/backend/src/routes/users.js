import { Router } from 'express';

const router = Router();

const users = [
  { id: 1, name: 'Jane Doe', role: 'user', status: 'active' },
  { id: 2, name: 'Mark Smith', role: 'admin', status: 'active' }
];

router.get('/', (req, res) => {
  res.json(users);
});

router.get('/:id', (req, res) => {
  const user = users.find((item) => item.id === Number(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

export default router;

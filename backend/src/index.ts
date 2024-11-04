import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Create a new bucket list
app.post('/api/bucketlists', async (req: Request, res: Response) => {
  const { title, description, imageUrl, achieved } = req.body;
  const newBucketList = await prisma.bucketList.create({
    data: { title, description, imageUrl, achieved },
  });
  res.status(201).json(newBucketList);
});

// Get all bucket lists
app.get('/api/bucketlists', async (req: Request, res: Response) => {
  const bucketLists = await prisma.bucketList.findMany();
  res.json(bucketLists);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Bucket List API!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

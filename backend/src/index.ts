import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.post('/api/get-user-id', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      res.json({ userId: user.id });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching userId:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Endpoint to handle user login or registration with Google
app.post('/api/auth/google', async (req: Request, res: Response) => {
  const { email, name, picture } = req.body; // Expecting user data from Google

  try {
    // Check if the user already exists
    let user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      // If the user doesn't exist, create a new user
      user = await prisma.user.create({
        data: {
          email: email,
          name: name,
        },
      });
    }

    // Return the user object
    res.status(200).json(user);
  } catch (error) {
    console.error('Error during user authentication:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Create a new bucket list or update the existing one
app.post('/api/bucketlists', async (req: Request, res: Response) => {
  const { userId, title, description } = req.body; // Include userId to identify the user
  
  // Check if the user already has a bucket list
  const existingBucketList = await prisma.bucketList.findFirst({
    where: { userId: userId }, // Use findFirst to search by userId
  });

  let bucketList;
  if (existingBucketList) {
    // If bucket list exists, update it
    bucketList = await prisma.bucketList.update({
      where: { id: existingBucketList.id }, // Use the id from the existing bucket list
      data: { title, description },
    });
  } else {
    // If no bucket list exists, create a new one
    bucketList = await prisma.bucketList.create({
      data: {
        title,
        description,
        userId, // Save the userId with the bucket list
      },
    });
  }

  res.status(201).json(bucketList);
});

// Get the user's bucket list (check if they already have one)
app.get('/api/bucketlist', async (req: Request, res: Response) => {
  const userId = req.query.userId as string; // Assuming userId is passed as query parameter

  const bucketList = await prisma.bucketList.findFirst({
    where: { userId: parseInt(userId) }, // Use findFirst to get the first bucket list with that userId
    include: { dreams: true }, // Include the dreams associated with the bucket list
  });

  if (bucketList) {
    res.json(bucketList);
  } else {
    res.status(404).json({ error: 'No bucket list found for this user' });
  }
});

// Get all bucket lists with related dreams
app.get('/api/bucketlists', async (req: Request, res: Response) => {
  try {
    const bucketLists = await prisma.bucketList.findMany({
      include: {
        dreams: {
          include: {
            comments: true, // Include comments for each dream
          },
        },
      },
    });
    res.json(bucketLists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch bucket lists' });
  }
});

// Create a new dream under a bucket list
app.post('/api/dreams', async (req: Request, res: Response) => {
  const { title, description, images, bucketListId } = req.body;
  const newDream = await prisma.dream.create({
    data: {
      title,
      description,
      images,
      bucketListId,
    },
  });
  res.status(201).json(newDream);
});

// Get all dreams under a specific bucket list
app.get('/api/bucketlists/:bucketListId/dreams', async (req: Request, res: Response) => {
  const { bucketListId } = req.params;
  const dreams = await prisma.dream.findMany({
    where: { bucketListId: parseInt(bucketListId) },
    include: {
      comments: true,
    },
  });
  res.json(dreams);
});


// Create a new comment on a dream
app.post('/api/comments', async (req: Request, res: Response) => {
  const { text, userId, dreamId } = req.body;
  const newComment = await prisma.comment.create({
    data: {
      text,
      userId,
      dreamId,
    },
  });
  res.status(201).json(newComment);
});

// Get all comments for a specific dream
app.get('/api/dreams/:dreamId/comments', async (req: Request, res: Response) => {
  const { dreamId } = req.params;
  const comments = await prisma.comment.findMany({
    where: { dreamId: parseInt(dreamId) },
  });
  res.json(comments);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Bucket List API!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

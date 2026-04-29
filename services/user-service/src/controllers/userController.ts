import { Request, Response } from 'express';
import prisma from '../config/db';

export const getProfile = async (req: Request, res: Response) => {
  const { userId } = req.user; // Attached by gateway auth but we should verify locally or just trust headers if internal

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const updatePreferences = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { preferences } = req.body;

  try {
    const profile = await prisma.profile.update({
      where: { userId },
      data: { preferences }
    });

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

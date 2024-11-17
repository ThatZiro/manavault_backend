import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Card from '../../infrastructure/database/models/card.model';

export const searchCards = async (req: Request, res: Response) => {
  try {
    const { name, color, type, set, limit = '10', offset = '0', order = 'name', direction = 'asc' } = req.query;

    // Build the query conditions dynamically
    const conditions: any = {};

    if (name) {
      conditions.name = { [Op.iLike]: `%${name}%` }; // Case-insensitive partial match
    }

    if (color) {
      conditions.colors = { [Op.contains]: [color] }; // Matches if the color is in the array
    }

    if (type) {
      conditions.type = { [Op.iLike]: `%${type}%` };
    }

    if (set) {
      conditions.set = { [Op.iLike]: `%${set}%` };
    }

    // Set default values for pagination
    const paginationLimit = parseInt(limit as string) || 10; // Default to 10 results
    const paginationOffset = parseInt(offset as string) || 0; // Default to 0 (start)

    // Set default values for sorting
    const sortOrder = order as string; // Default to sorting by 'name'
    const sortDirection = (direction as string).toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    // Query the database with pagination and sorting
    const cards = await Card.findAll({
      where: conditions,
      limit: paginationLimit,
      offset: paginationOffset,
      order: [[sortOrder, sortDirection]],
    });

    // Return the paginated and sorted results
    res.status(200).json({
      results: cards,
      pagination: {
        limit: paginationLimit,
        offset: paginationOffset,
      },
    });
  } catch (error) {
    console.error('Error searching cards:', error);
    res.status(500).json({ message: 'Error searching cards', error });
  }
};

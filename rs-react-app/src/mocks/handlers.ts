// src/mocks/handlers.ts
import { rest } from "msw";

export const handlers = [
  // Mock GET request for card list
  rest.get("/api/cards", (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, title: "Card 1" },
        { id: 2, title: "Card 2" },
      ])
    );
  }),

  // Mock GET request for detailed card
  rest.get("/api/cards/:id", (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.json({
        id,
        title: `Detailed Card ${id}`,
        description: `This is the detailed description for Card ${id}`,
      })
    );
  }),
];

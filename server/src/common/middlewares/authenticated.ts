import { Request, Response, NextFunction } from "express";
import { getUser } from "../../lib/index.js";

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token missing" });
    }

    const token = authHeader.replace("Bearer ", "");

    const { data, error } = await getUser(token);

    if (error || !data.user) {
        return res.status(401).json({
            error: "Invalid token",
            msg: error?.message,
        });
    }

  // user validé par Supabase
  (req as any).user = data.user.user_metadata;

  next();
};

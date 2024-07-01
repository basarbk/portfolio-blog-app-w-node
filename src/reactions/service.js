import NotFoundException from "../error/NotFoundException.js";
import Reaction from "./Reaction.js";

export async function toggleReaction(body, user) {
  const reactionInDB = await Reaction.findOne({
    where: {
      category: body.category,
      articleId: body.entityId,
      userId: user.id,
    },
  });
  if (reactionInDB) {
    await reactionInDB.destroy();
    return { result: false };
  } else {
    try {
      await Reaction.create({
        category: body.category,
        articleId: body.entityId,
        userId: user.id,
      });
      return { result: true };
    } catch {
      throw new NotFoundException();
    }
  }
}

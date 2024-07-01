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

export async function getArticleReactions(articleId, userId) {
  const reactions = {
    hot: { count: 0, reacted: false },
    like: { count: 0, reacted: false },
    readingList: { count: 0, reacted: false },
  };

  const query = `
    SELECT category, count(*) as count ${userId ? `, SUM( CASE WHEN userId =${userId} THEN 1 ELSE 0 END) > 0 AS reacted` : ""}
    FROM reactions
    WHERE articleId=${articleId}
    GROUP BY category
  `;
  const [result] = await Reaction.sequelize.query(query);
  for (const item of result) {
    reactions[item.category].count = item.count;
    reactions[item.category].reacted = !!item.reacted;
  }

  return reactions;
}

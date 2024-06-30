import Article from "./Article.js";
import generateUniqueValue from "../shared/utils/generateUniqueValue.js";
import NotFoundException from "../error/NotFoundException.js";
import ForbiddenException from "../error/ForbiddenException.js";

export async function save(body, user) {
  const slug =
    encodeURIComponent(body.title.toLowerCase().replaceAll(" ", "-")) +
    "-" +
    generateUniqueValue(true);

  const article = {
    title: body.title,
    content: body.content,
    image: body.image,
    slug,
    userId: user.id,
  };

  const savedArticle = await Article.create(article);
  return { id: savedArticle.id };
}

export async function update(id, body, user) {
  const articleInDb = await Article.findOne({ where: { id } });
  if (!articleInDb) {
    throw new NotFoundException();
  }
  if (articleInDb.userId !== user.id) {
    throw new ForbiddenException();
  }

  articleInDb.title = body.title;
  articleInDb.content = body.content;
  articleInDb.image = body.image;
  await articleInDb.save();
  return { id };
}

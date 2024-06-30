import Article from "./Article.js";
import generateUniqueValue from "../shared/utils/generateUniqueValue.js";

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

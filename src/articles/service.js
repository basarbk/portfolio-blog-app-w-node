import Article from "./Article.js";
import generateUniqueValue from "../shared/utils/generateUniqueValue.js";

export async function save(body) {
  const slug =
    encodeURIComponent(body.title.toLowerCase().replaceAll(" ", "-")) +
    "-" +
    generateUniqueValue(true);

  const article = {
    title: body.title,
    content: body.content,
    image: body.image,
    slug,
  };

  const savedArticle = await Article.create(article);
  return { id: savedArticle.id };
}

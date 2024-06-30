import Article from "./Article.js";
import generateUniqueValue from "../shared/utils/generateUniqueValue.js";
import NotFoundException from "../error/NotFoundException.js";
import ForbiddenException from "../error/ForbiddenException.js";
import User from "../user/User.js";
import { ArticleWithContent, ShortArticle } from "./dto/article.dto.js";

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
  const articleInDb = await getArticle(id, user);
  articleInDb.title = body.title;
  articleInDb.content = body.content;
  articleInDb.image = body.image;
  await articleInDb.save();
  return { id };
}

export async function publish(id, user) {
  const articleInDb = await getArticle(id, user);
  articleInDb.published = !articleInDb.published;
  articleInDb.published_at = articleInDb.published ? new Date() : null;
  await articleInDb.save();
  return { published: articleInDb.published };
}

async function getArticle(id, user) {
  const articleInDb = await Article.findOne({ where: { id } });
  if (!articleInDb) {
    throw new NotFoundException();
  }
  if (articleInDb.userId !== user.id) {
    throw new ForbiddenException();
  }
  return articleInDb;
}

export async function getArticles(pagination) {
  const { page, size, sort, direction } = pagination;
  const offset = page * size;
  const { count, rows } = await Article.findAndCountAll({
    limit: size,
    offset,
    where: {
      published: true,
    },
    order: getOrder(sort, direction),
    include: User,
  });

  return {
    content: rows.map((article) => new ShortArticle(article)),
    page,
    size,
    total: Math.ceil(count / size),
  };
}

function getOrder(sort, direction) {
  const sortingAllowed = ["id", "published_at"];
  if (sortingAllowed.indexOf(sort) > -1) {
    return [[sort, direction]];
  }
  return undefined;
}

export async function getArticleByIdOrSlug(idOrSlug, user) {
  const where = {};
  if (Number.isInteger(Number(idOrSlug))) {
    where["id"] = +idOrSlug;
  } else {
    where["slug"] = idOrSlug;
  }
  const article = await Article.findOne({ where, include: User });
  if (!article) throw new NotFoundException();
  if (!article.published) {
    if (!user) throw new NotFoundException();
    if (user.id !== article.userId) throw new NotFoundException();
  }
  return new ArticleWithContent(article);
}

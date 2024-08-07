import Article from "./Article.js";
import generateUniqueValue from "../shared/utils/generateUniqueValue.js";
import NotFoundException from "../error/NotFoundException.js";
import ForbiddenException from "../error/ForbiddenException.js";
import User from "../user/User.js";
import { ArticleWithContent, ShortArticle } from "./dto/article.dto.js";
import { getArticleReactions } from "../reactions/service.js";
import Reaction from "../reactions/Reaction.js";

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

export async function getArticles(pagination, user) {
  const options = { where: { published: true } };
  return getArticlePage(pagination, options, user);
}

export async function getReactedArticles(pagination, reaction, user) {
  const options = {
    where: { published: true },
    include: [
      { model: User },
      { model: Reaction, where: { category: reaction, userId: user.id } },
    ],
  };
  return getArticlePage(pagination, options, user);
}

export async function getArticlesOfUser(pagination, idOrHandle, user) {
  const options = {
    where: { published: true },
    include: [{ model: User, where: {} }],
  };
  if (Number.isInteger(Number(idOrHandle))) {
    options.include[0].where["id"] = +idOrHandle;
    if (user?.id === +idOrHandle) {
      delete options.where;
    }
  } else {
    options.include[0].where["handle"] = idOrHandle;
    if (user?.handle === idOrHandle) {
      delete options.where;
    }
  }
  return getArticlePage(pagination, options, user);
}

async function getArticlePage(pagination, options, user) {
  const { page, size, sort, direction } = pagination;
  const offset = page * size;
  const { count, rows } = await Article.findAndCountAll({
    limit: size,
    offset,
    order: getOrder(sort, direction),
    include: User,
    ...options,
  });

  const content = [];
  for (const article of rows) {
    const reactions = await getArticleReactions(article.id, user?.id);
    content.push(new ShortArticle(article, reactions));
  }

  return {
    content,
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

  const reactions = await getArticleReactions(article.id, user?.id);
  return new ArticleWithContent(article, reactions);
}

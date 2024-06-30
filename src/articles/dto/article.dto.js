import { AuthUser } from "../../auth/dto/auth-user.dto.js";

export class ShortArticle {
  id;
  title;
  slug;
  image;
  published;
  publishedAt;
  author;
  constructor(article) {
    this.id = article.id;
    this.title = article.title;
    this.slug = article.slug;
    this.image = article.image;
    this.published = article.published;
    this.publishedAt = article.publishedAt;
    this.author = new AuthUser(article.User);
  }
}

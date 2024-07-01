const { LoremIpsum } = require("lorem-ipsum");

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    min: 4,
    max: 8,
  },
  wordsPerSentence: {
    min: 4,
    max: 8,
  },
});

const generateSlug = (value) => {
  return encodeURIComponent(value.toLowerCase().replaceAll(" ", "-"));
};

("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
    const users = [];
    for (let i = 1; i <= 10; i++) {
      users.push({
        name: `user${i}`,
        handle: `user${i}`,
        email: `user${i}@mail.com`,
      });
    }
    await queryInterface.bulkInsert("users", users);

    const [savedUsers] = await queryInterface.sequelize.query(
      "SELECT * from users",
    );

    const tokens = [];
    const articles = [];

    for (const user of savedUsers) {
      tokens.push({
        token: "token-" + user.name,
        userId: user.id,
      });
      for (let i = 0; i < 5; i++) {
        const article = {};
        lorem.format = "plain";
        article.title = lorem.generateWords(5);
        article.slug = generateSlug(article.title);
        lorem.format = "html";
        article.content = lorem.formatString(lorem.generateParagraphs(2));
        article.userId = user.id;
        article.published = i < 4;
        article.published_at = i < 4 ? new Date() : null;
        articles.push(article);
      }
    }

    await queryInterface.bulkInsert("tokens", tokens);
    await queryInterface.bulkInsert("articles", articles);

    const [savedArticles] = await queryInterface.sequelize.query(
      "SELECT * from articles",
    );

    const categories = ["like", "readingList", "hot"];
    const reactions = [];

    for (const article of savedArticles) {
      for (const user of savedUsers) {
        const randomIdx = Math.floor(Math.random() * 3);
        reactions.push({
          category: categories[randomIdx],
          articleId: article.id,
          userId: user.id,
        });
      }
    }
    await queryInterface.bulkInsert("reactions", reactions);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};

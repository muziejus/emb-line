function pickAFew(models, factor = 6) {
  const shuffledModels = models.sort(() => 0.5 - Math.random());
  return shuffledModels.slice(0, Math.floor(Math.random() * factor));
}

export default function (server) {
  server.loadFixtures();
  server.createList("collection", 2);
  const collections = server.schema.collections.all();
  server.createList("tag", 20);
  const tags = server.schema.tags.all();
  server.createList("item", 10, {
    collection:
      collections.models[Math.floor(Math.random() * collections.models.length)],
    tags() {
      return pickAFew(tags.models);
    },
  });

  const items = server.schema.items.all();
  console.log("items from scenario", items.models);
}

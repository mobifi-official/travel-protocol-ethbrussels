/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "o698wt6l4lmvfaq",
    "created": "2024-07-13 17:40:01.754Z",
    "updated": "2024-07-13 17:40:01.754Z",
    "name": "users_col",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "h7kdg0g1",
        "name": "proofData",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 2000000
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("o698wt6l4lmvfaq");

  return dao.deleteCollection(collection);
})

/**
 * Applique à un schéma une sérialisation JSON cohérente :
 * - `_id` (ObjectId Mongo) devient `id` (string)
 * - `__v` (clé de version Mongoose) est retiré
 * - les virtuals (ex: `nbQuestions` sur Quiz) sont inclus
 */
function idPlugin(schema) {
  const options = {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => {
      delete ret._id;
      return ret;
    },
  };
  schema.set("toJSON", options);
  schema.set("toObject", options);
}

module.exports = idPlugin;

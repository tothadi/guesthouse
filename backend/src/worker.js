import app from "../bin/app.js";

export default {
  async fetch(request, env, ctx) {
    // Expose env variables to the app
    process.env.DB_HOST = env.DB_HOST;
    process.env.JWT_SECRET = env.JWT_SECRET;
    process.env.GALLERY_FOLDER = env.GALLERY_FOLDER;

    return app.fetch(request, env, ctx);
  },
};

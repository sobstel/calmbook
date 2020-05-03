require("dotenv").config();
module.exports = {
  env: {
    GOOGLE_SEARCH_API_KEY: process.env.GOOGLE_SEARCH_API_KEY,
    GOOGLE_SEARCH_CX: process.env.GOOGLE_SEARCH_CX,
  },
};

const app = require('./src/app');

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`SkillTrack dashboard listening at http://localhost:${PORT}`);
  });
}

module.exports = app;

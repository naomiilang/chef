const router = require('express').Router();
const { Comment, User, Favorite, Recipe } = require('../../models');

// get all comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
          'id', 
          'comment_text', 
        ],
        include: [
          {
            model: User,
            attributes: ['username']
          }
        ]
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
   // check the session
   if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      recipe_id: req.body.recipe_id,
      //use the id from the session
      user_id: req.session.user_id
  })
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
      console.log(err);
      res.status(400).json(err);
  });
   }
});

router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbCommentData => {
          if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
          }
          res.json(dbCommentData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router;
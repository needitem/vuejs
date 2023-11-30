const character = require('./charinfo.model.js');

exports.create = (req, res) => {
  const characters = new character({
    CharName: req.body.CharName,
    Img: req.body.Img,
    Age: req.body.Age,
    Class: req.body.Class,
    Desc: req.body.Desc,
    IsStarred: req.body.IsStarred,
    Story: req.body.Story,
    Realname: req.body.Realname,
    HomeWorld: req.body.HomeWorld,
    TacticalSkill: req.body.TacticalSkill,
    PassiveSkill: req.body.PassiveSkill,
    UltimitSkill: req.body.UltimitSkill
    
  });

  characters.save()
    .then(data => { res.send(data); })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (req, res) => {
  character.find()
    .then(characters => { res.send(characters); })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

//find one by character name
exports.findOne = (req, res) => {
  character.findOne({ CharName: req.params.CharName })
    .then(characters => {
      if (!characters) {
        return res.status(404).send({
          message: "character not found with name " + req.params.CharName
        });
      }
      res.send(characters);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "character not found with name " + req.params.CharName
        });
      }
      return res.status(500).send({
        message: "Error retrieving character with name " + req.params.CharName
      });
    });
};


exports.update = (req, res) => {
  character.findOneAndUpdate({ CharName: req.params.CharName }, {
    CharName: req.body.CharName,
    Img: req.body.Img,
    Age: req.body.Age,
    Class: req.body.Class,
    Desc: req.body.Desc,
    IsStarred: req.body.IsStarred,
  }, { new: true })
    .then(characters => {
      if (!characters) {
        return res.status(404).send({
          message: "character not found with name " + req.params.CharName
        });
      }
      res.send(characters);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "character not found with name " + req.params.CharName
        });
      }
      return res.status(500).send({
        message: "Error updating character with name " + req.params.CharName
      });
    });
}

exports.delete = (req, res) => {
  character.findOneAndRemove({ CharName: req.params.CharName })
    .then(characters => {
      if (!characters) {
        return res.status(404).send({
          message: "character not found with name " + req.params.CharName
        });
      }
      res.send({ message: "character deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "character not found with name " + req.params.CharName
        });
      }
      return res.status(500).send({
        message: "Could not delete character with name " + req.params.CharName
      });
    });
};

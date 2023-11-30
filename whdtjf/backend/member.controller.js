const member = require('./member.model.js');

// 새로운 연락처 만들기
exports.create = (req, res) => {
  const contact = new member({
    id: req.body.id,
    pw: req.body.pw,
    name: req.body.name,
  });

  //데이터베이스에 새로운 연락처 저장하기 
  contact.save()
    .then(data => { res.send(data); })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


//모든 연락처 검색
exports.findAll = (req, res) => {
  member.find()
    .then(contacts => {
      res.send(contacts);
      console.log(contacts)	//test log
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

//특정한 연락처 검색
exports.findOne = (req, res) => {
  member.findOne({ id: req.params.id })
    .then(contact => {
      if (!contact) {
        return res.status(404).send({
          message: req.params.id + "에 해당하는 연락처가 없습니다."
        });
      }
      res.send(contact);
    }).catch(err => {
      return res.status(500).send({ message: req.params.id + " 로 검색 중 에러 발생" });
    });
};

//업데이트
exports.update = (req, res) => {
  member.findOneAndUpdate({ id: req.params.id },
    {
      id: req.body.id,
      pw: req.body.pw,
      name: req.body.name,

    },
    { new: true }
  )
    .then(contact => {
      if (!contact) {
        return res.status(404).send({
          message: req.params.id + "에 해당하는 회원님의 정보가 없습니다. "
        })
      }
      res.send(contact);
    }).catch(err => {
      return res.status(500).send({ message: err.message });
    });
};

//삭제
exports.delete = (req, res) => {
  member.findOneAndDelete({ id: req.params.id })
    .then(contact => {
      if (!contact) {
        return res.status(404).send({ message: req.params.id + "에 해당하는 회원이 없습니다." })
      }
      res.send({ message: "정상적으로 " + req.params.id + " 탈퇴되었습니다." })
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
};









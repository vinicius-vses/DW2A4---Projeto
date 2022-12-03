const { req, res } = require("express");
const jwt = require('jsonwebtoken');


module.exports.verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.id = decoded.id;
      next();
    });
}

module.exports.authAutor = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, async function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      userId = decoded.id;
      artId = (req.body.id || req.params.id);
      bdReq = JSON.parse(await db.readArt(artId));
      if (bdReq.autorId != undefined) {
        if (userId == bdReq.autorId) {
            req.id = userId;
            next();
          } else {
            return res.status(500).json({auth: false, message: 'You cannot access this article'});
          }
      } else {
        return res.send(bdReq);
      }
      
    });
}

module.exports.authUser = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, async function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      userId = decoded.id;
      reqId = (req.body.id || req.params.id);
      bdReq = JSON.parse(await db.readUser(reqId));
      console.log(bdReq.id + " " + userId);
      if (bdReq.id != undefined) {
        if (userId == bdReq.id) {
            next();
          } else {
            return res.status(500).json({auth: false, message: 'Profile mismatch.'});
          }
      } else {
        return res.send(bdReq);
      }
    });
}
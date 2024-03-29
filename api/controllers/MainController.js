/**
 * MainController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */
  index: function (req, res)
  {
    console.log(req.session.joueur);
    Joueurs.findOneByPseudo(req.session.joueur.Pseudo).done(function (err, joueur) {
      joueur.getRessources(function (ressource) {
        joueur.Ressources = ressource;
        joueur.getPlaneteMere(function (planete) {
          joueur.PlaneteMere = planete;
          res.view({joueur: joueur});
        });
      });
    });  	
  },

  macroGestion: function (req, res)
  {
    Joueurs.findOneByPseudo(req.session.joueur.Pseudo).done(function (err, joueur) {
      joueur.getRessources(function (ressource) {
        joueur.Ressources = ressource;
        joueur.getAllPlanetes(function (planetes) {
          joueur.Planetes = planetes;
          res.view({joueur: joueur});
        });
      });
    });   
  },

  microGestion: function (req, res)
  {
    var idPlanetes = req.param("id");
    var joueur = req.session.joueur;
     Joueurs.findOneByPseudo(req.session.joueur.Pseudo).done(function (err, joueur) {
      joueur.getRessources(function (ressource) {
        joueur.Ressources = ressource;
        Planetes.findOneByIdPlanetes(idPlanetes).done(function(err, Planete) {
          if(err)
          {
            log.ErreurDb(err, "Récupération d'une planète", "MainController::microGestion");
          }
          else
          {
            joueur.Planete = Planete;
            res.view({joueur: joueur});
          }
        });
      });
    });   
  }

};


// ----------- Proposition de structure du code (non terminé) -----------


/**
* Envoie la requete pour recuperer la liste des users
* @param {int} uid ID du user dont on veut recuperer les repos
* @return {Promise<Object} Infos d'un user
*/

let getListUsers = (uid) => {
    return new Promise((resolve, reject) => {
        sendXhrPromise('https://api.github.com/users')
            .then(result => {
                // code
                resolve(param);
            })
            .catch(result => {
                console.log("erreur : pas d'acces au serveur")
                reject(param);
            })
    })

}

/**
* gere les taches à effectuer pour afficher les repos d'un user
* @param {int} user_id Id du user
*/
let displayUserRepos = (user_id) => {

    getListUsers(user_id)
        .then((user) => { // requete : liste des users
            // Afficher les infos du user
            showUserInfo(param);
        })
        // appelle la 2e promise pour la liste des repos > n'oubliez pas de l'appeler avec un return
        .then((userData) => { // on affiche le user repos
            showUserRepos(param)
        })
        .catch((error) => { // traiter le cas d'erreur
        });
}

displayUserRepos(3); // ID du user
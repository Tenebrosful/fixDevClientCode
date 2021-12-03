// Affiche des informations sur les users Github

/**
* envoie un requête XHR
*  @param {string} urlSend URL ou route de l'API
*  @param {function} success Fonction à appeler en cas de succès
*/
function sendXhr(urlSend, success) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', urlSend);
    xhr.responseType = 'json';
    xhr.send();
    xhr.addEventListener('load', function (reponse) { success(reponse.target.response) });
    xhr.addEventListener('error', function (reponse) { console.log('data transfer error' + reponse) });
}

/** Fonction qui affiche la liste des repos du user
* @param {Object} reposList Liste des repos du user
*/
let displayUserRepos = (reposList) => {
    console.log('liste des repos : ', reposList)
}


// pour info : j'utilise la police fira code pour avoir les fleches, et autres codes de dév
// function getUser (data, uid) { }
/** Recupere les repos d'un user sur Github
* @param {Object} data Liste des users github
* @param {int} uid Rang du user dont on souhaite afficher les repos
*/

let getUser = (data, userRang) => {
    let user = data[userRang];
    console.log('user : ', user.login);
    sendXhr(user.repos_url, displayUserRepos);
}



/** gere les taches pour afficher les repos d'un user
* @param {int} user_id Id du user
*/
function getUserRepos(userRang) {
    sendXhr('https://api.github.com/users', function (data) {
        getUser(data, userRang)
    })
}

getUserRepos(3);
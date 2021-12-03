// Affiche des informations sur les users Github

/**
* @typedef {Object} UserData
* @property {string} login
* @property {number} id
* @property {string} node_id 
* @property {string} avatar_url
* @property {string} gravatar_id
* @property {string} url
* @property {string} html_url
* @property {string} followers_url
* @property {string} following_url
* @property {string} gists_url
* @property {string} starred_url
* @property {string} subscriptions_url
* @property {string} organizations_url
* @property {string} repos_url
* @property {string} events_url
* @property {string} received_events_url
* @property {string} type
* @property {string} site_admin
*/

/**
* @typedef {Object} DataDepot
* @property {number} id
* @property {string} node_id
* @property {string} name
* @property {string} full_name
* @property {boolean} private
* @property {UserData} owner
*/

/**
* envoie un requête XHR
* @param {string} urlSend URL ou route de l'API
* @param {function} success Fonction à appeler en cas de succès
* @return {Promise<Object>}
*/
function sendXhr(urlSend, success) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', urlSend);
    xhr.responseType = 'json';
    xhr.send();
    xhr.addEventListener('load', function (reponse) { success(reponse.target.response) });
    xhr.addEventListener('error', function (reponse) { console.log('data transfer error' + reponse) });
}

/**
* Fonction qui affiche la liste des repos du user
* @param {DataDepot[]} reposList Liste des repos du user
*/
let displayUserRepos = (reposList) => {
    console.log('liste des repos : ', reposList)
}

// pour info : j'utilise la police fira code pour avoir les fleches, et autres codes de dév
// function getUser (data, uid) { }
/** Recupere les repos d'un user sur Github
* @param {Object} data Liste des users github
* @param {int} rang rang du user dont on souhaite afficher les repos
*/

let getUser = (data, rang) => {
    let user = data[rang];
    console.log('user : ', user.login);
    sendXhr(user.repos_url, displayUserRepos);
}

/** gere les taches pour afficher les repos d'un user
* @param {int} rang Rang du user
*/
function getUserRepos(rang) {
    sendXhr('https://api.github.com/users', 
    /**
     * 
     * @param {UserData[]} data 
     */
    function (data) {
        getUser(data, rang)
    })
}

getUserRepos(3);
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
* @typedef {Object} RepoData
* @property {number} id
* @property {string} created_at
* @property {string} updated_at
* @property {string} node_id
* @property {string} name
* @property {string} full_name
* @property {string} description
* @property {string} html_url
* @property {boolean} private
* @property {boolean} fork
* @property {UserData} owner
*/

/**
* Envoie un requête XHR avec une Promise
* @param {string} urlSend URL ou route de l'API
* @return {Promise<Object>}
*/
function sendXhrPromise(urlSend) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', urlSend);
        xhr.responseType = 'json';
        xhr.send();
        xhr.addEventListener('load', function (reponse) { resolve(reponse.target.response) });
        xhr.addEventListener('error', function (reponse) { reject(reponse) });
    });
}

/** 
* Retourne les dépôts d'un utilisateur
* @param {UserData} user Utilisateur
* @return {Promise<RepoData[]>}
*/
async function getUserRepos(user) {
    return sendXhrPromise(user.repos_url)
}

/**
 * 
 * @param {Object} data 
 * @param {int} user_id Id de l'utilisateur
 * @return {Promise<UserData>}
 */
async function getUser(user_id) {
    return sendXhrPromise(`https://api.github.com/user/${user_id}`)
}

/**
 * 
 * @param {RepoData[]} depots 
 */
function displayRepos(depots) {
    const body = document.getElementById("repos");
    body.innerHTML = "";

    depots.forEach(
        /**
         * 
         * @param {RepoData} depot 
         */
        depot => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><a href=${depot.html_url}>${depot.id}</a></td>
                <td><a href=${depot.html_url}>${depot.name}</a></td>
                <td><a href=${depot.html_url}>${depot.full_name}</a></td>
                <td>${depot.description}</td>
                <td>${depot.private ? "Privé" : "Public"}</td>
                <td>${depot.fork ? "Oui" : "Non"}</td>
                <td>${new Date(depot.created_at).toLocaleString()}</td>
                <td>${new Date(depot.updated_at).toLocaleString()}</td>
            `;
            body.append(row);
    })
}

/**
 * 
 * @param {UserData} user 
 */
function displayUser(user) {
    const divUserInfo = document.getElementById("userInfo");
    divUserInfo.innerHTML = `

    `;
}

/**
 * 
 * @param {int} user_id 
 */
async function process(user_id) {
    try {
        const userData = await getUser(user_id);

        if (userData.id === undefined) // Techniquement on pourrait faire avec le 404 mais ça passe pas dans l'event error
            throw new Error("Aucun utilisateur trouvé");

        displayUser(userData);

        const repoData = await getUserRepos(userData);

        displayRepos(repoData);
    } catch(err) {
        alert(err.message);
    }
}
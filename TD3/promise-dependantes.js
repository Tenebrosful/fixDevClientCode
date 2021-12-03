/**
* @author Claude Stan
* Exemple de chainage de promises
*/

/**
* Collecter suffisament d'argent
*/
let promiseToCollectFund = new Promise(function (resolve, reject) {
    let isEnough = true;

    if (isEnough)
        resolve('amount reached');
    else
        reject('not enough');


});

/**
* Acheter une console
* @param {string} data Données renvoyées par la promise précédente
* @return {Promise<string>}
*/
let buyConsole = function (data) {
    return new Promise(function (resolve, reject) {
        let consoleBaught = true;

        if (consoleBaught)
            resolve(data + ' -> ' + 'yes');

        else
            reject(data + ' -> ' + "no, I can't");


    })
};

/**
* Jouer à Call Of Duty
* @param {string} data Données renvoyées par la promise précédente
* @return {Promise<string>} Une autre facon de créer une methode qui est une promise qui permet de passer des parametres à la fonction
*/
let playCOD = function (data) {
    return new Promise(function (resolve, reject) {
        let didIPlay = true;

        if (didIPlay)
            resolve(data + ' -> ' + 'yes I did');
        else
            reject(data + ' -> ' + "I don't have time");

    })
};

// Les promises sont dépendantes les unes des autres, elles s'éxecutent dans l'ordre au fur et mesure qu'elles se terminent
promiseToCollectFund
    .then(function (message) { return buyConsole(message) }) // ceci est du coup une promise qui permet de remonter d'un niveau de then (grace au return)

    .then(function (message) { return playCOD(message) }) 	// pareil
    .then(function (message) { console.log("Everything's ok : " + message) })
    .catch(function (message) { console.log("Oups, something went wrong : " + message) });
// il n'y a qu'une seule porte de sortie 

// meme code ecrit avec =>
promiseToCollectFund
    .then(message => { return buyConsole(message) })
    .then(message => { return playCOD(message) })
    .then(message => { console.log("Everything's ok : " + message) })
    .catch(message => { console.log("Oups, something went wrong : " + message) });


// On veut executer toutes les promises en parallele et elles doivent toutes etre satisfaites
console.log('----- envoi des promises en parallele ALL -------');

Promise.all([promiseToCollectFund, buyConsole(), playCOD()])
    .then(() => {
        console.log('Toutes les promises sont terminées et ok');
    })
    .catch(() => {
        console.log("Au minimum une des promises n'a pas abouti")
    });

// On veut executer toutes les promises en paralelle et une d'entre elle doit etre satisfaite

console.log('----- envoi des promises en parallele ONE -------');

Promise.race([promiseToCollectFund, buyConsole(), playCOD()])
    .then(() => {
        console.log('Au moins une des promises est terminée et ok');
    })
    .catch(() => {
        console.log("Toutes les promises ont échoué")
    });

console.log('----- Fin du main -------');

/** Présentation des promises */

let promiseToCleanKitchen = new Promise(function (resolve, reject) {

    // creer un événement dont la réponse arrive à un moment inconnu

    let isDone = false;

    if (isDone)  // l'événement s'est bien passé
        resolve("Oui, c'est fait");
    else  // l'événement n'a pas abouti
        reject("Non, je procrastine");


});

promiseToCleanKitchen
    .then(function (dataFromResolve) {
        // traitement l'événement qui est réussi
        console.log(dataFromResolve);
    })
    .catch(function (dataFromReject) {
        // traitement de l'événement qui n'a pas abouti
        console.log(dataFromReject);
    })
# JSDoc

```js
/**
*
* @author : Nom ou pseudo du développeur
* @constructor : Marque une fonction en tant que constructeur
* @param : Documente les paramètres d'une méthode; le type du paramètre peut être ajouté par des accolades
* @returns : Documente le retour d'une fonction/méthode
* @return : Synonyme de @returns
* @see : Documente une association vers un autre objet
* @this : Détermine le type de l'objet duquel le mot clé "this" réfère dans une fonction (window par exemple)
* @todo : tache a terminer
* @version : Donne la version de la bibliothèque
*
*/ 
```


## Exemple
```js
/**
 * Crée une instance de Cercle
 * 
 * @constructor
 * @this {Cercle}
 * @param {number} r Le rayon désiré du cercle.
 */
 ```

```js
function Cercle(r) {
    /** @private */ this.rayon = r;
    /** @private */ this.circonference = 2 * Math.PI * r;
};
```

## Running the documentation generator on the command line

installation
> ```sudo apt install jsdoc-toolkit```

> ```jsdoc book.js -d=doc```
This command will create/use a directory named doc/ in the current working directory. Within that directory, you will find the generated HTML pages.

_ou_

> ```jsdoc *.js -d=doc```
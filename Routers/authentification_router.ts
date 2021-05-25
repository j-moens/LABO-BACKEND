import{Router, Request, Response, NextFunction} from 'express';
import* as jwt from 'jsonwebtoken';
import {User, UserModel} from '../Models/user_model';

export class AuthentificationRouter
{
    public router: Router;

    constructor()

    {

        this.router= Router();
        this.router.post('/', this.getToken);

    }

   /**
     * Cette méthode est un filtre Express, c'est-à-dire une méthode qui
     * reçoit une requête HTTP dans req et va simplement la transférer au
     * filtre suivant d'Express (next) après avoir fait un certain nombre
     * de vérifications. Si par contre ces vérifications s'avèrent fausses,
     * le filtre va rompre la chaîne des filtres en retournant directement
     * une réponse au client via l'objet res.
     *
     * Dans ce cas-ci, le but de ce filtre est de vérifier s'il y a bien un
     * jeton dans la requête, et si ce jeton est valide.
     */
    public static checkAuthorization(req, res, next) {

        // normalement le jeton se trouve dans le header Authorization, mais
        // on pourrait aussi imaginer qu'il soit dans le body ou même dans l'url
        let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
        // s'il y a bien un token
        if (token) {
            // si le jeton est dans Authorization, il est précédé par cette string dont on se débarrasse
            token = token.replace('Bearer ', '');
            // on demande à JWT de valider le jeton sur base de la clé secrète
            jwt.verify(token, 'my-super-secret-key', function (err, decoded) {
                if (err) {
                    // si le jeton est corrompu, on renvoie un message d'erreur au client
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // si le jeton est correct, on stocke sa version "décodée", càd la charge utile,
                    // dans la requête afin que les filtres suivants puissent y avoir directement accès.
                    req.decoded = decoded;
                    // on appelle le filtre suivant
                    next();
                }
            });
        } else {
            // s'il n'y a pas de token, on retourne une erreur HTTP 403 (accès refusé)
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    }

    public static checkAdmin(req, res, next)

        {

            if (req.decoded.admin)

            {

            next(); // Passer à la route suivante, en fait (cf. dans server.ts)

            }

            else

            {

            return res.status(403).send({

                success: false,

                message: 'Requires admin privilege.'

            })

            }

        }

    /**
     * Cette méthode permet de calculer et de renvoyer au client un jeton
     * JWT. La requête doit être un POST et doit contenir dans son body
     * le pseudo et le password. Sur base du pseudo, on cherche dans la db
     * le membre correspondant et on vérifie que le mot de passe reçu
     * dans la requête est conforme à celui stocké en db. S'il est conforme,
     * on utilise la librairie JWT pour générer un token dont la charge utile
     * contient simplement un objet JSON { pseudo: <pseudo> } et on définit
     * un délai de validité de 60 secondes (idéalement on mettrait un délai
     * plus long, mais pour pouvoir observer le phénomène de timeout, on
     * l'a volontairement fait court).
     */
     public async getToken(req: Request, res: Response, next: NextFunction) {
        // récupère le pseudo et le mdp depuis le corps de la requête
        const pseudo = req.body.email || null;
        const password = req.body.password || null;
        // via MySql, cherche le membre correspondant en db
        let result = await UserModel.checkPassword(pseudo, password);
        if(result.success)
        {
            const token = jwt.sign({ email: req.body.email, admin: result.admin }, 
                'my-super-secret-key',
                { expiresIn: 600 }); // le token exprire toutes les 60 secondes
            res.json({ success: true, message: 'logged in', token: token, admin: result.admin, id: result.id });
        }else {
            res.json({ success: false, message: 'bad email and or password' });
        }
    }
}
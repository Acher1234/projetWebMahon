class User
{
    imagePath = "";
    email;
    nom;
    prenom;
    username;
    adress;
    static ImagePath = "../../ImageFile/UserImage";
    constructor(email,nom,prenom,username,adress)
    {
        this.email = email;
        this.nom = nom;
        this.prenom = prenom;
        this.username = username;
        this.adress =adress;
    }
    changePictures(file)
    {
        this.imagePath = this.imagePath + file;
    }
}
class Objet
{
    picture
    proprietaireId
    Name
    ValuePerDay
    constructor(picture,proprietaireId,Name,ValuePerDay) {
        this.picture = picture
        this.proprietaireId = proprietaireId
        this.Name = Name
        this.ValuePerDay = ValuePerDay
    }
}

export {User,Objet}
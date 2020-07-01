class User
{
    imagePath:string = "";
    email:string;
    nom:string;
    prenom:string;
    username:string;
    adress:string;
    static ImagePath = "../../ImageFile/UserImage";
    constructor(email:string,nom:string,prenom:string,username:string,adress:string)
    {
        this.email = email;
        this.nom = nom;
        this.prenom = prenom;
        this.username = username;
        this.adress =adress;
    }
    changePictures(file:string)
    {
        this.imagePath = this.imagePath + file;
    }
}
class Objet
{
    picture:String
    proprietaireId:String
    Name:String
    ValuePerDay:Number
    constructor(picture:String,proprietaireId:String,Name:String,ValuePerDay:Number) {
        this.picture = picture
        this.proprietaireId = proprietaireId
        this.Name = Name
        this.ValuePerDay = ValuePerDay
    }
}

export {User,Objet}
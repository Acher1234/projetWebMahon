import React from 'react';
import $ from 'jquery'
import {Objet} from "../GlobalPages/Classes";


class AffichageObject extends React.Component<{ URL:string,numero:Number }, { numero:Number,tableauObjet:Objet[] }>
{
    constructor(props:any) {
        super(props);
    }
    componentWillMount() {
        this.setState({tableauObjet:new Array<Objet>()})
        var objet = this;
        $.ajax({
            url:objet.props.URL+'/recupObjet',
            data:{NumberPage:objet.state.numero},
            method:'GET',
            xhrFields:{withCredentials:true},
            success:function (data)
            {
                data.element.map(function (item:any,i:number)
                {
                })
            }})
    }

    render() {
        return(<p></p>);
    }
}

export default AffichageObject;

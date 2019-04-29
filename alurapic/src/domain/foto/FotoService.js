export default class FotoService {

    constructor(http){
        this._http = http;
    }
    
    lista(){
        let promisse = this._http.get('v1/fotos');
        
        return promisse
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter as fotos');
            });
    }

    cadastro(foto){
        if(foto._id){
            return this._http.put(`v1/fotos/${foto._id}`, foto);
        }
        else
        {
            return this._http.post('v1/fotos', foto);
        }
    }

    apaga(id){
        return this._http.delete(`v1/fotos/${id}`)
            .then(null, err => {
                console.log(err);
                throw new Error('Não foi possível remover a foto.');
            });
    }

    busca(id){
        let promisse = this._http.get(`v1/fotos/${id}`);

        return promisse
            .then(res => res.json());

    }
}
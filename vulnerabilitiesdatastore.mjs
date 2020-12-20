

/**
 * Object of this will contain Set of all the vulnerabilities 
 */
class VulnerabilitiesDataStore{

    constructor(){
        this._container = new Array();

    }

    add(product, desc,cvss,number)
    {
        let dataItem = new DataItem(product,desc,cvss,number);
        this._container.push(dataItem);
    }

    size(){
        return this._container.size;
    }

    filter(fn){
        this._container.filter(fn);

    }
}

class DataItem{
    constructor(p,d,c,n){
        this._product=p;
        this._desc = d;
        this._cvss = c;
        this._number = n;
    }

    get product(){
        return this._product;
    }

    set product(p){
        this._product = p;
    }

    get description(){
        this._desc;
    }

    set description(d){
        this._desc = d;
    }
}

export default VulnerabilitiesDataStore;
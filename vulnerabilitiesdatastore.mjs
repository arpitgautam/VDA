

/**
 * Object of this will contain Set of all the vulnerabilities 
 */
class VulnerabilitiesDataStore{

    constructor(){
        this._container = new Set();

    }

    add(product, desc,cvss,number)
    {
        let dataItem = new DataItem(product,desc,cvss,number);
        this._container.add(dataItem);
    }

    size(){
        return this._container.size;
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
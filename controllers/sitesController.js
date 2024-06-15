const model = require('../models/sitesModel');

async function getSites(start, limit) {
    try {
      console.log("in controller' haddasssa is sweet");
        return model.getSites(start, limit);
    } catch (err) {
        throw err;
    }

}
async function getSite(id){
    try {
        console.log("get several site");
          return model.getSite(id);
      } catch (err) {
          throw err;
      }
}

async function deleteSite(id){
    try{
console.log("in delete function");
return model.deleteSite(id);
    }catch(err){
        throw err;
    }
}

module.exports={getSites,getSite, deleteSite}
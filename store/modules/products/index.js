import actions from'./actions';
import getters from'./getters';
import mutations from'./mutations';
const state = {
    product:null,
    listProduct:null,
    pagination:{
        skip:0, 
        limit:10, 
        total:0
    },
    listningData:null,
    gradingResults:null,
    groups:[],
    questions:[],
    topics:[]
};

export default{
    namespaced:true,
    state,
    getters,
    actions,
    mutations
};

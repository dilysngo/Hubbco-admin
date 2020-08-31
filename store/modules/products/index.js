import actions from'./actions';
import getters from'./getters';
import mutations from'./mutations';
const state = {
    listProduct:null,
    pagination:{

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

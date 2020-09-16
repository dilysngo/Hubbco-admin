import actions from'./actions';
import getters from'./getters';
import mutations from'./mutations';
const state = {
    listSuppliers:[],
    paginationSupplier:{
        skip:0, 
        limit:10, 
        total:0
    },
    filters:{
        keywork:''
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

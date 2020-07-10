import actions from'./actions';
import getters from'./getters';
import mutations from'./mutations';

export default{
    namespaced:true,
    state:{
        listProvider:[],
        paginationProvider:null,
        
    },
    getters,
    actions,
    mutations
};

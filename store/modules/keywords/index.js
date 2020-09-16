import actions from'./actions';
import getters from'./getters';
import mutations from'./mutations';

export default{
    namespaced:true,
    state:()=>({
        allKeywords:null,
        keywordsPagination:null,
        keywordDeletedId:null
    }),
    getters,
    actions,
    mutations
};

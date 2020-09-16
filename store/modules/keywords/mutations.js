import types from'../../mutation-types';

export default{
    [types.ALL_KEYWORDS](state, allKeywords) {
        state.allKeywords = allKeywords;
    },
    [types.KEYWORDS_PAGINATION](state, keywordsPagination) {
        state.keywordsPagination = keywordsPagination;
    },
    [types.KEYWORD_DELETED_ID](state, id) {
        state.allKeywords = state.allKeywords.filter(item=>item.id !== Number(id));
    }
};

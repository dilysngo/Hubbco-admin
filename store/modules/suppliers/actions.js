
import types from'../../mutation-types';

async function getAllSuppliers({commit,state}, options) {
   
    const fillers = state.filters;
    const conditions = state.paginationSupplier;
    const fetchedData = await this.$axios.$get(
        `/api/suppliers?keyword=${fillers.keywork}&skip=${conditions.skip}&limit=${conditions.limit}`
    );
    commit(types.SUPPLIERS_LIST, fetchedData.results);
    // commit(types.SUPPLIERS_PAGINATION, fetchedData.pagination);
    return fetchedData;
}
export default{
    getAllSuppliers
};

import userTypes from'./modules/user/types';
import categoryTypes from'./modules/category/types';
import blogTypes from'./modules/blog/types';
import providerTypes from'./modules/provider/types';
import mediaTypes from'./modules/media/types';
import brandTypes from'./modules/brands/types';
import productsTypes from'./modules/products/types';
import suppliersTypes from'./modules/suppliers/types';
import keywordsTypes from'./modules/keywords/types';

export default{
    ...userTypes,
    ...categoryTypes,
    ...blogTypes,
    ...providerTypes,
    ...mediaTypes,
    ...brandTypes,
    ...productsTypes,
    ...suppliersTypes,
    ...keywordsTypes
};

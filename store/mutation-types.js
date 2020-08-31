import userTypes from'./modules/user/types';
import categoryTypes from'./modules/category/types';
import blogTypes from'./modules/blog/types';
import providerTypes from'./modules/provider/types';
import mediaTypes from'./modules/media/types';
import productsTypes from'./modules/products/types';

export default{
    ...userTypes,
    ...categoryTypes,
    ...blogTypes,
    ...providerTypes,
    ...mediaTypes,
    ...productsTypes
};

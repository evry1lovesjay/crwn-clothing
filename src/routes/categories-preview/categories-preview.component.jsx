import { useContext, Fragment} from 'react';

import { CategoriesContext } from '../../contexts/categories.context';

// product card replaced with Category CategoryPreview, which filters our products to 4 per page
// import ProductCard from '../../components/product-card/product-card.component';

import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
    const {categoriesMap} = useContext(CategoriesContext)
    return ( 
        <Fragment>     
                {
                    Object.keys(categoriesMap).map(title=> {
                        const products = categoriesMap[title];
                        return (
                            <CategoryPreview key={title} title={title} products={products}/>
                        )
                        // <Fragment key={title}>
                        //     <h2>{title}</h2>
                        //     <div className="products-container">
                        //         {categoriesMap[title].map((product)=>{
                        //         return <Produ key={product.id} product={product}/>
                        //         })}
                        //     </div>
                        // </Fragment>
                })}
        </Fragment>
     );
}
 
export default CategoriesPreview;
import { AddProductDrawer, DeleteProductDrawer, EditProductDrawer } from '@/components/features';
import { ProductList } from '@/components/list';
import { PageHeader, Pagination } from '@/components/ui';
import { translations } from '@/constants';
import { NextPage } from 'next';

const ProductsPage: NextPage = () => {
	return (
		<>
			<PageHeader
				breadcrumbItems={[{ title: translations.products, url: '/products' }]}
				title={translations.products}
			/>
			<ProductList />
			<Pagination />

			{/* Edit Product Drawer */}
			<EditProductDrawer />
			{/* Delete Product Drawer */}
			<DeleteProductDrawer />
			{/* Add Product Drawer */}
			<AddProductDrawer />
		</>
	);
};

export default ProductsPage;

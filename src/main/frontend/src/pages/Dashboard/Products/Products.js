import { useEffect, useState } from "react";
import { useCtx } from "../../../hooks/context/useCtx";
import { useStore } from '../../../hooks/store/useStore';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Products() {
  const navigate = useNavigate();

  const { ctx } = useCtx();

  const search = useStore(state => state.dashboard.search);
  const products = useStore(state => state.dashboard.products);
  const setProducts_ = useStore(state => state.dashboard.setProducts);
  const deleteProduct_ = useStore(state => state.dashboard.deleteProduct);
  const addCategory_ = useStore(state => state.dashboard.addCategory);
  const updateCategory_ = useStore(state => state.dashboard.updateCategory);
  const deleteCategory_ = useStore(state => state.dashboard.deleteCategory);

  const [searchedProducts, setSearchProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('')
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState('');
  const [showUpdatedCategoryForm, setShowUpdatedCategoryForm] = useState(false);
  const [showDeleteCategoryDialog, setShowDeleteCategoryDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showDeleteProductDialog, setShowDeleteProductDialog] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await ctx.axios.get('/dashboard/products');
        setProducts_(res.data);
      } catch (err) {
        console.log(err);
        if (!err.response) {
          setErrMsg('No server response');
        } else if (err.response.status == 403) {
          setErrMsg('Unauthorizhed: navigate to products from dashboard (by clicking), not from url link')
        } else {
          setErrMsg('Server error');
        }
      }
    }
    getProducts();
    setSelectedCategory(Object.keys(products)[0]);
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setShowDeleteCategoryDialog(false);
        setShowDeleteProductDialog(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!search) {
      setSearchProducts([])
      return;
    }
    for (const category in products) {
      if (category.toLowerCase() == search?.toLowerCase()) {
        setSelectedCategory(category);
        setSearchProducts([]);
        return;
      }
      const categoryProducts = products[category].filter(product => {
        const titleMatchs = product.title.toLowerCase().includes(search?.toLowerCase());
        const descriptionMatchs = product.description.toLowerCase().includes(search?.toLowerCase());
        return titleMatchs || descriptionMatchs;
      });
      if (categoryProducts.length > 0) {
        setSearchProducts(categoryProducts);
        return;
      }
    }
  }, [search])

  function addCategory() {
    if (newCategory.length !== 0) {
      if (Object.keys(products).includes(newCategory)) {
        setErrMsg('This category already exists');
      } else {
        addCategory_(newCategory);
      }
    }
    setNewCategory('');
    setShowNewCategoryForm(false);
  }


  async function updateCategory() {
    if (selectedCategory !== updatedCategory) {
      await ctx.axios.put(`/dashboard/categories/${selectedCategory}`, updatedCategory, {
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      updateCategory_(selectedCategory, updatedCategory);
      setSelectedCategory(updatedCategory);
      setUpdatedCategory('');
      setShowUpdatedCategoryForm(false);
    }
  }

  async function deleteCategory() {
    try {
      await ctx.axios.delete(`/dashboard/categories/${selectedCategory}`);
    } catch (err) {
      console.log(err);
      if (!err.response) {
        setErrMsg('No server response');
      } else if (err.response.status == 400) {
        setErrMsg('You cannot delete empty category')
      } else {
        setErrMsg('Server error');
      }
    }
    deleteCategory_(selectedCategory);
    setSelectedCategory('');
    setShowDeleteCategoryDialog(false);
  }

  async function deleteProduct() {
    await ctx.axios.delete(`/dashboard/products/${productToDelete.uuid}`);
    const index = products[selectedCategory].findIndex(p => (
      p.img_url === productToDelete.img_url &&
      p.title === productToDelete.title &&
      p.description === productToDelete.description &&
      p.price === productToDelete.price
    ))
    if (index !== -1) {
      deleteProduct_(selectedCategory, index);
      if (products[selectedCategory].length === 0) {
        deleteCategory_(selectedCategory);
        setSelectedCategory(Object.keys(products)[0] || '');
      }
      console.log(`Product ${productToDelete.title} delete from ${selectedCategory} category`);
    } else {
      console.log(`Product ${productToDelete.title} not found in ${selectedCategory} category`);
    }
    setShowDeleteProductDialog(false);
    setProductToDelete(null);
  }

  const productsToRender =
    searchedProducts?.length > 0 ?
      searchedProducts : products[selectedCategory]?.length > 0 ?
        products[selectedCategory] : [];

  return (
    <div className='px-[6rem] pt-[2rem] overflow-auto'>
      <div className={errMsg ? 'w-full rounded bg-red-200 text-red-700 font-medium mb-2 p-2' : 'hidden'}>{errMsg}</div>
      <h1 className="text-2xl font-bold mb-[1rem]">Your Categories</h1>
      <div className="flex gap-[1rem]">
        <button onClick={() => setShowNewCategoryForm(true)} className="bg-green-500 rounded text-white px-4 py-2">
          Add Category
        </button>
        <button onClick={() => setShowUpdatedCategoryForm(true)} className="bg-yellow-500 rounded text-white px-4 py-2">
          Update Category
        </button>
        <button onClick={() => setShowDeleteCategoryDialog(true)} className="bg-red-500 rounded text-white px-4 py-2">
          Delete Category
        </button>
      </div>
      <div className="flex flex-wrap mt-4">
        {Object.keys(products).map((category, i) => (
          <button key={i} onClick={() => setSelectedCategory(category)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded mb-[0.5rem] mr-[0.75rem] inline-block">
            {category}
          </button>
        ))}
      </div>
      {showNewCategoryForm && (
        <div className="flex flex-col mt-[2rem]">
          <h2 className="text-xl font-bold mb-2">Add New Category</h2>
          <label htmlFor="newCategory" className="text-gray-700">Category Name:</label>
          <input
            type='text'
            id='newCategory'
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            className="border rounded px-3 py-2 mt-1 mb-2 w-[24rem] required"
          />
          <div className="flex gap-[1rem]">
            <button onClick={addCategory} className="bg-sky-400 text-white px-4 py-2 rounded">
              Add Category
            </button>
            <button onClick={() => setShowNewCategoryForm(false)} className="bg-red-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}
      {showUpdatedCategoryForm && (
        <div className="flex flex-col mt-[2rem]">
          <h2 className="text-xl font-bold mb-2">Update Category <span className="uppercase">{selectedCategory}</span></h2>
          <label htmlFor="updatedCategory" className="text-gray-700">New Category Name:</label>
          <input
            type='text'
            id='updatedCategory'
            value={updatedCategory}
            onChange={e => setUpdatedCategory(e.target.value)}
            className="border rounded px-3 py-2 mt-1 mb-2 w-[24rem] required"
          />
          <div className="flex gap-[1rem]">
            <button onClick={updateCategory} className="bg-sky-400 text-white px-4 py-2 rounded">
              Update Category
            </button>
            <button onClick={() => setShowUpdatedCategoryForm(false)} className="bg-red-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}
      {showDeleteCategoryDialog && (
        <div onClick={() => setShowDeleteCategoryDialog(false)} className="fixed top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center">
          <div onClick={e => e.stopPropagation()} className="bg-white p-[2rem] rounded">
            <p className="text-xl font-bold mb-4">Are you sure you want to delete the <span className="uppercase">{selectedCategory}</span> category and all its products?</p>
            <div className="flex justify-end">
              <button onClick={() => setShowDeleteCategoryDialog(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2">
                Cancel
              </button>
              <button onClick={deleteCategory} className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <h1 className='text-2xl font-bold pt-[2rem] uppercase'>{selectedCategory}</h1>
      <button
        onClick={() => navigate('/dashboard/products/create-update', { state: { category: selectedCategory } })}
        className={`${selectedCategory == null && 'hidden'} bg-green-500 text-white px-4 py-2 rounded my-[1rem]`}
      >
        Add Product
      </button>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] my-4 pt-[1px] pl-[1px]'>
        {productsToRender.map((product, i) => (
          <div
            key={i}
            onClick={() => navigate('/dashboard/products/create-update', { state: { category: selectedCategory, product } })}
            className='flex flex-col justify-between items-center cursor-pointer border bg-white border-gray-300 -ml-[1px] -mt-[1px]'
          >
            <img src={`${ctx.baseURL}/products/${product.uuid}/images/${product.primaryImageFilename}`} alt={product.title} className='w-[13rem] pt-[1rem]' />
            <div className="w-[16rem] flex flex-col p-[1rem]">
              <span className='font-semibold'>{product.title}</span>
              <div
                className="prose"
                style={{
                  height: '4rem',
                  lineHeight: '20px',
                  wordBreak: 'break-all',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  MozBoxOrient: 'vertical',
                  msBoxOrient: 'vertical',
                  boxOrient: 'vertical',
                  WebkitLineClamp: NUM_OF_DESC_LINES,
                  MozLineClamp: NUM_OF_DESC_LINES,
                  msLineClamp: NUM_OF_DESC_LINES,
                  lineClamp: NUM_OF_DESC_LINES,
                  overflow: 'hidden',
                }}
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
              <div className="flex justify-between mt-[1rem]">
                <span className=''>{formatter.format(product.price)}</span>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setShowDeleteProductDialog(true);
                    setProductToDelete(product);
                  }}
                  className="text-red-500 border border-gray-100 rounded px-[0.75rem]"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showDeleteProductDialog && (
        <div onClick={() => setShowDeleteProductDialog(false)} className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
          <div onClick={e => e.stopPropagation()} className="bg-white p-[2rem] rounded">
            <p className="text-xl font-bold mb-4">Are you sure you want to delete product <span className="uppercase">{productToDelete.title}</span>?</p>
            <div className="flex justify-end">
              <button onClick={() => setShowDeleteProductDialog(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2">
                Cancel
              </button>
              <button onClick={deleteProduct} className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const NUM_OF_DESC_LINES = 3;

const formatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'CZK'
});

export default Products
export default function CategoryPage({
  category,          
  products = [],     
  onAddToCart,       
  onBack,           
  cartItems = []     
}) {
  
  return (
    <div className="category-page-wrapper" style={{ padding: '20px' }}>
      <section className="section-header" style={{ marginBottom: '30px' }}>
        <div>
          <button 
            type="button" 
            className="back-button" 
            onClick={onBack} 
            style={{ 
              cursor: 'pointer', 
              marginBottom: '15px', 
              border: 'none', 
              background: 'none', 
              fontWeight: 'bold',
              fontSize: '16px',
              color: '#333'
            }}
          >
            ← Back to categories
          </button>
          <p className="eyebrow" style={{ color: '#ef0d19', fontWeight: 'bold', textTransform: 'uppercase', margin: '0' }}>Category</p>
          <h2 style={{ margin: '5px 0 10px 0', fontSize: '28px' }}>{category?.name || 'Category'}</h2>
          <p className="section-subtitle" style={{ color: '#666', margin: '0' }}>
            {category?.description || 'Browse products in this category.'}
          </p>
        </div>
      </section>
      <section className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
        {products && products.length > 0 ? (
          products.map((product) => {
            const inCart = cartItems && cartItems.some((item) => item.id === product.id)
            const cartItem = cartItems && cartItems.find((item) => item.id === product.id)
            const count = cartItem ? cartItem.quantity : 0

            return (
              <article 
                key={product.id} 
                className="product-card" 
                style={{ 
                  border: '1px solid #eee', 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  backgroundColor: '#fff',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                  />
                  {count > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      backgroundColor: '#ef0d19',
                      color: '#fff',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {count} Added
                    </span>
                  )}
                </div>
                <div className="product-details" style={{ padding: '15px', flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ marginBottom: '15px' }}>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#333' }}>{product.name}</h3>
                    <p style={{ margin: '0', fontWeight: 'bold', color: '#ef0d19', fontSize: '16px' }}>
                      ₹{product.price}
                    </p>
                  </div>
                  <button
                    type="button"
                    className={`add-button ${inCart ? 'added' : ''}`}
                    onClick={() => onAddToCart(product)}
                    style={{ 
                      cursor: 'pointer',
                      width: '100%',
                      padding: '10px',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      transition: 'background 0.2s'
                    }}
                  >
                    {inCart ? `🛒 Add Again (${count})` : 'Add to order'}
                  </button>
                </div>
              </article>
            )
          })
        ) : (
          <p className="empty-state" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#999' }}>
            No products found in this category.
          </p>
        )}
      </section>

    </div>
  )
}
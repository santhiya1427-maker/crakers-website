export default function CheckoutPage({ cartItems, cartCount, cartTotal, onRemoveItem, handleCheckout, onBackToProduct, message }) {
  return (
    <section className="checkout-section">
      <div className="section-header">
        <div>
          <p className="eyebrow">Order summary</p>
          <h2>Your current order</h2>
        </div>
        <button type="button" className="text-button" onClick={onBackToProduct}>
          ← Back to product
        </button>
      </div>
      {message && (
        <div className="message-banner">{message}</div>
      )}

      {cartCount === 0 ? (
        <p className="empty-state">Your order list is empty. Add items first.</p>
      ) : (
        <div className="checkout-card">
          <div className="checkout-items">
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Qty: {item.quantity}</p>
                  <p>Price: ₹{item.price * item.quantity}</p>
                </div>
                <button className="text-button" onClick={() => onRemoveItem(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="checkout-summary">
            <p>Total amount</p>
            <strong>₹{cartTotal}</strong>
            <button className="primary-button full-width" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )
      }
    </section>
  )
}

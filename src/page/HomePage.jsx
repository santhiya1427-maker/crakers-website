import { useEffect, useState } from 'react'

export default function HomePage({ specialOffers = [], categories = [], onCategorySelect }) {
  const [activeOfferIndex, setActiveOfferIndex] = useState(0)
  const hasOffers = specialOffers && specialOffers.length > 0
  const offersLength = hasOffers ? specialOffers.length : 0

  useEffect(() => {
    if (offersLength === 0) return;
    
    const interval = setInterval(() => {
      setActiveOfferIndex((current) => (current + 1) % offersLength)
    }, 3200)
    return () => clearInterval(interval)
  }, [offersLength])
  const activeOffer = hasOffers ? specialOffers[activeOfferIndex] : null

  return (
    <>
      {hasOffers && activeOffer && (
        <section className="special-offers">
          <div className="section-header">
            <div>
              <h1 className="eyebrow">Special offers</h1>
              <h3>Festival offers to light up the night</h3>
              <p className="section-subtitle">Handpicked festive deals with safe, bright cracker combos for your celebration.</p>
            </div>
          </div>
          <article className="offer-card large">
            <img src={activeOffer.image} alt={activeOffer.title} className="offer-image" />
            <div className="offer-copy">
              <span className="offer-step">0{activeOfferIndex + 1}</span>
              <strong>{activeOffer.title}</strong>
              <p>{activeOffer.description}</p>
              <div className="offer-dots">
                {specialOffers.map((_, index) => (
                  <span key={index} className={index === activeOfferIndex ? 'dot active' : 'dot'} />
                ))}
              </div>
            </div>
          </article>
        </section>
      )}
      <section className="categories-section">
        <div className="section-header">
          <div>
            <h1 className="eyebrow">Shop by category</h1>
            <h3>Browse cracker categories</h3>
            <p className="section-subtitle">Quickly jump into the safest and brightest cracker collections.</p>
          </div>
        </div>
        <div className="category-grid">
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <button
                key={category.id}
                className="category-card"
                onClick={() => onCategorySelect(category.id)}
              >
                <img src={category.image} alt={category.name} />
                <div className="category-info">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              </button>
            ))
          ) : (
            <p className="empty-state">No categories found for this search.</p>
          )}
        </div>
      </section>
    </>
  )
}
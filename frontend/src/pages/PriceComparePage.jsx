import { useState } from 'react'
import Icon from '../components/common/Icon.jsx'
import { mockProducts } from '../services/api.js'

const sampleOffers = {
  p1: [
    { shop: 'MUSE STORE', price: 89000, shipping: 0 },
    { shop: 'THE OBJECT', price: 92000, shipping: 0 },
    { shop: 'DAILY ARCHIVE', price: 87000, shipping: 3000 },
  ],
  p2: [
    { shop: 'MUSE STORE', price: 178000, shipping: 0 },
    { shop: 'THE OBJECT', price: 189000, shipping: 0 },
    { shop: 'DAILY ARCHIVE', price: 205000, shipping: 3000 },
  ],
  p3: [
    { shop: 'MUSE STORE', price: 129000, shipping: 0 },
    { shop: 'THE OBJECT', price: 124000, shipping: 3000 },
    { shop: 'DAILY ARCHIVE', price: 135000, shipping: 0 },
  ],
  p4: [
    { shop: 'MUSE STORE', price: 64000, shipping: 3000 },
    { shop: 'THE OBJECT', price: 67000, shipping: 0 },
    { shop: 'DAILY ARCHIVE', price: 62000, shipping: 3000 },
  ],
}

const formatPrice = (price) => `₩${price.toLocaleString('ko-KR')}`

export default function PriceComparePage() {
  const [selectedProductId, setSelectedProductId] = useState('p2')
  const product = mockProducts.find((item) => item.id === selectedProductId) ?? mockProducts[0]
  const offers = [...(sampleOffers[product.id] ?? [])].sort(
    (first, second) => first.price + first.shipping - (second.price + second.shipping),
  )
  const lowestTotal = offers[0].price + offers[0].shipping
  const highestTotal = offers[offers.length - 1].price + offers[offers.length - 1].shipping
  const averageTotal = Math.round(
    offers.reduce((sum, offer) => sum + offer.price + offer.shipping, 0) / offers.length,
  )

  return <main className="inner-page">
    <div className="page-hero page-hero-clay compare-hero">
      <span className="eyebrow">05 / SAME ITEM, SMARTER CHOICE</span>
      <h1>같은 상품이라면,<br /><em>더 좋은 선택을 한눈에.</em></h1>
      <p>판매처별 가격과 배송비를 함께 비교해 보세요.</p>
      <span className="page-hero-mark"><Icon name="Search" size={76} /></span>
    </div>

    <section className="compare-content section-wrap">
      <div className="compare-section-heading">
        <div>
          <span className="eyebrow">ONFIT SELECT · PRICE CHECK</span>
          <h2>비교할 아이템을 골라주세요.</h2>
          <p>상품을 선택하면 예시 판매처 가격이 함께 바뀝니다.</p>
        </div>
        <span className="demo-pill">시연용 예시 데이터</span>
      </div>

      <div className="compare-product-picker" aria-label="비교할 상품 선택">
        {mockProducts.map((item) => (
          <button
            type="button"
            className={`compare-product-option${item.id === product.id ? ' is-active' : ''}`}
            key={item.id}
            onClick={() => setSelectedProductId(item.id)}
            aria-pressed={item.id === product.id}
          >
            <img src={item.image} alt="" loading="lazy" />
            <span>
              <small>{item.category}</small>
              <strong>{item.name}</strong>
              <b>{formatPrice(item.price)}부터</b>
            </span>
            {item.id === product.id && <Icon name="Check" size={16} />}
          </button>
        ))}
      </div>

      <div className="compare-product">
        <img src={product.image} alt={product.name} />
        <div className="compare-product-copy">
          <span className="eyebrow">{product.category}</span>
          <h2>{product.name}</h2>
          <p>같은 상품 기준으로 판매가와 배송비를 합산해 비교했어요.</p>
          <span className="compare-status"><i /> 예시 판매처 {offers.length}곳</span>
        </div>
        <div className="compare-lowest">
          <span>배송비 포함 최저가</span>
          <strong>{formatPrice(lowestTotal)}</strong>
          <small>{offers[0].shop}</small>
        </div>
      </div>

      <div className="compare-summary" aria-label="가격 비교 요약">
        <div><span>최저 결제 예상가</span><strong>{formatPrice(lowestTotal)}</strong></div>
        <div><span>판매처 평균</span><strong>{formatPrice(averageTotal)}</strong></div>
        <div><span>최대 절약 차이</span><strong>{formatPrice(highestTotal - lowestTotal)}</strong></div>
      </div>

      <div className="compare-table-heading">
        <div>
          <span className="eyebrow">SELLER PRICE COMPARISON</span>
          <h3>판매처별 가격</h3>
        </div>
        <span>가격 + 배송비 기준</span>
      </div>
      <div className="offer-list">
        <div className="offer-header"><span>판매처</span><span>판매가</span><span>배송비</span><span>총 결제 예상가</span></div>
        {offers.map((offer, index) => (
          <div className={`offer-row${index === 0 ? ' is-lowest' : ''}`} key={offer.shop}>
            <div className="offer-shop">
              <strong>{offer.shop}</strong>
              {index === 0 && <span>최저가</span>}
            </div>
            <span>{formatPrice(offer.price)}</span>
            <span>{offer.shipping === 0 ? '무료배송' : formatPrice(offer.shipping)}</span>
            <strong>{formatPrice(offer.price + offer.shipping)}</strong>
          </div>
        ))}
      </div>

      <p className="data-note">판매처와 가격은 화면 확인을 위한 예시입니다. 실제 상품·옵션 매칭 및 크롤링 데이터가 연결되면 수집 시각과 함께 표시할 예정입니다.</p>
      <a className="text-link compare-back-link" href="#/price"><Icon name="ArrowLeft" size={15} /> 가격 인사이트로 돌아가기</a>
    </section>
  </main>
}

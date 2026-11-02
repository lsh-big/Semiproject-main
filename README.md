# ONFIT

**크롤링 기반 개인 맞춤형 패션 코디 및 스마트 구매 추천 서비스**

ONFIT은 옷, 신발, 액세서리를 개인 취향과 체형에 맞춰 제안하고, 상품 매칭과 가격 흐름을 함께 보여주는 4인 팀 프로젝트입니다.

## Tech stack

| Area | Stack | Responsibility |
| --- | --- | --- |
| Frontend | React, Tailwind CSS, Vite | Style profile, outfit recommendations, digital wardrobe, price insights |
| API | Python, FastAPI | Member/profile, outfit, wardrobe, product and price APIs |
| Database | TiDB Cloud | Users, profiles, products, offers, price history, wardrobe and outfits |
| Collection | Python, Playwright, BeautifulSoup | Approved-source product collection and scheduled price refresh |
| Data | Pandas, NumPy, RapidFuzz | Product matching, price statistics and recommendation signals |
| Deploy | GitHub, Render | Static frontend, API web service and scheduled collection job |

## Repository layout

```text
ONFIT/
├── frontend/                 # React + Tailwind, owned by Hwang Sang-ok
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/        # common, outfit, wardrobe, price
│       ├── pages/
│       └── services/api.js
├── backend/                  # Single FastAPI application
│   ├── app/
│   │   ├── api/               # auth, profiles, outfits, wardrobe, products, prices
│   │   ├── core/              # settings and security
│   │   ├── crawlers/          # collectors, parsers, pipelines, scheduled jobs
│   │   ├── db/                # TiDB connection and ORM
│   │   ├── schemas/
│   │   └── services/          # styling, recommendation, price, matching
│   ├── alembic/
│   ├── tests/
│   └── requirements.txt
├── database/                  # schema.sql and seed.sql
├── docs/                      # project notes and existing team artifacts
├── .github/workflows/
└── render.yaml
```

## Run locally

### Frontend

```bash
cd frontend
npm install
Copy-Item .env.example .env.local
npm run dev
```

### FastAPI

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item ..\.env.example .env
uvicorn app.main:app --reload
```

Set `DATABASE_URL` and `SECRET_KEY` in `backend/.env` before connecting real accounts or data. The example prices and product images are presentation data until the team connects approved sources and TiDB.

### Mock.shop sample products

The seasonal outfit page currently curates winter outfits using apparel, international fashion, menswear, accessories, snowwear, outerwear, boutique, retail, outdoor, and streetwear catalogs from [Mock.shop](https://mock.shop/)'s public Shopify Storefront API without API keys or backend setup. Gender labels in product titles are respected, age-group style keywords influence curation, and each sample product is assigned only once across all age and gender looks when the catalog has enough eligible inventory. Mock.shop does not provide reliable age or sizing metadata, so age is a style-based recommendation rather than a size or fit guarantee. Its outfit board uses the same sample products shown in each recommendation, and sample links open the corresponding Mock.shop reference storefront. These are development placeholders, not actual store listings: displayed prices are in USD, and products, inventory, and product pages are not live purchasing data. Do not use this dataset for live pricing, inventory, or buying recommendations.

## Team ownership

- **Song Seong-geun (PM):** body/color styling, wardrobe and outfit recommendation APIs; integration and deliverables.
- **Hwang Sang-ok:** all frontend screens, responsive UI, profile and recommendation flows, price charts/comparison, API integration.
- **Ahn Jong-beom:** product collection, normalization and matching, seller price comparison.
- **Lee Seung-ho:** scheduled price refresh, price history, timing analysis and crawl logs.

See [ONFIT project notes](docs/onfit/README.md) for collaboration rules and data-handling notes.

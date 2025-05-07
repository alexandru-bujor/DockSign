import React, { useState } from 'react';
import './PlansPage.css';

const plans = [
  {
    name: 'Personal',
    price: { annual: 10, monthly: 12 },
    description: 'For individuals and sole proprietors with basic e-signature needs',
    features: [
      'Send 5 envelopes for signature each month',
      'Save time and standardize with reusable templates',
      'Streamline your workflows with 900+ integrations',
    ],
    cta: 'Buy Now',
    mostPopular: false,
  },
  {
    name: 'Standard',
    price: { annual: 25, monthly: 30 },
    description: 'For small to medium teams that need to send, sign and collaborate',
    features: [
      'Send a total of 100 envelopes/user/year for signature',
      'Share your templates easily with your team members',
      'Add comments in real time with collaborative commenting',
    ],
    cta: 'Buy Now',
    mostPopular: true,
  },
  {
    name: 'Business Pro',
    price: { annual: 40, monthly: 48 },
    description: 'For automating and optimizing agreements with advanced features',
    features: [
      'Send a total of 100 envelopes/user/year for signature',
      'Request attachments easily from your recipients',
      'Build conditional logic and use advanced fields',
    ],
    cta: 'Buy Now',
    mostPopular: false,
  },
];

const PlansPage: React.FC = () => {
  const [billing, setBilling] = useState<'annual' | 'monthly'>('annual');
  const [tab, setTab] = useState('eSignature');

  return (
    <div className="plans-bg">
      <div className="plans-banner">
        <span className="plans-banner-icon">&#10003;</span>
        Offer ends Friday. Save 20% on annual plans with promo code <b>ANNUAL20</b>. Personal plans excluded.*
        <span className="plans-banner-save">Save 20%</span>
      </div>
      <div className="plans-container">
        <h1 className="plans-title">Choose your plan</h1>
        <div className="plans-tabs">
          {['eSignature', 'eSignature real estate', 'Developer API', 'IAM'].map(t => (
            <button
              key={t}
              className={`plans-tab${tab === t ? ' active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="plans-billing-toggle">
          <button
            className={`billing-btn${billing === 'annual' ? ' active' : ''}`}
            onClick={() => setBilling('annual')}
          >
            Annual
            {billing === 'annual' && <span className="billing-save">Save up to 44%</span>}
          </button>
          <button
            className={`billing-btn${billing === 'monthly' ? ' active' : ''}`}
            onClick={() => setBilling('monthly')}
          >
            Monthly
          </button>
        </div>
        <div className="plans-cards-row">
          {plans.map((plan) => (
            <div className={`plans-card${plan.mostPopular ? ' popular' : ''}`} key={plan.name}>
              {plan.mostPopular && <div className="plans-popular">MOST POPULAR</div>}
              <div className="plans-card-title">{plan.name}</div>
              <div className="plans-card-desc">{plan.description}</div>
              <div className="plans-card-price">
                ${plan.price[billing]}
                <span className="plans-card-per">/month{plan.name === 'Personal' ? '' : ' per user'}</span>
              </div>
              <div className="plans-card-annual">
                ${plan.price[billing] * (billing === 'annual' ? 12 : 1)} billed {billing === 'annual' ? 'annually' : 'monthly'}
              </div>
              <button className="plans-card-btn">{plan.cta}</button>
              <ul className="plans-card-features">
                {plan.features.map((f, i) => (
                  <li key={i}><span className="plans-check">✔</span> {f}</li>
                ))}
              </ul>
            </div>
          ))}
          <div className="plans-card contact">
            <div className="plans-card-title">Expand your team's toolkit</div>
            <div className="plans-card-desc">Customize an eSignature or IAM plan that scales to your business needs.</div>
            <div className="plans-card-contact">1 (877) 720-2040</div>
            <button className="plans-card-btn contact">Contact Sales</button>
            <ul className="plans-card-features">
              <li><span className="plans-check">✔</span> Enhance data management across multiple accounts</li>
              <li><span className="plans-check">✔</span> Get live technical support 24/7</li>
              <li><span className="plans-check">✔</span> Protect your agreements to avoid identity fraud</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansPage; 
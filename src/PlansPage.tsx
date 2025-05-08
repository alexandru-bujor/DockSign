import React, { useState } from 'react';
import './PlansPage.css';

const plans = [
  {
    name: 'Personal',
    price: { annual: 39, monthly: 49 },
    description: 'For individuals and sole proprietors with basic e-signature needs',
    features: [
      '30 docs availble for sign/mo.',
      'Cloud storage of 5GB',
      'Personal cabinet',
      'Unlimited free verifications',
      'Get live technical support 24/7',
      'Protect your agreements to avoid identity fraud'
      
    ],
    cta: 'Buy Now',
    mostPopular: false,
  },
  {
    name: 'Growth',
    price: { annual: 129, monthly: 149 },
    description: 'For small to medium teams that need to send, sign and collaborate',
    features: [
      '100 docs availble for sign/mo.',
      'Cloud storage of 20GB',
      'Personal cabinet',
      'Unlimited free verifications',
      'Get live technical support 24/7',
      'Protect your agreements to avoid identity fraud'
    ],
    cta: 'Buy Now',
    mostPopular: true,
  },
  {
    name: 'Professional',
    price: { annual: 269, monthly: 299 },
    description: 'For automating and optimizing agreements with advanced features',
    features: [
      '250 docs availble for sign/mo.',
      'Cloud storage of 50GB',
      'Personal cabinet',
      'Unlimited free verifications',
      'Get live technical support 24/7',
      'Protect your agreements to avoid identity fraud',
    ],
    cta: 'Buy Now',
    mostPopular: false,
  },
  {
    name: 'Enterprise',
    price: { annual: 449, monthly: 499 },
    description: 'For large companies that need to send, sign and collaborate',
    features: [
      '500 docs availble for sign/mo.',
      'Cloud storage of 100GB',
      'Personal cabinet',
      'Unlimited free verifications',
      'Get live technical support 24/7',
      'Protect your agreements to avoid identity fraud',
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
      
      <div className="plans-container">
        <h1 className="plans-title">Choose your plan</h1>
        
        <div className="plans-billing-toggle">
          <button
            className={`billing-btn${billing === 'annual' ? ' active' : ''}`}
            onClick={() => setBilling('annual')}
          >
            Annual
            {billing === 'annual' && <span className="billing-save">Save up to 22%</span>}
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
          
        </div>
      </div>
    </div>
  );
};

export default PlansPage; 
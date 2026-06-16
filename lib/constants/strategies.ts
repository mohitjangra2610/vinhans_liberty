export interface FAQ {
  q: string;
  a: string;
}

export interface BenefitsSection {
  type: "benefits";
  title: string;
  items: string[];
}

export interface WhySection {
  type: "why";
  title: string;
  items: string[];
}

export interface TaxProvisionData {
  code: string;
  title: string;
  description: string;
}

export interface TaxProvisionsSection {
  type: "tax-provisions";
  title: string;
  provisions: TaxProvisionData[];
}

export interface HighlightSection {
  type: "highlight";
  title: string;
  content: string;
  options: string[];
}

export interface CTASection {
  type: "cta";
  title: string;
  benefits: string[];
  buttonLabel: string;
  buttonHref: string;
}

export type StrategySection =
  | BenefitsSection
  | WhySection
  | TaxProvisionsSection
  | HighlightSection
  | CTASection;

export interface SidebarCTA {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
}

export interface Strategy {
  slug: string;
  title: string;
  subheading: string;
  content?: string;
  sections?: StrategySection[];
  faqs: FAQ[];
  sidebarCTA?: SidebarCTA;
}

export const strategies: Strategy[] = [
  {
    slug: "executive-bonus-strategy",
    title: "Executive Bonus Strategy",
    subheading:
      "Reward and retain key executives with tax-advantaged wealth accumulation strategies designed for growth-oriented businesses.",
    content: `An Executive Bonus Plan (Section 162 Bonus Plan) allows businesses to provide key employees with life insurance benefits the employer can deduct. The company pays premiums on a policy owned by the executive, receiving a full tax deduction while the executive builds tax-advantaged cash value.\n\nEmployers select key employees to participate. Premiums are paid directly to the insurer on the executive's behalf. The executive owns the policy and accesses cash value for retirement, emergencies, or other needs. The employer deducts premiums as reasonable business expense.\n\nExecutives gain a valuable benefit with minimal out-of-pocket cost. The business retains top talent and receives a tax deduction. Cash value grows tax-deferred and can be accessed tax-advantaged. This creates a win-win that strengthens the employer-employee relationship.\n\nThis strategy is ideal for C-corporations, S-corporations, and LLCs seeking to attract, retain, and reward key executives without qualified plan complexity.`,
    faqs: [
      {
        q: "What types of businesses can use an Executive Bonus Plan?",
        a: "Any business entity can implement an executive bonus plan, though C-corporations receive the most favorable tax treatment because they deduct the full premium.",
      },
      {
        q: "Are there limits on how much can be contributed?",
        a: "Unlike qualified retirement plans, there are no contribution limits. Premiums must represent reasonable compensation.",
      },
      {
        q: "Does the executive pay taxes on the premiums?",
        a: "Yes, the executive reports the premium amount as taxable income. Strategies exist to offset this tax cost.",
      },
    ],
  },
  {
    slug: "buy-sell-funding-strategy",
    title: "Buy-Sell Funding Strategy",
    subheading:
      "Ensure a seamless business transition with funded buy-sell agreements that protect all stakeholders and preserve business value.",
    content: `A buy-sell agreement is a legally binding contract ensuring smooth ownership transition when an owner dies, becomes disabled, or retires. Without proper funding, these agreements fail when needed most. Life insurance provides the most reliable funding source.\n\nBusiness owners enter a buy-sell agreement specifying future ownership transfer terms. Each owner's interest is funded with a life insurance policy. When an owner dies, surviving owners receive the death benefit tax-free and purchase the deceased owner's shares from their family.\n\nThe family receives fair value for the business interest. Surviving owners retain control without outside interference. The business continues operating without disruption. Creditors and employees have confidence in business continuity.\n\nCross-purchase agreements (owners buy policies on each other) and entity-purchase agreements (the business buys policies on each owner) have distinct tax and legal implications. Our team helps determine the right structure.`,
    faqs: [
      {
        q: "How is the buy-sell price determined?",
        a: "The agreement should specify a valuation method agreed upon by all owners, reviewed and updated regularly to reflect current fair market value.",
      },
      {
        q: "Can disability be covered?",
        a: "Yes. Disability buy-out insurance can be added to fund the purchase if an owner becomes disabled.",
      },
      {
        q: "Is the death benefit taxable?",
        a: "Life insurance proceeds received by a business or individual are generally received income tax-free.",
      },
    ],
  },
  {
    slug: "key-person-protection-strategy",
    title: "Key Person Protection Strategy",
    subheading:
      "Protect your business from the financial impact of losing a critical team member, founder, or executive whose contributions are essential to your success.",
    content: `Key person insurance is a life insurance policy a business purchases on a critical employee. The business owns the policy, pays premiums, and is the beneficiary. If the key person dies, the business receives the death benefit tax-free to cover losses and transition costs.\n\nThe loss of a key executive, founder, or technical lead can devastate a business. Revenue drops, credit lines freeze, key relationships falter, and employee morale suffers. Key person insurance provides the capital to survive and rebuild.\n\nCoverage amount depends on the key person's revenue contribution, replacement cost, time needed to restore operations, and potential business value loss during transition.\n\nBeyond life insurance, key person coverage can include disability insurance protecting against long-term disability impact and business overhead expense insurance keeping the business running during transition.`,
    faqs: [
      {
        q: "Who qualifies as a key person?",
        a: "Any employee whose loss would cause significant financial harm, including founders, top salespeople, technical leads, and key managers.",
      },
      {
        q: "Can the business name itself as beneficiary?",
        a: "Yes. The business owns the policy, pays premiums, and is named as beneficiary.",
      },
      {
        q: "How are premiums treated for tax purposes?",
        a: "Premiums are not tax-deductible, but the death benefit is received income tax-free.",
      },
      {
        q: "How often should coverage be reviewed?",
        a: "Annually, or whenever there are significant changes in the business or the key person's role.",
      },
    ],
  },
  {
    slug: "advanced-tax-strategy",
    title: "Advanced Tax Strategies For Business Owners",
    subheading:
      "Create opportunities for tax-efficient growth, flexible access to capital, family wealth transfer, and long-term liquidity.",
    sections: [
      {
        type: "benefits",
        title: "Benefits",
        items: [
          "Tax-Advantaged Growth",
          "Flexible Access",
          "Family Wealth Transfer",
          "Liquidity",
        ],
      },
      {
        type: "why",
        title: "Why Many Business Owners Look Beyond Traditional Planning",
        items: [
          "Increasing tax exposure",
          "Limited contribution opportunities",
          "Restricted access to capital",
          "Liquidity concerns",
          "Wealth transfer complexity",
        ],
      },
      {
        type: "tax-provisions",
        title: "Tax Code Provisions",
        provisions: [
          {
            code: "IRC Section 7702",
            title: "Tax-Advantaged Wealth Accumulation",
            description:
              "Permanent life insurance policies that meet the statutory definition receive favorable tax treatment, including tax-deferred cash value growth and tax-free access through policy loans and withdrawals.",
          },
          {
            code: "IRC Section 72(e)",
            title: "Flexible Access To Capital",
            description:
              "Cash value accumulated in a properly structured life insurance policy can be accessed on a tax-advantaged basis through policy loans and withdrawals, providing flexible liquidity without triggering immediate taxable income.",
          },
          {
            code: "IRC Section 101(a)",
            title: "Efficient Wealth Transfer",
            description:
              "Life insurance death benefits are generally received income tax-free by beneficiaries, enabling efficient transfer of wealth to family members or business partners.",
          },
        ],
      },
      {
        type: "highlight",
        title: "A Question Worth Asking",
        content:
          "If your business generated another $1,000,000 in profit next year, where would the next dollar go?",
        options: ["Taxable", "Tax Deferred", "Tax Advantaged"],
      },
      {
        type: "cta",
        title: "Private Business Owner Strategy Session",
        benefits: [
          "Protection",
          "Liquidity",
          "Flexibility",
          "Tax Efficiency",
          "Family Wealth Preservation",
        ],
        buttonLabel: "Schedule Your Private Strategy Session",
        buttonHref: "/contact",
      },
    ],
    faqs: [
      {
        q: "When should I start advanced tax planning?",
        a: "The best time is before year-end, but proactive planning throughout the year yields the best results.",
      },
      {
        q: "Are these strategies only for high-income earners?",
        a: "While some strategies target higher incomes, many techniques benefit business owners at all revenue levels.",
      },
      {
        q: "How do taxes affect entity choice?",
        a: "Each entity type has different tax treatments. We analyze your specific situation to recommend the optimal structure.",
      },
    ],
    sidebarCTA: {
      title: "Private Business Owner Strategy Session",
      description:
        "Schedule a private strategy session to explore how tax-advantaged strategies fit your unique situation.",
      primaryLabel: "Schedule Your Private Strategy Session",
      primaryHref: "/contact",
    },
  },
  {
    slug: "family-wealth-protection-strategy",
    title: "Family Wealth Protection & Transfer Strategy",
    subheading:
      "Building Wealth Is Important. Making Sure Your Family Can Use It Is Essential. Help families create liquidity, protect wealth, simplify wealth transfer, and support future generations.",
    sections: [
      {
        type: "benefits",
        title: "Benefits",
        items: [
          "Family Wealth Protection",
          "Immediate Liquidity",
          "Efficient Wealth Transfer",
          "Probate Avoidance",
          "Family Financial Security",
          "Multi-Generational Impact",
        ],
      },
      {
        type: "why",
        title: "Would Your Family Inherit Wealth Or Complexity?",
        items: [
          "Successful businesses",
          "Real estate portfolios",
          "Investment accounts",
          "Retirement plans",
          "Significant net worth",
        ],
      },
      {
        type: "why",
        title: "What Your Family Will Need",
        items: [
          "Create liquidity",
          "Protect family wealth",
          "Simplify wealth transfer",
          "Preserve family assets",
          "Support future generations",
        ],
      },
      {
        type: "why",
        title: "The Challenge Of Illiquid Wealth",
        items: [
          "Privately held businesses",
          "Commercial real estate",
          "Rental property portfolios",
          "Investment partnerships",
          "Closely held stock",
          "What happens if significant capital is needed tomorrow?",
        ],
      },
      {
        type: "benefits",
        title: "Creating Liquidity Without Selling Assets",
        items: [
          "Maintain business ownership",
          "Preserve investment portfolios",
          "Retain real estate holdings",
          "Avoid forced asset sales",
          "Create financial flexibility",
        ],
      },
      {
        type: "benefits",
        title: "The Foundation: Revocable Living Trust",
        items: [
          "Avoid Probate",
          "Greater Privacy",
          "Faster Distribution",
          "Continuity During Incapacity",
          "Simplified Administration",
          "Greater Control",
        ],
      },
      {
        type: "tax-provisions",
        title: "The Role Of Life Insurance In Wealth Transfer",
        provisions: [
          {
            code: "IRC Section 101(a)",
            title: "Tax-Free Death Benefit",
            description:
              "Meet financial obligations, preserve family assets, continue operating a business, retain investment holdings, avoid forced sales, and create financial flexibility.",
          },
        ],
      },
      {
        type: "benefits",
        title: "What Successful Families Want",
        items: [
          "Certainty",
          "Liquidity",
          "Flexibility",
          "Family Protection",
          "Efficient Wealth Transfer",
          "Multi-Generational Impact",
        ],
      },
      {
        type: "highlight",
        title: "A Question Worth Asking",
        content:
          "If something happened to you tomorrow...\n\nWould your family immediately have access to the resources they need?\n\nOr would they be forced to navigate a complex financial and legal process during one of the most difficult times of their lives?",
        options: [],
      },
      {
        type: "cta",
        title: "Family Wealth Protection Session",
        benefits: [
          "Protection",
          "Liquidity",
          "Flexibility",
          "Family Wealth Preservation",
          "Efficient Wealth Transfer",
          "Multi-Generational Financial Confidence",
        ],
        buttonLabel: "Schedule Your Family Wealth Protection Session",
        buttonHref: "/contact",
      },
    ],
    faqs: [
      {
        q: "What is a revocable living trust?",
        a: "A revocable living trust is a legal document that allows you to maintain control of your assets during your lifetime while ensuring they pass to your beneficiaries efficiently, privately, and without probate upon your death.",
      },
      {
        q: "How does life insurance help with wealth transfer?",
        a: "Life insurance provides immediate, income-tax-free liquidity that can be used to pay estate taxes, settle debts, equalize inheritances, and provide for family members without forcing the sale of businesses or other assets.",
      },
      {
        q: "What happens without an estate plan?",
        a: "Without a plan, assets pass through probate, which is public, time-consuming, and expensive. State law determines who inherits, and your family may face significant delays accessing resources during a difficult time.",
      },
      {
        q: "Can I update my estate plan?",
        a: "Yes. Estate plans should be reviewed every 3 to 5 years or after major life events such as marriage, divorce, birth, or business sale.",
      },
    ],
    sidebarCTA: {
      title: "Family Wealth Protection Session",
      description:
        "Schedule a private strategy session to develop a comprehensive family wealth protection and transfer plan tailored to your unique situation.",
      primaryLabel: "Schedule Your Family Wealth Protection Session",
      primaryHref: "/contact",
    },
  },
];

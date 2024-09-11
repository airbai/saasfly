import { env } from "~/env.mjs";

interface SubscriptionPlanTranslation {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  limitations: string[];
  prices: {
    monthly: number;
    yearly: number;
  };
  stripeIds: {
    monthly: string | null;
    yearly: string | null;
  };
}

export const priceDataMap: Record<string, SubscriptionPlanTranslation[]> = {
  zh: [
    {
      id: "starter",
      title: "入门版",
      description: "适合初学者",
      benefits: [
        "利用先进的AI算法进行个性化命运解读。",
        "基于紫微斗数原理的全面分析。",
        "详细的人生规划咨询。",
        "为您的生命旅程提供持续支持。",
        "独家访问AI驱动的见解和预测。",
      ],
      limitations: [
        "基于AI的预测可能需要解释。",
        "限于紫微斗数框架。",
        "个性化见解可能因输入数据而异。",
        "不包括实体咨询。",
        "访问新功能可能会延迟。",
      ],
      prices: {
        monthly: 0,
        yearly: 0,
      },
      stripeIds: {
        monthly: null,
        yearly: null,
      },
    },
    {
      id: "pro",
      title: "专业版",
      description: "解锁高级功能",
      benefits: [
        "利用先进的AI算法进行个性化命运解读。",
        "基于紫微斗数原理的全面分析。",
        "详细的人生规划咨询。",
        "为您的生命旅程提供持续支持。",
        "独家访问AI驱动的见解和预测。",
      ],
      limitations: [
        "基于AI的预测可能需要解释。",
        "限于紫微斗数框架。",
        "个性化见解可能因输入数据而异。",
        "不包括实体咨询。",
        "访问新功能可能会延迟。",
      ],
      prices: {
        monthly: 30,
        yearly: 288,
      },
      stripeIds: {
        monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID,
        yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID,
      },
    },
    {
      id: "business",
      title: "商业版",
      description: "适合高级用户",
      benefits: [
        "利用先进的AI算法进行个性化命运解读。",
        "基于紫微斗数原理的全面分析。",
        "详细的人生规划咨询。",
        "为您的生命旅程提供持续支持。",
        "独家访问AI驱动的见解和预测。",
      ],
      limitations: [
        "基于AI的预测可能需要解释。",
        "限于紫微斗数框架。",
        "个性化见解可能因输入数据而异。",
        "不包括实体咨询。",
        "访问新功能可能会延迟。",
      ],
      prices: {
        monthly: 60,
        yearly: 600,
      },
      stripeIds: {
        monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PRICE_ID,
        yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PRICE_ID,
      },
    },
  ],
  "zht": [
    {
      id: "starter",
      title: "入門版",
      description: "適合初學者",
      benefits: [
        "利用先進的AI算法進行個性化命運解讀。",
        "基於紫微斗數原理的全面分析。",
        "詳細的人生規劃諮詢。",
        "為您的生命旅程提供持續支持。",
        "獨家訪問AI驅動的見解和預測。",
      ],
      limitations: [
        "基於AI的預測可能需要解釋。",
        "限於紫微斗數框架。",
        "個性化見解可能因輸入數據而異。",
        "不包括實體諮詢。",
        "訪問新功能可能會延遲。",
      ],
      prices: {
        monthly: 0,
        yearly: 0,
      },
      stripeIds: {
        monthly: null,
        yearly: null,
      },
    },
    {
      id: "pro",
      title: "專業版",
      description: "解鎖高級功能",
      benefits: [
        "利用先進的AI算法進行個性化命運解讀。",
        "基於紫微斗數原理的全面分析。",
        "詳細的人生規劃諮詢。",
        "為您的生命旅程提供持續支持。",
        "獨家訪問AI驅動的見解和預測。",
      ],
      limitations: [
        "基於AI的預測可能需要解釋。",
        "限於紫微斗數框架。",
        "個性化見解可能因輸入數據而異。",
        "不包括實體諮詢。",
        "訪問新功能可能會延遲。",
      ],
      prices: {
        monthly: 30,
        yearly: 288,
      },
      stripeIds: {
        monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID,
        yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID,
      },
    },
    {
      id: "business",
      title: "商業版",
      description: "適合高級用戶",
      benefits: [
        "利用先進的AI算法進行個性化命運解讀。",
        "基於紫微斗數原理的全面分析。",
        "詳細的人生規劃諮詢。",
        "為您的生命旅程提供持續支持。",
        "獨家訪問AI驅動的見解和預測。",
      ],
      limitations: [
        "基於AI的預測可能需要解釋。",
        "限於紫微斗數框架。",
        "個性化見解可能因輸入數據而異。",
        "不包括實體諮詢。",
        "訪問新功能可能會延遲。",
      ],
      prices: {
        monthly: 60,
        yearly: 600,
      },
      stripeIds: {
        monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PRICE_ID,
        yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PRICE_ID,
      },
    },
  ],
  ja: [
    {
      id: "starter",
      title: "スターター",
      description: "初心者向け",
      benefits: [
        "高度なAIアルゴリズムによる個別の運命解釈。",
        "紫微斗数の原則に基づいた総合的な分析。",
        "詳細な人生設計相談。",
        "あなたの人生の旅のための継続的なサポート。",
        "AI駆動の洞察と予測への独占的なアクセス。",
      ],
      limitations: [
        "AIによる予測は解釈が必要な場合があります。",
        "紫微斗数のフレームワークに限定されます。",
        "個別の洞察は入力データに基づいて異なる場合があります。",
        "対面の相談は含まれません。",
        "新機能へのアクセスは遅れる場合があります。",
      ],
      prices: {
        monthly: 0,
        yearly: 0,
      },
      stripeIds: {
        monthly: null,
        yearly: null,
      },
    },
    {
      id: "pro",
      title: "プロ",
      description: "高度な機能のロックを解除",
      benefits: [
        "高度なAIアルゴリズムによる個別の運命解釈。",
        "紫微斗数の原則に基づいた総合的な分析。",
        "詳細な人生設計相談。",
        "あなたの人生の旅のための継続的なサポート。",
        "AI駆動の洞察と予測への独占的なアクセス。",
      ],
      limitations: [
        "AIによる予測は解釈が必要な場合があります。",
        "紫微斗数のフレームワークに限定されます。",
        "個別の洞察は入力データに基づいて異なる場合があります。",
        "対面の相談は含まれません。",
        "新機能へのアクセスは遅れる場合があります。",
      ],
      prices: {
        monthly: 30,
        yearly: 288,
      },
      stripeIds: {
        monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID,
        yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID,
      },
    },
    {
      id: "business",
      title: "ビジネス",
      description: "パワーユーザー向け",
      benefits: [
        "高度なAIアルゴリズムによる個別の運命解釈。",
        "紫微斗数の原則に基づいた総合的な分析。",
        "詳細な人生設計相談。",
        "あなたの人生の旅のための継続的なサポート。",
        "AI駆動の洞察と予測への独占的なアクセス。",
      ],
      limitations: [
        "AIによる予測は解釈が必要な場合があります。",
        "紫微斗数のフレームワークに限定されます。",
        "個別の洞察は入力データに基づいて異なる場合があります。",
        "対面の相談は含まれません。",
        "新機能へのアクセスは遅れる場合があります。",
      ],
      prices: {
        monthly: 60,
        yearly: 600,
      },
      stripeIds: {
        monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PRICE_ID,
        yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PRICE_ID,
      },
    },
  ],
  ko: [
    {
      id: "starter",
      title: "스타터",
      description: "초보자를 위한",
      benefits: [
        "고급 AI 알고리즘을 통한 맞춤 운명 해석.",
        "자미두수 원리에 따른 종합 분석.",
        "상세한 인생 설계 상담.",
        "인생 여정에 대한 지속적인 지원.",
        "AI 기반 통찰 및 예측에 대한 독점 접근.",
      ],
      limitations: [
        "AI 기반 예측은 해석이 필요할 수 있습니다.",
        "자미두수 프레임워크로 제한됩니다.",
        "맞춤형 통찰력은 입력 데이터에 따라 달라질 수 있습니다.",
        "물리적 상담은 포함되지 않습니다.",
        "새로운 기능에 대한 접근이 지연될 수 있습니다.",
      ],
      prices: {
        monthly: 0,
        yearly: 0,
      },
      stripeIds: {
        monthly: null,
        yearly: null,
      },
    },
    {
      id: "pro",
      title: "프로",
      description: "고급 기능 잠금 해제",
      benefits: [
        "고급 AI 알고리즘을 통한 맞춤 운명 해석.",
        "자미두수 원리에 따른 종합 분석.",
        "상세한 인생 설계 상담.",
        "인생 여정에 대한 지속적인 지원.",
        "AI 기반 통찰 및 예측에 대한 독점 접근.",
      ],
      limitations: [
        "AI 기반 예측은 해석이 필요할 수 있습니다.",
        "자미두수 프레임워크로 제한됩니다.",
        "맞춤형 통찰력은 입력 데이터에 따라 달라질 수 있습니다.",
        "물리적 상담은 포함되지 않습니다.",
        "새로운 기능에 대한 접근이 지연될 수 있습니다.",
      ],
      prices: {
        monthly: 30,
        yearly: 288,
      },
      stripeIds: {
        monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID,
        yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID,
      },
    },
    {
      id: "business",
      title: "비즈니스",
      description: "파워 사용자를 위한",
      benefits: [
        "고급 AI 알고리즘을 통한 맞춤 운명 해석.",
        "자미두수 원리에 따른 종합 분석.",
        "상세한 인생 설계 상담.",
        "인생 여정에 대한 지속적인 지원.",
        "AI 기반 통찰 및 예측에 대한 독점 접근.",
      ],
      limitations: [
        "AI 기반 예측은 해석이 필요할 수 있습니다.",
        "자미두수 프레임워크로 제한됩니다.",
        "맞춤형 통찰력은 입력 데이터에 따라 달라질 수 있습니다.",
        "물리적 상담은 포함되지 않습니다.",
        "새로운 기능에 대한 접근이 지연될 수 있습니다.",
      ],
      prices: {
        monthly: 60,
        yearly: 600,
      },
      stripeIds: {
        monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PRICE_ID,
        yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PRICE_ID,
      },
    },
  ],
  en: [
    {
      id: "starter",
      title: "Starter",
      description: "For Beginners",
      benefits: [
        "Personalized destiny interpretation using advanced AI algorithms.",
        "Comprehensive analysis based on Zi Wei Dou Shu principles.",
        "Detailed life planning consultation.",
        "Ongoing support for your life’s journey.",
        "Exclusive access to AI-driven insights and predictions.",
      ],
      limitations: [
        "AI-based predictions are subject to interpretation.",
        "Limited to Zi Wei Dou Shu framework.",
        "Personalized insights may vary based on input data.",
        "No physical consultations included.",
        "Access to new features may be delayed.",
      ],
      prices: {
        monthly: 0,
        yearly: 0,
      },
      stripeIds: {
        monthly: null,
        yearly: null,
      },
    },
    {
      id: "pro",
      title: "Pro",
      description: "Unlock Advanced Features",
      benefits: [
        "Personalized destiny interpretation using advanced AI algorithms.",
        "Comprehensive analysis based on Zi Wei Dou Shu principles.",
        "Detailed life planning consultation.",
        "Ongoing support for your life’s journey.",
        "Exclusive access to AI-driven insights and predictions.",
      ],
      limitations: [
        "AI-based predictions are subject to interpretation.",
        "Limited to Zi Wei Dou Shu framework.",
        "Personalized insights may vary based on input data.",
        "No physical consultations included.",
        "Access to new features may be delayed.",
      ],
      prices: {
        monthly: 30,
        yearly: 288,
      },
      stripeIds: {
        monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID,
        yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID,
      },
    },
    {
      id: "business",
      title: "Business",
      description: "For Power Users",
      benefits: [
        "Personalized destiny interpretation using advanced AI algorithms.",
        "Comprehensive analysis based on Zi Wei Dou Shu principles.",
        "Detailed life planning consultation.",
        "Ongoing support for your life’s journey.",
        "Exclusive access to AI-driven insights and predictions.",
      ],
      limitations: [
        "AI-based predictions are subject to interpretation.",
        "Limited to Zi Wei Dou Shu framework.",
        "Personalized insights may vary based on input data.",
        "No physical consultations included.",
        "Access to new features may be delayed.",
      ],
      prices: {
        monthly: 60,
        yearly: 600,
      },
      stripeIds: {
        monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PRICE_ID,
        yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PRICE_ID,
      },
    },
  ],
};

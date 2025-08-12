"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, 
  Check, 
  Zap, 
  Shield, 
  Sparkles, 
  Clock,
  Users,
  Download,
  Palette,
  Bot
} from 'lucide-react';
import { toast } from 'sonner';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    current: true,
    features: [
      '5 paraphrases per day',
      'Basic grammar checking',
      'Standard AI model',
      'Basic translations',
      'Limited history'
    ],
    limits: [
      '5 uses per day',
      'No priority support',
      'Ads included'
    ]
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: 'per month',
    popular: true,
    features: [
      'Unlimited paraphrases',
      'Advanced grammar & style',
      'All AI models (Heavy, Pro)',
      'Unlimited translations',
      'Full history access',
      'Priority support',
      'No ads',
      'Export to Word/PDF'
    ],
    limits: []
  },
  {
    name: 'Team',
    price: '$19.99',
    period: 'per month',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Shared workspaces',
      'Admin controls',
      'Bulk processing',
      'API access',
      'Custom integrations',
      'Advanced analytics'
    ],
    limits: []
  }
];

const premiumFeatures = [
  {
    icon: Bot,
    title: 'Advanced AI Models',
    description: 'Access to Heavy and Pro AI models for highest quality results',
    color: 'text-purple-600'
  },
  {
    icon: Zap,
    title: 'Unlimited Usage',
    description: 'No daily limits on any of our writing tools',
    color: 'text-blue-600'
  },
  {
    icon: Shield,
    title: 'Priority Support',
    description: '24/7 priority customer support with fastest response times',
    color: 'text-green-600'
  },
  {
    icon: Download,
    title: 'Export Anywhere',
    description: 'Export your work to Word, PDF, and other popular formats',
    color: 'text-orange-600'
  },
  {
    icon: Palette,
    title: 'Custom Themes',
    description: 'Personalize your workspace with custom themes and layouts',
    color: 'text-pink-600'
  },
  {
    icon: Users,
    title: 'Team Features',
    description: 'Collaborate with team members and share workspaces',
    color: 'text-teal-600'
  }
];

export function PremiumTool() {
  const handleUpgrade = (plan: string) => {
    toast.success(`Redirecting to ${plan} plan checkout...`);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl">
            <Crown className="h-8 w-8" />
          </div>
        </div>
        
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Unlock Premium Features
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Take your writing to the next level with advanced AI tools
          </p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
            <Sparkles className="h-3 w-3 mr-1" />
            14-Day Free Trial
          </Badge>
          <Badge variant="secondary">
            <Shield className="h-3 w-3 mr-1" />
            30-Day Money Back
          </Badge>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <Card key={plan.name} className={`p-6 relative ${plan.popular ? 'ring-2 ring-primary shadow-lg scale-105' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}
            
            <div className="text-center space-y-4">
              <div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </div>

              <Button
                size="lg"
                className={`w-full ${
                  plan.current
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                    : ''
                }`}
                onClick={() => !plan.current && handleUpgrade(plan.name)}
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
              </Button>

              <div className="space-y-3 text-left">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                
                {plan.limits.map((limit, limitIndex) => (
                  <div key={limitIndex} className="flex items-start gap-3 text-muted-foreground">
                    <div className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="text-sm line-through">{limit}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Premium Features Grid */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-8">Premium Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-muted`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-1">Can I cancel anytime?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, you can cancel your subscription at any time. You'll retain premium features until the end of your billing period.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-1">What payment methods do you accept?</h4>
            <p className="text-sm text-muted-foreground">
              We accept all major credit cards, PayPal, and bank transfers for annual plans.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Is there a free trial?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! New users get a 14-day free trial of Pro features with no credit card required.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-1">How secure is my data?</h4>
            <p className="text-sm text-muted-foreground">
              We use enterprise-grade encryption and never store your content permanently. Your privacy is our priority.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
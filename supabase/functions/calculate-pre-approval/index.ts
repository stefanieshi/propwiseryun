import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { income, creditScore, employmentStatus } = await req.json()

    // Calculate debt-to-income ratio (mock calculation)
    const debtToIncomeRatio = 0.35 // This would normally be calculated from actual debt data

    // Calculate approval likelihood based on factors
    let approvalLikelihood = 0
    const criteriaMatched = []

    // Credit score impact (30%)
    if (creditScore >= 750) {
      approvalLikelihood += 30
      criteriaMatched.push("Excellent credit score")
    } else if (creditScore >= 700) {
      approvalLikelihood += 25
      criteriaMatched.push("Good credit score")
    } else if (creditScore >= 650) {
      approvalLikelihood += 15
      criteriaMatched.push("Fair credit score")
    }

    // Income impact (40%)
    const incomeScore = Math.min((income / 100000) * 40, 40)
    approvalLikelihood += incomeScore
    if (income >= 100000) {
      criteriaMatched.push("Strong income")
    } else if (income >= 50000) {
      criteriaMatched.push("Moderate income")
    }

    // Employment status impact (30%)
    if (employmentStatus === "Full-time") {
      approvalLikelihood += 30
      criteriaMatched.push("Stable employment")
    } else if (employmentStatus === "Part-time") {
      approvalLikelihood += 15
      criteriaMatched.push("Part-time employment")
    } else if (employmentStatus === "Self-employed") {
      approvalLikelihood += 20
      criteriaMatched.push("Self-employed")
    }

    // Calculate estimated amount (mock calculation)
    const maxDebtPayment = (income * 0.28) / 12 // 28% of monthly income
    const estimatedAmount = maxDebtPayment * 360 // 30 years of payments

    // Calculate interest rate range based on credit score
    let interestRateRange
    if (creditScore >= 750) {
      interestRateRange = { min: 3.5, max: 4.0 }
    } else if (creditScore >= 700) {
      interestRateRange = { min: 4.0, max: 4.5 }
    } else {
      interestRateRange = { min: 4.5, max: 5.0 }
    }

    // Calculate monthly payment range
    const monthlyPaymentRange = {
      min: (estimatedAmount * (interestRateRange.min/100/12)) / (1 - Math.pow(1 + interestRateRange.min/100/12, -360)),
      max: (estimatedAmount * (interestRateRange.max/100/12)) / (1 - Math.pow(1 + interestRateRange.max/100/12, -360))
    }

    const result = {
      estimatedAmount: Math.round(estimatedAmount),
      approvalLikelihood: Math.round(approvalLikelihood),
      criteriaMatched,
      debtToIncomeRatio,
      interestRateRange,
      monthlyPaymentRange: {
        min: Math.round(monthlyPaymentRange.min),
        max: Math.round(monthlyPaymentRange.max)
      }
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in calculate-pre-approval function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
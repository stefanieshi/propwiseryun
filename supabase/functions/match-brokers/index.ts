import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface UserProfile {
  income: string;
  employmentStatus: string;
  creditScore: string;
  loanAmount: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { profile } = await req.json()
    const { data: { user } } = await supabase.auth.getUser(
      req.headers.get('Authorization')!.split('Bearer ')[1]
    )

    if (!user) throw new Error('Not authenticated')

    // Fetch all brokers
    const { data: brokers, error: brokersError } = await supabase
      .from('brokers')
      .select('*')

    if (brokersError) throw brokersError

    // AI matching logic
    const matches = brokers.map((broker) => {
      let score = 0
      const reasons = []

      // Credit score matching
      if (parseInt(profile.creditScore) >= broker.min_credit_score) {
        score += 30
        reasons.push('Credit score meets requirements')
      }

      // Employment status matching
      if (broker.specializations.includes(profile.employmentStatus.toLowerCase())) {
        score += 25
        reasons.push(`Specializes in ${profile.employmentStatus} borrowers`)
      }

      // Loan amount matching (assuming broker.fees contains min_loan_amount)
      const loanAmount = parseInt(profile.loanAmount)
      if (loanAmount >= broker.fees.min_loan_amount) {
        score += 20
        reasons.push('Loan amount within acceptable range')
      }

      // Approval rate consideration
      if (broker.approval_rate > 80) {
        score += 15
        reasons.push('High approval rate')
      }

      // Rating and reviews consideration
      if (broker.rating >= 4.5) {
        score += 10
        reasons.push('Highly rated by customers')
      }

      return {
        broker_id: broker.id,
        match_score: score,
        match_reasons: reasons
      }
    })

    // Sort matches by score
    matches.sort((a, b) => b.match_score - a.match_score)

    // Store top matches in broker_matches table
    const topMatches = matches.slice(0, 3)
    for (const match of topMatches) {
      await supabase
        .from('broker_matches')
        .upsert({
          user_id: user.id,
          broker_id: match.broker_id,
          match_score: match.match_score,
          match_reasons: match.match_reasons,
          status: 'pending'
        })
    }

    return new Response(
      JSON.stringify({ matches: topMatches }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
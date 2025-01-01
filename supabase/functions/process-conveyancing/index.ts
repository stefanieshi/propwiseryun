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
    const { action, data } = await req.json()
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    switch (action) {
      case 'generate_document':
        // Document generation logic
        return new Response(
          JSON.stringify({ 
            content: {
              title: "Draft Contract",
              sections: [
                { title: "Parties", content: "Generated content based on provided data..." }
              ]
            }
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'risk_assessment':
        // Risk assessment logic
        return new Response(
          JSON.stringify({ 
            risk_score: 0.8,
            findings: ["No significant risks identified"]
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'calculate_stamp_duty':
        const { price, propertyType, firstTimeBuyer } = data
        // Simplified stamp duty calculation
        const rate = firstTimeBuyer ? 0.02 : 0.03
        const stampDuty = price * rate

        return new Response(
          JSON.stringify({ 
            stampDuty,
            breakdown: {
              rate,
              total: stampDuty
            }
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      default:
        throw new Error('Invalid action')
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
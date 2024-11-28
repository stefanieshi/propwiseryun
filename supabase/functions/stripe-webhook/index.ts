import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@12.8.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
  
  try {
    const body = await req.text()
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    )

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const { propertyId, userId } = session.metadata

      // Generate AI report content
      const { data: property } = await supabase
        .from('properties')
        .select('*, property_analytics(*)')
        .eq('id', propertyId)
        .single()

      // Insert the report
      await supabase
        .from('ai_reports')
        .insert({
          user_id: userId,
          property_id: propertyId,
          report_content: {
            property_details: property,
            generated_at: new Date().toISOString(),
            analysis: {
              // Add your AI analysis here
              market_overview: "Detailed market analysis...",
              investment_potential: "Investment analysis...",
              risks_opportunities: "Risks and opportunities...",
              recommendations: "Strategic recommendations..."
            }
          },
          payment_status: 'completed',
          stripe_payment_id: session.payment_intent
        })
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400 }
    )
  }
})
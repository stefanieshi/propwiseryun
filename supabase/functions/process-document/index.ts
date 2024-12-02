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
    const { documentId } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Mock AI processing for now
    const mockExtractedData = {
      income: Math.floor(Math.random() * 100000) + 50000,
      employer: "Example Corp",
      period: "2023",
      confidence_score: 0.95
    }

    const { error } = await supabase
      .from('mortgage_documents')
      .update({
        extracted_data: mockExtractedData,
        validation_status: 'completed',
        validation_details: { success: true, message: "Document processed successfully" }
      })
      .eq('id', documentId)

    if (error) throw error

    return new Response(
      JSON.stringify({ success: true, data: mockExtractedData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
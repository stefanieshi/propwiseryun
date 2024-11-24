import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the JWT from the Authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Verify the JWT and get the user
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (authError || !user) {
      throw new Error('Invalid token')
    }

    // Get the property data from the request
    const { property } = await req.json()

    // Validate required fields
    if (!property.external_id || !property.source || !property.url || !property.title || !property.price || !property.location) {
      throw new Error('Missing required fields')
    }

    // Insert the property
    const { data, error } = await supabaseClient
      .from('external_properties')
      .upsert({
        user_id: user.id,
        external_id: property.external_id,
        source: property.source,
        url: property.url,
        title: property.title,
        price: property.price,
        location: property.location,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        sqft: property.sqft,
        property_type: property.property_type,
        description: property.description,
        image_url: property.image_url,
      }, {
        onConflict: 'external_id,user_id',
        ignoreDuplicates: false
      })

    if (error) {
      console.error('Error saving property:', error)
      throw error
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )

  } catch (error) {
    console.error('Error:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  }
})
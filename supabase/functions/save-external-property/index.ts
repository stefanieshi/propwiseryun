import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
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
    const { url } = await req.json()
    
    // Basic URL validation
    if (!url || (!url.includes('rightmove.co.uk') && !url.includes('zoopla.co.uk'))) {
      throw new Error('Invalid URL. Must be from Rightmove or Zoopla')
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get user ID from the request
    const authHeader = req.headers.get('Authorization')?.split('Bearer ')[1]
    if (!authHeader) throw new Error('No authorization header')

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(authHeader)
    if (userError || !user) throw new Error('Error getting user')

    // Fetch HTML content
    const response = await fetch(url)
    const html = await response.text()

    // Extract property data based on the source
    const source = url.includes('rightmove.co.uk') ? 'rightmove' : 'zoopla'
    let propertyData

    if (source === 'rightmove') {
      // Basic scraping for Rightmove (this is a simplified version)
      const titleMatch = html.match(/<title>(.*?)<\/title>/)
      const priceMatch = html.match(/property-header-price">\s*£([\d,]+)/)
      const locationMatch = html.match(/property-header-location">(.*?)</)
      
      if (!titleMatch || !priceMatch || !locationMatch) {
        throw new Error('Could not extract property data')
      }

      propertyData = {
        title: titleMatch[1].split('|')[0].trim(),
        price: parseInt(priceMatch[1].replace(/,/g, '')),
        location: locationMatch[1].trim(),
        external_id: url.split('/').pop()?.split('.')[0] || '',
      }
    } else {
      // Basic scraping for Zoopla (this is a simplified version)
      const titleMatch = html.match(/<title>(.*?)<\/title>/)
      const priceMatch = html.match(/£([\d,]+)/)
      const locationMatch = html.match(/property-header-location">(.*?)</)
      
      if (!titleMatch || !priceMatch || !locationMatch) {
        throw new Error('Could not extract property data')
      }

      propertyData = {
        title: titleMatch[1].split('|')[0].trim(),
        price: parseInt(priceMatch[1].replace(/,/g, '')),
        location: locationMatch[1].trim(),
        external_id: url.split('/').pop()?.split('.')[0] || '',
      }
    }

    // Save to database
    const { error: insertError } = await supabaseClient
      .from('external_properties')
      .insert({
        user_id: user.id,
        source,
        url,
        ...propertyData,
      })

    if (insertError) throw insertError

    return new Response(
      JSON.stringify({ message: 'Property saved successfully' }),
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
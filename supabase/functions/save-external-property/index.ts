import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { url } = await req.json()
    
    if (!url || (!url.includes('rightmove.co.uk') && !url.includes('zoopla.co.uk'))) {
      throw new Error('Invalid URL. Must be from Rightmove or Zoopla')
    }

    console.log('Fetching property data from:', url)

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const authHeader = req.headers.get('Authorization')?.split('Bearer ')[1]
    if (!authHeader) throw new Error('No authorization header')

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(authHeader)
    if (userError || !user) throw new Error('Error getting user')

    // Fetch HTML content with proper headers
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch property page: ${response.status}`)
    }
    
    const html = await response.text()
    console.log('Successfully fetched HTML content')

    const source = url.includes('rightmove.co.uk') ? 'rightmove' : 'zoopla'
    let propertyData

    try {
      if (source === 'rightmove') {
        const titleMatch = html.match(/<meta property="og:title" content="([^"]*)"/)
        const priceMatch = html.match(/£([0-9,]+)/)
        const locationMatch = html.match(/<meta property="og:street-address" content="([^"]*)"/)
        const imageMatch = html.match(/<meta property="og:image" content="([^"]*)"/)
        
        if (!titleMatch || !priceMatch || !locationMatch) {
          throw new Error('Could not extract required property data from Rightmove')
        }

        propertyData = {
          title: titleMatch[1].split(' - ')[0].trim(),
          price: parseInt(priceMatch[1].replace(/,/g, '')),
          location: locationMatch[1].trim(),
          image_url: imageMatch ? imageMatch[1] : null,
          property_type: 'House', // Default value
          external_id: url.split('/').pop()?.split('.')[0] || '',
        }
      } else {
        const titleMatch = html.match(/<meta property="og:title" content="([^"]*)"/)
        const priceMatch = html.match(/£([0-9,]+)/)
        const locationMatch = html.match(/<meta property="og:locality" content="([^"]*)"/)
        const imageMatch = html.match(/<meta property="og:image" content="([^"]*)"/)
        
        if (!titleMatch || !priceMatch || !locationMatch) {
          throw new Error('Could not extract required property data from Zoopla')
        }

        propertyData = {
          title: titleMatch[1].split(' - ')[0].trim(),
          price: parseInt(priceMatch[1].replace(/,/g, '')),
          location: locationMatch[1].trim(),
          image_url: imageMatch ? imageMatch[1] : null,
          property_type: 'House', // Default value
          external_id: url.split('/').pop()?.split('.')[0] || '',
        }
      }

      console.log('Extracted property data:', propertyData)
    } catch (error) {
      console.error('Error extracting property data:', error)
      throw new Error(`Could not extract property data: ${error.message}`)
    }

    const { error: insertError } = await supabaseClient
      .from('external_properties')
      .insert({
        user_id: user.id,
        source,
        url,
        ...propertyData,
      })

    if (insertError) {
      console.error('Error inserting property:', insertError)
      throw insertError
    }

    return new Response(
      JSON.stringify({ message: 'Property saved successfully', data: propertyData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
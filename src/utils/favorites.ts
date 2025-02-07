
import { supabase } from "@/integrations/supabase/client";

export async function addFavoriteProperty(propertyId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User must be authenticated');

  const { data, error } = await supabase
    .from('favorite_properties')
    .insert({
      property_id: propertyId,
      user_id: user.id
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function removeFavoriteProperty(propertyId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User must be authenticated');

  const { error } = await supabase
    .from('favorite_properties')
    .delete()
    .match({ 
      property_id: propertyId,
      user_id: user.id 
    });

  if (error) throw error;
}

export async function getFavoriteProperties() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User must be authenticated');

  const { data, error } = await supabase
    .from('favorite_properties')
    .select('property_id')
    .eq('user_id', user.id);

  if (error) throw error;
  return data;
}

export async function checkIsFavorite(propertyId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data, error } = await supabase
    .from('favorite_properties')
    .select('id')
    .match({ 
      property_id: propertyId,
      user_id: user.id 
    })
    .maybeSingle();

  if (error) throw error;
  return !!data;
}

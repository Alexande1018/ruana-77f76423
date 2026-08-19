-- 1. Lock down anon access: only public reference tables stay readable
REVOKE ALL ON public.profiles FROM anon;
REVOKE ALL ON public.recommendations FROM anon;
REVOKE ALL ON public.request_responses FROM anon;
REVOKE ALL ON public.weekly_requests FROM anon;
REVOKE ALL ON public.user_roles FROM anon;
REVOKE ALL ON public.zones FROM anon;
REVOKE ALL ON public.trades FROM anon;
GRANT SELECT ON public.zones TO anon;
GRANT SELECT ON public.trades TO anon;

-- 2. Least-privilege grants for signed-in users
REVOKE ALL ON public.user_roles FROM authenticated;
GRANT SELECT ON public.user_roles TO authenticated;
REVOKE ALL ON public.recommendations FROM authenticated;
GRANT SELECT, INSERT ON public.recommendations TO authenticated;
REVOKE ALL ON public.request_responses FROM authenticated;
GRANT SELECT, INSERT ON public.request_responses TO authenticated;
REVOKE ALL ON public.weekly_requests FROM authenticated;
GRANT SELECT, INSERT, UPDATE ON public.weekly_requests TO authenticated;
REVOKE ALL ON public.profiles FROM authenticated;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
REVOKE ALL ON public.zones FROM authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.zones TO authenticated;
REVOKE ALL ON public.trades FROM authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.trades TO authenticated;
GRANT ALL ON public.profiles, public.recommendations, public.request_responses, public.weekly_requests, public.user_roles, public.zones, public.trades TO service_role;

-- 3. SECURITY DEFINER functions: not callable by public/anon
REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.get_current_profile_id() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.get_current_zone_id() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_current_profile_id() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_current_zone_id() TO authenticated, service_role;

-- 4. Admin policies must target authenticated only (anon can no longer run has_role)
DROP POLICY IF EXISTS "Zones are manageable by admins" ON public.zones;
CREATE POLICY "Zones are manageable by admins" ON public.zones FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Trades are manageable by admins" ON public.trades;
CREATE POLICY "Trades are manageable by admins" ON public.trades FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
CREATE POLICY "Admins can manage all profiles" ON public.profiles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins can manage all requests" ON public.weekly_requests;
CREATE POLICY "Admins can manage all requests" ON public.weekly_requests FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 5. Recommendations are no longer readable by every signed-in user
DROP POLICY IF EXISTS "Recommendations are viewable by authenticated users" ON public.recommendations;
CREATE POLICY "Recommendations viewable by involved or same-zone members"
ON public.recommendations FOR SELECT TO authenticated
USING (
  from_profile_id = public.get_current_profile_id()
  OR to_profile_id = public.get_current_profile_id()
  OR EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = recommendations.to_profile_id
      AND p.zone_id = public.get_current_zone_id()
  )
  OR public.has_role(auth.uid(), 'admin')
);
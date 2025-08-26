import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { Tables, TablesInsert, TablesUpdate } from '@api/types/supabase';

import { usersApi } from '@/api';

const USERS_QUERY_KEY = ['users'];

export function useUsers() {
  return useQuery<Tables<'users'>[], Error>({
    queryKey: USERS_QUERY_KEY,
    queryFn: usersApi.list,
  });
}

export function useUser(id: string) {
  return useQuery<Tables<'users'>, Error>({
    queryKey: [...USERS_QUERY_KEY, id],
    queryFn: () => usersApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newUser: TablesInsert<'users'>) => usersApi.create(newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updatedUser }: { id: string; updatedUser: TablesUpdate<'users'> }) =>
      usersApi.update(id, updatedUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation<Tables<'users'>, Error, string>({
    mutationFn: (id: string) => usersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
  });
}

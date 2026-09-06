import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosDelete, axiosGet, axiosPost, axiosPut } from "@/lib/axios";

export type User = {
  id: number;
  username: string;
  email: string;
  phone: string;
  role: "USER" | "ADMIN" | "PROVIDER";
  createdAt: string;
  updatedAt?: string;
};

export type CreateUserInput = {
  username: string;
  email: string;
  phone: string;
  password: string;
  role?: "USER" | "ADMIN" | "PROVIDER";
};

export type UpdateUserInput = Partial<CreateUserInput>;

async function getUsers(): Promise<User[]> {
  const response = await axiosGet<User[]>("/users");
  return response.data || [];
}

async function getUser(id: number): Promise<User> {
  const response = await axiosGet<User>(`/users/${id}`);
  return response.data as User;
}

async function createUser(data: CreateUserInput): Promise<User> {
  const response = await axiosPost<CreateUserInput, User>("/users", data);
  return response.data as User;
}

async function updateUser({
  id,
  data,
}: {
  id: number;
  data: UpdateUserInput;
}): Promise<User> {
  const response = await axiosPut<UpdateUserInput, User>(`/users/${id}`, data);
  return response.data as User;
}

async function deleteUser(id: number): Promise<void> {
  await axiosDelete(`/users/${id}`);
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

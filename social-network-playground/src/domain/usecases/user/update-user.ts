import { UserEdit } from '@/domain/models/user'

export interface UpdateUser {
  update(params: UserEdit): Promise<UserEdit>
}

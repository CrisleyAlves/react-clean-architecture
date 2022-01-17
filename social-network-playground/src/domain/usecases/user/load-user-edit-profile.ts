import { UserEdit } from '@/domain/models/user'

export interface LoadUserEditProfile {
  load (): Promise<UserEdit>
}

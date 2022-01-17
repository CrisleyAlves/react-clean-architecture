import { ActivityModel } from '@/domain/models/'

export interface ListUserActivities {
  list (): Promise<ActivityModel[]>
}
